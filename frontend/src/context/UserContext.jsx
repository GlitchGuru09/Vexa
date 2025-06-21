//
// This file defines a React Context for managing and sharing user-related data across the application.
// It provides a centralized way to store and update user information, making it accessible to any component
// within the application that consumes this context.
//
// - UserDataContext: React Context for user data and updater function.
// - UserContext: Provider component that supplies user state and setUser to its children.
// - Usage: Wrap your app with <UserContext> and use useContext(UserDataContext) in child components.
//
// This enables centralized and scalable user state management across the app.
//

import {React, useState, createContext} from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: ''
    });
  return (
    <div>
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
