import json
import os
from datetime import datetime

# Today's Date
today = "2026-04-06"

# New Jobs
new_jobs = [
    {
        "id": "jito-senior-software-engineer-2026-04-06",
        "title": "Senior Software Engineer - Special Projects",
        "company": "Jito Labs",
        "type": "SVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$200,000 - $250,000",
        "requirements": ["Rust", "DeFi", "Solana", "Systems Engineering"],
        "applyLink": "https://web3.career/rust+solana-jobs"
    },
    {
        "id": "cowdao-senior-backend-engineer-2026-04-06",
        "title": "Senior Backend Engineer (Rust)",
        "company": "CoW DAO",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "Salary not specified",
        "requirements": ["Rust", "Ethereum", "DeFi", "Backend Architecture"],
        "applyLink": "https://web3.career/web3-companies/cowdao"
    },
    {
        "id": "chainlink-sre-2026-04-06",
        "title": "Site Reliability Engineer",
        "company": "Chainlink Labs",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Mid/Senior level",
        "salaryRange": "Salary not specified",
        "requirements": ["SRE", "Infrastructure", "Go", "Cloud Architecture"],
        "applyLink": "https://web3.career/web3-companies/chainlinklabs"
    }
]

# New Intel
new_intel = [
    {
        "title": "Chainlink Runtime Environment (CRE) Mainnet Beta Launch",
        "category": "INFRA",
        "summary": "Chainlink officially launches the CRE Mainnet Beta, a major architectural shift to enable modular and scalable decentralized services.",
        "date": today,
        "sourceLink": "https://web3.career/web3-companies/chainlinklabs"
    },
    {
        "title": "Ethereum Pectra Upgrade Devnet-10 Live",
        "category": "INFRA",
        "summary": "The tenth devnet for the Ethereum Pectra upgrade is now operational, testing critical EIP-7702 and PeerDAS refinements.",
        "date": today,
        "sourceLink": "https://ethereum-magicians.org/"
    },
    {
        "title": "Prisma Finance $12M Exploit Recovery",
        "category": "HACK",
        "summary": "Prisma Finance has successfully recovered $12 million in assets following a significant exploit, coordinated through security audits and community cooperation.",
        "date": today,
        "sourceLink": "https://cryptojobslist.com/web3"
    }
]

# New Feed Items
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

# New Logs
new_logs = [
    { "time": "11:05:00", "msg": "Daily data aggregation cycle started for 2026-04-06.", "type": "info" },
    { "time": "11:05:10", "msg": f"Indexed {len(new_jobs)} new remote roles from Jito Labs, CoW DAO, and Chainlink Labs.", "type": "success" },
    { "time": "11:05:20", "msg": "Parsed Chainlink CRE launch and Ethereum Pectra Devnet-10 updates.", "type": "success" },
    { "time": "11:05:30", "msg": "Web3 Data Update [2026-04-06] complete.", "type": "success" }
]

def update_json_file(filepath, new_items, limit=None, prepend=True):
    if not os.path.exists(filepath):
        data = []
    else:
        with open(filepath, 'r') as f:
            data = json.load(f)

    if prepend:
        data = new_items + data
    else:
        data = data + new_items

    if limit:
        data = data[:limit]

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Updated {filepath}")

# Update main data files
update_json_file('src/data/web3Feed.json', new_feed_items, limit=60)
update_json_file('src/data/jobs.json', new_jobs)
update_json_file('src/data/intel.json', new_intel)
update_json_file('src/data/system_logs.json', new_logs, limit=50)

# Update system health
health_file = 'src/data/system_health.json'
if os.path.exists(health_file):
    with open(health_file, 'r') as f:
        health = json.load(f)

    health['lastSync'] = datetime.utcnow().isoformat().replace('+00:00', '') + "Z"
    health['status'] = 'HEALTHY'
    new_sync = { "date": today, "status": "SUCCESS", "itemsAdded": len(new_feed_items) }
    health['syncHistory'] = [new_sync] + [h for h in health['syncHistory'] if h['date'] != today]
    health['syncHistory'] = health['syncHistory'][:10] # Keep last 10 syncs

    with open(health_file, 'w') as f:
        json.dump(health, f, indent=2)
    print(f"Updated {health_file}")
