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
let where = "Opening";

setTimeout(() => {
  where = "Home";
  App();
}, "5000")

const Path = () => {
  if (where == "Opening") {
    return <Opening/>
  }  else {
    console.log("segundo");
    return <Home/>
  }
}

function App() {
  return (
    <AppDiv>
        {Path()}
    </AppDiv>
  );
}

export default App; 
