import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fifaData, setFifaData] = useState([]);
  const [team, setTeam] = useState({});

  return (
    <DataContext.Provider
      value={{
        fifaData,
        setFifaData,
        team,
        setTeam,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
