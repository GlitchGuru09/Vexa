import { React, useState, createContext } from 'react'

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: '',
      lastname: ''
    },
    email: ''
  });
  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default CaptainContext;
