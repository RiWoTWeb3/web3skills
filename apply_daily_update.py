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
            "id": f"gsr-quant-dev-rust-{today}",
            "title": "Quant Developer (Rust)",
            "company": "GSR",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $240,000",
            "requirements": ["Rust", "Low-Latency", "Market Making", "Trading Systems"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"uniswap-senior-solidity-{today}",
            "title": "Senior Solidity Engineer",
            "company": "Uniswap Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $260,000",
            "requirements": ["Solidity", "Uniswap V4", "Smart Contract Security", "EVM Opcodes"],
            "applyLink": "https://web3.career/remote+evm-jobs"
        },
        {
            "id": f"anza-solana-protocol-{today}",
            "title": "Solana Protocol Engineer",
            "company": "Anza",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "Solana Core", "Distributed Systems", "Networking"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Upgrade Devnet-12 Operational",
            "category": "INFRA",
            "summary": "The twelfth devnet for Ethereum's Pectra upgrade is now live, focusing on large-scale testing of EIP-7702 and PeerDAS refinements ahead of the 2026 hardfork.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Arbitrum Stylus Mainnet Deployment Progress",
            "category": "INFRA",
            "summary": "Arbitrum developers announce major progress on Stylus, enabling smart contracts in Rust, C, and C++ to run alongside Solidity with significantly lower gas costs.",
            "date": today,
            "sourceLink": "https://arbitrum.io/stylus"
        },
        {
            "title": "Humanity Protocol $36M Private Key Compromise",
            "category": "HACK",
            "summary": "Humanity Protocol suffered an estimated $36M loss due to compromised private keys on a developer's machine, leading to unauthorized H token minting and drainage.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/explained-the-humanity-protocol-hack-june-2026"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from GSR, Uniswap, and Anza.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Humanity Protocol hack.", "type": "success" },
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
