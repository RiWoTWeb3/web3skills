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
    today = "2026-04-14"

    new_jobs = [
        {
            "id": f"odos-evm-engineer-{today}",
            "title": "Smart Contracts Engineer EVM",
            "company": "Odos",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Solidity", "Rust", "EVM Mechanics", "Smart Contract Development"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        },
        {
            "id": f"odos-solana-engineer-{today}",
            "title": "Solana Smart Contracts Engineer",
            "company": "Odos",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Rust", "Solana Program Development", "Anchor Framework", "Solana Fundamentals"],
            "applyLink": "https://www.indeed.com/q-web3-rust-l-remote-jobs.html"
        },
        {
            "id": f"bitgo-defi-engineer-{today}",
            "title": "Software Engineer, DeFi Team",
            "company": "BitGo",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$130,000 - $185,000",
            "requirements": ["Go", "Distributed Systems", "DeFi Understanding", "Backend & API"],
            "applyLink": "https://huntd.tech/jobs/web3-solana"
        }
    ]

    new_intel = [
        {
            "title": "Deutsche Börse Group Invests $200 Million in Kraken Parent",
            "category": "INFRA",
            "summary": "Deutsche Börse has acquired a 1.5% stake in Kraken's parent company, Payward, for $200 million, deepening a strategic partnership for institutional crypto access.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/deutsche-borse-invest-200m-kraken-exchange"
        },
        {
            "title": "Hacken Q1 2026 Security Report: $482M Lost to Web3 Exploits",
            "category": "INFRA",
            "summary": "Hacken's latest report reveals that $482 million was lost across 44 incidents in Q1 2026, with phishing and social engineering driving the majority of losses.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/web3-hacks-cost-464-million-in-q1-hacken"
        },
        {
            "title": "Drift Protocol Social Engineering Exploit: $285M Drained",
            "category": "HACK",
            "summary": "A sophisticated six-month social engineering campaign by DPRK-linked actors resulted in a $285 million loss for Drift Protocol through a fake token scam.",
            "date": today,
            "sourceLink": "https://rekt.news/drift-protocol-rekt"
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
