# CaptainSignUp.jsx Documentation

## Overview
`CaptainSignUp.jsx` provides a multi-step signup form for captains, collecting both personal and vehicle information. On submit, it sends the data to the backend and stores the returned captain data and token.

## Key Points
- Two-step form: personal info and vehicle info.
- Uses `useContext(CaptainDataContext)` to update captain state.
- Stores JWT token in `localStorage` as `capToken`.
- Navigates to `/captain-home` on successful signup.

## Success
- On successful signup, navigates to `/captain-home`.

## Failure
- If signup fails (e.g., validation error, email exists), the backend returns an error (usually 400) with a message like `Captain with this email already exists` or validation errors.
- The error can be caught and displayed to the user as a notification or alert.
