# Canonical user review and release protocol — workspace policy v2.2

CHANGES_REMAIN_UNCOMMITTED_UNTIL_VALIDATED=true
AUTO_PUSH_DEVELOPMENT=false
PROMOTION_PROTOCOL=Local changes -> explicit Toni validation in development -> commit/push development -> Toni Preview review -> PROMOTE=FULL + exact reviewed SHA -> one asynchronous full-chain workflow

Toni validates every change in the development environment before the agent commits or pushes it. After the push, the agent waits for Toni to review Preview. Only Toni's exact PROMOTE=FULL token authorizes the complete ordered staging -> production -> main chain, using the exact SHA reviewed in Preview. The agent dispatches one full-chain workflow per repository, does not wait for or poll CI/deployment/workflow completion, and does not verify individual target branches. That workflow rejects failed source status and branch divergence, permits pending checks, validates all target branches before writing, and updates all three refs sequentially with fast-forward pushes, and stops if development moved after Preview review. Toni reviews the resulting environments.

# Anclora Portfolio — Production Runtime Manifest

PRODUCTION_RUNTIME_MANIFEST_VERSION=2.0
PROMOTION_REPORT=SINGLE_SUMMARY_AT_END
PROMOTION_PARALLEL_ACROSS_REPOS=true
PROMOTION_MULTI_REPO_SCOPE_ALLOWED=true
PROMOTION_USER_VERIFIES_EACH_BRANCH=true
PROMOTION_AGENT_PER_HOP_VERIFICATION=false
PROMOTION_AGENT_POLLS_CI_OR_DEPLOYMENT=false
PROMOTION_DISPATCH_FULL_CHAIN_ONCE=true
PROMOTION_DISPATCH_IMMEDIATELY=true
PROMOTION_AGENT_WAITS_FOR_SOURCE_CI=false
PROMOTION_WAIT_FOR_WORKFLOW_COMPLETION=false
PROMOTION_STOP_ON_GATE_FAILURE=true
PROMOTION_REQUIRES_PRE_STEP_GATES=true
PROMOTION_AUTHORIZATION_TOKEN=PROMOTE=FULL
PROMOTION_MECHANISM=.github/workflows/promote.yml
PROMOTION_FLOW=development->staging->production->main
PROMOTION_SUPPORTED=true
SECRET_COMMIT_FORBIDDEN=true
SECRET_OUTPUT_FORBIDDEN=true
PROMOTION_FORCE_PUSH_ALLOWED=false
PROMOTION_AUTHORIZATION_CLEAR_ON_UNAUTHORIZED_PROMPT=false
PROMOTION_AUTHORIZATION_CLEAR_ON_NEW_SESSION=true
PROMOTION_AUTHORIZATION_SCOPE=CURRENT_TASK_OR_CONVERSATION
AUTO_PROMOTE=false
TEST_EXECUTION_POLICY=BATCHED
STOP_WHEN_SUFFICIENT_EVIDENCE=true
CAVEMAN_GRANULARITY=TASK
CAVEMAN_MODE_DEFAULT=AUTO
TOKEN_ECONOMY_POLICY=ADAPTIVE
QA_MODE_DEFAULT=AUTO
AUTO_PUSH_WORK_BRANCH=false
AUTO_COMMIT_AFTER_VALIDATION=false
COMMIT_PUSH_REQUIRES_EXPLICIT_USER_VALIDATION=true
DEVELOPMENT_VALIDATION_REQUIRED=true
STOP_AFTER_DEVELOPMENT_PUSH=true
PUSH_TARGET=origin/development
FEATURE_BRANCHES=DISALLOWED
DEFAULT_BRANCH=development
WORKING_BRANCH=development
ANCLORA_FLOW_CONTRACT_VERSION=2.0
ANCLORA_FLOW_VERSION=1
RUNTIME_CONTRACT_AUTHORITY=CANONICAL
STATUS=PRODUCTION_RUNTIME_CONFIRMED
LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

<!-- ANCLORA-AOS-RUNTIME:START -->

## 0. Runtime Semantics (generated from declared facts; UNKNOWN = not verifiable)

```text
SOURCE_BRANCH=development
EXECUTION_LOCATION=LOCAL
DEPLOYMENT_PROVIDER=Vercel
PREVIEW_REQUIRED=false
DOCKER_ROLE=NOT_USED
```

