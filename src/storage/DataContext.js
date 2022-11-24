import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [teamsData, setTeamsData] = useState([]);
  const [teamInputErrorMessage, setTeamInputErrorMessage] = useState("");
  const [currentTeam, setCurrentTeam] = useState({});

  const [selectedTeams, setSelectedTeams] = useState({});
  const [matchesData, setMatchesData] = useState([]);
  const [matchInputErrorMessage, setMatchInputErrorMessage] = useState("");

  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [adminInputErrorMessage, setAdminInputErrorMessage] = useState("");

  const handleClickAdmin = () => {
    setIsAdminVisible(!isAdminVisible);
  };

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
        setMatchInputErrorMessage,
        setIsAdminVisible,
        isAdminVisible,
        handleClickAdmin,
        adminCode,
        setAdminCode,
        isAdmin,
        setIsAdmin,
        adminInputErrorMessage,
        setAdminInputErrorMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
