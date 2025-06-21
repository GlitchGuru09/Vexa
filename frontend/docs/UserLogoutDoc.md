# UserLogout.jsx Documentation

## Overview
`UserLogout.jsx` logs out the user by calling the backend logout endpoint, removes the token from localStorage, and redirects to the login page.

## Key Points
- Reads `userToken` from localStorage.
- Calls `/users/logout` endpoint.
- Removes token and redirects to `/login`.
