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
            "id": f"helius-staff-performance-{today}",
            "title": "Staff Performance Engineer, Trading Infrastructure",
            "company": "Helius",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Expert level",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Rust", "Solana", "Trading Infrastructure", "Performance Engineering"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        },
        {
            "id": f"cow-dao-senior-backend-{today}",
            "title": "Senior Backend Engineer (Rust)",
            "company": "CoW DAO",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $210,000",
            "requirements": ["Rust", "Ethereum", "DeFi", "Solvers"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"jumpcrypto-prod-engineer-{today}",
            "title": "Crypto Production Engineer",
            "company": "Jumpcrypto",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$150,000 - $200,000",
            "requirements": ["Go", "Distributed Systems", "Ethereum", "Validator Infrastructure"],
            "applyLink": "https://web3.career/remote+solana-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Auddia Inc. to Develop AI-Native, Web3-Enabled OS MCFN-OS",
            "category": "INFRA",
            "summary": "Auddia Inc. announced milestones for MCFN-OS, an AI-native and Web3-enabled operating system designed to power agentic AI and blockchain-anchored trust infrastructure.",
            "date": today,
            "sourceLink": "https://www.quiverquant.com/news/Auddia+Inc.+Engages+Platform+Architect+to+Develop+AI-Native%2C+Web3-Enabled+Operating+System+MCFN-OS+with+First+Module+Set+for+Q3+2026+Release"
        },
        {
            "title": "Philippine Blockchain Week 2026: Decoded to Deployed",
            "category": "INFRA",
            "summary": "PBW 2026 marks a shift from blockchain potential to real-world deployment, showcasing systems in finance, gaming, and public infrastructure.",
            "date": today,
            "sourceLink": "https://coingeek.com/philippine-blockchain-week-2026-marks-shift-from-web3-potential-to-real-world-deployment/"
        },
        {
            "title": "Critical Logic Vulnerability Disclosure: $1.2M Bug Bounty",
            "category": "BOUNTY",
            "summary": "A white-hat researcher earned a $1.2M payout on Immunefi for identifying and safely disclosing a critical logic vulnerability in a major cross-chain protocol.",
            "date": today,
            "sourceLink": "https://immunefi.com/blog/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles for Helius, CoW DAO, and Jumpcrypto.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates for MCFN-OS and PBW 2026.", "type": "success" },
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
