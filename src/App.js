import React, { useState } from 'react';

import Home from './pages/Home';
import Opening from './pages/Opening';
import styled from 'styled-components';
import Inputs from './services/Inputs';

const AppDiv = styled.div`
  height: 100vh;
  background: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
`

let firstKey = false;

function App() {
  const [instrucoes, setInstrucoes] = useState(true);

  // ouve o teclado
  document.addEventListener('keydown', (event) => {
    setInstrucoes(false);
    if (!Inputs.apertando) {
      if (event.key === 'p')
        Inputs.redSignal();
      else if (event.key === 'ArrowRight')
        Inputs.proximo();
      else if (event.key === 'o' && firstKey){
        window.location.reload();
      }
      else {
        Inputs.Teclou(event.key);
      }
      Inputs.apertando = true;
      firstKey = true;
    }
  });
  document.addEventListener('keyup', (event) => {
    Inputs.apertando = false;
    Inputs.apertada = '';
  });

  return (
    <AppDiv>
        { instrucoes ? <Opening/> : <Home/> }
    </AppDiv>
  );
}

export default App; 
