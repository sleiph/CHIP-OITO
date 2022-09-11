import Home from './pages/Home'
import Opening from './pages/Opening'

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
      <Opening />
    </AppDiv>
  );
}

export default App;
