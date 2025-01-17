import styled from 'styled-components';
import { Fundo } from './Ajuda';
import { getMapaMemoria } from '../services/Memoria';

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
// assim fica + legivel
const Mapa = styled.span` 
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
          mapa.map((reg: Array<number>, i: number) => {
            return(
              <Mapa color={instrucao===i ? 'black' : 'none'}>
              {
                (i !== undefined) ?
                  <Informacao>{"0x" + i.toString(16) + ':' + showInst(reg, 0)  + showInst(reg, 1)}</Informacao>
                :
                  <></>
              }
              </Mapa>
            );
          })
        }
      </Instrucoes>
      <Grupo>
        <Informacao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Informacao>
        <Informacao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{fps}</Informacao> 
      </Grupo>
    </OPDiv>
  )
}

export default Debug;