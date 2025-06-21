# CaptainLogout.jsx Documentation

## Overview
`CaptainLogout.jsx` logs out the captain by calling the backend logout endpoint, removes the token from localStorage, and redirects to the captain login page.

## Success
- On successful logout, navigates to `/captain-login`.

## Failure
- If logout fails (e.g., invalid/expired token), the backend returns a 401 error with a message like `Unauthorized`.
- The error is caught, the token is removed, and the user is redirected to `/captain-login` anyway.

## Key Points
- Reads `capToken` from localStorage.
- Calls `/captains/logout` endpoint.
- Removes token and redirects to `/captain-login`.
