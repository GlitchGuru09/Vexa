# CaptainProtectWrapper.jsx Documentation

## Overview
`CaptainProtectWrapper.jsx` is a higher-order component that protects captain-only routes. It checks for a valid token, fetches the captain profile, and redirects to login if unauthorized.

## Key Points
- Uses `useContext(CaptainDataContext)` to manage captain state.
- Fetches captain profile from backend using the token.
- Redirects to `/captain-login` if not authenticated.
