# CaptainLogout.jsx Documentation

## Overview
`CaptainLogout.jsx` logs out the captain by calling the backend logout endpoint, removes the token from localStorage, and redirects to the captain login page.

## Key Points
- Reads `capToken` from localStorage.
- Calls `/captains/logout` endpoint.
- Removes token and redirects to `/captain-login`.
