import styled from "styled-components";
import Header from "./components/Header";
import CreateTeam from "./components/CreateTeam";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <CreateTeam />
        <ScoreBoard />
      </ContentContainer>
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
display: flex;
justify-content: center;
`;

export default App;
