import json
import os
from datetime import datetime

# Today's Date
today = "2026-04-05"

# New Jobs
new_jobs = [
    {
        "id": "circle-staff-software-engineer-2026-04-05",
        "title": "Staff Software Engineer",
        "company": "Circle",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Staff level",
        "salaryRange": "$180,000 - $250,000",
        "requirements": ["Blockchain Systems", "Tokenization", "Infrastructure", "Go"],
        "applyLink": "https://www.indeed.com/q-web3-l-remote-jobs.html"
    },
    {
        "id": "semiotic-cto-2026-04-05",
        "title": "Chief Technology Officer (CTO)",
        "company": "Semiotic.AI",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Executive level",
        "salaryRange": "Competitive",
        "requirements": ["Systems Architecture", "AI-to-AI Micropayments", "Product Strategy", "Rust"],
        "applyLink": "https://www.indeed.com/q-web3-l-remote-jobs.html"
    },
    {
        "id": "jumpcrypto-prod-engineer-2026-04-05",
        "title": "Crypto Production Engineer",
        "company": "Jumpcrypto",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Mid/Senior level",
        "salaryRange": "$150,000 - $200,000",
        "requirements": ["Blockchain", "Crypto", "DeFi", "Ethereum"],
        "applyLink": "https://web3.career/remote+solana-jobs"
    }
]

# New Intel
new_intel = [
    {
        "title": "Claw Wallet Launches to Shield On-Chain Assets for AI Agents",
        "category": "INFRA",
        "summary": "Claw Wallet officially launches as the first purpose-built wallet infrastructure for autonomous AI Agents operating on-chain.",
        "date": today,
        "sourceLink": "https://www.morningstar.com/news/pr-newswire/20260402ln25813/claw-wallet-launches-to-shield-on-chain-assets-for-ai-agents"
    },
    {
        "title": "GTBS Digital Ecosystem Mainnet Launch Set for April 2026",
        "category": "INFRA",
        "summary": "The GTBS Digital Ecosystem, integrating blockchain, AI, and DeFi, announces mainnet launch for April 2026 to drive real-world adoption.",
        "date": today,
        "sourceLink": "https://www.mexc.com/news/992894"
    },
    {
        "title": "OpenClaw AI Trading Agent Liquidation: $250,000 Lost",
        "category": "HACK",
        "summary": "A significant liquidation event involving the 'Lobstar Wilde' AI trading agent was reported due to logic misinterpretation, resulting in $250k loss.",
        "date": today,
        "sourceLink": "https://www.morningstar.com/news/pr-newswire/20260402ln25813/claw-wallet-launches-to-shield-on-chain-assets-for-ai-agents"
    }
]

# New Feed Items
new_feed_items = [
    {
        "date": today,
        "type": "job",
        "title": f"{j['title']} at {j['company']}",
        "description": f"Join {j['company']} as a {j['title']}. Requirements: {', '.join(j['requirements'][:3])}. Remote.",
        "link": j['applyLink']
    } for j in new_jobs
] + [
    {
        "date": today,
        "type": "news" if i['category'] == 'INFRA' else "hack",
        "title": i['title'],
        "description": i['summary'],
        "link": i['sourceLink']
    } for i in new_intel
]

# New Logs
new_logs = [
    { "time": "10:20:00", "msg": "Daily data aggregation cycle started for 2026-04-05.", "type": "info" },
    { "time": "10:20:10", "msg": f"Indexed {len(new_jobs)} new remote roles from Circle, Semiotic.AI, and Jumpcrypto.", "type": "success" },
    { "time": "10:20:20", "msg": "Parsed AI Agent security incident and GTBS ecosystem updates.", "type": "success" },
    { "time": "10:20:30", "msg": "Updating system health metrics and sync history.", "type": "info" },
    { "time": "10:20:40", "msg": "Web3 Data Update [2026-04-05] complete.", "type": "success" }
]

def update_json_file(filepath, new_items, limit=None, prepend=True):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    if prepend:
        data = new_items + data
    else:
        data = data + new_items

    if limit:
        data = data[:limit]

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {filepath}")

# Update main data files
update_json_file('src/data/web3Feed.json', new_feed_items, limit=60)
update_json_file('src/data/jobs.json', new_jobs)
update_json_file('src/data/intel.json', new_intel)
update_json_file('src/data/system_logs.json', new_logs, limit=50)

# Update system health
health_file = 'src/data/system_health.json'
if os.path.exists(health_file):
    with open(health_file, 'r') as f:
        health = json.load(f)

    health['lastSync'] = datetime.utcnow().isoformat() + "Z"
    health['status'] = 'HEALTHY'
    new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
    health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
    health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

    with open(health_file, 'w') as f:
        json.dump(health, f, indent=2)
    print(f"Updated {health_file}")
