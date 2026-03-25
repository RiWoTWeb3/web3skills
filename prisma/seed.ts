import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed KeyPool
  await prisma.keyPool.createMany({
    data: [
      { id: 'key_1', key: 'AIzaSy_fake_key_1', model: 'gemini-2.0-flash', status: 'Active', usage: 1240 },
      { id: 'key_2', key: 'AIzaSy_fake_key_2', model: 'gemini-1.5-pro', status: 'Active', usage: 450 },
      { id: 'key_3', key: 'AIzaSy_fake_key_3', model: 'gemini-2.0-flash', status: 'Exhausted', usage: 1500 },
    ],
  });

  // Seed AuditJobs
  await prisma.auditJobs.createMany({
    data: [
      { id: 'AUD-9921', project_name: 'Uniswap-V4-Hooks', project_path: '/src/contracts/uniswap', current_phase: 3, is_running: true },
      { id: 'AUD-9920', project_name: 'Aave-V3-Core', project_path: '/src/contracts/aave', current_phase: 6, is_running: false },
      { id: 'AUD-9919', project_name: 'Curve-StableSwap-NG', project_path: '/src/contracts/curve', current_phase: 6, is_running: false },
    ],
  });

  // Seed VulnerabilityEvidence
  await prisma.vulnerabilityEvidence.createMany({
    data: [
      {
        job_id: 'AUD-9921',
        phase_found: 3,
        severity: 'High',
        vulnerability_type: 'Reentrancy',
        file_path: 'Hook.sol',
        line_numbers: '45-50',
        code_snippet: 'call.value(...)',
        ai_reasoning: 'Potential reentrancy in hook callback.',
        is_confirmed: true
      },
      // Add more if needed
    ]
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
