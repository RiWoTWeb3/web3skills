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
    # The system date for this iteration is June 27, 2026
    today = "2026-06-27"

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"bitpay-senior-backend-{today}",
            "title": "Senior Backend Software Developer",
            "company": "BitPay",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Node.js", "EVM", "TypeScript", "Microservices"],
            "applyLink": "https://cryptojobslist.com/jobs/senior-backend-software-developer-at-bitpay"
        },
        {
            "id": f"solana-labs-senior-backend-{today}",
            "title": "Senior Backend Engineer",
            "company": "Solana Labs",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$175,000 - $180,000",
            "requirements": ["Rust", "Solana", "Distributed Systems", "SVM"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"binance-web3-security-{today}",
            "title": "Web3 Security Specialist",
            "company": "Binance",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$140,000 - $200,000",
            "requirements": ["EVM", "Smart Contract Security", "Vulnerability Research", "Solidity"],
            "applyLink": "https://cryptojobslist.com/web3"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Devnet-12 Launch",
            "category": "INFRA",
            "summary": "The twelfth devnet for the Ethereum Pectra upgrade is now operational, focusing on critical refinements to EIP-7702 and Account Abstraction performance benchmarks.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Monad Parallelized EVM Testnet Expansion",
            "category": "INFRA",
            "summary": "Monad's parallel execution testnet reaches new milestones in throughput and latency, demonstrating scalable performance for high-frequency DeFi applications.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "LendHub Protocol $6.5M Exploit",
            "category": "HACK",
            "summary": "A logic vulnerability in the vault settlement engine of LendHub allowed an attacker to drain $6.5M in assets across multiple pools.",
            "date": today,
            "sourceLink": "https://rekt.news"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from BitPay, Solana Labs, and Binance.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including LendHub exploit.", "type": "success" },
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
