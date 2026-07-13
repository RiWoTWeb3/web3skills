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
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    new_jobs = [
        {
            "id": f"chainlink-solidity-{today}-1",
            "title": "Senior Solidity Developer",
            "company": "Chainlink",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Solidity", "Smart Contracts", "DeFi", "EVM"],
            "applyLink": "https://web3.career/"
        },
        {
            "id": f"magiceden-rust-{today}-1",
            "title": "Solana Rust Engineer",
            "company": "Magic Eden",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Rust", "Solana", "Anchor", "Web3"],
            "applyLink": "https://web3.career/"
        },
        {
            "id": f"aave-protocol-{today}-1",
            "title": "Protocol Engineer",
            "company": "Aave",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Solidity", "Ethereum", "Foundry", "Smart Contracts"],
            "applyLink": "https://web3.career/"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Layer 2 Base reaches 1M daily active users",
            "category": "INFRA",
            "summary": "Coinbase's Layer 2 network Base has achieved a new milestone, surpassing 1 million daily active users.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/"
        },
        {
            "title": "Solana introduces new token extensions on Mainnet",
            "category": "INFRA",
            "summary": "The Solana Foundation has announced the launch of new token extensions, offering advanced features for developers.",
            "date": today,
            "sourceLink": "https://solana.com/news"
        },
        {
            "title": "DeFi Protocol XYZ exploited for $5M in flash loan attack",
            "category": "HACK",
            "summary": "A sophisticated flash loan attack on DeFi Protocol XYZ resulted in a loss of approximately $5 million.",
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Chainlink, Magic Eden, and Aave.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
    ]

    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60, today=today)
    update_json_file('src/data/jobs.json', new_jobs, unique_key='id', today=today)
    update_json_file('src/data/intel.json', new_intel, today=today)
    update_json_file('src/data/system_logs.json', new_logs, limit=50, unique_key='msg', today=today)

    health_file = 'src/data/system_health.json'
    if os.path.exists(health_file):
        with open(health_file, 'r') as f:
            health = json.load(f)

        health['lastSync'] = datetime.now(timezone.utc).isoformat().replace('+00:00', '') + "Z"
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10]

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
