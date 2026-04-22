import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Tecla from './Tecla';
import { isTeclaApertada } from '../services/Inputs';

const TecladoDiv = styled.div`
    height: 12vh;
    margin: 0 2vh 2vh 2vh;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
    overflow: auto;
`

const NumDiv = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 8px;

    div {
        flex-basis: 18%;
    }
`
const AlfaDiv = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 8px;

    div {
        flex-basis: 30%;
    }
`

function Teclado() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleKeyDown = () => {
      forceUpdate({});
    };

    const handleKeyUp = () => {
      forceUpdate({});
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <TecladoDiv>
        <NumDiv>
            <Tecla chave="0" tecla="0" apertada={isTeclaApertada('0')} />
            <Tecla chave="1" tecla="1" apertada={isTeclaApertada('1')} />
            <Tecla chave="2" tecla="2" apertada={isTeclaApertada('2')} />
            <Tecla chave="3" tecla="3" apertada={isTeclaApertada('3')} />
            <Tecla chave="4" tecla="4" apertada={isTeclaApertada('4')} />
            <Tecla chave="5" tecla="5" apertada={isTeclaApertada('5')} />
            <Tecla chave="6" tecla="6" apertada={isTeclaApertada('6')} />
            <Tecla chave="7" tecla="7" apertada={isTeclaApertada('7')} />
            <Tecla chave="8" tecla="8" apertada={isTeclaApertada('8')} />
            <Tecla chave="9" tecla="9" apertada={isTeclaApertada('9')} />
        </NumDiv>
        <AlfaDiv>
            <Tecla chave="A" tecla="q" apertada={isTeclaApertada('q')} />
            <Tecla chave="B" tecla="w" apertada={isTeclaApertada('w')} />
            <Tecla chave="C" tecla="e" apertada={isTeclaApertada('e')} />
            <Tecla chave="D" tecla="a" apertada={isTeclaApertada('a')} />
            <Tecla chave="E" tecla="s" apertada={isTeclaApertada('s')} />
            <Tecla chave="F" tecla="d" apertada={isTeclaApertada('d')}/>
        </AlfaDiv>
        
    </TecladoDiv>
  )
}

export default Teclado;