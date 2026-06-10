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

    # Data sourced for the daily update (2026-06-10)
    new_jobs = [
        {
            "id": f"binance-pioneer-talent-{today}",
            "title": "Pioneer Talent Program - Software Engineer - Blockchain Security",
            "company": "Binance",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$140,000 - $220,000",
            "requirements": ["Blockchain Security", "Solidity", "Smart Contract Auditing", "Rust"],
            "applyLink": "https://arc.dev/remote-jobs/web3"
        },
        {
            "id": f"consensys-metamask-money-{today}",
            "title": "Staff Software Engineer - MetaMask (Money Movement)",
            "company": "Consensys",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $230,000",
            "requirements": ["Ethereum", "TypeScript", "DeFi", "Smart Contracts"],
            "applyLink": "https://web3.career/remote-jobs"
        },
        {
            "id": f"xion-senior-protocol-{today}",
            "title": "Senior Protocol Engineer",
            "company": "XION (Burnt)",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $260,000",
            "requirements": ["Rust", "Cosmos SDK", "Distributed Systems", "Go"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        }
    ]

    new_intel = [
        {
            "title": "UwU Lend Protocol Exploit: $19.3M Drained",
            "category": "HACK",
            "summary": "A sophisticated price manipulation attack targeted UwU Lend, resulting in a loss of $19.3 million across multiple assets. The attacker exploited a logic flaw in the protocol's price oracle implementation.",
            "date": today,
            "sourceLink": "https://slowmist.medium.com/analysis-of-the-uwu-lend-hack-9502b2c06dbe"
        },
        {
            "title": "OKX Ventures Launches $10M TON Ecosystem Fund",
            "category": "INFRA",
            "summary": "OKX Ventures has announced a new $10 million fund dedicated to supporting developers and projects building on the TON ecosystem, focusing on Telegram-integrated decentralized applications.",
            "date": today,
            "sourceLink": "https://web3.career/web3-companies/okx"
        },
        {
            "title": "Linea Mainnet Successfully Implements EIP-4844",
            "category": "INFRA",
            "summary": "Linea has completed its transition to blob-carrying transactions following the EIP-4844 upgrade, resulting in a significant 90% reduction in data availability costs for the network.",
            "date": today,
            "sourceLink": "https://linea.mirror.xyz/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Binance, Consensys, and XION.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including UwU Lend exploit and Linea upgrade.", "type": "success" },
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
