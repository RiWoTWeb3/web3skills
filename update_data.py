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
            "id": f"odos-solana-engineer-{today}",
            "title": "Solana Smart Contracts Engineer",
            "company": "Odos",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solana", "Anchor Framework", "Solana Fundamentals"],
            "applyLink": "https://www.indeed.com/q-web3-l-remote-jobs.html"
        },
        {
            "id": f"1010-trading-rust-evm-{today}",
            "title": "Rust Developer — EVM Systems",
            "company": "1010 trading",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "Competitive",
            "requirements": ["Rust", "EVM", "Ethereum", "Distributed Systems"],
            "applyLink": "https://web3.career/evm+remote-jobs"
        },
        {
            "id": f"hibachi-rust-engineer-{today}",
            "title": "Rust Engineer",
            "company": "Hibachi",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "Competitive",
            "requirements": ["Rust", "Distributed Systems", "Backend", "Web3"],
            "applyLink": "https://web3.career/evm+remote-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Four Pillars Secures $20M Series A Led by Pantera Capital",
            "category": "INFRA",
            "summary": "Blockchain research firm Four Pillars raised $20M to expand into a comprehensive Web3 solutions partner, bridging the gap between Asia-Global and TradFi-Web3 markets.",
            "date": today,
            "sourceLink": "https://www.morningstar.com/news/pr-newswire/20260427cn44076/four-pillars-secures-series-a-led-by-pantera-capital-to-expand-as-a-web3-solution-company"
        },
        {
            "title": "Alphea Unveils AI-Native Layer 1 at Hong Kong Web3 Festival",
            "category": "INFRA",
            "summary": "Alphea debuted its decentralized execution environment purpose-built for autonomous AI agents, handling execution, memory, and verifiable compute as native primitives.",
            "date": today,
            "sourceLink": "https://markets.businessinsider.com/news/stocks/alphea-unveils-ai-native-layer-1-execution-network-at-hong-kong-web3-festival-2026-1036078741"
        },
        {
            "title": "Kelp DAO Exploit Impact: LayerZero Commits 10,000 ETH",
            "category": "HACK",
            "summary": "Following the Kelp DAO exploit, LayerZero has committed 10,000 ETH to the DeFi United recovery effort, as Sector TVL dropped significantly.",
            "date": today,
            "sourceLink": "https://www.theblock.co/post/399275/layerzero-commits-10000-eth-to-defi-united-effort"
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
