import { useEffect, useState, useRef } from 'react'

import Ajuda from './components/Ajuda';
import Debug from './components/Debug';
import Header from './components/Header';
import Teclado from './components/Teclado';
import Tela from './components/Tela';

import { IniciarApontador } from './services/Apontador';
import { IniciarDisplay, getOriginalDisplay, setAjudaDisplay, setDebugDisplay, isAjuda, isDebug, toggleAjuda, toggleDebug } from './services/Display';
import { Soltou, Teclou, isApertando, ToggleJogando, setProximoInput } from './services/Inputs';
import { IniciarMemoria } from './services/Memoria';
import { IniciarRegistradores, GetRegistros } from './services/Registros';
import { IniciarTimer } from './services/Timer';

import styled from 'styled-components';

const Container = styled.div`
  width: 90vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background-color: #63bda4;
`

function updateFPS(lastloop: Date, setFps: any) {
  let thisloop: Date = new Date(); // guardar o periodo atual
  let fpscount = (thisloop.getTime() - lastloop.getTime()) / 20;
  fpscount = Math.round(1000/fpscount)
  setFps("FPS: " + fpscount);
  return thisloop;
}

function startFPS(intervaloFPS: any, fps: string, setFps: any) {
  let passado = new Date();
  if (fps == '') {
      intervaloFPS.current = setInterval( function() {
          passado = updateFPS(passado, setFps)
          console.log('chamou?')
      },1000);
  } 
}

function stopFPS(intervaloFPS: any, setFps: any) {
  clearInterval(intervaloFPS.current);
  setFps('');
}

function App() {
  const [registradores, setRegistradores] = useState(GetRegistros());
  const [display, setDisplay] = useState(getOriginalDisplay());
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
  const Iniciar = (buffer: ArrayBuffer) => {
    IniciarRegistradores(setRegistradores);
    IniciarTimer(setTimers);
    IniciarDisplay(setDisplay);
    IniciarMemoria(buffer, setIndice);
    IniciarApontador(setInstrucao);
  }

  // exibição de componentes de apoio
  const handleDebug = () => {
    toggleDebug();
    setAjudaDisplay(false);
    if (isDebug()) //como eu mudei o fps para o debug, o fps é chamado/parado junto com o debug
      startFPS(intervaloFPS, fps, setFps);
    else 
      stopFPS(intervaloFPS, setFps);
      
    setAjuda(false);
    setDebug(isDebug());
  }

  const handleAjuda = () => { //r todo: melhorar esses métodos
    toggleAjuda();
    setDebugDisplay(false);
    setDebug(false);
    setAjuda(isAjuda());
  }

  useEffect(() => {
    // ouve o teclado
    window.addEventListener('keydown', (event) => {
      if (!isApertando()) {
        if (event.key === 'p')
          ToggleJogando();
        else if (event.key === 'o')
          window.location.reload();
        else if (event.key === 'g')
          handleDebug();
        else if (event.key === 'h')
          handleAjuda();
      }
      if (event.key === 'ArrowRight')
        setProximoInput(true);
      Teclou(event.key);
    });
    window.addEventListener('keyup', (event) => {
      Soltou(event.key);
    });
  }, [ajuda, debug]);

  return (
    <Container>
      <Header disable={disable} setDisable={setDisable}
        Iniciar={Iniciar}
        handleAjuda={handleAjuda} handleDebug={handleDebug}
        /*fps={fps} setFps={setFps}*/
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
            /*setFps={setFps}*/
          />
        )
      }
      { ajuda && ( <Ajuda passar={passar} setPassar={setPassar} /> ) }
    </Container>
  )
}

export default App
