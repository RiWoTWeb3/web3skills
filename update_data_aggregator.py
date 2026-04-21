import json
import os
from datetime import datetime, timezone

def update_data(target_date=None):
    if target_date is None:
        target_date = datetime.now(timezone.utc).strftime('%Y-%m-%d')

    print(f"Updating data for date: {target_date}")

    # Files to update
    feed_path = 'src/data/web3Feed.json'
    jobs_path = 'src/data/jobs.json'
    intel_path = 'src/data/intel.json'
    logs_path = 'src/data/system_logs.json'
    health_path = 'src/data/system_health.json'

    # 1. Prepare New Data (April 21, 2026 data as requested for today)
    new_feed_items = [
        {
            "date": target_date,
            "type": "job",
            "title": "Staff Software Engineer, Solana",
            "description": "Lightcone is seeking a Staff Engineer to lead high-performance Solana infrastructure and DeFi protocol development. Remote.",
            "link": "https://lightcone.trade/careers"
        },
        {
            "date": target_date,
            "type": "job",
            "title": "SDET - Crypto Wallet",
            "description": "Join a leading non-custodial wallet team to build automated testing frameworks for multi-chain support and hardware integration.",
            "link": "https://wallet.com/jobs"
        },
        {
            "date": target_date,
            "type": "job",
            "title": "Senior Fullstack Developer (Web3)",
            "description": "Tether is expanding its engineering team for new payment infrastructure. Focus on React and Rust/Go backend systems.",
            "link": "https://tether.to/careers"
        },
        {
            "date": target_date,
            "type": "news",
            "title": "Sumsub Reports Major KYC Data Breach",
            "description": "Verification provider Sumsub confirms unauthorized access to a subset of user documents. Protocols advised to rotate API keys.",
            "link": "https://sumsub.com/blog/security-update"
        },
        {
            "date": target_date,
            "type": "news",
            "title": "Offchain Labs Announces Arbitrum Enterprise",
            "description": "New initiative to provide dedicated L2/L3 infrastructure for corporate partners with custom gas tokens and privacy features.",
            "link": "https://offchainlabs.com/enterprise"
        },
        {
            "date": target_date,
            "type": "hack",
            "title": "Hyperbridge MMR Proof Exploit",
            "description": "Cross-chain protocol Hyperbridge pauses operations after discovery of a vulnerability in Merkle Mountain Range proof verification.",
            "link": "https://hyperbridge.network/security-postmortem"
        }
    ]

    new_jobs = [
        {
            "id": f"lightcone-{target_date}",
            "title": "Staff Software Engineer, Solana",
            "company": "Lightcone",
            "type": "SVM",
            "workType": "Remote",
            "experience": "Senior/Staff",
            "salaryRange": "$180,000 - $250,000",
            "requirements": ["Solana", "Rust", "Anchor", "High-performance Systems"],
            "applyLink": "https://lightcone.trade/careers"
        },
        {
            "id": f"wallet-{target_date}",
            "title": "SDET - Crypto Wallet",
            "company": "Wallet",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Mid-Senior",
            "salaryRange": "$140,000 - $190,000",
            "requirements": ["TypeScript", "Playwright", "Ethereum", "Testing Frameworks"],
            "applyLink": "https://wallet.com/jobs"
        },
        {
            "id": f"tether-{target_date}",
            "title": "Senior Fullstack Developer",
            "company": "Tether",
            "type": "Backend",
            "workType": "Remote",
            "experience": "Senior",
            "salaryRange": "$160,000 - $220,000",
            "requirements": ["React", "Rust", "Go", "PostgreSQL"],
            "applyLink": "https://tether.to/careers"
        }
    ]

    new_intel = [
        {
            "title": "Sumsub KYC Data Breach",
            "category": "HACK",
            "summary": "Unauthorized access to KYC documents via verification provider breach.",
            "date": target_date,
            "sourceLink": "https://sumsub.com/blog/security-update"
        },
        {
            "title": "Arbitrum Enterprise Launch",
            "category": "INFRA",
            "summary": "Offchain Labs launches custom L2/L3 infrastructure for enterprises.",
            "date": target_date,
            "sourceLink": "https://offchainlabs.com/enterprise"
        },
        {
            "title": "Hyperbridge MMR Exploit Discovery",
            "category": "BOUNTY",
            "summary": "Critical vulnerability found in cross-chain MMR proof logic.",
            "date": target_date,
            "sourceLink": "https://hyperbridge.network/security-postmortem"
        }
    ]

    # 2. Update web3Feed.json
    if os.path.exists(feed_path):
        with open(feed_path, 'r') as f:
            feed = json.load(f)
    else:
        feed = []

    feed = new_feed_items + feed
    feed = feed[:60] # Limit to 60

    with open(feed_path, 'w') as f:
        json.dump(feed, f, indent=2)
    print(f"Updated {feed_path}")

    # 3. Update jobs.json
    if os.path.exists(jobs_path):
        with open(jobs_path, 'r') as f:
            jobs = json.load(f)
    else:
        jobs = []

    jobs = new_jobs + jobs
    jobs = jobs[:40] # Keep a reasonable amount

    with open(jobs_path, 'w') as f:
        json.dump(jobs, f, indent=2)
    print(f"Updated {jobs_path}")

    # 4. Update intel.json
    if os.path.exists(intel_path):
        with open(intel_path, 'r') as f:
            intel = json.load(f)
    else:
        intel = []

    intel = new_intel + intel
    intel = intel[:40]

    with open(intel_path, 'w') as f:
        json.dump(intel, f, indent=2)
    print(f"Updated {intel_path}")

    # 5. Update system_logs.json
    log_entry = {
        "id": f"LOG-{int(datetime.now().timestamp())}",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "level": "INFO",
        "module": "AGGREGATOR",
        "message": f"Daily sync completed. Added 3 jobs, 2 news items, and 1 security report for {target_date}."
    }

    if os.path.exists(logs_path):
        with open(logs_path, 'r') as f:
            logs = json.load(f)
    else:
        logs = []

    logs.insert(0, log_entry)
    logs = logs[:50] # Limit to 50

    with open(logs_path, 'w') as f:
        json.dump(logs, f, indent=2)
    print(f"Updated {logs_path}")

    # 6. Update system_health.json
    health_data = {
        "lastSync": datetime.now(timezone.utc).isoformat(),
        "status": "HEALTHY",
        "syncHistory": [
            {
                "date": target_date,
                "status": "SUCCESS",
                "itemsAdded": len(new_feed_items)
            }
        ]
    }

    if os.path.exists(health_path):
        with open(health_path, 'r') as f:
            old_health = json.load(f)
            # Merge history
            history = health_data["syncHistory"] + old_health.get("syncHistory", [])
            health_data["syncHistory"] = history[:10]

    with open(health_path, 'w') as f:
        json.dump(health_data, f, indent=2)
    print(f"Updated {health_path}")

if __name__ == "__main__":
    # For the specific task, we use 2026-04-21
    update_data("2026-04-21")
