import React, { useContext } from "react";
import styled from "styled-components";
import { colors, fonts } from "../styles/colors";
import { DataContext } from "../storage/DataContext";

const Header = () => {
  const { handleClickAdmin, isAdmin, setIsAdmin } = useContext(DataContext);

  return (
    <HeaderContainer>
      <Logo>SIGNIFIFA</Logo>
      {!isAdmin ? (
        <AdminAccessButton type="button" onClick={handleClickAdmin}>
          Admin Access
        </AdminAccessButton>
      ) : (
        <AdminAccessButton type="button" onClick={() => setIsAdmin(!isAdmin)}>
          Logout
        </AdminAccessButton>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  padding: 30px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.linen};
  z-index: 10;
`;

const Logo = styled.h1`
  font-family: ${fonts.rubik};
  font-size: 50px;
  color: ${colors.orange};
`;

const AdminAccessButton = styled.button`
  font-family: ${fonts.josefin};
  font-size: 15px;
  font-weight: 700;
  border: none;
  border-radius: 30px;
  color: ${colors.linen};
  background-color: ${colors.orange};
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.sealBrown};
  }
`;

export default Header;
