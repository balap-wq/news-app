## Ticket

KT-XXX

---

## Summary

Briefly describe the purpose of this PR.

Example:
Implements the `useHeadlines` custom hook for fetching paginated headlines from the backend API.

---

## Type of Change

Select the type of change for this PR.

* [ ] Feature
* [ ] Bug Fix
* [ ] Refactor
* [ ] Documentation
* [ ] Performance Improvement
* [ ] Chore / Maintenance

---

## Changes Made

List the major changes included in this PR.

* Created `src/hooks/useHeadlines.js`
* Implemented API request to `/api/headlines`
* Added loading state management
* Added error handling
* Implemented `AbortController` to prevent memory leaks

---

## API Changes

If this PR interacts with or modifies an API, describe it here.

Endpoint:

GET `/api/headlines?page=&category=&country=`

Using:

`src/api/axiosInstance.js`

---

## Testing

Explain how the changes were tested.

* [ ] Tested locally
* [ ] Verified loading state
* [ ] Verified error handling
* [ ] Tested API integration
* [ ] Tested edge cases

Additional Notes:
Describe any additional testing performed.

---

## UI Changes

If this PR affects the UI, include screenshots or screen recordings.

Example:
No UI changes in this PR.

---

## Checklist

Before requesting review, confirm the following:

* [ ] Code follows project coding standards
* [ ] Code has been linted and formatted
* [ ] No console logs or debug code left
* [ ] All new files are included in commits
* [ ] Documentation updated if required
* [ ] No unnecessary files included

---

## Status

* [ ] Draft PR
* [ ] Ready for Review
* [ ] Work in Progress

---

## Notes for Reviewers

Provide any additional context for reviewers.

Example:
Backend endpoint `/api/headlines` is still pending implementation.
