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
            "id": f"aptos-labs-security-engineer-{today}",
            "title": "Information Security Engineer, Product",
            "company": "Aptos Labs",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $220,000",
            "requirements": ["Rust", "Security Auditing", "Vulnerability Research", "Move"],
            "applyLink": "https://www.ziprecruiter.com/c/Aptos/Job/Information-Security-Engineer,-Product/-in-Remote,US?jid=e3b9e87380f13f2e"
        },
        {
            "id": f"xion-senior-protocol-engineer-{today}",
            "title": "Senior Protocol Engineer",
            "company": "XION",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$120,000 - $180,000",
            "requirements": ["Go", "Cosmos SDK", "IBC", "Protocol Design"],
            "applyLink": "https://www.builtinnyc.com/company/xion-xionburntcom/jobs"
        },
        {
            "id": f"espresso-systems-security-lead-{today}",
            "title": "Security Engineering Lead",
            "company": "Espresso Systems",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Lead level",
            "salaryRange": "$160,000 - $230,000",
            "requirements": ["Rust", "Systems Engineering", "Security Architecture", "Distributed Systems"],
            "applyLink": "https://www.simplyhired.com/search?q=web3+rust&l=remote"
        }
    ]

    new_intel = [
        {
            "title": "Federal Reserve Monetary Policy Meeting Minutes Published",
            "category": "INFRA",
            "summary": "The Federal Reserve released minutes from its latest policy meeting, providing insights into future interest rate trajectories and economic outlook for 2026.",
            "date": today,
            "sourceLink": "https://www.binance.com/en/square/post/05-01-2026-key-web3-events-scheduled-for-may-2026-318335237967522"
        },
        {
            "title": "Haun Ventures Announces New $1 Billion Fund",
            "category": "INFRA",
            "summary": "Diogo Monica of Haun Ventures announced a new $1 billion fund in May 2026 to support high-potential early-stage Web3 startups and digital asset infrastructure.",
            "date": today,
            "sourceLink": "https://markets.businessinsider.com/news/stocks/the-most-promising-startups-in-web3-are-pitching-at-the-louvre-in-front-of-a-world-class-jury-1036174768"
        },
        {
            "title": "Gala Games Security Incident: $22M Exploit Case Study",
            "category": "HACK",
            "summary": "A deep-dive into the May 2024 Gala Games exploit where unauthorized access to a privileged account led to the minting of 5 billion GALA tokens.",
            "date": today,
            "sourceLink": "https://therecord.media/gala-games-cryptocurrency-theft"
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
