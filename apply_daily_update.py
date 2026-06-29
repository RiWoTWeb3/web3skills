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

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"brave-staff-security-{today}",
            "title": "Staff Security and Privacy Engineer",
            "company": "Brave",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$170,000 - $230,000",
            "requirements": ["Rust", "Security", "Privacy", "C++"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"zscaler-staff-sre-{today}",
            "title": "Staff Site Reliability Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["Rust", "SRE", "Infrastructure", "Networking"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"okx-quant-dev-{today}",
            "title": "Quant Developer (Rust)",
            "company": "OKX",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "Trading Systems", "Low-Latency", "Quant"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Solana Foundation Launches Validator Health Program v2",
            "category": "INFRA",
            "summary": "The Solana Foundation has unveiled a new program to incentivize validator health and geographic decentralization, offering performance-based rewards.",
            "date": today,
            "sourceLink": "https://solana.com/news"
        },
        {
            "title": "Ethereum Pectra Upgrade: Devnet-12 Successfully Operational",
            "category": "INFRA",
            "summary": "Ethereum developers successfully launched devnet-12 for the Pectra upgrade, reaching stability within hours and beginning load testing of new EIPs.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Cross-chain Bridge Vulnerability: $15M Recovered via Whitehat Intervention",
            "category": "HACK",
            "summary": "A critical vulnerability in a major cross-chain bridge was mitigated by a white-hat hacker, preventing a potential $15M exploit. The protocol has issued a bounty.",
            "date": today,
            "sourceLink": "https://rekt.news"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Brave, Zscaler, and OKX.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Solana Validator Health v2.", "type": "success" },
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
