import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { DataContext } from "../storage/DataContext";
import { colors, fonts } from "../styles/colors";
import { ReactComponent as RemoveSvg } from "../images/remove.svg";

const ScoreBoard = () => {
  const {
    teamsData,
    selectedTeams,
    setSelectedTeams,
    matchesData,
    setMatchesData,
    matchInputErrorMessage,
    setMatchInputErrorMessage,
  } = useContext(DataContext);

  const firstSelectRef = useRef();
  const secondSelectRef = useRef();

  const initialValues = {
    teamA: "",
    teamB: "",
    teamAScore: 0,
    teamBScore: 0,
  };

  useEffect(() => {
    if (teamsData.length > 0) {
      setMatchInputErrorMessage("");
    }
  }, [teamsData]);

  const handleChangeTeamA = (e) => {
    const value = e.target.value;
    const selectedValue = teamsData.filter(
      (team) => team.teamName === value
    )[0];
    setSelectedTeams({ ...selectedTeams, teamA: selectedValue });
    setMatchInputErrorMessage("");
  };

  const handleChangeTeamB = (e) => {
    const value = e.target.value;
    const selectedValue = teamsData.filter(
      (team) => team.teamName === value
    )[0];
    setSelectedTeams({ ...selectedTeams, teamB: selectedValue });
    setMatchInputErrorMessage("");
  };

  const removeMatch = (id) => {
    const newMatches = matchesData.filter((match) => match.id !== id);
    setMatchesData(newMatches);
  };

  const handleSubmitMatch = () => {
    if (!teamsData.length > 0) {
      setMatchInputErrorMessage("No teams available");
      console.log("No teams available");
    } else if (!selectedTeams.teamA || !selectedTeams.teamB) {
      setMatchInputErrorMessage("Please select all required fields");
      console.log("Please select all required fields");
    } else if (selectedTeams.teamA === selectedTeams.teamB) {
      setMatchInputErrorMessage("Please select two different teams");
      console.log("Please select two different teams");
    } else {
      setMatchesData([
        ...matchesData,
        {
          ...initialValues,
          id: Date.now() * Math.floor(Math.random() * 100),
          teamA: selectedTeams.teamA,
          teamB: selectedTeams.teamB,
        },
      ]);
      setSelectedTeams({});
      firstSelectRef.current.value = "default";
      secondSelectRef.current.value = "default";
    }
  };

  console.log(matchesData);

  return (
    <TopContainer>
      <MainTitle>Score Board</MainTitle>
      <SubTitle>Create your match</SubTitle>
      <InputsContainer>
        <InputContainer>
          <Select onChange={(e) => handleChangeTeamA(e)} ref={firstSelectRef}>
            <option hidden value="default">
              Select team
            </option>
            {teamsData.map((team, index) => {
              return (
                <option key={index} value={team.teamName}>
                  {team.teamName.charAt(0).toUpperCase() +
                    team.teamName.slice(1)}
                </option>
              );
            })}
          </Select>
        </InputContainer>
        <OpposedTo>vs</OpposedTo>
        <InputContainer>
          <Select onChange={(e) => handleChangeTeamB(e)} ref={secondSelectRef}>
            <option hidden value="default">
              Select team
            </option>
            {teamsData.map((team, index) => {
              return (
                <option key={index} value={team.teamName}>
                  {team.teamName.charAt(0).toUpperCase() +
                    team.teamName.slice(1)}
                </option>
              );
            })}
          </Select>
        </InputContainer>
        <MatchButton type="button" onClick={() => handleSubmitMatch()}>
          Create Match
        </MatchButton>
      </InputsContainer>
      <ErrorMessage errorMessage={matchInputErrorMessage.length > 0}>
        {matchInputErrorMessage}
      </ErrorMessage>
      <TableContainer>
        <Table>
          <Thead>
            <TheadRow>
              <TheadHeader>Team Name</TheadHeader>
              <TheadHeader>Members</TheadHeader>
              <TheadHeader>Score</TheadHeader>
              <TheadHeader></TheadHeader>
              <TheadHeader></TheadHeader>
            </TheadRow>
          </Thead>
          {matchesData.length > 0 &&
            matchesData.map((match) => {
              return (
                <Tbody key={match.id}>
                  <TbodyRow>
                    <TbodyHeader>{match.teamA.teamName}</TbodyHeader>
                    <TbodyHeader>
                      {match.teamA.members.firstMember},{" "}
                      {match.teamA.members.secondMember}
                    </TbodyHeader>
                    <TbodyHeader>
                      <ScoreButton type="button">+</ScoreButton>
                      {match.teamAScore}
                      <ScoreButton type="button">-</ScoreButton>
                    </TbodyHeader>
                    <TbodyHeader rowSpan={2}>
                      <FinishButton>Finish</FinishButton>
                    </TbodyHeader>
                    <TbodyHeader rowSpan={2}>
                      <SvgButton
                        type="button"
                        onClick={() => removeMatch(match.id)}
                      >
                        <RemoveSvg />
                      </SvgButton>
                    </TbodyHeader>
                  </TbodyRow>
                  <TbodyRow>
                    <TbodyHeader>{match.teamB.teamName}</TbodyHeader>
                    <TbodyHeader>
                      {match.teamB.members.firstMember},{" "}
                      {match.teamB.members.secondMember}
                    </TbodyHeader>
                    <TbodyHeader>
                      <ScoreButton type="button">+</ScoreButton>
                      {match.teamBScore}
                      <ScoreButton type="button">-</ScoreButton>
                    </TbodyHeader>
                  </TbodyRow>
                </Tbody>
              );
            })}
        </Table>
        {!matchesData.length > 0 && <NoMatch>No match created</NoMatch>}
      </TableContainer>
    </TopContainer>
  );
};

