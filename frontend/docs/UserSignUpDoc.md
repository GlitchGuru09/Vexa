# UserSignUp.jsx Documentation

## Overview
`UserSignUp.jsx` provides the signup form and logic for users. It collects name, email, and password, sends them to the backend, and on success, stores the user data and token.

## Success
- On successful signup, navigates to `/home`.

## Failure
- If signup fails (e.g., validation error, email exists), the backend returns an error (usually 400) with a message like `User with this email already exists` or validation errors.
- The error can be caught and displayed to the user as a notification or alert.

## Key Points
- Uses `useContext(UserDataContext)` to update user state.
- Stores JWT token in `localStorage` as `userToken`.
- Navigates to `/home` on successful signup.
