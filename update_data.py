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
            "id": f"anza-consensus-engineer-{today}",
            "title": "Senior Software Engineer, Consensus",
            "company": "Anza",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $300,000",
            "requirements": ["Rust", "Solana Fundamentals", "Distributed Systems", "Solana Program Development"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs.html"
        },
        {
            "id": f"hibachi-evm-systems-{today}",
            "title": "Rust Developer — EVM Systems",
            "company": "Hibachi",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $250,000",
            "requirements": ["Rust", "EVM Mechanics", "Smart Contract Development", "Solidity"],
            "applyLink": "https://web3.career/evm+remote-jobs"
        },
        {
            "id": f"raretalent-solana-engineer-{today}",
            "title": "Solana Smart Contract Engineer",
            "company": "RareTalent",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$200,000 - $280,000",
            "requirements": ["Rust", "Solana Program Development", "Anchor Framework", "Solana Fundamentals"],
            "applyLink": "https://raretalent.xyz/jobs"
        }
    ]

    new_intel = [
        {
            "title": "Monad Labs Mainnet Launch Protocol Initialized",
            "category": "INFRA",
            "summary": "The high-performance parallelized EVM network Monad has officially initialized its mainnet launch sequence, enabling ultra-high throughput for dApps.",
            "date": today,
            "sourceLink": "https://coinmarketcap.com/cmc-ai/monad/latest-updates/"
        },
        {
            "title": "EigenLayer AVS Ecosystem Growth Surge",
            "category": "INFRA",
            "summary": "Multiple new Actively Validated Services (AVS) have successfully deployed on EigenLayer, significantly expanding the restaking utility across Ethereum.",
            "date": today,
            "sourceLink": "https://www.coindesk.com/tag/eigenlayer/"
        },
        {
            "title": "KelpDAO rsETH Minting Vulnerability Exploited",
            "category": "HACK",
            "summary": "Attackers exploited a critical vulnerability in KelpDAO's rsETH minting logic, allowing for unauthorized token creation. Security teams have paused the protocol.",
            "date": today,
            "sourceLink": "https://bpi.com/crypto-hacks-and-defi-runs/"
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
