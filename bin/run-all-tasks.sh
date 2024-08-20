#!/usr/bin/env bash
set -euo pipefail
export TURBO_LOG_ORDER=grouped
pnpm i
pnpm run lint
pnpm turbo run build lint typecheck e2e
unset TURBO_LOG_ORDER
