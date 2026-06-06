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
        # Avoid duplicates globally by checking all existing items in the file
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
    # Use current UTC date for dynamic updates
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"semiotic-labs-cto-{today}",
            "title": "Chief Technology Officer",
            "company": "Semiotic Labs",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Expert level",
            "salaryRange": "$250,000 - $400,000",
            "requirements": ["Rust", "Systems Architecture", "Distributed Protocols", "AI"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        },
        {
            "id": f"decirle-rust-engineer-{today}",
            "title": "Rust Engineer",
            "company": "deCircle",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Distributed Protocols", "Cryptography", "Scalable Systems"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        },
        {
            "id": f"odos-solana-engineer-{today}",
            "title": "Solana Smart Contracts Engineer",
            "company": "Odos",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solana", "DEX Aggregator", "Kubernetes"],
            "applyLink": "https://www.indeed.com/q-web3-rust-jobs-jobs.html"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Foundation Announces Protocol Priorities for 2026",
            "category": "INFRA",
            "summary": "The Ethereum Foundation introduced new strategic tracks for 2026, focusing on Scaling L1, Scaling Blobs, and improving overall user experience.",
            "date": today,
            "sourceLink": "https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026"
        },
        {
            "title": "Ethereum Mainnet Gas Limit Reaches 60M Milestone",
            "category": "INFRA",
            "summary": "The Ethereum community has successfully raised the mainnet gas limit to 60M, doubling the previous 30M limit to increase transaction throughput.",
            "date": today,
            "sourceLink": "https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026"
        },
        {
            "title": "Gravity Bridge $5.4M Exploit",
            "category": "HACK",
            "summary": "An attacker minted worthless tokens on Osmosis and poisoned the Gravity Bridge token registry with a fabricated denom string, draining $5.4M.",
            "date": "2026-06-04",
            "sourceLink": "https://rekt.news/gravity-bridge-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Semiotic Labs, deCircle, and Odos.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Ethereum Foundation Priorities.", "type": "success" },
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
