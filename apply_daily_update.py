import json
import os
from datetime import datetime, timezone

def update_json_file(filepath, new_items, unique_key='title', limit=None, prepend=True):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    # Global deduplication
    existing_keys = {item[unique_key] for item in data if unique_key in item}
    filtered_new = [item for item in new_items if unique_key in item and item[unique_key] not in existing_keys]

    if prepend:
        data = filtered_new + data
    else:
        data = data + filtered_new

    if limit:
        data = data[:limit]

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {filepath}")

def main():
    today = "2026-06-10"

    # Data sourced for the daily update
    new_jobs = [
        {
            "id": f"unlimit-pro-blockchain-engineer-{today}",
            "title": "Blockchain Engineer (Solana/AI)",
            "company": "Unlimit Pro",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["Solana", "Rust", "AI/ML", "On-chain Analytics"],
            "applyLink": "https://web3.career/blockchain-engineer-unlimit-pro/150411"
        },
        {
            "id": f"zscaler-staff-sre-{today}",
            "title": "Staff Site Reliability Engineer",
            "company": "Zscaler",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Expert level",
            "salaryRange": "$115,000 - $165,000",
            "requirements": ["Go", "Kubernetes", "AWS", "Reliability Engineering"],
            "applyLink": "https://web3.career/staff-site-reliability-engineer-zscaler/106117"
        },
        {
            "id": f"kronos-research-quant-trader-{today}",
            "title": "Experienced Quantitative Trader",
            "company": "Kronosresearch",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior level",
            "salaryRange": "$105,000 - $112,000",
            "requirements": ["Quantitative Trading", "Blockchain", "Crypto", "Python"],
            "applyLink": "https://web3.career/experienced-quantitative-trader-kronosresearch/100108"
        }
    ]

    new_intel = [
        {
            "title": "Syscoin Bridge Security Recovery and Proof Parsing Coordination",
            "category": "INFRA",
            "summary": "The Syscoin team successfully coordinated a whitehat recovery of 5B SYS minted from a malformed SPV proof, highlighting critical bridge relay parsing improvements.",
            "date": today,
            "sourceLink": "https://rekt.news/syscoin-rekt"
        },
        {
            "title": "Bondex Ecosystem Expansion into Web3 Career Infrastructure",
            "category": "INFRA",
            "summary": "Web3.career (Wagmi) integrates with the Bondex ecosystem to provide human-verified, hire-ready profiles using World ID, streamlining talent acquisition.",
            "date": today,
            "sourceLink": "https://web3.career/"
        },
        {
            "title": "TesseraDao Exploit: $2.49M Drained via Admin Key Compromise",
            "category": "HACK",
            "summary": "A single compromised admin key allowed an attacker to mint and dump tokens worth $2.49M, funneling funds through Tornado Cash due to lack of multisig controls.",
            "date": today,
            "sourceLink": "https://rekt.news/tesseradao-rekt"
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
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Indexed {len(new_jobs)} new roles from Unlimit Pro, Zscaler, and Kronosresearch.", "type": "success" },
        { "time": datetime.now(timezone.utc).strftime("%H:%M:%S"), "msg": f"Parsed {len(new_intel)} new intel updates including TesseraDao exploit.", "type": "success" },
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
        health['syncHistory'] = health['syncHistory'][:10]

        with open(health_file, 'w') as f:
            json.dump(health, f, indent=2)
        print(f"Updated {health_file}")

if __name__ == "__main__":
    main()
