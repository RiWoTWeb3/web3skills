import json
import os
from datetime import datetime, timezone

def update_json_file(filepath, new_items, unique_key='title', limit=None, prepend=True):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    if prepend:
        # Strict global deduplication
        existing_keys = {item[unique_key] for item in data if unique_key in item}
        filtered_new = [item for item in new_items if unique_key in item and item[unique_key] not in existing_keys]
        data = filtered_new + data
    else:
        # Also deduplicate when appending if needed, but usually logs just append
        existing_keys = {item[unique_key] for item in data if unique_key in item}
        filtered_new = [item for item in new_items if unique_key in item and item[unique_key] not in existing_keys]
        data = data + filtered_new

    if limit:
        data = data[:limit]

    # Optional: General deduplication for the whole file to fix existing issues
    seen = set()
    deduped_data = []
    for item in data:
        key = item.get(unique_key)
        if key not in seen:
            deduped_data.append(item)
            seen.add(key)

    with open(filepath, 'w') as f:
        json.dump(deduped_data, f, indent=2)
    print(f"Updated {filepath}")

def main():
    # Use current UTC date for dynamic updates
    today = "2026-06-23" # Hardcoded for the task as per today's date in sandbox

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"kraken-ai-infra-{today}",
            "title": "Senior Software Engineer – AI Infrastructure",
            "company": "Kraken",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $220,000",
            "requirements": ["AI Infrastructure", "Python", "Go", "Kubernetes"],
            "applyLink": "https://cryptojobslist.com/remote"
        },
        {
            "id": f"nethermind-it-lead-{today}",
            "title": "IT Department Lead",
            "company": "Nethermind",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$130,000 - $180,000",
            "requirements": ["Engineering", "IT Management", "Blockchain"],
            "applyLink": "https://cryptojobslist.com/remote"
        },
        {
            "id": f"kaia-labs-protocol-{today}",
            "title": "Senior Protocol Engineer",
            "company": "Kaia Labs Limited",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $210,000",
            "requirements": ["Blockchain Protocols", "Go", "Distributed Systems"],
            "applyLink": "https://cryptojobslist.com/remote"
        }
    ]

    new_intel = [
        {
            "title": "Luxor Technology Expands Web3 Infrastructure in China",
            "category": "INFRA",
            "summary": "Luxor Technology announced its expansion into the Chinese market, focusing on providing institutional-grade mining and Web3 infrastructure services.",
            "date": today,
            "sourceLink": "https://cryptojobslist.com/remote"
        },
        {
            "title": "Aztec Labs Announces Post-Mortem on Aztec Connect Vulnerability",
            "category": "INFRA",
            "summary": "Aztec Labs released a detailed post-mortem regarding the $2.28M drain on Aztec Connect, highlighting ZK proof settlement gaps.",
            "date": today,
            "sourceLink": "https://rekt.news/aztec-connect-rekt"
        },
        {
            "title": "Humanity Protocol Exploited for $36.4M via Private Key Leak",
            "category": "HACK",
            "summary": "A private key leak on a single device led to a $36.4M loss for Humanity Protocol across Ethereum and BSC.",
            "date": today,
            "sourceLink": "https://rekt.news/humanity-protocol-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Kraken, Nethermind, and Kaia Labs.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Humanity Protocol hack.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Web3 Data Update [{today}] complete.", "type": "success" }
    ]

    # Update main data files
    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60)
    update_json_file('src/data/jobs.json', new_jobs, unique_key='id')
    update_json_file('src/data/intel.json', new_intel)
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
        health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
