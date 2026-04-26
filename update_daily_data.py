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
    today = "2026-04-26"
    now_iso = datetime.now(timezone.utc).isoformat().replace('+00:00', '') + "Z"
    now_time = datetime.now(timezone.utc).strftime("%H:%M:%S")

    new_jobs = [
        {
            "id": f"1010-trading-rust-evm-{today}",
            "title": "Rust Developer — EVM Systems & Trading Infrastructure",
            "company": "1010 trading",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "Competitive",
            "requirements": ["Rust", "EVM", "Trading Infrastructure", "Low-Latency"],
            "applyLink": "https://web3.career/rust-developer-evm-systems-trading-infrastructure-1010-trading/143407"
        },
        {
            "id": f"ondo-security-engineer-{today}",
            "title": "Security Engineer",
            "company": "Ondo Finance",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$105,000 - $150,000",
            "requirements": ["Security", "Smart Contract Auditing", "Cryptography", "Solidity"],
            "applyLink": "https://web3.career/security-engineer-ondofinance/148963"
        },
        {
            "id": f"tether-staff-nodejs-{today}",
            "title": "Staff Node.js Engineer",
            "company": "Tether",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$88,000 - $101,000",
            "requirements": ["Node.js", "Backend Architecture", "Infrastructure", "Bitcoin"],
            "applyLink": "https://web3.career/staff-node-js-engineer-100-remote-tetheroperationslimited/148957"
        }
    ]

    new_intel = [
        {
            "title": "LayerZero Infrastructure Breach: Post-Mortem Analysis",
            "category": "INFRA",
            "summary": "Analysis of the infrastructure compromise that led to unauthorized bridge message forgery, highlighting critical security gaps in relay nodes.",
            "date": today,
            "sourceLink": "https://rekt.news/kelpdao-rekt"
        },
        {
            "title": "Rhea Finance $18.4M Oracle Exploit on NEAR",
            "category": "INFRA",
            "summary": "Rhea Finance suffered a significant loss due to an input validation failure in its margin parser, allowing attackers to use fake swap routes as collateral.",
            "date": today,
            "sourceLink": "https://rekt.news/rhea-finance-rekt"
        },
        {
            "title": "KelpDAO $290M Exploit via LayerZero Compromise",
            "category": "HACK",
            "summary": "DPRK-linked actors walked away with $290M after breaching LayerZero infrastructure to forge malicious bridge messages targeting KelpDAO.",
            "date": today,
            "sourceLink": "https://rekt.news/kelpdao-rekt"
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
        { "time": now_time, "msg": f"Daily Web3 Data Update [{today}] initiated.", "type": "info" },
        { "time": now_time, "msg": f"Synchronized {len(new_jobs)} remote engineering roles.", "type": "success" },
        { "time": now_time, "msg": f"Captured {len(new_intel)} critical intelligence logs.", "type": "success" },
        { "time": now_time, "msg": f"Feed state updated successfully for {today}.", "type": "success" }
    ]

    update_json_file('src/data/web3Feed.json', new_feed_items, limit=60, today=today)
    update_json_file('src/data/jobs.json', new_jobs, unique_key='id', today=today)
    update_json_file('src/data/intel.json', new_intel, today=today)
    update_json_file('src/data/system_logs.json', new_logs, limit=50, unique_key='msg', today=today)

    health_file = 'src/data/system_health.json'
    if os.path.exists(health_file):
        with open(health_file, 'r') as f:
            health = json.load(f)
        health['lastSync'] = now_iso
        health['status'] = 'HEALTHY'
        new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
        health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
        health['syncHistory'] = health['syncHistory'][:10]
        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
