import Home from './pages/Home'

import styled from 'styled-components'

const AppDiv = styled.div`
  height: 100vh;
  background: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <AppDiv>
      <Home />
    </AppDiv>
  );
}

export default App;
