#!/bin/bash

# Ralph Loop for Cyra1 Bundle Builder
# Runs Claude Code iteratively with fresh context each time
# Progress persists in files + git, failures die with each session

set -e

MAX_ITERATIONS=${1:-10}
ITERATION=0

echo "=========================================="
echo "  RALPH LOOP - Cyra1 Bundle Builder"
echo "  Max iterations: $MAX_ITERATIONS"
echo "=========================================="
echo ""

# Ensure we start with a clean git state (optional safety)
if [[ -n $(git status --porcelain) ]]; then
    echo "WARNING: You have uncommitted changes."
    echo "Consider committing or stashing before running Ralph."
    echo "Press Enter to continue anyway, or Ctrl+C to abort..."
    read
fi

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
    ITERATION=$((ITERATION + 1))

    echo ""
    echo "=========================================="
    echo "  ITERATION $ITERATION of $MAX_ITERATIONS"
    echo "  $(date '+%Y-%m-%d %H:%M:%S')"
    echo "=========================================="
    echo ""

    # Log the iteration start
    echo "[$ITERATION] Started at $(date '+%H:%M:%S')" >> .ralph/activity.log

    # Feed the task to Claude Code
    # --dangerously-skip-permissions allows autonomous operation
    # Remove this flag if you want to approve each action
    cat ralph_task.md | claude --dangerously-skip-permissions

    EXIT_CODE=$?

    # Log the result
    echo "[$ITERATION] Finished at $(date '+%H:%M:%S') - Exit code: $EXIT_CODE" >> .ralph/activity.log

    # Run tests to check if we're done
    echo ""
    echo "--- Running tests to check progress ---"
    if npm test 2>&1; then
        echo ""
        echo "=========================================="
        echo "  TESTS PASSING!"
        echo "  Checking if all criteria are met..."
        echo "=========================================="

        # You could add more completion checks here
        # For now, we continue to let Ralph check off more items
    else
        echo ""
        echo "--- Tests failed, Ralph will try again ---"
        echo "[$ITERATION] Tests failed" >> .ralph/errors.log
    fi

    echo ""
    echo "Sleeping 3 seconds before next iteration..."
    sleep 3
done

echo ""
echo "=========================================="
echo "  RALPH COMPLETE"
echo "  Ran $MAX_ITERATIONS iterations"
echo "  Check .ralph/activity.log for history"
echo "=========================================="
