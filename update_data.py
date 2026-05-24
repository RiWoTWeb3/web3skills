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
            "id": f"raretalent-senior-protocol-engineer-{today}",
            "title": "Senior Protocol Engineer",
            "company": "RareTalent",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$400,000+",
            "requirements": ["Rust", "MEV", "Consensus", "EVM"],
            "applyLink": "https://raretalent.xyz/jobs"
        },
        {
            "id": f"raretalent-solana-engineer-{today}",
            "title": "Solana Smart Contract Engineer",
            "company": "RareTalent",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$200,000+",
            "requirements": ["Rust", "Solana", "Anchor", "DeFi"],
            "applyLink": "https://raretalent.xyz/jobs"
        },
        {
            "id": f"kraken-qa-automation-{today}",
            "title": "QA Automation Engineer",
            "company": "Kraken",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "Competitive",
            "requirements": ["Python", "Rust", "CI/CD", "Testing"],
            "applyLink": "https://sailonchain.com/jobs/skill/rust"
        }
    ]

    new_intel = [
        {
            "title": "Echo Protocol Regains Control of Admin Keys After $76.7M Unauthorized eBTC Minting",
            "category": "INFRA",
            "summary": "Echo Protocol has regained control of its admin keys and burned remaining unauthorized eBTC after a compromise on the Monad network.",
            "date": today,
            "sourceLink": "https://www.ccn.com/news/crypto/echo-protocol-admin-key-exploit-bridge-security/"
        },
        {
            "title": "Curvance Protocol Pauses eBTC Markets Following Monad Security Incident",
            "category": "INFRA",
            "summary": "Curvance has paused affected Echo eBTC markets as a precaution following the detection of abnormal minting activity on Monad.",
            "date": today,
            "sourceLink": "https://www.ccn.com/news/crypto/echo-protocol-admin-key-exploit-bridge-security/"
        },
        {
            "title": "Echo Protocol Admin Key Compromise Analysis: $76.7M Unauthorized Mint on Monad",
            "category": "HACK",
            "summary": "A compromised admin key on Monad enabled an attacker to mint millions in unauthorized eBTC, highlighting critical bridge security risks.",
            "date": today,
            "sourceLink": "https://www.ccn.com/news/crypto/echo-protocol-admin-key-exploit-bridge-security/"
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
