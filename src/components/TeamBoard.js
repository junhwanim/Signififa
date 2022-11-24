import React from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { ReactComponent as RemoveSvg } from "../images/remove.svg";

const TeamBoard = ({ teamsData, setTeamsData, isAdmin }) => {
  const removeTeam = (id) => {
    const newTeams = teamsData.filter((team) => team.id !== id);
    setTeamsData(newTeams);
  };

  return (
    <TopContainer>
      <MainTitle>Team Board</MainTitle>
      <Divider></Divider>
      <Table>
        <Thead>
          <TheadRow>
            <TheadHeader>Team</TheadHeader>
            <TheadHeader>Member 1</TheadHeader>
            <TheadHeader>Member 2</TheadHeader>
            {isAdmin && <TheadHeader></TheadHeader>}
          </TheadRow>
        </Thead>
        <Tbody>
          {teamsData.length > 0 &&
            teamsData.map((team, index) => {
              return (
                <TbodyRow key={index}>
                  <TbodyHeader>{team.teamName}</TbodyHeader>
                  <TbodyHeader>{team.members.firstMember}</TbodyHeader>
                  <TbodyHeader>{team.members.secondMember}</TbodyHeader>
                  {isAdmin && (
                    <TbodyHeader>
                      <SvgButton
                        type="button"
                        onClick={() => removeTeam(team.id)}
                      >
                        <RemoveSvg />
                      </SvgButton>
                    </TbodyHeader>
                  )}
                </TbodyRow>
              );
            })}
        </Tbody>
      </Table>
      {!teamsData.length > 0 && <NoTeam>No team created</NoTeam>}
    </TopContainer>
  );
};

const MainTitle = styled.h2`
  color: ${colors.black};
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
`;

const TopContainer = styled.div`
  width: 100%;
`;

const Divider = styled.div`
  height: 3px;
  background: ${colors.sealBrown};
  margin: 20px 0 10px 0;
`;

const Table = styled.table`
  width: 100%;
`;

const Thead = styled.thead`
  width: 100%;
`;

const Tbody = styled.tbody`
  width: 100%;
`;

const TheadRow = styled.tr`
  border-bottom: 3px solid ${colors.sealBrown};
`;

const TheadHeader = styled.th`
  padding: 0px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
  width: 33%;

  &:last-child {
    text-align: ${({ isAdmin }) => (isAdmin ? "end" : "start")};
    width: ${({ isAdmin }) => (isAdmin ? "10%" : "33%")};
  }
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
  height: 29.5px;
`;

const SvgButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    fill: ${colors.sealBrown};
  }
`;

const NoTeam = styled.p`
  padding: 100px 0px 10px;
  text-align: center;
  color: ${colors.grey};
`;

export default TeamBoard;
