import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../storage/DataContext";
import { colors, fonts } from "../styles/colors";
import Teams from "./Teams";

const ScoreBoard = () => {
  const { fifaData, setFifaData, team, setTeam } = useContext(DataContext);

  let initialData = {
    id: "",
    teamName: "",
    won: 0,
    lost: 0,
    tie: 0,
    points: 0,
    members: [],
  };

  const handleChangeTeam = (e) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
  };

  const handleSubmitTeam = () => {
    setFifaData([
      ...fifaData,
      {
        ...initialData,
        id: team.teamName,
        teamName: team.teamName,
        members: {
          firstMember: team.firstMember,
          secondMember: team.secondMember,
        },
      },
    ]);
    setTeam({});
  };

  return (
    <>
      <MainTitle>Team Board</MainTitle>
      <ScoreBoardContainer>
        <CreateTeamContainer>
          <InputContainer>
            <Label htmlFor="team-name">Team Name:</Label>
            <Input
              type="text"
              name="teamName"
              id="team-name"
              value={team.teamName || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="first-member-name">Member2 Name:</Label>
            <Input
              type="text"
              name="firstMember"
              id="first-member-name"
              value={team.firstMember || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="second-member-name">Member2 Name:</Label>
            <Input
              type="text"
              name="secondMember"
              id="second-member-name"
              value={team.secondMember || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <CreateTeamButton type="button" onClick={handleSubmitTeam}>
            Create Team
          </CreateTeamButton>
        </CreateTeamContainer>
        <Teams fifaData={fifaData} setFifaData={setFifaData}/>
      </ScoreBoardContainer>
    </>
  );
};

const MainTitle = styled.h2`
  color: ${colors.black};
  font-size: 30px;
`;

const ScoreBoardContainer = styled.section`
  width: 40%;
  margin: 15px 30px 15px 30px;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid ${colors.orange};
  box-sizing: border-box;
  max-width: 1000px;
  background-color: ${colors.white};
`;

const CreateTeamContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 20px;
`;

const Input = styled.input`
  background-color: transparent;
  border: 2px solid ${colors.black};
  border-radius: 30px;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 100%;
`;

const CreateTeamButton = styled.button`
  margin-top: 20px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  font-family: ${fonts.josefin};
  border: none;
  background-color: ${colors.orange};
  color: ${colors.linen};
  box-sizing: border-box;
  padding: 15px;
  cursor: pointer;
  flex: 1;
  width: 100%;
`;

export default ScoreBoard;
