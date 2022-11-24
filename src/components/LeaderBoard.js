import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";

const LeaderBoard = ({ teamsData }) => {
  const sortedTeams = teamsData
    .sort((teamX, teamY) => teamY.points - teamX.points)
    .filter((team) => team.points > 0 || team.lost > 0);

  const rankArr = sortedTeams.map(
    (team, index, teams) =>
      teams.filter((squad) => squad.points > team.points).length + 1
  );

  return (
    <TopContainer>
      <MainTitle>Leader Board</MainTitle>
      <Table>
        <Thead>
          <TheadRow>
            <TheadHeader>#</TheadHeader>
            <TheadLargeHeader>Team</TheadLargeHeader>
            <TheadHeader>Won</TheadHeader>
            <TheadHeader>Tie</TheadHeader>
            <TheadHeader>Lost</TheadHeader>
            <TheadHeader>Points</TheadHeader>
          </TheadRow>
        </Thead>
        {sortedTeams.length > 0 && (
          <Tbody>
            {teamsData.length > 0 &&
              sortedTeams.slice(0, 3).map((team, index) => {
                return (
                  <TbodyRow key={index}>
                    <TbodyHeader rank={rankArr[index]}>
                      {rankArr[index]}
                    </TbodyHeader>
                    <TbodyHeader>{team.teamName}</TbodyHeader>
                    <TbodyHeader>{team.won}</TbodyHeader>
                    <TbodyHeader>{team.tie}</TbodyHeader>
                    <TbodyHeader>{team.lost}</TbodyHeader>
                    <TbodyHeader>{team.points}</TbodyHeader>
                  </TbodyRow>
                );
              })}
          </Tbody>
        )}
      </Table>
      {!sortedTeams.length > 0 && <NoTeam>No team listed</NoTeam>}
    </TopContainer>
  );
};

const TopContainer = styled.div`
  width: 100%;
`;

const MainTitle = styled.h2`
  color: ${colors.black};
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 20px;
`;

const Thead = styled.thead`
  width: 100%;
`;

const Tbody = styled.tbody`
  width: 100%;
`;

const TheadRow = styled.tr`
  border-bottom: 3px solid ${colors.sealBrown};
  border-top: 3px solid ${colors.sealBrown};
`;

const TheadHeader = styled.th`
  padding: 10px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: 14%;
`;

const TheadLargeHeader = styled.th`
  padding: 10px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: 30%;
`;

const TbodyRow = styled.tr`
  &:not(:last-child) {
    box-shadow: 0 4px 6px -6px ${colors.sealBrown};
  }
`;

const TbodyHeader = styled.th`
  padding: 5px;
  text-align: start;
  vertical-align: middle;
  font-weight: 400;
  text-transform: lowercase;
  height: 36px;
`;

const NoTeam = styled.p`
  padding: 60px 0px 10px;
  text-align: center;
  color: ${colors.grey};
`;

export default LeaderBoard;
