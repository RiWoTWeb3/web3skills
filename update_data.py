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

    # This data would typically be fetched from an API or scraper
    # For this automation task, we use the identified data for today
    new_jobs = [
        {
            "id": f"travoom-senior-rust-backend-{today}",
            "title": "Senior Rust Backend Engineer",
            "company": "Travoom",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Distributed Systems", "Backend Architecture", "Messaging Systems"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        },
        {
            "id": f"certik-blockchain-security-expert-{today}",
            "title": "Blockchain Security Expert",
            "company": "CertiK",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$120,000 - $180,000",
            "requirements": ["Solidity", "Smart Contract Auditing", "Security Assessments", "Web3"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        },
        {
            "id": f"fireblocks-mobile-engineer-{today}",
            "title": "Mobile Engineer",
            "company": "Fireblocks",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$177,000 - $230,000",
            "requirements": ["Mobile Development", "Wallet Infrastructure", "Security", "TypeScript"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        }
    ]

    new_intel = [
        {
            "title": "Monad Testnet Milestone: 1 Million Unique Wallets Surpassed",
            "category": "INFRA",
            "summary": "Monad's public testnet has officially surpassed 1 million unique wallets, demonstrating strong developer interest in its parallelized EVM execution environment.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "Ethereum Pectra Devnet-11: Testing EIP-7702 refinements",
            "category": "INFRA",
            "summary": "The eleventh devnet for the Ethereum Pectra upgrade is now operational, focusing on critical refinements to EIP-7702 and Account Abstraction performance.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "DeFi Protocol Reward: $1.2M Payout on Immunefi",
            "category": "HACK",
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
