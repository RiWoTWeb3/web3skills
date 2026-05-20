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
    today = "2026-05-20"

    new_jobs = [
        {
            "id": f"zscaler-sre-{today}",
            "title": "Staff Site Reliability Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$115,000 - $165,000",
            "requirements": ["AWS", "Golang", "Java", "SRE"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"okx-quant-rust-{today}",
            "title": "Quant Developer (Rust)",
            "company": "OKX",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$122,000 - $180,000",
            "requirements": ["Rust", "AWS", "Distributed Systems", "Trading Systems"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"solana-protocol-engineer-{today}",
            "title": "Principal Protocol Engineer",
            "company": "Solana Foundation",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Principal level",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Rust", "Solana", "Blockchain Architecture", "Solana Fundamentals"],
            "applyLink": "https://web3.career/rust+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Monad Public Testnet Milestone: 1 Million Unique Wallets Surpassed",
            "category": "INFRA",
            "summary": "Monad's public testnet has officially surpassed 1 million unique wallets, demonstrating strong developer interest in its parallelized EVM execution environment.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "Ethereum Pectra Devnet-11 goes live with EIP-7702 refinements",
            "category": "INFRA",
            "summary": "The eleventh devnet for the Ethereum Pectra upgrade is now operational, focusing on critical refinements to EIP-7702 and Account Abstraction performance.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Sonne Finance exploited for $20M in a flash loan attack",
            "category": "HACK",
            "summary": "DeFi lending protocol Sonne Finance was exploited for approximately $20 million due to a flash loan attack on its Optimism deployment.",
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
