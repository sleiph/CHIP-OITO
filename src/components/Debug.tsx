import styled from 'styled-components';
import { Fundo } from './Ajuda';
import { getMapaMemoria } from '../services/Memoria';
import { isJogando } from '../services/Inputs';
import arrow from '../assets/arrow.png'

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
const ArrowButton: any = styled.input`
  width: 25px;
  height: 25px;
  transform: rotate(${(props: any) => props.rotate}deg);
  &:hover{
    filter: brightness(70%);
  }
  &:active{
    filter:hue-rotate(215deg);
  }
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
// assim fica + legivel
const Instrucao = styled.span` 
  outline: 1px solid ${props => props.color};
`

const showReg = (e : number, reg : any) => { // transfomei em uma função pra deixar style
  return(
    <Informacao key={e}>
      {'V' + e.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()}
    </Informacao>
  );
}

const showInst = (reg: any, x: number) => reg[x].toString(16).padStart(2, '0').toUpperCase(); // assim fica + legivel

function Debug({registradores, indice, timers, instrucao, fps/*, setFps*/}: any ) { //r todo: corrigir tipo
  
  const mapa = getMapaMemoria(); //vc tinha declarado como variável, burrao
  const arrayRegistradores = Object.values(registradores);
  const tamanhoMapaDebug = 60;

  return (
    <OPDiv>
      <Fundo />
      <Grupo><h3>Debug:</h3></Grupo>
      <Grupo>
        { 
          arrayRegistradores.map((reg: any, i: number) => 
            (i !== undefined) ? showReg(i, reg) : (<></>)
          )
        }
      </Grupo>
      <Instrucoes>
        { 
          instrucao - tamanhoMapaDebug > 0 && (
            <Instrucao color='none'>
              ...{instrucao - tamanhoMapaDebug}...
            </Instrucao>
          )
        }
        { 
          // Soh renderiza o range de memoria ao redor da instrução atual
          mapa.slice(Math.max(0, instrucao - tamanhoMapaDebug), Math.min(mapa.length, instrucao + tamanhoMapaDebug))
            .map((reg: Array<number>, i: number) => {
              const index = Math.max(0, instrucao - tamanhoMapaDebug) + i;
              return(
                <Instrucao key={index} color={instrucao===index ? 'black' : 'none'}>
                {
                  (index !== undefined) ?
                    <Informacao>{"0x" + index.toString(16) + ':' + showInst(reg, 0)  + showInst(reg, 1)}</Informacao>
                  :
                    <></>
                }
                </Instrucao>
              );
            })
        }
        { 
          instrucao + tamanhoMapaDebug < mapa.length && (
            <Instrucao color='none'>
              ...{mapa.length - (instrucao + tamanhoMapaDebug)}...
            </Instrucao>
          )
        }
      </Instrucoes>
      <Grupo>
        <Informacao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Informacao>
        <Informacao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{fps}</Informacao> 
        {
          (!isJogando) ? 
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