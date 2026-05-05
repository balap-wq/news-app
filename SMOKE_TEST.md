# SMOKE_TEST.md

# Playwright Smoke Test Guide

This document explains how to run the automated smoke test suite for the News App project.

## Purpose

The smoke test validates the core end-to-end flow of the application:

- Frontend loads successfully
- Backend APIs respond correctly
- Database connectivity works
- News articles are displayed in UI
- Basic navigation works

This helps quickly detect major issues after code changes, deployments, or infrastructure updates.

---

## Prerequisites

Before running tests, ensure:

- Node.js installed
- npm installed
- Project dependencies installed
- Backend environment variables configured
- Database is accessible

Install dependencies:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

## Run Smoke Tests

## 1. Headless Mode (Default)

Recommended for CI/CD pipelines.

```bash
npx playwright test
```

---

## 2. Headed Mode

Runs browser with visible UI.

```bash
npx playwright test --headed
```

---

## 3. UI Mode

Useful during development with interactive debugging.

```bash
npx playwright test --ui
```

---

## Reports

## HTML Report

Open latest Playwright report:

```bash
npx playwright show-report
```

---

## Trace Viewer

If trace files are generated on failure:

```bash
npx playwright show-trace trace.zip
```

---

## Test Location

Smoke test files are located in:

```bash
tests/
```

---

## CI Execution

Smoke tests run automatically in GitHub Actions for:

- Push events
- Pull Requests

Workflow file:

```bash
.github/workflows/playwright.yml
```

---

## Expected Validation

The smoke test confirms:

- Application starts correctly
- APIs return expected responses
- UI renders news data
- User can navigate successfully

---

## Troubleshooting

### Port already in use

Stop running local servers and retry.

### Missing dependencies

Run:

```bash
npm install
```

### Failed browser install

Run:

```bash
npx playwright install --with-deps
```

---

## Maintainer Notes

Update this file whenever smoke test commands or workflow behavior changes.
