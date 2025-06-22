# CaptainLogin.jsx Documentation

## Overview
`CaptainLogin.jsx` provides the login form and logic for captains. It collects email and password, sends them to the backend, and on success, stores the token and captain data in context and localStorage.

## Key Points
- Uses `useContext(CaptainDataContext)` to update captain state.
- Stores JWT token in `localStorage` as `capToken`.
- Navigates to `/captain-home` on successful login.

## Success
- On successful login, navigates to `/captain-home`

## Failure
- If login fails (e.g., wrong credentials), the backend returns an error (usually 400 or 401) with a message like `Invalid email or password`.
- The error can be caught and displayed to the user as a notification or alert.
