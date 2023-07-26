import styled from 'styled-components';
import {Fundo} from './Ajuda';
import Memoria from '../services/Memoria';
import Inputs from '../services/Inputs';
import arrow from '../data/arrow.png'

export const OPDiv = styled.div`
  position: absolute;
  height: 520px;
  min-width: 360px;
  max-width: 520px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
export const Grupo = styled.div`
  padding: 12px 24px;
  display: flex;
  flex-flow: wrap;
`
const Instrucoes = styled.div`
  height: 260px;
  padding: 16px;
  margin: 0 24px 12px 24px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: overlay;
  background-color: #d9ffea;
`
const Informacao = styled.span`
  text-align: center;
  margin: 0 8px 0 8px;
`

const ArrowButton = styled.input`
  width: 25px;
  height: 25px;
  transform: rotate(${(props) => props.rotate}deg);
  &:hover{
    filter: brightness(70%);
  }
  &:active{
    filter:hue-rotate(215deg);
  }
`

function Debug( {registradores, indice, timers, instrucao, fps, setFps} ) {
  const mapa = Memoria.rom.reduce((acc, curr, i) => {
    if (i%2 === 0) {
      acc[i+0x200] = ([Memoria.rom[i], Memoria.rom[i+1]]);
    }
    return acc;
  }, []);

  const arrayRegistradores = Object.values(registradores);
  
  return (
    <OPDiv>
      <Fundo />
      <Grupo>
        <h3>Debug:</h3>
      </Grupo>
      <Instrucoes>
        { 
          mapa.map((reg, i) => {
            return(
              <div key={i} style={{outline: instrucao===i ? '1px solid rgba(0, 0, 0, 1)' : '1px solid rgba(0, 0, 0, 0.1)'}}>
                {
                  (i !== undefined) ?
                  <Informacao>{
                    "0x" + i.toString(16) + ':' + reg[0].toString(16).padStart(2, '0').toUpperCase() + reg[1].toString(16).padStart(2, '0').toUpperCase() 
                  }</Informacao>
                  :
                  <></>
                }
              </div>
            );
          })
        }
      </Instrucoes>
      <Grupo>
        { 
          arrayRegistradores.map((reg, i) => {
            if (i !== undefined) {
              return(
                <Informacao key={i}>{
                  'V' + i.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()
                }</Informacao>
              );
            } else {
              return(<></>);
            }
          })
        }
      </Grupo>
      <Grupo>
        <Informacao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Informacao>
        <Informacao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{fps}</Informacao>
        {
          (!Inputs.isJogando) ? 
            <>
              <Informacao><ArrowButton type='image' src={arrow} rotate='0'></ArrowButton></Informacao>
              <Informacao><ArrowButton type='image' src={arrow} rotate='180'></ArrowButton></Informacao> 
            </>
          : <></>
        } 
      </Grupo>
    </OPDiv>
  )
}

export default Debug;