const TopContainer = styled.section`
  width: 60%;
  margin: 20px 10px 15px 10px;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid ${colors.orange};
  box-sizing: border-box;
  background-color: ${colors.white};
  max-height: 795px;
  height: 795px;
`;

const MainTitle = styled.h2`
  color: ${colors.black};
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
`;

const SubTitle = styled.h3`
  color: ${colors.orange};
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
`;

const InputsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: "*";
    display: inline-block;
    position: absolute;
    width: 10px;
    height: 10px;
    color: ${colors.red};
    top: 0;
    right: -8px;
  }
`;

const OpposedTo = styled.span`
  color: ${colors.grey};
  margin: 0 5px;
`;

const Select = styled.select`
  min-width: 150px;
  min-height: 30px;
  border-radius: 30px;
  text-align: center;
  border: 2px solid ${colors.black};
  font-family: ${fonts.josefin};

  &:focus {
    border: 2px solid ${colors.orange};
  }
`;

const MatchButton = styled.button`
  margin-left: 20px;
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

  &:hover {
    background-color: ${colors.sealBrown};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.red};
  text-align: center;
  margin-top: 5px;
  height: 16px;
  visibility: ${({ errorMessage }) => (errorMessage ? "visible" : "hidden")};
`;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-y: auto;
  max-height: 300px;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
`;

const Thead = styled.thead`
  width: 100%;
`;

const Tbody = styled.tbody`
  width: 100%;
  box-shadow: 0 4px 6px -6px ${colors.sealBrown};
`;

const TheadRow = styled.tr``;

const TheadHeader = styled.th`
  padding: 10px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: 30%;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${colors.white};
  border-bottom: 2px solid ${colors.sealBrown};
  border-top: 2px solid ${colors.sealBrown};

  &:last-child {
    text-align: end;
    width: 10%;
  }
`;

const FinishButton = styled.button`
  text-align: start;
  vertical-align: middle;
  border: none;
  background-color: ${colors.orange};
  color: ${colors.linen};
  font-family: ${fonts.josefin};
  border-radius: 30px;
  cursor: pointer;
  padding: 3px;

  &:hover {
    background-color: ${colors.sealBrown};
  }
`;

const TbodyRow = styled.tr``;

const TbodyHeader = styled.th`
  padding: 5px;
  text-align: start;
  vertical-align: middle;
  font-weight: 400;
  text-transform: lowercase;
`;

const ScoreButton = styled.button`
  border-radius: 15px;
  text-align: center;
  vertical-align: middle;
  border: none;
  background-color: ${colors.orange};
  color: ${colors.linen};
  font-family: ${fonts.josefin};
  font-size: 20px;
  width: 25px;
  margin: 0 3px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.sealBrown};
  }
`;

const SvgButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    fill: ${colors.sealBrown};
  }
`;

const NoMatch = styled.p`
  padding: 100px 0px 10px;
  text-align: center;
  color: ${colors.grey};
`;

export default ScoreBoard;
