# CaptainLogin.jsx Documentation

## Overview
`CaptainLogin.jsx` provides the login form and logic for captains. It collects email and password, sends them to the backend, and on success, stores the token and captain data in context and localStorage.

## Key Points
- Uses `useContext(CaptainDataContext)` to update captain state.
- Stores JWT token in `localStorage` as `capToken`.
- Navigates to `/captain-home` on successful login.
