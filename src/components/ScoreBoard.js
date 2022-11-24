import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { DataContext } from "../storage/DataContext";
import { colors, fonts } from "../styles/colors";
import { ReactComponent as RemoveSvg } from "../images/remove.svg";
import LeaderBoard from "./LeaderBoard";

const ScoreBoard = () => {
  const {
    teamsData,
    setTeamsData,
    selectedTeams,
    setSelectedTeams,
    matchesData,
    setMatchesData,
    matchInputErrorMessage,
    setMatchInputErrorMessage,
    isAdmin,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsData]);

  const handleChangeTeam = (e) => {
    const { name, value } = e.target;
    const selectedValue = teamsData.filter(
      (team) => team.teamName === value
    )[0];
    setSelectedTeams({ ...selectedTeams, [name]: selectedValue });
    setMatchInputErrorMessage("");
  };

  const updateScore = (action, match, teamScore) => {
    const score = match[teamScore];
    if (score === 0 && action === "subtract") return;
    const newScore = action === "add" ? score + 1 : score - 1;

    setMatchesData((currentGames) => {
      return currentGames.map((game) => {
        if (game.id === match.id) {
          return { ...game, [teamScore]: newScore };
        }
        return game;
      });
    });
  };

  const finishMatch = (match) => {
    const winnerId =
      match.teamAScore > match.teamBScore ? match.teamA.id : match.teamB.id;
    const loserId =
      match.teamAScore > match.teamBScore ? match.teamB.id : match.teamA.id;

    if (match.teamAScore !== match.teamBScore) {
      setMatchesData((currentGames) => {
        return currentGames.map((game) => {
          if (game.id === match.id) {
            return {
              ...game,
              gameEnd: !game.gameEnd,
            };
          }
          return game;
        });
      });
      setTeamsData((currentTeams) => {
        return currentTeams.map((team) => {
          if (team.id === winnerId) {
            return {
              ...team,
              won: team.won + 1,
              points: team.points + 3,
            };
          }
          if (team.id === loserId) {
            return {
              ...team,
              lost: team.lost + 1,
            };
          }
          return team;
        });
      });
    } else {
      setMatchesData((currentGames) => {
        return currentGames.map((game) => {
          if (game.id === match.id) {
            return {
              ...game,
              gameEnd: !game.gameEnd,
            };
          }
          return game;
        });
      });
      setTeamsData((currentTeams) => {
        return currentTeams.map((team) => {
          if (team.id === match.teamA.id) {
            return {
              ...team,
              tie: team.tie + 1,
              points: team.points + 1,
            };
          }
          if (team.id === match.teamB.id) {
            return {
              ...team,
              tie: team.tie + 1,
              points: team.points + 1,
            };
          }
          return team;
        });
      });
    }
  };

  const removeMatch = (id) => {
    const newMatches = matchesData.filter((match) => match.id !== id);
    setMatchesData(newMatches);
  };

  const handleSubmitMatch = () => {
    if (!teamsData.length > 0) {
      setMatchInputErrorMessage("No teams available");
    } else if (!selectedTeams.teamA || !selectedTeams.teamB) {
      setMatchInputErrorMessage("Please select all required fields");
    } else if (selectedTeams.teamA === selectedTeams.teamB) {
      setMatchInputErrorMessage("Please select two different teams");
    } else {
      setMatchesData([
        ...matchesData,
        {
          ...initialValues,
          id: Date.now() * Math.floor(Math.random() * 100),
          teamA: selectedTeams.teamA,
          teamB: selectedTeams.teamB,
          gameEnd: false,
        },
      ]);
      setSelectedTeams({});
      firstSelectRef.current.value = "default";
      secondSelectRef.current.value = "default";
    }
  };

  return (
    <TopContainer>
      <MainTitle>Score Board</MainTitle>
      <SubTitle>Create your match</SubTitle>
      <InputsContainer>
        <InputContainer>
          <Select
            name="teamA"
            onChange={(e) => handleChangeTeam(e)}
            ref={firstSelectRef}
          >
            <option hidden value="default">
              Select team
            </option>
            {teamsData.map((team, index) => {
              return (
                <option key={index} value={team.teamName}>
                  {team.teamName.toLowerCase()}
                </option>
              );
            })}
          </Select>
        </InputContainer>
        <OpposedTo>vs</OpposedTo>
        <InputContainer>
          <Select
            name="teamB"
            onChange={(e) => handleChangeTeam(e)}
            ref={secondSelectRef}
          >
            <option hidden value="default">
              Select team
            </option>
            {teamsData.map((team, index) => {
              return (
                <option key={index} value={team.teamName}>
                  {team.teamName.toLowerCase()}
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
              <TheadLargeHeader>Team Name</TheadLargeHeader>
              <TheadLargeHeader>Members</TheadLargeHeader>
              <TheadLargeHeader>Score</TheadLargeHeader>
              {isAdmin && <TheadHeader></TheadHeader>}
              {isAdmin && <TheadHeader></TheadHeader>}
            </TheadRow>
          </Thead>
          {matchesData?.length > 0 &&
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
                      {isAdmin && (
                        <ScoreButton
                          disabled={match.gameEnd}
                          type="button"
                          onClick={() =>
                            updateScore("add", match, "teamAScore")
                          }
                        >
                          +
                        </ScoreButton>
                      )}
                      <Score>{match.teamAScore}</Score>
                      {isAdmin && (
                        <ScoreButton
                          disabled={match.gameEnd}
                          type="button"
                          onClick={() =>
                            updateScore("subtract", match, "teamAScore")
                          }
                        >
                          -
                        </ScoreButton>
                      )}
                    </TbodyHeader>
                    {isAdmin && (
                      <TbodyHeader rowSpan={2}>
                        <FinishButton
                          disabled={match.gameEnd}
                          onClick={() => finishMatch(match)}
                        >
                          {match.gameEnd ? "Ended" : "End"}
                        </FinishButton>
                      </TbodyHeader>
                    )}
                    {isAdmin && (
                      <TbodyHeader rowSpan={2}>
                        <SvgButton
                          type="button"
                          onClick={() => removeMatch(match.id)}
                        >
                          <RemoveSvg />
                        </SvgButton>
                      </TbodyHeader>
                    )}
                  </TbodyRow>
                  <TbodyRow>
                    <TbodyHeader>{match.teamB.teamName}</TbodyHeader>
                    <TbodyHeader>
                      {match.teamB.members.firstMember},{" "}
                      {match.teamB.members.secondMember}
                    </TbodyHeader>
                    <TbodyHeader>
                      {isAdmin && (
                        <ScoreButton
                          disabled={match.gameEnd}
                          type="button"
                          onClick={() =>
                            updateScore("add", match, "teamBScore")
                          }
                        >
                          +
                        </ScoreButton>
                      )}
                      <Score>{match.teamBScore}</Score>
                      {isAdmin && (
                        <ScoreButton
                          disabled={match.gameEnd}
                          type="button"
                          onClick={() =>
                            updateScore("subtract", match, "teamBScore")
                          }
                        >
                          -
                        </ScoreButton>
                      )}
                    </TbodyHeader>
                  </TbodyRow>
                </Tbody>
              );
            })}
        </Table>
        {!matchesData?.length > 0 && <NoMatch>No match created</NoMatch>}
      </TableContainer>
      <LeaderBoard teamsData={teamsData} />
    </TopContainer>
  );
};

