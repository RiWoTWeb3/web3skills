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
    # Today's Date - Using 2026-05-28 as per the environment date found earlier
    today = "2026-05-28"

    new_jobs = [
        {
            "id": f"cow-dao-senior-backend-rust-{today}",
            "title": "Senior Backend Engineer Rust",
            "company": "CoW DAO",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solidity", "Docker", "Kubernetes"],
            "applyLink": "https://web3.career/senior-backend-engineer-rust-cow-dao/149797"
        },
        {
            "id": f"zscaler-principal-sre-{today}",
            "title": "Principal Site Reliability Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Lead level",
            "salaryRange": "$161,000 - $230,000",
            "requirements": ["Go", "AWS", "Cloud Architecture", "Systems Engineering"],
            "applyLink": "https://web3.career/principal-site-reliability-engineer-zscaler/99847"
        },
        {
            "id": f"jumpcrypto-production-engineer-{today}",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid/Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Ethereum", "DeFi", "Blockchain", "Rust"],
            "applyLink": "https://web3.career/crypto-production-engineer-jumpcrypto/89562"
        }
    ]

    new_intel = [
        {
            "title": "Jupiter Exchange Launches Offerbook P2P Lending Platform in Public Beta",
            "category": "INFRA",
            "summary": "Jupiter launches Offerbook on Solana, allowing users to borrow against tokens and NFTs with fixed terms and no price-based liquidation risk.",
            "date": today,
            "sourceLink": "https://cryptobriefing.com/jupiter-offerbook-solana-lending-beta/"
        },
        {
            "title": "Circle's Arc Enables AI Agents Through SumPlus Partnership",
            "category": "INFRA",
            "summary": "Circle Arc integrates AI agents from SumPlus to power automated trading and security monitoring on its stablecoin-native layer-1 network.",
            "date": today,
            "sourceLink": "https://www.binance.com/en/square/post/327780687219697"
        },
        {
            "title": "THORChain Rekt III: $10.7M Drained via TSS Exploit",
            "category": "HACK",
            "summary": "A malicious node exploited THORChain's GG20 TSS signing stack to reconstruct private keys and drain vaults across multiple chains.",
            "date": today,
            "sourceLink": "https://rekt.news/thorchain-rekt3"
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
