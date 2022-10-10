import styled from 'styled-components';

import Apontador from '../services/Apontador';
import Memoria from '../services/Memoria';
import Tratamento from '../services/Tratamento';

const OPDiv = styled.div`
  position: absolute;
  height: 520px;
  max-width: 520px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`
const Fundo = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f20553;
  opacity: .3;
  outline: solid #f55086;
  outline-offset: -8px;
  z-index: -1000;
`
const Grupo = styled.div`
  padding: 12px 24px;
  display: flex;
  flex-flow: wrap;
`
const Instrucoes = styled.div`
  padding: 6px 24px;
  max-height: 280px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: overlay;
`
const Informacao = styled.span`
  text-align: center;
  margin: 0 16px 0 0;
`

function Debug( {registradores, indice, timers, instrucao} ) {
  let arrayRegistradores = Object.values(registradores);
  
  return (
    <OPDiv>
      <Fundo />
      <Grupo>
        <h3>Debug:</h3>
      </Grupo>
      <Instrucoes>
        { 
          Memoria.mapa.map((reg, i) => {
            return(
              <div key={i}>
                <Informacao style={{outline: instrucao===i ? '1px solid rgba(0, 0, 0, 1)' : '0px solid rgba(0, 0, 0, 0)'}}>{
                  "0x" + Tratamento.IntPraHex(i) + ': ' + reg.toString(16).padStart(2, '0').toUpperCase()
                }</Informacao>
              </div>
            );
          })
        }
      </Instrucoes>
      <Grupo>
        { 
          arrayRegistradores.map((reg, i) => {
            return(
              <Informacao key={i}>{
                'V' + i.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()
              }</Informacao>
            );
          })
        }
      </Grupo>
      <Grupo>
        <Informacao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Informacao>
        <Informacao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
        <Informacao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Informacao>
      </Grupo>
    </OPDiv>
  )
}

export default Debug;
