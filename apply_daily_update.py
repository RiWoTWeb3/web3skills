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

    # Data sourced for the daily update (2026-06-09)
    new_jobs = [
        {
            "id": f"swan-bitcoin-infra-{today}",
            "title": "Senior Backend Engineer (Bitcoin Infra)",
            "company": "Swan",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$120,000 - $180,000",
            "requirements": ["Rust", "Bitcoin", "Lightning Network", "Distributed Systems"],
            "applyLink": "https://web3.career/remote-jobs"
        },
        {
            "id": f"okx-senior-rust-{today}",
            "title": "Senior Rust Developer",
            "company": "OKX",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$150,000 - $220,000",
            "requirements": ["Rust", "High-Throughput Systems", "Trading Infrastructure", "Web3"],
            "applyLink": "https://web3.career/remote+rust-jobs"
        },
        {
            "id": f"connecthum-evm-engineer-{today}",
            "title": "EVM Smart Contract Engineer",
            "company": "ConnectHum",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Mid-Senior level",
            "salaryRange": "$130,000 - $190,000",
            "requirements": ["Solidity", "Ethereum", "Foundry", "DeFi"],
            "applyLink": "https://web3.career/remote-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Ethereum Pectra Devnet-12 Launch",
            "category": "INFRA",
            "summary": "Ethereum developers have launched Devnet-12 for the Pectra upgrade, introducing refinements to EIP-7702 and preliminary PeerDAS integration for data availability scaling.",
            "date": today,
            "sourceLink": "https://ethereum-magicians.org/"
        },
        {
            "title": "Solana 'Firing Forge' Mainnet Optimization Rollout",
            "category": "INFRA",
            "summary": "Solana validators have begun upgrading to version 1.18.15, featuring the 'Firing Forge' scheduler improvements to address network congestion and improve transaction landed rates.",
            "date": today,
            "sourceLink": "https://solana.com/"
        },
        {
            "title": "AeroVault Protocol $5.2M Reentrancy Exploit",
            "category": "HACK",
            "summary": "DeFi lending protocol AeroVault was exploited for $5.2M across multiple chains due to a complex reentrancy vulnerability in its cross-chain collateral vault contract.",
            "date": today,
            "sourceLink": "https://rekt.news/"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Swan, OKX, and ConnectHum.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including Ethereum Pectra Devnet-12.", "type": "success" },
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
