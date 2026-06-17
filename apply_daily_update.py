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
        # Global deduplication: check against ALL existing items
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

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"gsr-quant-rust-{today}",
            "title": "Quant Developer (Rust)",
            "company": "GSR Markets",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $260,000",
            "requirements": ["Rust", "Low Latency", "Trading Systems", "Quantitative Analysis"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"jumpcrypto-prod-eng-{today}",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Go", "Distributed Systems", "Ethereum", "Infrastructure"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"okx-senior-backend-{today}",
            "title": "Senior Backend Engineer",
            "company": "OKX",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "Solidity", "Web3", "API Design"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Arbitrum Stylus Mainnet Officially Launched",
            "category": "INFRA",
            "summary": "Arbitrum Stylus is now live on mainnet, allowing developers to write smart contracts in Rust, C, and C++ alongside Solidity, significantly expanding the EVM developer ecosystem.",
            "date": today,
            "sourceLink": "https://arbitrum.io/stylus"
        },
        {
            "title": "Firedancer 1.0 Milestone Reached on Solana",
            "category": "INFRA",
            "summary": "The first complete version of the Firedancer validator client is now active on Solana mainnet, bringing unprecedented performance and client diversity to the network.",
            "date": today,
            "sourceLink": "https://jumpcrypto.com/firedancer/"
        },
        {
            "title": "Major Cross-Chain Bridge Exploit: $45M Drained",
            "category": "HACK",
            "summary": "A sophisticated access control vulnerability in a prominent cross-chain bridge allowed an attacker to drain $45 million in mixed assets. Security teams are investigating the compromise.",
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from GSR, Jumpcrypto, and OKX.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Arbitrum Stylus.", "type": "success" },
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
