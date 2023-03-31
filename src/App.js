import styled from 'styled-components'
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from './components/GistList';

const App = () => {
  return (
    <Wrapper className="App" data-testid="app">
      <Header />
      {/* To display the list of public and user gist */}
      <GistList />
      <GlobalStyles />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
