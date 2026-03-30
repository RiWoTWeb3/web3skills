import json
import os
from datetime import datetime

# Today's Date
today = "2026-03-29"

# New Jobs
new_jobs = [
    {
        "id": "nexus-backend-engineer-latam-2026-03-29",
        "title": "Backend Engineer (Contract - LATAM)",
        "company": "Nexus",
        "type": "Backend",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "$157,000 - $175,000",
        "requirements": ["Rust", "Go", "AWS", "Blockchain", "Docker"],
        "applyLink": "https://web3.career/backend-engineer-contract-latam-nexus/148035"
    },
    {
        "id": "1010-trading-rust-developer-evm-2026-03-29",
        "title": "Rust Developer — EVM Systems Trading Infrastructure",
        "company": "1010 trading",
        "type": "EVM",
        "workType": "Remote",
        "experience": "Senior level",
        "salaryRange": "Competitive",
        "requirements": ["Rust", "EVM", "Ethereum", "Trading Infrastructure", "Low-Latency"],
        "applyLink": "https://web3.career/rust-developer-evm-systems-trading-infrastructure-1010-trading/143407"
    },
    {
        "id": "alchemy-product-lead-solana-2026-03-29",
        "title": "Product Lead, Solana",
        "company": "Alchemy",
        "type": "SVM",
        "workType": "Remote",
        "experience": "Expert level",
        "salaryRange": "$135,000 - $350,000",
        "requirements": ["Solana", "Product Strategy", "API Development", "Infrastructure"],
        "applyLink": "https://cryptojobslist.com/solana"
    }
]

# New Intel
new_intel = [
    {
        "title": "Ethereum Pectra Devnet-9 Live",
        "category": "INFRA",
        "summary": "The ninth devnet for the Ethereum Pectra upgrade is now live, focusing on PeerDAS scaling and EIP-7702 account abstraction refinements.",
        "date": today,
        "sourceLink": "https://ethereum-magicians.org/"
    },
    {
        "title": "Solana Mainnet Performance Upgrade V1.19",
        "category": "INFRA",
        "summary": "Solana v1.19 mainnet-beta release introduces a new scheduler for improved transaction prioritization during high congestion.",
        "date": today,
        "sourceLink": "https://solana.com/news"
    },
    {
        "title": "DeFi Protocol Bug Bounty: $2.5M Payout",
        "category": "BOUNTY",
        "summary": "A critical vulnerability in a major cross-chain bridge was safely disclosed by a white-hat researcher, earning a record $2.5M reward on Immunefi.",
        "date": today,
        "sourceLink": "https://immunefi.com/blog/"
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

# Update files
update_json_file('src/data/web3Feed.json', new_feed_items, limit=60)
update_json_file('src/data/jobs.json', new_jobs)
update_json_file('src/data/intel.json', new_intel)
