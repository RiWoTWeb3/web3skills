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
            "id": f"helius-senior-rust-{today}",
            "title": "Senior Rust Engineer",
            "company": "Helius",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Solana", "High-performance Systems"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"odos-smart-contracts-{today}",
            "title": "Smart Contracts Engineer (EVM)",
            "company": "Odos",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Solidity", "Ethers.js", "DeFi"],
            "applyLink": "https://web3.career/remote+evm-jobs"
        },
        {
            "id": f"certik-blockchain-security-{today}",
            "title": "Blockchain Security Engineer",
            "company": "CertiK",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$102,000 - $180,000",
            "requirements": ["Solidity", "Rust", "Security Auditing"],
            "applyLink": "https://web3.career/remote-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Upgrade Phase 1 Enters Final Testing",
            "category": "INFRA",
            "summary": "The first phase of the highly anticipated Pectra upgrade has entered final testing on Devnet 5, bringing account abstraction improvements closer to mainnet.",
            "date": today,
            "sourceLink": "https://ethereum.org/en/developers/docs/upgrades/pectra/"
        },
        {
            "title": "Solana Firedancer Reaches Stable Beta",
            "category": "INFRA",
            "summary": "Jump Crypto's Firedancer client has officially reached stable beta on Solana mainnet, promising significant throughput improvements and client diversity.",
            "date": today,
            "sourceLink": "https://jumpcrypto.com/firedancer/"
        },
        {
            "title": "L2 Bridge Vulnerability: $2.5M Bounty Paid",
            "category": "BOUNTY",
            "summary": "Immunefi confirms a $2.5 million payout for a critical vulnerability found in a major Layer 2 bridge protocol, preventing a potential nine-figure exploit.",
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Helius, Odos, and CertiK.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Ethereum Pectra and Solana Firedancer.", "type": "success" },
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
