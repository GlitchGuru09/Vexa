# UserProtectWrapper.jsx Documentation

## Overview
`UserProtectWrapper.jsx` is a higher-order component that protects user-only routes. It checks for a valid token, fetches the user profile, and redirects to login if unauthorized.

## Key Points
- Uses `useContext(UserDataContext)` to manage user state.
- Fetches user profile from backend using the token.
- Redirects to `/login` if not authenticated.
