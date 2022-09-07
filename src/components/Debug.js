import styled from 'styled-components'

const OPDiv = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`
const Instrucao = styled.span`
  text-align: center;
  margin: 0 12px;
`

function Debug( {registradores, indice, timers, instrucao} ) {
  let arrayRegistradores = Object.values(registradores);
  
  return (
    <OPDiv>
      <Instrucao>{
        'pos:0x' + instrucao[0].toString(16).padStart(3, '0').toUpperCase()
      }</Instrucao>
      <Instrucao>{
        'inst:' + instrucao[1].toString(16).padStart(4, '0').toUpperCase()
      }</Instrucao>
      { 
        arrayRegistradores.map((reg, i) => {
          return(
            <Instrucao key={i}>{
              'V' + i.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()
            }</Instrucao>
          );
        })
      }
      <Instrucao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Instrucao>
      <Instrucao>{'DT:' + timers[0].toString(16).padStart(2, '0').toUpperCase()}</Instrucao>
      <Instrucao>{'ST:' + timers[1].toString(16).padStart(2, '0').toUpperCase()}</Instrucao>
    </OPDiv>
  )
}

export default Debug;
