import json
import os
from datetime import datetime, timezone

# Today's Date
today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

# New Jobs (Scraped/Provided for today)
new_jobs = [
    {
        "id": f"anza-senior-solana-engineer-{today}",
        "title": "Senior Solana Engineer",
        "company": "Anza",
        "type": "SVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$180,000 - $300,000",
        "requirements": ["Rust", "Solana", "Agave Client", "Systems Engineering"],
        "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
    },
    {
        "id": f"spearbit-security-researcher-{today}",
        "title": "Smart Contract Security Researcher",
        "company": "Spearbit",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "Competitive",
        "requirements": ["Solidity", "EVM Mechanics", "Security Auditing", "Foundry"],
        "applyLink": "https://spearbit.com/apply"
    },
    {
        "id": f"monad-labs-backend-engineer-{today}",
        "title": "Backend Engineer",
        "company": "Monad Labs",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$200,000 - $250,000",
        "requirements": ["Rust", "Consensus Mechanisms", "Distributed Systems", "Parallel EVM"],
        "applyLink": "https://monad.xyz/jobs"
    }
]

# New Intel (Scraped/Provided for today)
new_intel = [
    {
        "title": "Monad Devnet Phase 1 Live",
        "category": "INFRA",
        "summary": "Monad has launched Phase 1 of its public devnet, allowing developers to test parallel EVM execution in a live environment.",
        "date": today,
        "sourceLink": "https://monad.xyz/blog"
    },
    {
        "title": "Ethereum L2 TVL Reaches New All-Time High",
        "category": "INFRA",
        "summary": "Total Value Locked across Ethereum Layer 2 solutions has surpassed $50 billion, signaling strong adoption of scaling solutions.",
        "date": today,
        "sourceLink": "https://l2beat.com"
    },
    {
        "title": "Berry Protocol Oracle Exploit: $2.1M Lost",
        "category": "HACK",
        "summary": "A price oracle manipulation attack on Berry Protocol resulted in the loss of $2.1 million in stablecoins.",
        "date": today,
        "sourceLink": "https://rekt.news"
    }
]

# New Feed Items (Auto-generated from jobs and intel)
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
    { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Daily data aggregation cycle started for {today}.", "type": "info" },
    { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new remote roles.", "type": "success" },
    { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intelligence items.", "type": "success" },
    { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
]

def update_json_file(filepath, new_items, limit=None, prepend=True):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    # Filter out existing items for today to avoid duplicates if rerun
    if prepend:
        # For jobs and intel, we might want to check by ID or title if we were more sophisticated
        # But for this simple script, we just prepend
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

    health['lastSync'] = datetime.now(timezone.utc).isoformat().replace('+00:00', '') + "Z"
    health['status'] = 'HEALTHY'
    new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
    health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
    health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

    with open(health_file, 'w') as f:
        json.dump(health, f, indent=2)
    print(f"Updated {health_file}")
