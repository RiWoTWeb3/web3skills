-- CreateTable
CREATE TABLE "KeyPool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "current_rpm" INTEGER NOT NULL DEFAULT 0,
    "daily_usage" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "last_used" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AuditJobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contract_id" TEXT NOT NULL,
    "contract_name" TEXT NOT NULL,
    "current_phase" INTEGER NOT NULL DEFAULT 1,
    "last_processed_file" TEXT,
    "last_processed_line" INTEGER,
    "is_running" BOOLEAN NOT NULL DEFAULT false,
    "audit_velocity" REAL,
    "total_files" INTEGER NOT NULL,
    "total_lines" INTEGER NOT NULL,
    "estimated_duration" INTEGER,
    "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" DATETIME,
    "userId" TEXT
);

-- CreateTable
CREATE TABLE "VulnerabilityEvidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "job_id" TEXT NOT NULL,
    "phase_found" INTEGER NOT NULL,
    "severity" TEXT NOT NULL,
    "vulnerability_type" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "line_numbers" TEXT NOT NULL,
    "code_snippet" TEXT NOT NULL,
    "tool_output" TEXT,
    "ai_reasoning" TEXT NOT NULL,
    "advocate_counter" TEXT,
    "judge_verdict" TEXT,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confidence" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VulnerabilityEvidence_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "AuditJobs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyPool_key_key" ON "KeyPool"("key");
