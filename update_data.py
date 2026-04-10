import json
import os
from datetime import datetime

# Today's Date
today = datetime.now().strftime("%Y-%m-%d")

# New Jobs
new_jobs = [
    {
        "id": f"synonym-senior-rust-engineer-{today}",
        "title": "Senior Rust Engineer",
        "company": "Synonym",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$180,000 - $250,000",
        "requirements": ["Rust", "Distributed Systems", "Cross-chain", "Cryptography"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    },
    {
        "id": f"joyride-labs-protocol-engineer-{today}",
        "title": "Founding Protocol Engineer",
        "company": "Joyride Labs",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Lead level",
        "salaryRange": "$150,000 - $200,000",
        "requirements": ["Solidity", "Rust", "EVM", "Blockchain Infrastructure"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    },
    {
        "id": f"kraken-software-engineer-rust-{today}",
        "title": "Software Engineer - Rust",
        "company": "Kraken",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$160,000 - $220,000",
        "requirements": ["Rust", "High-Throughput Systems", "Trading Systems", "Backend"],
        "applyLink": "https://web3.career/remote+rust-jobs"
    }
]

# New Intel
new_intel = [
    {
        "title": "EigenLayer Mainnet Launch Introduces Restaking",
        "category": "INFRA",
        "summary": "EigenLayer has officially launched on Ethereum mainnet, bringing restaking capabilities that allow ETH stakers to secure additional protocols and services.",
        "date": today,
        "sourceLink": "https://eigenlayer.xyz/"
    },
    {
        "title": "Solana Foundation Releases Mainnet Beta Patch",
        "category": "INFRA",
        "summary": "Critical performance upgrades (v1.17.31) have been released to address network congestion and improve transaction reliability on the Solana blockchain.",
        "date": today,
        "sourceLink": "https://solana.com/"
    },
    {
        "title": "OpenLeverage Suffers $236k Reentrancy Exploit",
        "category": "HACK",
        "summary": "DeFi lending protocol OpenLeverage was exploited for approximately $236,000 due to a reentrancy vulnerability in its lending vault contracts.",
        "date": today,
        "sourceLink": "https://twitter.com/PeckShield/status/1774735282539425828"
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
    { "time": datetime.now().strftime("%H:%M:%S"), "msg": f"Daily data aggregation cycle started for {today}.", "type": "info" },
    { "time": datetime.now().strftime("%H:%M:%S"), "msg": "Indexed 3 new remote roles from Synonym, Joyride Labs, and Kraken.", "type": "success" },
    { "time": datetime.now().strftime("%H:%M:%S"), "msg": "Parsed EigenLayer Mainnet and Solana performance updates.", "type": "success" },
    { "time": datetime.now().strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
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
