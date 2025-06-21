# UserSignUp.jsx Documentation

## Overview
`UserSignUp.jsx` provides the signup form and logic for users. It collects name, email, and password, sends them to the backend, and on success, stores the user data and token.

## Key Points
- Uses `useContext(UserDataContext)` to update user state.
- Stores JWT token in `localStorage` as `userToken`.
- Navigates to `/home` on successful signup.
