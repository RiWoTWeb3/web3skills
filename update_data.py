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
            "id": f"paradex-sdet-{today}",
            "title": "Senior/Principal SDET",
            "company": "Paradex",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["TypeScript", "Distributed Systems", "Testing", "Web3"],
            "applyLink": "https://cryptojobslist.com/remote"
        }
    ]

    new_intel = [
        {
            "title": "Web3 Smart Layer Protocol Claw Intelligence Secures $3M Seed Funding",
            "category": "INFRA",
            "summary": "Claw Intelligence, a Web3 smart layer protocol, raised $3 million to accelerate the development of its multi-terminal AI interaction network for on-chain tasks.",
            "date": today,
            "sourceLink": "https://www.kucoin.com/news/flash/web3-smart-layer-protocol-claw-intelligence-secures-3m-seed-funding"
        },
        {
            "title": "Franklin Templeton Expands RWAs on Monad Network",
            "category": "INFRA",
            "summary": "Institutional demand for Monad increases as Franklin Templeton expands its Real-World Assets (RWA) offerings onto the high-performance parallelized EVM network.",
            "date": today,
            "sourceLink": "https://coinmarketcap.com/cmc-ai/monad/latest-updates/"
        },
        {
            "title": "Drift Protocol Social Engineering Exploit: $285M Drained",
            "category": "HACK",
            "summary": "A sophisticated social engineering campaign resulted in a $285 million loss for Drift Protocol, highlighting human vulnerabilities in DeFi platforms.",
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
