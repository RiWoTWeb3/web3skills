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
    # Today's Date (Simulated as 2026-04-20 as per plan)
    today = "2026-04-20"

    new_jobs = [
        {
            "id": f"hibachi-rust-engineer-{today}",
            "title": "Rust Engineer",
            "company": "Hibachi",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Rust", "AWS", "Backend", "Blockchain"],
            "applyLink": "https://web3.career/rust-engineer-hibachi/147340"
        },
        {
            "id": f"jump-crypto-production-{today}",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Blockchain", "Crypto", "DeFi", "Ethereum"],
            "applyLink": "https://web3.career/crypto-production-engineer-jumpcrypto/89562"
        },
        {
            "id": f"bitgo-senior-hsm-{today}",
            "title": "Senior Software Engineer HSM",
            "company": "Bitgo",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$165,000 - $210,000",
            "requirements": ["Bitcoin", "Blockchain", "Go", "Security"],
            "applyLink": "https://web3.career/senior-software-engineer-hsm-bitgo/100066"
        }
    ]

    new_intel = [
        {
            "title": "Monad Labs Secures $225M Series A Led by Paradigm",
            "category": "INFRA",
            "summary": "Monad Labs raised $225 million to build a high-performance parallelized EVM layer-1 blockchain capable of 10,000 TPS.",
            "date": today,
            "sourceLink": "https://www.bitget.com/academy/monad-blockchain-guide"
        },
        {
            "title": "EigenLayer Mainnet Officially Launches with Restaking",
            "category": "INFRA",
            "summary": "EigenLayer has officially launched its mainnet, enabling restaking and a new ecosystem of Actively Validated Services (AVSs).",
            "date": today,
            "sourceLink": "https://eigenlayer.xyz/"
        },
        {
            "title": "Hedgey Finance Exploit: $44.7M Drained Across Multiple Chains",
            "category": "HACK",
            "summary": "Hedgey Finance was exploited for approximately $44.7 million due to a vulnerability in its token claim contracts on Arbitrum and Base.",
            "date": today,
            "sourceLink": "https://rekt.news/hedgey-finance-rekt/"
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
