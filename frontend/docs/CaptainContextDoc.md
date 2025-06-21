# CaptainContext.jsx Documentation

## Overview
`CaptainContext.jsx` defines a React Context for managing and sharing captain-related data across the application. It provides a centralized way to store and update captain information, making it accessible to any component that consumes this context.

## Key Elements
- **CaptainDataContext**: React Context for captain data and updater function.
- **CaptainContext**: Provider component that supplies `captain` state and `setCaptain` to its children.

## Usage
Wrap your app with `<CaptainContext>` and use `useContext(CaptainDataContext)` in child components to access or update captain data.
