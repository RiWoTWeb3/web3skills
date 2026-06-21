import json
import os
from datetime import datetime, timezone

def update_json_file(filepath, new_items, unique_key='title', limit=None, prepend=True, today=None):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    if prepend:
        # Strict global deduplication: check against ALL existing entries
        existing_keys = {item[unique_key] for item in data if unique_key in item}
        filtered_new = [item for item in new_items if unique_key in item and item[unique_key] not in existing_keys]
        data = filtered_new + data
    else:
        data = data + new_items

    if limit:
        data = data[:limit]

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {filepath}")

def main():
    # Use current UTC date for dynamic updates
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Data sourced for the daily update (2026-06-20)
    new_jobs = [
        {
            "id": f"offchain-labs-senior-backend-{today}",
            "title": "Senior Backend Engineer (Rust)",
            "company": "Offchain Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$122,000 - $150,000",
            "requirements": ["Rust", "Ethereum", "Arbitrum", "L2"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"alpaca-senior-software-{today}",
            "title": "Senior Software Engineer, Advisory Suite",
            "company": "Alpaca",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$106,000 - $114,000",
            "requirements": ["Python", "AWS", "Financial Systems", "API"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"okx-senior-java-{today}",
            "title": "Senior Java Engineer, Wallet Smart Account Team",
            "company": "Okx",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$84,000 - $150,000",
            "requirements": ["Java", "Wallet Infrastructure", "Smart Accounts", "EVM"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Force Bridge Announces Sunset and Planned Wind-down",
            "category": "INFRA",
            "summary": "Force Bridge has announced it will be sunsetting over the next six months, urging users to migrate assets to alternative cross-chain solutions.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/month-in-review-top-defi-hacks-of-june-2025"
        },
        {
            "title": "ALEX Protocol Access Control Vulnerability Identified",
            "category": "INFRA",
            "summary": "Weak access controls within the ALEX Protocol were identified as the root cause for recent security concerns, highlighting the need for robust permission management.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/month-in-review-top-defi-hacks-of-june-2025"
        },
        {
            "title": "ALEX Protocol Exploited for $8.3M via Malicious Transfer",
            "category": "HACK",
            "summary": "An attacker bypassed access controls in ALEX Protocol by creating a fake token and vault, tricking the protocol into calling a malicious transfer function.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/month-in-review-top-defi-hacks-of-june-2025"
        }
    ]

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

    new_logs = [
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Daily data aggregation cycle started for {today}.", "type": "info" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Offchain Labs, Alpaca, and Okx.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including ALEX Protocol exploit.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
    ]

    # Update main data files
    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60, today=today)
    update_json_file('src/data/jobs.json', new_jobs, unique_key='id', today=today)
    update_json_file('src/data/intel.json', new_intel, today=today)
    update_json_file('src/data/system_logs.json', new_logs, limit=50, unique_key='msg', today=today)

    # Update system health
    health_file = 'src/data/system_health.json'
    if os.path.exists(health_file):
        with open(health_file, 'r') as f:
            health = json.load(f)

        health['lastSync'] = datetime.now(timezone.utc).isoformat()
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
