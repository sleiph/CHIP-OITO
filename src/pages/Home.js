import React, { useState } from 'react';

import Tela from '../components/Tela';
import Debug from '../components/Debug';
import Teclado from '../components/Teclado';
import Apontador from '../services/Apontador';
import Display from '../services/Display';
import Memoria from '../services/Memoria';
import Registros from '../services/Registros';

import styled from 'styled-components'

// CSS
const Container = styled.div`
  width: 90vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background-color: #63bda4;
`
const Cartucho = styled.div`
  height: 4vh;
  background-color: #f20553;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`

function Home(  ) {

  // hooks
  const[registradores, setRegistradores] = useState(Registros.registradores);
  const [display, setDisplay] = useState(Display.original);
  const [indice, setIndice] = useState(0);
  const [timers, setTimers] = useState([0, 0]);
  const [instrucao, setInstrucao] = useState([512, '----']);

  // tratamento da entrada de arquivo (rom)
  let fileReader;
  /// trata e manda o arquivo pra ser interpretado
  const handleFileRead = (e) => {
    const buffer = fileReader.result;
    // transforma o arquivo em instrucoes
    Memoria.CarregaInstrucoes(buffer);
    Apontador.Comecar(setRegistradores, setDisplay, setIndice, setTimers, setInstrucao);
  };
  /// lê o arquivo carregado pelo usuario
  const handleFileChosen = (arquivo) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsArrayBuffer(arquivo);
  };

  return (
    <Container>
      <Cartucho>
        <input
          type='file'
          id='file'
          accept='.rom,.ch8'
          onChange={e => handleFileChosen(e.target.files[0])}
        />
        <Debug
          registradores={registradores}
          indice={indice}
          timers={timers}
          instrucao={instrucao}
        />
      </Cartucho>

      <Tela display={display} setDisplay={setDisplay} />
      <Teclado />
      
    </Container>
  )
}

export default Home;