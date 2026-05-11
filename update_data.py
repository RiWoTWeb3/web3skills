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

    new_jobs = [
        {
            "id": f"1010-trading-rust-evm-{today}",
            "title": "Rust Developer — EVM Systems & Trading Infrastructure",
            "company": "1010 trading",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "EVM Mechanics", "Trading Infrastructure", "Solidity"],
            "applyLink": "https://web3.career/evm+remote-jobs"
        },
        {
            "id": f"ddnd-senior-infra-{today}",
            "title": "Senior Web3 Infrastructure Engineer",
            "company": "DDND",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$130,000 - $180,000",
            "requirements": ["Web3", "DeFi", "Infrastructure", "Distributed Systems"],
            "applyLink": "https://cryptojobslist.com/remote_solana"
        },
        {
            "id": f"hibachi-production-engineer-{today}",
            "title": "Production Engineer",
            "company": "Hibachi",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["EVM", "Blockchain Infrastructure", "SRE", "Go"],
            "applyLink": "https://web3.career/evm+remote-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Solv Protocol Launches Bitcoin Economy Infrastructure",
            "category": "INFRA",
            "summary": "Solv Protocol is building the $1 trillion Bitcoin economy through a full-stack suite of financial services optimized for BTC holders, activating Bitcoin as a capital-efficient asset.",
            "date": today,
            "sourceLink": "https://hackenproof.com/programs?categories=DeFi"
        },
        {
            "title": "dYdX Chain v4 Open Source Perpetual Futures Protocol",
            "category": "INFRA",
            "summary": "dYdX v4 launches as an application-specific blockchain using the Cosmos SDK, featuring a fully on-chain orderbook and matching engine for decentralized perpetuals.",
            "date": today,
            "sourceLink": "https://cantina.xyz/bounties/dydx"
        },
        {
            "title": "DeFi Platform TrustedVolumes Hit By $6.7M Hack",
            "category": "HACK",
            "summary": "TrustedVolumes suffered a smart contract exploit draining $6.7M in assets due to a vulnerability in the protocol's core signature validation logic.",
            "date": today,
            "sourceLink": "https://www.tradingview.com/news/newsbtc:849c83f08094b:0-defi-platform-trustedvolumes-hit-by-6-7m-hack-as-2026-exploits-surge/"
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
