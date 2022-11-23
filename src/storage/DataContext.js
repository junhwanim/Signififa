import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [teamsData, setTeamsData] = useState([]);
  const [teamInputErrorMessage, setTeamInputErrorMessage] = useState("");
  const [currentTeam, setCurrentTeam] = useState({});

  const [selectedTeams, setSelectedTeams] = useState({});
  const [matchesData, setMatchesData] = useState([]);
  const [matchInputErrorMessage, setMatchInputErrorMessage] = useState("");

  return (
    <DataContext.Provider
      value={{
        teamsData,
        setTeamsData,
        currentTeam,
        setCurrentTeam,
        teamInputErrorMessage,
        setTeamInputErrorMessage,
        selectedTeams,
        setSelectedTeams,
        matchesData,
        setMatchesData,
        matchInputErrorMessage,
        setMatchInputErrorMessage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
