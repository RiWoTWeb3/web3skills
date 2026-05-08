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
            "id": f"odos-evm-engineer-{today}",
            "title": "Smart Contracts Engineer EVM",
            "company": "Odos",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Solidity", "Rust", "EVM Mechanics", "Smart Contract Development"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        },
        {
            "id": f"odos-solana-engineer-{today}",
            "title": "Solana Smart Contracts Engineer",
            "company": "Odos",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solana Program Development", "Anchor Framework", "Solana Fundamentals"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        },
        {
            "id": f"travoom-rust-backend-{today}",
            "title": "Senior Rust Backend Engineer",
            "company": "Travoom",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Distributed Systems", "Backend Architecture", "Systems Engineering"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        }
    ]

    new_intel = [
        {
            "title": "RedStone Launches Settlement Layer for RWA Liquidity",
            "category": "INFRA",
            "summary": "RedStone has launched a dedicated settlement layer aimed at bridging the liquidity gap for Real-World Assets (RWAs) in DeFi lending markets.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/redstone-settlement-layer-rwa-liquidity-gap-defi-lending"
        },
        {
            "title": "Shinhan Card Taps Solana for Stablecoin Payments",
            "category": "INFRA",
            "summary": "South Korean credit card giant Shinhan Card is partnering with the Solana Foundation to test stablecoin payments and non-custodial wallet solutions.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/south-korean-credit-card-giant-partners-with-solana-for-stablecoin-payments-defi-infrastructure"
        },
        {
            "title": "TrustedVolumes Hit by $6.7M Exploit",
            "category": "HACK",
            "summary": "TrustedVolumes was targeted in a $6.7 million exploit. 1inch has denied any breach of its own protocols in relation to the incident.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/1inch-fusion-resolver-trusted-volumes-floats-bounty-after-67m-exploit"
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
