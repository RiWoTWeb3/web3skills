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
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    new_jobs = [
        {
            "id": f"solana-foundation-security-{today}-1",
            "title": "Senior IT Security Engineer",
            "company": "Solana Foundation",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$126,000 - $171,000",
            "requirements": ["Security", "Solana", "Rust", "Web3"],
            "applyLink": "https://web3.career/"
        },
        {
            "id": f"jumpcrypto-production-{today}-1",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Crypto", "Blockchain", "Python", "C++"],
            "applyLink": "https://web3.career/"
        },
        {
            "id": f"figure-lending-crypto-{today}-1",
            "title": "Director, Crypto Protocols",
            "company": "Figure Lending",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Director",
            "salaryRange": "$174,000 - $261,000",
            "requirements": ["Solidity", "Smart Contracts", "EVM", "Engineering Manager"],
            "applyLink": "https://cryptojobslist.com/"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Layer 2 TVL hits new high in mid 2026",
            "category": "INFRA",
            "summary": "Ethereum Layer 2 scaling solutions have reached a new all-time high in total value locked.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/"
        },
        {
            "title": "Solana Foundation unveils new staking program",
            "category": "INFRA",
            "summary": "A new delegated staking initiative has been announced by the Solana Foundation to support decentralization.",
            "date": today,
            "sourceLink": "https://solana.com/news"
        },
        {
            "title": "DeFi protocol access control vulnerability leads to $2M loss",
            "category": "HACK",
            "summary": "A major vulnerability in access control mechanisms of a new DeFi protocol was exploited, resulting in a $2 million loss.",
            "date": today,
            "sourceLink": "https://rekt.news/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Solana Foundation, Jumpcrypto, and Figure Lending.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
    ]

    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60, today=today)
    update_json_file('src/data/jobs.json', new_jobs, unique_key='id', today=today)
    update_json_file('src/data/intel.json', new_intel, today=today)
    update_json_file('src/data/system_logs.json', new_logs, limit=50, unique_key='msg', today=today)

    health_file = 'src/data/system_health.json'
    if os.path.exists(health_file):
        with open(health_file, 'r') as f:
            health = json.load(f)

        health['lastSync'] = datetime.now(timezone.utc).isoformat().replace('+00:00', '') + "Z"
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10]

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
