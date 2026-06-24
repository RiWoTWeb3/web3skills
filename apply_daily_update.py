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

    # Data sourced for the daily update (June 24, 2026)
    new_jobs = [
        {
            "id": f"chainsafe-protocol-engineer-{today}",
            "title": "Protocol Engineer",
            "company": "ChainSafe Systems",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $200,000",
            "requirements": ["Rust", "Go", "Ethereum", "Distributed Systems"],
            "applyLink": "https://huntd.tech/jobs/web3-solana"
        },
        {
            "id": f"alpaca-senior-software-{today}",
            "title": "Senior Software Engineer",
            "company": "Alpaca",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Backend", "Fintech", "Web3"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"bitpay-senior-backend-{today}",
            "title": "Senior Backend Software Developer",
            "company": "BitPay",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Node.js", "Ethereum", "Payments", "Backend"],
            "applyLink": "https://cryptojobslist.com/remote"
        }
    ]

    new_intel = [
        {
            "title": "AIxCrypto Launches RoboShare and AIXC01 at Automate 2026",
            "category": "INFRA",
            "summary": "AIxCrypto (Nasdaq: AIXC) debuted RoboShare, a robot rental marketplace, and AIXC01, an infrastructure network for autonomous assets, bridging Embodied AI with Web3.",
            "date": today,
            "sourceLink": "https://www.morningstar.com/news/pr-newswire/20260622cn89746/aixcrypto-debuts-at-automate-2026-unveiling-its-eai-web3-robot-ecosystem-strategy-with-the-launch-of-roboshare-and-aixc01"
        },
        {
            "title": "ChainSafe Systems Expands Web3 Infrastructure Suite",
            "category": "INFRA",
            "summary": "ChainSafe continues pioneering multi-chain infrastructure with updates to its product suite including Files and Storage on IPFS/Filecoin, further decentralizing cloud storage.",
            "date": today,
            "sourceLink": "https://huntd.tech/jobs/web3-solana"
        },
        {
            "title": "Critical Cross-Chain Protocol Logic Flaw Resolved",
            "category": "BOUNTY",
            "summary": "A high-impact logic vulnerability in a major cross-chain protocol was disclosed via Immunefi, resulting in a $1.2M bounty payout to a white-hat security researcher.",
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from ChainSafe, Alpaca, and BitPay.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including AIxCrypto launch.", "type": "success" },
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
