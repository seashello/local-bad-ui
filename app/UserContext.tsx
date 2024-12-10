'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import internal from 'stream';

interface User {
  name: string;
  birthday: string;
  favoriteColor: string;
  startTime: string;
  endTime: string;
  colorScore: number;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: '', birthday: '', favoriteColor: '', startTime: '', endTime: '', colorScore: 0});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
