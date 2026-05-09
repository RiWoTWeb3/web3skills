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
            "id": f"certik-security-expert-{today}",
            "title": "Blockchain Security Expert (Security Audit Track)",
            "company": "CertiK",
            "type": "EVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$120,000 - $180,000",
            "requirements": ["Solidity", "Smart Contract Auditing", "Security Best Practices", "EVM Mechanics"],
            "applyLink": "https://web3.career/web3-companies/certik"
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
        },
        {
            "id": f"binance-staff-engineer-{today}",
            "title": "Staff Software Engineer (Consumer Money)",
            "company": "Binance",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Staff level",
            "salaryRange": "$127,000 - $568,000",
            "requirements": ["Go", "Distributed Systems", "High-Throughput Systems", "Web3"],
            "applyLink": "https://web3.career/engineer-jobs"
        }
    ]

    new_intel = [
        {
            "title": "Corpay Integrates JP Morgan Kinexys and BVNK for Blockchain Settlement",
            "category": "INFRA",
            "summary": "Corpay adds blockchain-based settlement rails for cross-border payments via JP Morgan's Kinexys private blockchain and BVNK for stablecoin interoperability.",
            "date": today,
            "sourceLink": "https://thepaypers.com/crypto-web3-and-cbdc/news/corpay-adds-blockchain-settlement-rails-via-jp-morgan-and-bvnk"
        },
        {
            "title": "OwlTing Launches OwlPay Agent Wallet for AI Transacting",
            "category": "INFRA",
            "summary": "OwlTing Group launches OwlPay Agent Wallet, a self-custody digital wallet enabling AI agents to autonomously execute stablecoin payments under user authorization.",
            "date": today,
            "sourceLink": "https://thepaypers.com/crypto-web3-and-cbdc/news/owlting-launches-ai-agent-wallet-for-stablecoin-payments"
        },
        {
            "title": "Hacken Q1 2026 Report: $482M Lost to Web3 Exploits",
            "category": "HACK",
            "summary": "Hacken reveals that $482 million was lost across 44 incidents in Q1 2026, with phishing and social engineering driving the majority of losses.",
            "date": today,
            "sourceLink": "https://cointelegraph.com/news/web3-hacks-cost-464-million-in-q1-hacken"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Daily Web3 data update for {today} started.", "type": "info" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Aggregated {len(new_jobs)} engineering roles.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Captured {len(new_intel)} news and security events.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"System data feed for {today} is now live.", "type": "success" }
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
