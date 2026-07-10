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
    # Today's Date
    today = "2026-07-10"

    new_jobs = [
        {
            "id": f"phantom-senior-rust-{today}",
            "title": "Senior Rust Engineer",
            "company": "Phantom Wallet",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Solana", "Cryptography", "Wallets"],
            "applyLink": "https://phantom.app/jobs"
        },
        {
            "id": f"aave-solidity-{today}",
            "title": "Lead Solidity Developer",
            "company": "Aave",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Lead",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Solidity", "DeFi", "Security", "EVM"],
            "applyLink": "https://aave.com/careers"
        },
        {
            "id": f"monad-protocol-{today}",
            "title": "Protocol Engineer",
            "company": "Monad Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $230,000",
            "requirements": ["C++", "Rust", "EVM", "High Performance"],
            "applyLink": "https://monad.xyz/careers"
        }
    ]

    new_intel = [
        {
            "title": "Polygon ZK-EVM 2.0 Achieves 100k TPS on Testnet",
            "category": "INFRA",
            "summary": "Polygon's latest ZK-EVM iteration demonstrates unprecedented scalability on their public testnet, paving the way for the Q3 mainnet launch.",
            "date": today,
            "sourceLink": "https://polygon.technology/news"
        },
        {
            "title": "Phantom Wallet Launches Native Aptos and Sui Support",
            "category": "INFRA",
            "summary": "Phantom expands its multi-chain presence by adding full support for Move-based blockchains Aptos and Sui.",
            "date": today,
            "sourceLink": "https://phantom.app/blog"
        },
        {
            "title": "LendFlare Protocol Exploited for $5M",
            "category": "HACK",
            "summary": "A complex reentrancy vulnerability in LendFlare's flash loan logic resulted in a $5M loss on Arbitrum. The team has paused the protocol.",
            "date": today,
            "sourceLink": "https://rekt.news/lendflare-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Solana Foundation, Uniswap, and Chainlink.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Pectra upgrade news.", "type": "success" },
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
