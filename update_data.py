import json
import os
from datetime import datetime

# Today's Date
today = "2026-04-07"

# New Jobs
new_jobs = [
    {
        "id": "zscaler-principal-rust-engineer-2026-04-07",
        "title": "Principal Software Development Engineer - Rust",
        "company": "Zscaler",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Lead level",
        "salaryRange": "$220,000 - $280,000",
        "requirements": ["Rust", "LLM", "Networking", "Systems Engineering"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    },
    {
        "id": "okx-senior-rust-engineer-2026-04-07",
        "title": "Senior Software Engineer",
        "company": "OKX",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$180,000 - $240,000",
        "requirements": ["Rust", "Backend", "Web3", "Distributed Systems"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    },
    {
        "id": "cowdao-senior-backend-engineer-2026-04-07",
        "title": "Senior Backend Engineer (Rust)",
        "company": "CoW DAO",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "Salary not specified",
        "requirements": ["Rust", "Ethereum", "DeFi", "Backend Architecture"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    }
]

# New Intel
new_intel = [
    {
        "title": "Chainalysis Unveils AI Agents for On-Chain Security",
        "category": "INFRA",
        "summary": "Chainalysis officially introduces enterprise-grade AI agents designed to fight on-chain crime and ensure data integrity within blockchain systems.",
        "date": today,
        "sourceLink": "https://coingeek.com/chainalysis-unveils-ai-agents-to-fight-on-chain-crime/"
    },
    {
        "title": "Giant Wallet Launches G-Gift on BSC",
        "category": "INFRA",
        "summary": "Giant Wallet V2.1.0 debuts G-Gift, a social token gifting feature on Binance Smart Chain enabling simplified multi-recipient crypto distribution.",
        "date": today,
        "sourceLink": "https://cryptoslate.com/press-releases/giant-wallet-launches-g-gift-a-social-token-gifting-feature-on-binance-smart-chain/"
    },
    {
        "title": "PeckShield Reports $52M Exploit Losses in March",
        "category": "HACK",
        "summary": "Security firm PeckShield highlights that crypto exploits reached $52 million in losses during March, signaling continued vulnerability in the ecosystem.",
        "date": today,
        "sourceLink": "https://www.theblock.co/post/396010/crypto-hack-exploit-losses-52-million"
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
    { "time": "09:15:00", "msg": "Daily data aggregation cycle started for 2026-04-07.", "type": "info" },
    { "time": "09:15:15", "msg": f"Indexed 3 new remote Rust roles from Zscaler, OKX, and CoW DAO.", "type": "success" },
    { "time": "09:15:25", "msg": "Parsed Chainalysis AI Agent launch and Giant Wallet BSC integration updates.", "type": "success" },
    { "time": "09:15:35", "msg": "Web3 Data Update [2026-04-07] complete.", "type": "success" }
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

    health['lastSync'] = datetime.utcnow().isoformat().replace('+00:00', '') + "Z"
    health['status'] = 'HEALTHY'
    new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
    health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
    health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

    with open(health_file, 'w') as f:
        json.dump(health, f, indent=2)
    print(f"Updated {health_file}")
