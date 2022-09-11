import React from 'react';
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
let Path = Opening;

setTimeout(() => {
  console.log("devia ter mudado");
  Path = Home;
  App();
}, "2000")

function App() {
  console.log(Path);
  return (
    <AppDiv>
        <Path />
    </AppDiv>
  );
}

export default App; 
