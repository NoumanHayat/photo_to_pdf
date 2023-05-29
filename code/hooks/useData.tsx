/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext, useState } from 'react';
export const DataContext = React.createContext({});
export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const Testing = async () => {
    console.log('Code');
  }
  const contextValue = {
    Testing
  };
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
