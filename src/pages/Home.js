import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Ajuda from '../components/Ajuda';
import Debug from '../components/Debug';
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
const Cartucho = styled.div`
  height: 4vh;
  background-color: #f20553;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
`
const DivDebug = styled.div`
  justify-self: flex-end;
  display: flex;
  gap: 12px;
`
const BtnDinv = styled.div`
  width: fit-content; 
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

  // ainda não tá inciando direito, teria q zerar todas
  // as variaveis antes de voltar do começo
  const Iniciar = (buffer) => {
    Registros.Iniciar(setRegistradores);
    Timer.Iniciar(setTimers);
    Display.Iniciar(setDisplay);
    Memoria.Iniciar(buffer, setIndice);
    Apontador.Comecar(setInstrucao);
  }

  useEffect(() => {
    // ouve o teclado
    window.addEventListener('keydown', (event) => {
      if (!Inputs.apertando) {
        if (event.key === 'p')
          Inputs.ToggleJogando();
        else if (event.key === 'o')
          window.location.reload();
        else if (event.key === 'ArrowRight')
          Inputs.proximo = true;
        else if (event.key === 'g')
          handleDebug();
        else if (event.key === 'h')
          handleAjuda();
        else
          Inputs.Teclou(event.key);

        Inputs.apertando = true;
      }
    });
    window.addEventListener('keyup', () => {
      Inputs.Soltou();
    });
    window.addEventListener('mouseup', () => {
      Inputs.Soltou();
    });
  }, [ajuda, debug]);

  // entrada de arquivo (rom)
  let fileReader;
  /// manda o arquivo pra ser interpretado
  const handleFileRead = () => {
    const buffer = fileReader.result;
    Iniciar(buffer);
  };
  /// lê o arquivo carregado pelo usuario
  function handleFileChosen(arquivo) {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsArrayBuffer(arquivo);
    setDisable(true);
  }

  function reset(){
    window.location.reload();
  }

  return (
    <Container>
      <Cartucho>
        {
          (disable) ? <BtnDinv><button onClick={reset}>Reset</button></BtnDinv> : 
          <input 
            type='file'
            id='file'
            accept='.rom,.ch8'
            onChange={e => handleFileChosen(e.target.files[0])}
            onClick={e => e.target.value = ''}
            disabled={disable}
          />
        }
        <DivDebug>
          <button onClick={handleDebug}>Debu<span style = {{textDecoration:'underline'}} >g</span></button>
          <button onClick={handleAjuda}>?</button>
        </DivDebug>
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
      { ajuda && ( <Ajuda /> ) }
    </Container>
  )
}

export default Home;