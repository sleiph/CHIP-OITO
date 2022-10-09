import React, { useEffect, useState } from 'react';

import Tela from '../components/Tela';
import Debug from '../components/Debug';
import Teclado from '../components/Teclado';
import Apontador from '../services/Apontador';
import Display from '../services/Display';
import Inputs from '../services/Inputs';
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
  grid-template-columns: 1fr 1fr;
  align-items: center;
`
const BotaoDebug = styled.button`
  width: fit-content;
  justify-self: flex-end;
`

function Home(  ) {

  // hooks
  const [registradores, setRegistradores] = useState(Registros.registradores);
  const [display, setDisplay] = useState(Display.original);
  const [indice, setIndice] = useState(0);
  const [timers, setTimers] = useState([0, 0]);
  const [instrucao, setInstrucao] = useState([512, '----']);
  const [debug, setDebug] = useState(false);

  const handleDebug = () => {
    Display.debug = !Display.debug;
    setDebug(Display.debug);
  }

  useEffect(() => {
    // ouve o teclado
    window.addEventListener('keydown', (event) => {
      if (!Inputs.apertando) {
        if (event.key === 'p')
          Inputs.redSignal();
        else if (event.key === 'd')
        handleDebug();
        else if (event.key === 'ArrowRight')
          Inputs.proximo();
        else if (event.key === 'h') {

        }
        else {
          Inputs.Teclou(event.key);
        }
        Inputs.apertando = true;
      }
    });
    window.addEventListener('keyup', () => {
      Inputs.apertando = false;
      Inputs.apertada = '';
    });
  }, [debug]);

  

  // tratamento da entrada de arquivo (rom)
  let fileReader;

  /// trata e manda o arquivo pra ser interpretado
  const handleFileRead = () => {
    const buffer = fileReader.result;
    // transforma o arquivo em instrucoes
    Registros.Iniciar(setRegistradores);
    Display.Iniciar(setDisplay);
    Memoria.CarregaInstrucoes(buffer);
    Apontador.Comecar(setIndice, setTimers, setInstrucao);
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
        <BotaoDebug onClick={handleDebug}>?</BotaoDebug>
      </Cartucho>

      <Tela display={display} />
      <Teclado />
      {
        debug && (
          <Debug 
            registradores={registradores}
            indice={indice}
            timers={timers}
            instrucao={instrucao}
          />
        )
      }
      
    </Container>
  )
}

export default Home;