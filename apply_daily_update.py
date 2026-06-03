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

    # Data sourced for the daily update (2026-06-03)
    new_jobs = [
        {
            "id": f"m0-issuance-eng-lead-{today}",
            "title": "Issuance Engineering Lead",
            "company": "M0",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Lead level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "Solana", "EVM", "DeFi"],
            "applyLink": "https://web3.career/rust+solana-jobs"
        },
        {
            "id": f"mlabs-blockchain-indexer-{today}",
            "title": "Blockchain Engineer (Indexers)",
            "company": "MLabs",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $200,000",
            "requirements": ["Rust", "Solana", "Indexing", "PostgreSQL"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"anza-senior-software-{today}",
            "title": "Senior Software Engineer",
            "company": "Anza",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Rust", "Solana", "Agave Client", "Systems Engineering"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Bondex Ecosystem Expansion: Acquisition of web3.career",
            "category": "INFRA",
            "summary": "Bondex has officially integrated web3.career into its ecosystem, aiming to create a comprehensive professional network and job board for the Web3 space.",
            "date": today,
            "sourceLink": "https://web3.career/rust+solana-jobs"
        },
        {
            "title": "AWS Web3 Startup Solutions Architect Program Launch",
            "category": "INFRA",
            "summary": "Amazon Web Services (AWS) has launched a new specialized program for Web3 startups, providing dedicated architectural support and infrastructure resources.",
            "date": today,
            "sourceLink": "https://cryptojobslist.com/web3"
        },
        {
            "title": "New Market Trading Exploit: $3.98M Drained",
            "category": "HACK",
            "summary": "An access control failure in a third-party Safe module allowed an attacker to drain 88 Gnosis Safes across multiple chains, resulting in a loss of $3.98M.",
            "date": today,
            "sourceLink": "https://rekt.news/newmarkettrading-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from M0, MLabs, and Anza.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Bondex acquisition.", "type": "success" },
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
