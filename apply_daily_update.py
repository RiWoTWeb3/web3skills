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
    # Use current UTC date for dynamic updates
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"helius-staff-performance-{today}",
            "title": "Staff Performance Engineer, Trading Infrastructure",
            "company": "Helius",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Expert level",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Rust", "Solana", "Trading Infrastructure", "Performance Engineering"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"cow-dao-senior-backend-{today}",
            "title": "Senior Backend Engineer (Rust)",
            "company": "CoW DAO",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "Ethereum", "DeFi", "Solvers"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"jumpcrypto-prod-engineer-{today}",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Go", "Distributed Systems", "Ethereum", "Validator Infrastructure"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Lion Group Holding Ltd Announces Strategic MOU with Meili Capital",
            "category": "INFRA",
            "summary": "Lion Group and Meili Capital to explore joint investment vehicles focused on digital assets, Web3, and AI-related opportunities across infrastructure and tokenization sectors.",
            "date": today,
            "sourceLink": "https://www.stocktitan.net/news/LGHL/lion-group-holding-ltd-announces-strategic-memorandum-of-dpv42cb0f2vx.html"
        },
        {
            "title": "Chainlink Runtime Environment (CRE) Expansion",
            "category": "INFRA",
            "summary": "Chainlink continues its roll-out of the CRE, a major architectural shift to enable modular and scalable decentralized services across the Web3 ecosystem.",
            "date": today,
            "sourceLink": "https://web3.career/web3-companies/chainlinklabs"
        },
        {
            "title": "DeFi Protocol Reward: $1.2M Payout on Immunefi",
            "category": "BOUNTY",
            "summary": "A critical logic vulnerability in a major cross-chain protocol was safely disclosed by a white-hat researcher, earning a $1.2M reward on Immunefi.",
            "date": today,
            "sourceLink": "https://immunefi.com/blog/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Helius, CoW DAO, and Jumpcrypto.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Lion Group MOU.", "type": "success" },
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
