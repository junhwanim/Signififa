import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../styles/colors";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>SIGNIFIFA</Logo>
      <AdminAccessButton type="button">Admin Access</AdminAccessButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
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
`;

export default Header;
