import React, { useContext } from "react";
import { DataContext } from "../storage/DataContext";
import styled from "styled-components";
import { colors, fonts } from "../styles/colors";
import { CgClose } from "react-icons/cg";

const AdminModal = () => {
  const {
    isAdminVisible,
    setIsAdminVisible,
    handleClickAdmin,
    adminCode,
    setAdminCode,
    isAdmin,
    setIsAdmin,
    adminInputErrorMessage,
    setAdminInputErrorMessage,
  } = useContext(DataContext);

  const handleChangeAdminCode = (e) => {
    setAdminCode(e.target.value);
    setAdminInputErrorMessage("");
  };

  const handleSubmitAdminCode = (e) => {
    if (!adminCode.length > 0) {
      setAdminInputErrorMessage("Please enter code");
    } else if (adminCode != 1234) {
      setAdminInputErrorMessage("code is incorrect");
    } else {
      setIsAdmin(!isAdmin);
      setAdminCode("");
      setIsAdminVisible(!isAdminVisible);
    }
  };

  return (
    <Container>
      {isAdminVisible && (
        <StyledOverlay
          onClick={(e) => {
            e.preventDefault();
            setIsAdminVisible(false);
          }}
        />
      )}
      <PopupCartContainer isAdminVisible={isAdminVisible}>
        <StyledCloseContainer
          onClick={handleClickAdmin}
          // onKeyDown={handleKeyDown}
          role={"button"}
          tabIndex={0}
          aria-label={`Close popup cart`}
        >
          <CgClose />
        </StyledCloseContainer>
        <InputContainer>
          <Label htmlFor="admin-code">Enter admin code</Label>
          <Input
            name="admin-code"
            id="admin-code"
            type="password"
            maxLength={4}
            value={adminCode || ""}
            onChange={(e) => handleChangeAdminCode(e)}
          ></Input>
          <ErrorMessage errorMessage={adminInputErrorMessage.length > 0}>
            {adminInputErrorMessage}
          </ErrorMessage>
          <Button type="button" onClick={(e) => handleSubmitAdminCode(e)}>
            Access
          </Button>
        </InputContainer>
      </PopupCartContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const PopupCartContainer = styled.div`
  position: absolute;
  z-index: 999;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translate(50%, -50%);
  transition: 0.4s ease-in-out;
  opacity: ${({ isAdminVisible }) => (isAdminVisible ? "100%" : "0")};
  right: ${({ isAdminVisible }) => (isAdminVisible ? "50%" : "-100%")};
  isolation: isolate;
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StyledCloseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  background-color: ${colors.orange};
  font-size: 30px;
  position: absolute;
  top: 18px;
  right: 15px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.sealBrown};
  }
`;

const InputContainer = styled.div`
  width: 350px;
  height: 350px;
  background-color: ${colors.linen};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 2px solid ${colors.orange};
`;

const Label = styled.label`
  font-size: 25px;
  color: ${colors.orange};

  &:after {
    content: "*";
    color: ${colors.red};
  }
`;

const Input = styled.input`
  margin: 10px 0;
  width: 200px;
  height: 40px;
  border-radius: 30px;
  border: 2px solid ${colors.black};
  outline: none;
  text-align: center;
  font-size: 30px;

  &:focus {
    border: 2px solid ${colors.orange};
  }
`;

const ErrorMessage = styled.p`
  color: ${colors.red};
  visibility: ${({ errorMessage }) => (errorMessage ? "visible" : "hidden")};
  height: 20px;
`;

const Button = styled.button`
  font-family: ${fonts.josefin};
  font-size: 20px;
  height: 40px;
  border-radius: 30px;
  background-color: ${colors.orange};
  color: ${colors.linen};
  display: flex;
  align-items: center;
  padding: 10px;
  border: none;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: ${colors.sealBrown};
  }
`;

export default AdminModal;
