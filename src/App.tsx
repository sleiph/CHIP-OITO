import { useEffect, useState, useRef } from 'react'

import Ajuda from './components/Ajuda';
import Debug from './components/Debug';
import Header from './components/Header';
import Teclado from './components/Teclado';
import TelaCanvas from './components/TelaCanvas';

import { IniciarApontador } from './services/Apontador';
import { IniciarDisplay, getPixelsDisplay, setAjudaDisplay, setDebugDisplay, isAjuda, isDebug, mudarCor, toggleAjuda, toggleDebug } from './services/Display';
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

function App() {
  const [registradores, setRegistradores] = useState(GetRegistros());
  const [display, setDisplay] = useState(getPixelsDisplay());
  const [indice, setIndice] = useState(0);
  const [timers, setTimers] = useState([0, 0]);
  const [instrucao, setInstrucao] = useState(512);
  const [ajuda, setAjuda] = useState(false);
  const [debug, setDebug] = useState(false);
  const [disable, setDisable] = useState(false);
  const [passar, setPassar] = useState(0);
  const [fps, setFps] = useState(0);
  const fpsRef = useRef(0); //atualiza o fps
  const lastfpsRef = useRef(performance.now());

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
        switch (event.key) {
          case 'p':
            ToggleJogando();
            break;
          case 'r':
            window.location.reload();
            break;
          case 'g':
            handleDebug();
            break;
          case 'h':
            handleAjuda();
            break;
          case 't':
            mudarCor();
            break;
        }
      }
      if (event.key === 'ArrowRight')
        setProximoInput(true);
      Teclou(event.key);
    });
    window.addEventListener('keyup', (event) => {
      Soltou(event.key);
    });
  }, [ajuda, debug]);

  useEffect(() => {
    const calculaFPS = () => {
      const agora = performance.now();
      fpsRef.current += 1;

      if (agora - lastfpsRef.current >= 1000) {
        setFps(Math.round((fpsRef.current * 1000) / (agora - lastfpsRef.current)));
        fpsRef.current = 0;
        lastfpsRef.current = agora;
      }
      requestAnimationFrame(calculaFPS);
    };

    const animationId = requestAnimationFrame(calculaFPS);
    
    // Cleanup on unmount
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <Container>
      <Header disable={disable} setDisable={setDisable}
        Iniciar={Iniciar}
        handleAjuda={handleAjuda} handleDebug={handleDebug}
      />

      <TelaCanvas display={display}/>
      <Teclado />
      {
        debug && (
          <Debug 
            registradores={registradores}
            indice={indice}
            timers={timers}
            instrucao={instrucao}
            fps={fps}
          />
        )
      }
      { ajuda && ( <Ajuda passar={passar} setPassar={setPassar} /> ) }
    </Container>
  )
}

export default App
