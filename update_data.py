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
        # Avoid duplicates if script is run multiple times on the same day
        existing_keys = {item[unique_key] for item in data if unique_key in item and (not today or item.get('date') == today)}
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
    # Today's Date
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    new_jobs = [
        {
            "id": f"unstoppable-rust-engineer-{today}",
            "title": "Software Engineer - Rust",
            "company": "Unstoppable Finance",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$90,000 - $150,000",
            "requirements": ["Rust", "DeFi", "Solidity", "Web3"],
            "applyLink": "https://huntd.tech/jobs/web3-solana"
        },
        {
            "id": f"bitgo-defi-engineer-{today}",
            "title": "Software Engineer, DeFi Team",
            "company": "BitGo",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid level",
            "salaryRange": "$66,000 - $120,000",
            "requirements": ["Go", "Distributed Systems", "DeFi Understanding", "Web3"],
            "applyLink": "https://huntd.tech/jobs/web3-solana"
        },
        {
            "id": f"moment-house-web3-engineer-{today}",
            "title": "Web3 Engineer",
            "company": "Moment House",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$102,000 - $156,000",
            "requirements": ["Solidity", "Node.js", "React", "Web3"],
            "applyLink": "https://huntd.tech/jobs/web3-solana"
        }
    ]

    new_intel = [
        {
            "title": "Monad Devnet V4 Stress Test Reaches 15k TPS",
            "category": "INFRA",
            "summary": "Monad's latest Devnet V4 stress test achieved a sustained 15,000 TPS, showcasing the power of parallelized EVM execution in high-load scenarios.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "Ethereum Pectra Devnet-12 Operational",
            "category": "INFRA",
            "summary": "Devnet-12 for the Ethereum Pectra upgrade is now live, focusing on large-scale testing of EIP-7702 and preliminary Verkle tree performance benchmarks.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Sonne Finance Exploited for $20M in Flashloan Attack",
            "category": "HACK",
            "summary": "DeFi lending protocol Sonne Finance suffered a $20 million exploit due to a known vulnerability in its Compound-forked contracts being triggered via a flashloan.",
            "date": today,
            "sourceLink": "https://rekt.news/sonne-finance-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates.", "type": "success" },
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

        health['lastSync'] = datetime.now(timezone.utc).isoformat().replace('+00:00', '') + "Z"
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
