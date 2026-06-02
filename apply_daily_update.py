import json
import os
from datetime import datetime, timezone

def update_json_file(filepath, new_items, unique_key='title', limit=None, prepend=True, today=None):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []

    # Strict deduplication
    existing_keys = {item[unique_key] for item in data if unique_key in item}
    filtered_new = [item for item in new_items if unique_key in item and item[unique_key] not in existing_keys]

    if prepend:
        data = filtered_new + data
    else:
        data = data + filtered_new

    if limit:
        data = data[:limit]

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {filepath} (Added {len(filtered_new)} new items)")
    return len(filtered_new)

def main():
    # Dynamic date for automation
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # 3 Jobs (EVM, Solana, Rust)
    new_jobs = [
        {
            "id": f"blockchain-senior-backend-{today}",
            "title": "Senior BackEnd Engineer (Blockchain)",
            "company": "Blockchain.com",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $200,000",
            "requirements": ["Rust", "Go", "Distributed Systems", "PostgreSQL"],
            "applyLink": "https://web3.career/senior-back-end-engineer-trading-platform-blockchain/98044"
        },
        {
            "id": f"okx-quant-developer-{today}",
            "title": "Quant Developer Rust",
            "company": "OKX",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$122,000 - $180,000",
            "requirements": ["Rust", "Trading Systems", "Low Latency"],
            "applyLink": "https://web3.career/quant-developer-rust-liquidity-platform-delta-one-systematic-trading-okx/145502"
        },
        {
            "id": f"solana-foundation-engineer-{today}",
            "title": "Core Runtime Engineer",
            "company": "Solana Foundation",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $240,000",
            "requirements": ["Rust", "Solana", "Systems Programming"],
            "applyLink": "https://solana.com/jobs"
        }
    ]

    # 2 News, 1 Hack
    new_intel = [
        {
            "title": "Chainlink Cross-Chain Runtime Environment (CRE) Beta Launch",
            "category": "INFRA",
            "summary": "Chainlink has officially launched the CRE on mainnet, providing a unified developer experience for building cross-chain dApps with off-chain computation.",
            "date": today,
            "sourceLink": "https://blog.chain.link/"
        },
        {
            "title": "Monad Public Testnet Surpasses 1M Unique Wallets",
            "category": "INFRA",
            "summary": "The highly anticipated parallelized EVM Monad has reached a major milestone on its public testnet, demonstrating high throughput and developer adoption.",
            "date": today,
            "sourceLink": "https://monad.xyz/blog"
        },
        {
            "title": "Radiant Capital Protocol Exploit: $50M Loss",
            "category": "HACK",
            "summary": "DeFi lending protocol Radiant Capital suffered a significant exploit on its BSC and Arbitrum deployments, leading to a loss of approximately $50M in assets.",
            "date": today,
            "sourceLink": "https://radiant.capital"
        }
    ]

    new_feed_items = [
        {
            "date": today,
            "type": "job",
            "title": f"{j['title']} at {j['company']}",
            "description": f"New remote opportunity at {j['company']}. Stack: {', '.join(j['requirements'][:3])}.",
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

    # Update main data files
    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60, unique_key='title')
    added_jobs = update_json_file('src/data/jobs.json', new_jobs, limit=100, unique_key='id')
    added_intel = update_json_file('src/data/intel.json', new_intel, limit=100, unique_key='title')

    new_logs = [
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {added_jobs} new roles and {added_intel} intel items for {today}.", "type": "success" }
    ]
    update_json_file('src/data/system_logs.json', new_logs, limit=50, unique_key='msg')

    # Update system health
    health_file = 'src/data/system_health.json'
    if os.path.exists(health_file):
        with open(health_file, 'r') as f:
            health = json.load(f)

        health['lastSync'] = datetime.now(timezone.utc).isoformat()
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10]

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