const TopContainer = styled.section`
  width: 60%;
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
  outline: none;
  cursor: pointer;

  &:hover {
    border: 2px solid ${colors.orange};
  }

  @media screen and (max-width: 935px) {
    min-width: 120px;
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

  @media screen and (max-width: 935px) {
    padding: 10px;
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
  max-height: 340px;
  height: 340px;
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

const TheadLargeHeader = styled.th`
  padding: 10px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: ${({ isAdmin }) => (isAdmin ? "26%" : "33%")};
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${colors.white};
  border-bottom: 3px solid ${colors.sealBrown};
  border-top: 3px solid ${colors.sealBrown};
`;

const TheadHeader = styled.th`
  padding: 10px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: ${({ isAdmin }) => (isAdmin ? "10%" : "0%")};
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${colors.white};
  border-bottom: 3px solid ${colors.sealBrown};
  border-top: 3px solid ${colors.sealBrown};

  &:last-child {
    text-align: ${({ isAdmin }) => (isAdmin ? "end" : "start")};
    width: ${({ isAdmin }) => (isAdmin ? "10%" : "33%")};
  }
`;

const FinishButton = styled.button`
  text-align: start;
  vertical-align: middle;
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? `${colors.grey}` : `${colors.orange}`};
  color: ${colors.linen};
  font-family: ${fonts.josefin};
  border-radius: 30px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  padding: 4px;

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? `${colors.grey}` : `${colors.sealBrown}`};
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
  background-color: ${({ disabled }) =>
    disabled ? `${colors.grey}` : `${colors.orange}`};
  color: ${colors.linen};
  font-family: ${fonts.josefin};
  font-size: 20px;
  width: 25px;
  margin: 0 3px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  visibility: ${({ disabled }) => (disabled ? "hidden" : "visible")};

  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? `${colors.grey}` : `${colors.sealBrown}`};
  }
`;

const Score = styled.p`
  display: inline-block;
  width: 10px;
  text-align: center;
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
