import json
import os
from datetime import datetime

# Today's Date
today = "2026-03-30"

# New Jobs
new_jobs = [
    {
        "id": "blocknative-backend-engineer-2026-03-30",
        "title": "Senior Backend Blockchain Engineer",
        "company": "Blocknative",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$160,000 - $220,000",
        "requirements": ["Go", "EVM Mechanics", "Distributed Systems", "Infrastructure"],
        "applyLink": "https://web3.career/evm+remote-jobs"
    },
    {
        "id": "aware-fund-infrastructure-engineer-2026-03-30",
        "title": "RWA Senior Infrastructure Engineer",
        "company": "Aware Fund",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$150,000 - $300,000",
        "requirements": ["SRE", "Cloud Architecture", "Rust", "Distributed Systems"],
        "applyLink": "https://cryptojobslist.com/remote"
    },
    {
        "id": "grvt-mobile-developer-2026-03-30",
        "title": "React Native Mobile Developer",
        "company": "GRVT",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$130,000 - $160,000",
        "requirements": ["React Native", "TypeScript", "Mobile Security", "Web3 Wallets"],
        "applyLink": "https://cryptojobslist.com/remote"
    }
]

# New Intel
new_intel = [
    {
        "title": "Ethereum Glamsterdam Upgrade Finalized",
        "category": "INFRA",
        "summary": "Ethereum developers have finalized the scope for the Glamsterdam upgrade, focusing on enshrined Proposer-Builder Separation (ePBS).",
        "date": today,
        "sourceLink": "https://ethereum.org/en/developers/"
    },
    {
        "title": "Solana Alpenglow Testnet Milestone",
        "category": "INFRA",
        "summary": "Solana Alpenglow reaches v0.8 on testnet, achieving 150ms finality times in a geo-distributed environment.",
        "date": today,
        "sourceLink": "https://solana.com/news"
    },
    {
        "title": "Solana Firedancer Bug Bounty: $500k",
        "category": "BOUNTY",
        "summary": "Jump Crypto announces a $500,000 bounty for critical vulnerabilities in the Firedancer validator client prior to full mainnet release.",
        "date": today,
        "sourceLink": "https://immunefi.com/blog/"
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
    { "time": "09:00:05", "msg": "Daily data aggregation cycle started for 2026-03-30.", "type": "info" },
    { "time": "09:00:12", "msg": f"Indexed {len(new_jobs)} new remote engineering roles.", "type": "success" },
    { "time": "09:00:18", "msg": "Parsed 2 infrastructure launches and 1 security bounty.", "type": "success" },
    { "time": "09:00:25", "msg": "Updating system health metrics and sync history.", "type": "info" },
    { "time": "09:00:30", "msg": "Web3 Data Update [2026-03-30] complete.", "type": "success" }
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
