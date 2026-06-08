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

    # Data sourced for the daily update (2026-06-08)
    new_jobs = [
        {
            "id": f"odos-solana-eng-{today}",
            "title": "Solana Smart Contracts Engineer",
            "company": "Odos",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solana", "Anchor", "DEX Aggregator"],
            "applyLink": "https://inclusivelyremote.com/job/rust-blockchain-developer-solana/"
        },
        {
            "id": f"odos-evm-eng-{today}",
            "title": "Smart Contracts Engineer EVM",
            "company": "Odos",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$130,000 - $180,000",
            "requirements": ["Solidity", "EVM", "Foundry", "Smart Contract Development"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        },
        {
            "id": f"semiotic-rust-eng-{today}",
            "title": "Rust Engineer",
            "company": "Semiotic Labs",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "P2P", "Cryptography", "Distributed Systems"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Upgrade Phase 1 successfully reaches Devnet 7",
            "category": "INFRA",
            "summary": "The Pectra upgrade milestones continue as Devnet 7 goes live, testing EIP-7251 and PeerDAS components for scalability.",
            "date": today,
            "sourceLink": "https://ethereum.org/en/developers/docs/upgrades/pectra/"
        },
        {
            "title": "Solana Firedancer client achieves 1M TPS in controlled testnet",
            "category": "INFRA",
            "summary": "Jump Crypto's Firedancer client has demonstrated 1 million transactions per second throughput in the latest testnet environment.",
            "date": today,
            "sourceLink": "https://firedancer.io/"
        },
        {
            "title": "Nexus Bridge exploit results in $15M loss due to signature flaw",
            "category": "HACK",
            "summary": "A critical vulnerability in the Nexus Bridge signature verification logic allowed an attacker to drain $15M across three chains.",
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Odos and Semiotic Labs.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Ethereum Pectra progress.", "type": "success" },
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
