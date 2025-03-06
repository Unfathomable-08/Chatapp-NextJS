"use client";

import { createContext, useContext, useState } from "react";

const UserData = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({});

  return (
    <UserData.Provider value={[ userData, setUserData ]}>
      {children}
    </UserData.Provider>
  );
}

export function useUserContext() {
  return useContext(UserData);
}
