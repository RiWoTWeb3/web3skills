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
            "id": f"kaia-protocol-engineer-{today}",
            "title": "Senior Protocol Engineer",
            "company": "Kaia Labs Limited",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $180,000",
            "requirements": ["Blockchain Protocols", "Distributed Systems", "Go", "Web3"],
            "applyLink": "https://cryptojobslist.com/jobs/senior-protocol-engineer-at-kaia-labs-limited"
        },
        {
            "id": f"stellar-backend-engineer-{today}",
            "title": "Backend Engineer, Integrations & APIs",
            "company": "Stellar Development Foundation",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$140,000 - $210,000",
            "requirements": ["Go", "API Design", "Distributed Systems", "Stellar Network"],
            "applyLink": "https://cryptojobslist.com/jobs/backend-engineer-integrations-apis-at-stellar-development-foundation"
        },
        {
            "id": f"hyrotrader-trading-systems-{today}",
            "title": "Senior Low-Latency Trading Systems Engineer",
            "company": "HyroTrader",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$60,000 - $120,000",
            "requirements": ["Low-Latency", "Trading Systems", "Rust", "C++"],
            "applyLink": "https://cryptojobslist.com/jobs/senior-low-latency-trading-systems-at-hyrotrader-1"
        }
    ]

    new_intel = [
        {
            "title": "Re7 Labs Expands Onchain Operator Strategy",
            "category": "INFRA",
            "summary": "Re7 Labs is scaling its onchain operator advising and vault curation capabilities, seeking DeFi associates to manage complex cross-chain transactions and risk.",
            "date": today,
            "sourceLink": "https://cryptojobslist.com/jobs/defi-associate-at-re7-labs"
        },
        {
            "title": "The 2026 Web3 Workforce Report: The Agent Manager Era",
            "category": "INFRA",
            "summary": "New research highlights a shift in Web3 hiring toward roles focused on managing AI agents and autonomous on-chain operations.",
            "date": today,
            "sourceLink": "https://cryptojobslist.com/research/web3-workforce-report"
        },
        {
            "title": "New Market Trading Exploit: $3.98M Drained",
            "category": "HACK",
            "summary": "An access control failure in a third-party Safe module allowed an attacker to drain 88 Gnosis Safes across multiple chains.",
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
