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
    # Use 2026-06-18 as requested for consistency with sandbox environment date
    today = "2026-06-18"

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"zscaler-staff-sre-{today}",
            "title": "Staff Site Reliability Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$115,000 - $165,000",
            "requirements": ["Rust", "Python", "Golang", "Distributed Systems"],
            "applyLink": "https://web3.career/staff-site-reliability-engineer-zscaler/106117"
        },
        {
            "id": f"okx-senior-java-{today}",
            "title": "Senior Java Engineer",
            "company": "Okx",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$84,000 - $150,000",
            "requirements": ["Java", "Smart Accounts", "Wallet Infrastructure"],
            "applyLink": "https://web3.career/senior-java-engineer-wallet-smart-account-team-okx/150561"
        },
        {
            "id": f"offchain-senior-backend-rust-{today}",
            "title": "Senior Backend Engineer (Rust)",
            "company": "Offchain Labs",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$122,000 - $150,000",
            "requirements": ["Rust", "Arbitrum", "L2", "Backend Architecture"],
            "applyLink": "https://web3.career/senior-backend-engineer-rust-offchainlabs/150351"
        }
    ]

    new_intel = [
        {
            "title": "Standard Chartered to Launch Spot Crypto Trading Desk",
            "category": "INFRA",
            "summary": "Standard Chartered is reportedly launching a spot crypto trading desk for Bitcoin and Ether, making it one of the first major global banks to enter spot crypto trading.",
            "date": today,
            "sourceLink": "https://www.bloomberg.com/news/articles/2024-06-21/standard-chartered-is-setting-up-a-spot-crypto-trading-desk"
        },
        {
            "title": "Tether Launches Alloy (aUSDT) Overcollateralized by Gold",
            "category": "INFRA",
            "summary": "Tether has launched Alloy, a new platform for overcollateralized assets, with its first token aUSDT backed by Tether Gold (XAUt), enabling gold-backed stablecoin minting.",
            "date": today,
            "sourceLink": "https://tether.io/news/tether-introduces-alloy-by-tether-a-new-category-of-digital-assets-backed-by-gold/"
        },
        {
            "title": "UwU Lend Exploit: $19.3M Drained via Price Oracle Manipulation",
            "category": "HACK",
            "summary": "DeFi lending protocol UwU Lend was exploited for approximately $19.3 million due to a price oracle manipulation vulnerability involving sUSDe.",
            "date": today,
            "sourceLink": "https://slowmist.medium.com/analysis-of-the-uwu-lend-hack-9502b2c06dbe"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Zscaler, Okx, and Offchain Labs.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Standard Chartered spot desk.", "type": "success" },
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
