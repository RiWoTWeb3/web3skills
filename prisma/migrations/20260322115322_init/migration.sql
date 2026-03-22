-- CreateTable
CREATE TABLE "KeyPool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
    "status" TEXT NOT NULL DEFAULT 'Active',
    "usage" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
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
    "ai_reasoning" TEXT NOT NULL,
    "advocate_counter" TEXT,
    "judge_verdict" TEXT,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confidence" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AuditJobs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_name" TEXT NOT NULL,
    "project_path" TEXT NOT NULL,
    "current_phase" INTEGER NOT NULL DEFAULT 0,
    "last_processed_file" TEXT,
    "last_processed_line" INTEGER NOT NULL DEFAULT 0,
    "is_running" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
