import styled from "styled-components";
import Header from "./components/Header";
import ScoreBoard from "./components/TeamBoard";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <ScoreBoard />
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

export default App;
