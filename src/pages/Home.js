import React, { useEffect, useState, useRef } from 'react';
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

function updateFPS(lastloop, setFps) {
  let thisloop = new Date(); // guardar o periodo atual
  let fpscount = (thisloop - lastloop) / 20;
  fpscount = Math.round(1000/fpscount)
  setFps("FPS: " + fpscount);
  return thisloop;
}

function startFPS(intervaloFPS, fps, setFps) {
  let passado = new Date();
  if (fps == '') {
      intervaloFPS.current = setInterval( function() {
          passado = updateFPS(passado, setFps)
          console.log('chamou?')
      },1000);
  } 
}

function stopFPS(intervaloFPS, setFps) {
  clearInterval(intervaloFPS.current);
  setFps('');
}

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
  const [passar, setPassar] = useState(0);
  const [fps, setFps] = useState('');
  let intervaloFPS = useRef(); //atualiza o fps

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
    if (Display.debug) //como eu mudei o fps para o debug, o fps é chamado/parado junto com o debug
      startFPS(intervaloFPS, fps, setFps);
    else 
      stopFPS(intervaloFPS, setFps);
      
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

      <Tela display={display}/>
      <Teclado />
      {
        debug && (
          <Debug 
            registradores={registradores}
            indice={indice}
            timers={timers}
            instrucao={instrucao}
            fps={fps}
            setFps={setFps}
          />
        )
      }
      { ajuda && ( <Ajuda passar={passar} setPassar={setPassar} /> ) }
    </Container>
  )
}

export default Home;