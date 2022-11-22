import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../storage/DataContext";
import { colors, fonts } from "../styles/colors";
import { ReactComponent as RemoveSvg } from "../images/remove.svg";

const Teams = ({ fifaData, setFifaData }) => {
  const removeTeam = (id) => {
    const newTeams = fifaData.filter((team) => team.id !== id);
    setFifaData(newTeams);
  };

  return (
    <TeamsContainer>
      <Divider></Divider>
      <Table>
        <Thead>
          <TheadRow>
            <TheadHeader>Team</TheadHeader>
            <TheadHeader>Member1</TheadHeader>
            <TheadHeader>Member2</TheadHeader>
            <TheadHeader></TheadHeader>
          </TheadRow>
        </Thead>
        <Tbody>
          {fifaData.length > 0 &&
            fifaData.map((team) => {
              return (
                <TbodyRow key={team.id}>
                  <TbodyHeader>{team.teamName}</TbodyHeader>
                  <TbodyHeader>{team.members.firstMember}</TbodyHeader>
                  <TbodyHeader>{team.members.secondMember}</TbodyHeader>
                  <TbodyHeader>
                    <SvgButton
                      type="button"
                      onClick={() => removeTeam(team.id)}
                    >
                      <RemoveSvg />
                    </SvgButton>
                  </TbodyHeader>
                </TbodyRow>
              );
            })}
        </Tbody>
      </Table>
      {!fifaData.length > 0 && <NoTeam>No Team created</NoTeam>}
    </TeamsContainer>
  );
};

const TeamsContainer = styled.div`
  width: 100%;
`;

const Divider = styled.div`
  height: 3px;
  background: ${colors.sealBrown};
  margin: 20px 0 10px 0;
  border-radius: 30px;
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
  border-radius: 30px;
`;

const TheadHeader = styled.th`
  padding: 0px 5px 10px 5px;
  text-align: start;
  vertical-align: middle;
`;

const TbodyRow = styled.tr``;

const TbodyHeader = styled.th`
  padding: 5px;
  text-align: start;
  vertical-align: middle;
  font-weight: 400;
  text-transform: capitalize;
  width: 30%;

  &:last-child {
    text-align: end;
    width: 10%;
  }
`;

const SvgButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const NoTeam = styled.p`
  padding: 20px 0px 10px;
  text-align: center;
  color: grey;
`;

export default Teams;
