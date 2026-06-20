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
    # today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    today = "2026-06-20"

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"consensys-staff-sw-engineer-{today}",
            "title": "Staff Software Engineer: Consumer (Money)",
            "company": "Consensys",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Solidity", "TypeScript", "DeFi", "Smart Contract Development"],
            "applyLink": "https://arc.dev/remote-jobs/web3"
        },
        {
            "id": f"alchemy-solana-engineer-{today}",
            "title": "Remote Web3 Solana Engineer",
            "company": "Alchemy",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$180,000 - $240,000",
            "requirements": ["Rust", "Solana", "Anchor", "Substream"],
            "applyLink": "https://cryptojobslist.com/remote_solana"
        },
        {
            "id": f"zscaler-sr-prod-engineer-{today}",
            "title": "Web3 Sr. Production Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$119,000 - $170,000",
            "requirements": ["Automation", "Security", "Cloud Infrastructure", "Kubernetes"],
            "applyLink": "https://web3.career/sr-production-engineer-zscaler/150565"
        }
    ]

    new_intel = [
        {
            "title": "Humanity Protocol Identity Tech: Palm Scans and ZKPs",
            "category": "INFRA",
            "summary": "Humanity Protocol utilizes palm scans and Zero-Knowledge Proofs (ZKPs) to offer on-chain 'proof of humanity', ensuring identity privacy while maintaining Sybil resistance.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/explained-the-humanity-protocol-hack-june-2026"
        },
        {
            "title": "Ethereum Pectra Upgrade One-Year Impact Report",
            "category": "INFRA",
            "summary": "One year after the Pectra upgrade, Ethereum reports significant progress in validator consolidation and Layer 2 scaling, with expanded blob usage and broader smart account adoption.",
            "date": today,
            "sourceLink": "https://everstake.one/resources/blog/pectra-anniversary-how-ethereum-changed-2026"
        },
        {
            "title": "Humanity Protocol Exploit: $36M Loss Reported",
            "category": "HACK",
            "summary": "Estimated $36M loss in June 2026 due to compromised private keys resulting from a malware infection on a developer's device, highlighting risks in dev-environment security.",
            "date": today,
            "sourceLink": "https://www.halborn.com/blog/post/explained-the-humanity-protocol-hack-june-2026"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Consensys, Alchemy, and Zscaler.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Humanity Protocol report.", "type": "success" },
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
