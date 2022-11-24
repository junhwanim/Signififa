import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../storage/DataContext";
import { colors, fonts } from "../styles/colors";
import TeamBoard from "./TeamBoard";

const CreateTeam = () => {
  const {
    teamsData,
    setTeamsData,
    currentTeam,
    setCurrentTeam,
    teamInputErrorMessage,
    setTeamInputErrorMessage,
    isAdmin,
  } = useContext(DataContext);

  let initialValues = {
    id: "",
    teamName: "",
    won: 0,
    lost: 0,
    tie: 0,
    points: 0,
    members: [],
  };

  const handleChangeTeam = (e) => {
    setTeamInputErrorMessage("");
    const { name, value } = e.target;
    setCurrentTeam({ ...currentTeam, [name]: value.toLowerCase() });
  };

  const handleSubmitTeam = () => {
    const arrayTeamNames = teamsData?.map((team) =>
      team.teamName.toLowerCase().replace(" ", "")
    );
    if (
      arrayTeamNames.includes(
        currentTeam.teamName?.toLowerCase().replace(" ", "")
      )
    ) {
      setTeamInputErrorMessage("The team name already used");
    } else if (
      !currentTeam.teamName?.length > 0 ||
      !currentTeam.firstMember?.length > 0
    ) {
      setTeamInputErrorMessage("Please fill all required fields");
    } else {
      setTeamsData([
        ...teamsData,
        {
          ...initialValues,
          id: currentTeam.teamName,
          teamName: currentTeam.teamName,
          members: {
            firstMember: currentTeam.firstMember,
            secondMember: currentTeam.secondMember,
          },
        },
      ]);
      setCurrentTeam({});
      setTeamInputErrorMessage("");
    }
  };

  return (
    <>
      <TopContainer>
        <MainTitle>Make Your Team</MainTitle>
        <CreateTeamContainer>
          <InputContainer>
            <Label htmlFor="team-name">
              Team Name<RequiredField>*</RequiredField>
            </Label>
            <Input
              type="text"
              name="teamName"
              id="team-name"
              value={currentTeam.teamName || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="first-member-name">
              Member 1 Name<RequiredField>*</RequiredField>
            </Label>
            <Input
              type="text"
              name="firstMember"
              id="first-member-name"
              value={currentTeam.firstMember || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="second-member-name">
              Member 2 Name<OptionalField>(optional)</OptionalField>
            </Label>
            <Input
              type="text"
              name="secondMember"
              id="second-member-name"
              value={currentTeam.secondMember || ""}
              onChange={handleChangeTeam}
            />
          </InputContainer>
          <InputErrorMessage errorMessage={teamInputErrorMessage.length > 0}>
            {teamInputErrorMessage}
          </InputErrorMessage>
          <CreateTeamButton
            type="button"
            onClick={handleSubmitTeam}
            disabled={teamsData.length >= 8}
          >
            {teamsData.length >= 8
              ? "Maximum team number reached"
              : "Create Team"}
          </CreateTeamButton>
        </CreateTeamContainer>
        <TeamBoard
          teamsData={teamsData}
          setTeamsData={setTeamsData}
          isAdmin={isAdmin}
        />
      </TopContainer>
    </>
  );
};

const TopContainer = styled.section`
  width: 40%;
  margin: 10px;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid ${colors.orange};
  box-sizing: border-box;
  background-color: ${colors.white};
  max-height: 795px;
  height: 795px;

  @media screen and (max-width: 935px) {
    width: 100%;
  }
`;

const MainTitle = styled.h2`
  color: ${colors.black};
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
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
  padding: 10px 10px 0 10px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 20px;
`;

const RequiredField = styled.span`
  color: ${colors.red};
`;

const OptionalField = styled.span`
  font-size: 15px;
  margin-left: 5px;
  color: ${colors.grey};
`;

const Input = styled.input`
  background-color: transparent;
  border: 2px solid ${colors.black};
  border-radius: 30px;
  height: 40px;
  padding: 8px 10px;
  box-sizing: border-box;
  display: flex;
  font-family: ${fonts.josefin};
  font-size: 16px;
  flex: 1;
  width: 100%;
  outline: none;

  &:focus {
    border: 2px solid ${colors.orange};
  }
`;

const CreateTeamButton = styled.button`
  margin-top: 10px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  font-family: ${fonts.josefin};
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? `${colors.grey}` : `${colors.orange}`};
  color: ${colors.linen};
  box-sizing: border-box;
  padding: 15px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  flex: 1;
  width: 100%;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? `${colors.grey}` : `${colors.sealBrown}`};
  }
`;

const InputErrorMessage = styled.p`
  color: ${colors.red};
  text-align: center;
  margin-top: 5px;
  height: 16px;
  visibility: ${({ errorMessage }) => (errorMessage ? "visible" : "hidden")};
`;

export default CreateTeam;
