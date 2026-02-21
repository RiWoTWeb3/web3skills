import { MultiKeyGeminiClient } from './geminiClient';
import { prisma } from './db';

export class AgenticEnsemble {
  constructor(private client: MultiKeyGeminiClient) {}

  async analyzeVulnerability(jobId: string, phase: number, filePath: string, codeSnippet: string, toolOutput: string) {
    // Agent 1: The Hunter (finds bugs aggressively)
    const hunterPrompt = `You are a security auditor hunting for vulnerabilities in Solidity smart contracts.

Code:
${codeSnippet}

Tool Output:
${toolOutput}

Find ALL potential security issues. Be aggressive.
EFFICIENCY DIRECTIVE: Ignore any 'Gas Optimization' or 'Gas Saving' issues.
List them as JSON:
{ "vulnerabilities": [{ "type": "", "severity": "Critical|High|Medium|Low", "reasoning": "", "line_numbers": "" }] }`;

    const hunterResponseRaw = await this.client.generate(hunterPrompt, 'gemini-2.0-flash');
    let hunterData;
    try {
        // Extract JSON from response (handling potential markdown blocks)
        const jsonMatch = hunterResponseRaw.match(/\{[\s\S]*\}/);
        hunterData = JSON.parse(jsonMatch ? jsonMatch[0] : hunterResponseRaw);
    } catch (e) {
        console.error("Failed to parse Hunter response", hunterResponseRaw);
        return;
    }

    for (const vuln of hunterData.vulnerabilities) {
        // DIRECTIVE 1: DISCARD GAS BUGS
        if (vuln.type.toLowerCase().includes('gas') || vuln.reasoning.toLowerCase().includes('gas')) {
            console.log(`Discarding Gas bug: ${vuln.type}`);
            continue;
        }

        // DIRECTIVE 2: LOW BUGS ARE INFORMATIONAL, SKIP ENSEMBLE
        if (vuln.severity === 'Low') {
            await prisma.vulnerabilityEvidence.create({
                data: {
                    job_id: jobId,
                    phase_found: phase,
                    severity: 'Informational',
                    vulnerability_type: vuln.type,
                    file_path: filePath,
                    line_numbers: vuln.line_numbers || "0",
                    code_snippet: codeSnippet,
                    ai_reasoning: vuln.reasoning,
                    is_confirmed: false,
                    confidence: 0.5
                }
            });
            continue;
        }

        // FOR MEDIUM, HIGH, CRITICAL - TRIGGER ENSEMBLE

        // Agent 2: The Devil's Advocate (tries to disprove Hunter)
        const advocatePrompt = `You are playing Devil's Advocate for a smart contract audit. Try to prove this finding is a FALSE POSITIVE.

Original Code:
${codeSnippet}

Hunter's Claim:
Type: ${vuln.type}
Severity: ${vuln.severity}
Reasoning: ${vuln.reasoning}

Argue why this might NOT be a real vulnerability or why it might be unexploitable. Return JSON:
{ "counterArgument": "..." }`;

        const advocateResponseRaw = await this.client.generate(advocatePrompt, 'gemini-2.0-flash');
        let advocateData;
        try {
            const jsonMatch = advocateResponseRaw.match(/\{[\s\S]*\}/);
            advocateData = JSON.parse(jsonMatch ? jsonMatch[0] : advocateResponseRaw);
        } catch (e) {
            advocateData = { counterArgument: advocateResponseRaw };
        }

        // Agent 3: The Judge (makes final decision with deep reasoning)
        const judgePrompt = `You are the final judge in a smart contract security audit. Review the evidence and make a verdict.

Code:
${codeSnippet}

Hunter's Finding:
${vuln.reasoning}

Advocate's Counter-Argument:
${advocateData.counterArgument}

Make a final decision:
- Is it a real vulnerability? (Yes/No)
- Confidence level (0-1.0)
- Final severity (Critical/High/Medium/Low)
- Exploitability assessment

Return JSON:
{ "is_real": bool, "confidence": float, "severity": "...", "reasoning": "...", "verdict": "..." }`;

        const judgeResponseRaw = await this.client.generate(judgePrompt, 'gemini-1.5-pro');
        let judgeData;
        try {
            const jsonMatch = judgeResponseRaw.match(/\{[\s\S]*\}/);
            judgeData = JSON.parse(jsonMatch ? jsonMatch[0] : judgeResponseRaw);
        } catch (e) {
            console.error("Failed to parse Judge response", judgeResponseRaw);
            continue;
        }

        // Store confirmed vulnerability
        await prisma.vulnerabilityEvidence.create({
            data: {
                job_id: jobId,
                phase_found: phase,
                severity: judgeData.severity || vuln.severity,
                vulnerability_type: vuln.type,
                file_path: filePath,
                line_numbers: vuln.line_numbers || "0",
                code_snippet: codeSnippet,
                ai_reasoning: vuln.reasoning,
                advocate_counter: advocateData.counterArgument,
                judge_verdict: judgeData.verdict || judgeData.reasoning,
                is_confirmed: judgeData.is_real,
                confidence: judgeData.confidence || 0.0
            }
        });
    }
  }
}
