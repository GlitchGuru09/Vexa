# UserLogin.jsx Documentation

## Overview
`UserLogin.jsx` provides the login form and logic for users. It collects email and password, sends them to the backend, and on success, stores the token and user data in context and localStorage.

## Key Points
- Uses `useContext(UserDataContext)` to update user state.
- Stores JWT token in `localStorage` as `userToken`.
- Navigates to `/home` on successful login.

## Success
- On successful login, navigates to `/home`.

## Failure
- If login fails (e.g., wrong credentials), the backend returns an error (usually 400 or 401) with a message like `Invalid email or password`.
- The error can be caught and displayed to the user as a notification or alert.
