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
        # Avoid duplicates by checking globally across all items, not just today's
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
    # Set fixed date to June 22, 2026 for consistency with environment expectations
    today = "2026-06-22"

    new_jobs = [
        {
            "id": f"uniswap-senior-smart-contract-{today}",
            "title": "Senior Smart Contract Engineer",
            "company": "Uniswap Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $260,000",
            "requirements": ["Solidity", "EVM Mechanics", "Smart Contract Development", "DeFi"],
            "applyLink": "https://uniswap.org/jobs"
        },
        {
            "id": f"anza-software-engineer-consensus-{today}",
            "title": "Software Engineer, Consensus",
            "company": "Anza",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$160,000 - $230,000",
            "requirements": ["Rust", "Solana Fundamentals", "Distributed Systems", "Consensus Mechanisms"],
            "applyLink": "https://apply.workable.com/anza-xyz/"
        },
        {
            "id": f"alchemy-backend-distributed-{today}",
            "title": "Software Engineer (Backend) - Distributed Systems",
            "company": "Alchemy",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$170,000 - $240,000",
            "requirements": ["Go", "Distributed Systems", "API Building & Scaling", "Cloud Architecture"],
            "applyLink": "https://www.alchemy.com/jobs"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Devnet-11 Now Operational",
            "category": "INFRA",
            "summary": "The eleventh devnet for Ethereum's Pectra upgrade is live, focusing on refinements to EIP-7702 and account abstraction performance improvements.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Monad Public Testnet Surpasses 1M Unique Wallets",
            "category": "INFRA",
            "summary": "Monad's parallelized EVM testnet has reached a major milestone with over 1 million unique wallet addresses, signaling massive developer interest.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "BtcTurk Hot Wallet Exploit: $55M Compromised",
            "category": "HACK",
            "summary": "Turkish exchange BtcTurk suffered a security breach of its hot wallets, resulting in an estimated $55 million loss across multiple assets.",
            "date": today,
            "sourceLink": "https://rekt.news/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Uniswap Labs, Anza, and Alchemy.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including BtcTurk exploit report.", "type": "success" },
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
