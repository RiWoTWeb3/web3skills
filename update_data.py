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
            "id": f"wormhole-senior-product-{today}",
            "title": "Senior Product Engineer",
            "company": "Wormhole Labs",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$87,000 - $115,000",
            "requirements": ["Crypto", "Solana", "TypeScript", "Rust"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"helius-staff-backend-{today}",
            "title": "Staff Backend Engineer",
            "company": "Helius",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$84,000 - $150,000",
            "requirements": ["Node", "Rust", "Backend Engineer", "Distributed Systems"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"lightcone-staff-solana-{today}",
            "title": "Staff Engineer (Solana)",
            "company": "lightcone.trade",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$225,000 - $250,000",
            "requirements": ["Rust", "Solana", "Smart Contract Development", "Performance"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Consensys and European Bank Partner for MiCA-Compliant Stablecoin on MetaMask",
            "category": "INFRA",
            "summary": "A major partnership brings the MiCA-compliant USD CoinVertible to MetaMask, bridging traditional finance and Web3 infrastructure.",
            "date": today,
            "sourceLink": "https://www.jdsupra.com/legalnews/weekly-blockchain-blog-april-2026-3-2819103/"
        },
        {
            "title": "Institutional 'Earn' Native On-Chain Lending Launched with Morpho and Aave",
            "category": "INFRA",
            "summary": "A new 'Earn' feature allows institutions to supply stablecoin balances to Morpho and Aave with institutional-grade security.",
            "date": today,
            "sourceLink": "https://www.jdsupra.com/legalnews/weekly-blockchain-blog-april-2026-3-2819103/"
        },
        {
            "title": "$292 Million DeFi Hack on rsETH Bridge; Lazarus Group Suspected",
            "category": "HACK",
            "summary": "Kelp DAO's rsETH bridge was hit for $292M via a forged message exploit on LayerZero; Lazarus Group is the suspected culprit.",
            "date": today,
            "sourceLink": "https://www.theblock.co/post/398239/kelp-dao-exploiter-begins-moving-stolen-funds-across-chains-after-arbitrum-eth-freeze"
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
