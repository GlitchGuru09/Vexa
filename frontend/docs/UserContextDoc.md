# UserContext.jsx Documentation

## Overview
`UserContext.jsx` defines a React Context for managing and sharing user-related data across the application. It provides a centralized way to store and update user information, making it accessible to any component that consumes this context.

## Key Elements
- **UserDataContext**: React Context for user data and updater function.
- **UserContext**: Provider component that supplies `user` state and `setUser` to its children.

## Usage
Wrap your app with `<UserContext>` and use `useContext(UserDataContext)` in child components to access or update user data.
