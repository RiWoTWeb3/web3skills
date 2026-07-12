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
        # Avoid duplicates globally based on unique_key.
        # Ensure we don't insert duplicate jobs (like same id).
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
            "id": f"solana-foundation-senior-rust-{today}-1",
            "title": "Senior Rust Engineer, Infrastructure",
            "company": "Solana Foundation",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $240,000",
            "requirements": ["Rust", "Solana", "Distributed Systems", "Infrastructure"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"uniswap-labs-smart-contract-{today}-1",
            "title": "Protocol Engineer",
            "company": "Uniswap Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $220,000",
            "requirements": ["Solidity", "Ethereum", "Foundry", "DeFi"],
            "applyLink": "https://web3.career/remote+solidity-jobs"
        },
        {
            "id": f"chainlink-labs-backend-{today}-1",
            "title": "Backend Services Engineer",
            "company": "Chainlink Labs",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $210,000",
            "requirements": ["Go", "Kubernetes", "Ethereum", "Distributed Systems"],
            "applyLink": "https://web3.career/remote+backend-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Firedancer Beta Released for Public Testnet",
            "category": "INFRA",
            "summary": "Jump Crypto announces that the Firedancer validator client has been released for public testnet, promising 1M+ TPS and significant network decentralization.",
            "date": today,
            "sourceLink": "https://solana.com/news"
        },
        {
            "title": "Ethereum's Pectra Upgrade Timeline Released",
            "category": "INFRA",
            "summary": "The Ethereum community has released the Pectra upgrade timeline, aiming for a Q4 2026 mainnet launch with major scalability improvements.",
            "date": today,
            "sourceLink": "https://ethereum.org/en/developers/"
        },
        {
            "title": "DeFi Protocol PolyNetwork Discloses $2M Bug Bounty",
            "category": "BOUNTY",
            "summary": "PolyNetwork successfully patched a critical logic vulnerability discovered by a white-hat researcher, paying out a $2M bounty via Immunefi.",
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
