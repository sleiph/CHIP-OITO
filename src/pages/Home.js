import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Ajuda from '../components/Ajuda';
import Debug from '../components/Debug';
import Header from '../components/Header';
import Teclado from '../components/Teclado';
import Tela from '../components/Tela';
import Apontador from '../services/Apontador';
import Display from '../services/Display';
import Inputs from '../services/Inputs';
import Memoria from '../services/Memoria';
import Registros from '../services/Registros';
import Timer from '../services/Timer';

// CSS
const Container = styled.div`
  width: 90vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background-color: #63bda4;
`

function Home(  ) {

  // hooks
  const [registradores, setRegistradores] = useState(Registros.reg);
  const [display, setDisplay] = useState(Display.original);
  const [indice, setIndice] = useState(0);
  const [timers, setTimers] = useState([0, 0]);
  const [instrucao, setInstrucao] = useState(512);
  const [ajuda, setAjuda] = useState(false);
  const [debug, setDebug] = useState(false);
  const [disable, setDisable] = useState(false);
  const [fps, setFps] = useState();

  // ainda não tá inciando direito, teria q zerar todas
  // as variaveis antes de voltar do começo
  const Iniciar = (buffer) => {
    Registros.Iniciar(setRegistradores);
    Timer.Iniciar(setTimers);
    Display.Iniciar(setDisplay);
    Memoria.Iniciar(buffer, setIndice);
    Apontador.Comecar(setInstrucao);
  }

  // exibição de componentes de apoio
  const handleDebug = () => {
    Display.debug = !Display.debug;
    Display.ajuda = false;
    setAjuda(false);
    setDebug(Display.debug);
  }
  const handleAjuda = () => {
    Display.ajuda = !Display.ajuda;
    Display.debug = false;
    setDebug(false);
    setAjuda(Display.ajuda);
  }

  useEffect(() => {
    // ouve o teclado
    window.addEventListener('keydown', (event) => {
      if (!Inputs.apertando) {
        if (event.key === 'p')
          Inputs.ToggleJogando();
        else if (event.key === 'o')
          window.location.reload();
        else if (event.key === 'g')
          handleDebug();
        else if (event.key === 'h')
          handleAjuda();
      }
      if (event.key === 'ArrowRight')
          Inputs.proximo = true;
      Inputs.Teclou(event.key);
    });
    window.addEventListener('keyup', (event) => {
      Inputs.Soltou(event.key);
    });
  }, [ajuda, debug]);

  return (
    <Container>
      <Header disable={disable} setDisable={setDisable}
        Iniciar={Iniciar}
        handleAjuda={handleAjuda} handleDebug={handleDebug}
        fps={fps} setFps={setFps}
      />

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
      { ajuda && ( <Ajuda /> ) }
    </Container>
  )
}

export default Home;