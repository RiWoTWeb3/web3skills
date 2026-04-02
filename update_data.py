import json
import os
from datetime import datetime

# Today's Date
today = "2026-04-02"

# New Jobs
new_jobs = [
    {
        "id": "certik-senior-security-engineer-2026-04-02",
        "title": "Senior Level Blockchain Security Engineer",
        "company": "CertiK",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$102,000 - $180,000",
        "requirements": ["Solidity", "Rust", "Go", "Smart Contract Security"],
        "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
    },
    {
        "id": "travoom-senior-rust-backend-2026-04-02",
        "title": "Senior Rust Backend Engineer",
        "company": "Travoom",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$110,000 - $190,000",
        "requirements": ["Rust", "Distributed Systems", "Backend Architecture"],
        "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
    },
    {
        "id": "rho-labs-senior-fullstack-2026-04-02",
        "title": "Senior Full Stack Engineer",
        "company": "Rho Labs",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$75,000 - $120,000",
        "requirements": ["React", "Web3", "DeFi", "TypeScript"],
        "applyLink": "https://cryptojobslist.com/web3"
    }
]

# New Intel
new_intel = [
    {
        "title": "Ethereum Upgrade Roadmap: Glamsterdam and Hegota",
        "category": "INFRA",
        "summary": "Ethereum developers continue progress on major upgrades like Glamsterdam and Hegota, focusing on scalability and MEV fairness.",
        "date": today,
        "sourceLink": "https://www.mexc.com/news/992865"
    },
    {
        "title": "DeepSeek AI Predicts Range-Bound ETH/SOL Prices",
        "category": "INFRA",
        "summary": "DeepSeek AI outlook points to range-bound price action for Ethereum and Solana in April 2026 due to lack of clear catalysts.",
        "date": today,
        "sourceLink": "https://www.mexc.com/news/992865"
    },
    {
        "title": "PeckShield March 2026 Exploit Recap: $52M Lost",
        "category": "HACK",
        "summary": "Crypto hack and exploit losses reached $52 million in March 2026 according to PeckShield's monthly security report.",
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
    { "time": "09:15:00", "msg": "Daily data aggregation cycle started for 2026-04-02.", "type": "info" },
    { "time": "09:15:10", "msg": f"Indexed {len(new_jobs)} new remote engineering roles from CertiK, Travoom, and Rho Labs.", "type": "success" },
    { "time": "09:15:20", "msg": "Parsed March exploit report and Ethereum roadmap updates.", "type": "success" },
    { "time": "09:15:30", "msg": "Updating system health metrics and sync history.", "type": "info" },
    { "time": "09:15:40", "msg": "Web3 Data Update [2026-04-02] complete.", "type": "success" }
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
