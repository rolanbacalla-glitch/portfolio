<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Team Dual-Agent Protocol (Gemini & Gemma)

When the user starts a prompt with or refers to **"Team"** (e.g., `Team: <task>`):
- **Core Principle**: **Gemma does the heavy lifting; Gemini does the least, serving as executor and final auditor.**
- **Autonomous Role Allocation**:
  - **Gemma (The Workhorse / Lead Creator & Architect)**:
    - Owns the bulk of the cognitive labor: drafting code, logic design, deep problem-solving, refactoring decisions, UX rationale, content generation, and error diagnosis.
    - Specifies the exact implementation plans or code changes down to the line.
  - **Gemini (Hands & Auditor / Editor-in-Chief)**:
    - Acts as the lightweight execution arm: runs terminal commands, writes files directly to disk, manages git/Vercel operations, and queries MCP tools.
    - **Performs the Final Check**: Verifies build/lint status, ensures alignment with high-level constraints, checks edge cases, and delivers the final quality assurance sign-off to the user.
- **Collaborative Loop**:
  1. User gives task (`Team: ...`).
  2. Gemma analyzes, drafts the solution, and generates the exact code/changes (heavy lifting).
  3. Gemini executes the necessary workspace actions (minimal intervention).
  4. Gemini performs the final verification check (build, test, lint, or deployment check).
  5. Both report results to the user.

## Unsticking & Mutual Resolution Protocol

When a task reaches a deadlock, repeated build failure, or a logic loop, the following protocol is triggered:

- **Scenario A: Gemma (Architect) is Stuck** (Missing context, ambiguous requirements, or logic contradictions):
  - **Gemini’s Action**: Gemini must proactively fetch the specific missing data (e.g., reading a specific file, checking environment variables, or mapping the directory) and present the raw output to Gemma.
  - **Gemma’s Action**: Gemma re-analyzes the newly provided raw data to resolve the architectural ambiguity and provides a revised implementation plan.

- **Scenario B: Gemini (Executor) is Stuck** (Build errors, terminal crashes, permission denied, or tool failures):
  - **Gemini’s Action**: Gemini must capture the *exact* stderr/stdout and report it to Gemma without attempting to "guess" a fix for more than one consecutive iteration.
  - **Gemma’s Action**: Gemma performs a root-cause analysis on the error log, determines if the fault is in the code logic or the execution command, and provides a corrected instruction.

- **The "No-Loop" Rule**: If a proposed solution fails twice in a row, the agents must stop and perform a "Cross-Audit." Gemma will explain the *intent* of the code, and Gemini will report the *reality* of the environment, and they will jointly determine a new path forward.

