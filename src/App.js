import styled from "styled-components";
import Header from "./components/Header";
import CreateTeam from "./components/CreateTeam";
import ScoreBoard from "./components/ScoreBoard";
import AdminModal from "./components/AdminModal";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <CreateTeam />
        <ScoreBoard />
      </ContentContainer>
      <AdminModal />
    </AppContainer>
  );
};

const AppContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 110px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 935px) {
    flex-direction: column;
  }
`;

export default App;
