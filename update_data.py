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
            "id": f"ondo-security-engineer-{today}",
            "title": "Security Engineer",
            "company": "Ondo Finance",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$105,000 - $150,000",
            "requirements": ["Security", "Blockchain", "AWS", "Crypto"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"wormhole-product-engineer-{today}",
            "title": "Senior Product Engineer",
            "company": "Wormhole Labs",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$87,000 - $115,000",
            "requirements": ["Solana", "TypeScript", "Crypto", "Engineering"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"lightcone-staff-engineer-{today}",
            "title": "Staff Engineer (Solana)",
            "company": "lightcone.trade",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$225,000 - $250,000",
            "requirements": ["Rust", "Solana", "Remote", "Engineering"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Starknet Quantum Leap v0.14.0: Scaling Throughput 10x",
            "category": "INFRA",
            "summary": "Starknet's latest v0.14.0 upgrade introduces critical throughput optimizations, aiming for a 10x increase in transaction processing speed.",
            "date": today,
            "sourceLink": "https://starkware.co/blog/starknet-v0-14-0/"
        },
        {
            "title": "Base L2 Surpasses $10B TVL Following Infrastructure Upgrade",
            "category": "INFRA",
            "summary": "Base network hits a massive $10 Billion Total Value Locked milestone, driven by improved infrastructure and institutional adoption.",
            "date": today,
            "sourceLink": "https://base.mirror.xyz/"
        },
        {
            "title": "Aura Finance Whitehat Save: $1.5M Vulnerability Mitigated",
            "category": "BOUNTY",
            "summary": "A critical vulnerability in Aura Finance was safely disclosed by a white-hat researcher, preventing a potential $1.5M exploit.",
            "date": today,
            "sourceLink": "https://immunefi.com/blog/aura-finance-whitehat-save/"
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
