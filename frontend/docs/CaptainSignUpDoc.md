# CaptainSignUp.jsx Documentation

## Overview
`CaptainSignUp.jsx` provides a multi-step signup form for captains, collecting both personal and vehicle information. On submit, it sends the data to the backend and stores the returned captain data and token.

## Key Points
- Two-step form: personal info and vehicle info.
- Uses `useContext(CaptainDataContext)` to update captain state.
- Stores JWT token in `localStorage` as `capToken`.
- Navigates to `/captain-home` on successful signup.