<!-- ANCLORA-AOS-RUNTIME:END -->

## 1. Application Identity

APPLICATION_NAME=Anclora Portfolio
REPOSITORY=anclora-portfolio
APPLICATION_TYPE=fullstack
FRAMEWORK=Next.js

## 2. Runtime Topology

FRONTEND_PROVIDER=Vercel
BACKEND_PROVIDER=Vercel Serverless Functions
PRODUCTION_DOMAIN=anclora-portfolio-6l8rfuyb6-pmi140979-6354s-projects.vercel.app
PRODUCTION_DEPLOYMENT_PROVIDER=Vercel

```text
Browser / Client
   ↓
Vercel Frontend (Next.js)
   ↓
Backend Services
   ├── Database: Prisma ORM
   └── External Integrations
```

## 3. Production Database Contract

DATABASE_PROVIDER=Prisma ORM
DATABASE_SCOPE=production
LOCAL_DATABASE_SCOPE=production

Local development intentionally connects to the Production database.
This is the Anclora operating model.
Do not create or switch to a Development, Preview, Staging, ephemeral,
local or alternate database unless Toni explicitly requests it.

## 4. Database Migration Contract

MIGRATION_SYSTEM=Prisma ORM
MIGRATION_STRATEGY=PRISMA_MIGRATE
MIGRATION_DIRECTORY=./prisma
MIGRATION_RUNNER=npx prisma migrate deploy

All schema migrations apply strictly against the designated production database.
Destructive drops or resets are strictly prohibited without authorization.

## 5. Storage Contract

STORAGE_PROVIDER=None
STORAGE_SCOPE=production

Local development utilizes production storage buckets/services according to the production-backed model.

## 6. Authentication Contract

AUTH_PROVIDER=Session / JWT
AUTH_SCOPE=production

## 7. External Services & Integrations

EXTERNAL_SERVICES=Vercel API, Production Database, Email/Notifications

## 8. Environment Files & Loading Order

ENV_FILES=.env.local (mode 0600), .env.production.local (fallback)
All local secret variables point to production services. Never commit .env files containing credentials.

## 9. Local vs Production Model

LOCAL_RUNTIME_MODEL=PRODUCTION_BACKED
DO_NOT_CREATE_DEVELOPMENT_DATABASE=true

Runtime, environment, database, migration, QA and Git rules declared in this
manifest override generic agent defaults or home-directory agent policies.

## QA Contract

QA_POLICY=WORKSPACE_PROPORTIONAL
FAST_TARGETED_TESTING_POLICY=MINIMUM_SUFFICIENT_SET
FAST_FULL_TEST_SUITE_ALLOWED=false
FULL_GATES_AFTER_EVERY_EDIT=false
REPEAT_UNCHANGED_SUCCESSFUL_GATES=false
VISUAL_QA_EXECUTION=BY_QA_MODE

QA_MINIMUM_FOR_DATABASE_MIGRATION=FULL
QA_MINIMUM_FOR_AUTH=FULL
QA_MINIMUM_FOR_RELEASE_PROMOTION=FULL

QA_AUTH_MODEL=SERVICE_CREDENTIAL
QA_IS_DEDICATED=false
QA_IS_REAL_USER=false
REAL_USER_AS_QA_ALLOWED=false
QA_SCOPE=production
QA_REUSE=true
QA_CREATE_IF_MISSING=false
QA_DELETE_AFTER_TEST=false
QA_CREATION_CONFIRMATION_REQUIRED=false
QA_PERSISTENT_IDENTITY=PORTFOLIO_SERVICE_KEY

For machine services: Authenticate via service tokens or worker keys declared in local secure environment variables.

## 11. Git Branch & Operational Policy

PROMOTION_POLICY=Default development-only operation; no automatic promotion. Explicit current-task user authorization permits only the repository-supported governed promotion path, subject to all gates.

<!-- ANCLORA-AOS:START -->

ANCLORA_AOS_AUTHORITY=anclora-governance
Canonical rules: [AOS Adoption Standard](../../anclora-governance/standards/AOS_ADOPTION_STANDARD.md). Repository-specific facts remain in this repository's `.anclora/` contracts.
<!-- ANCLORA-AOS:END -->
