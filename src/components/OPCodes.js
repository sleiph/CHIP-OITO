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

function OPCodes( {codigos, registradores, indice} ) {
  //let arrayCodigos = Object.values(codigos);
  let arrayRegistradores = Object.values(registradores);
  
  return (
    <OPDiv>{ 
      arrayRegistradores.map((reg, i) => {
          return(
            <Instrucao key={i}>{'V' + i.toString(16) + ':' + reg.toString(16).padStart(2, '0').toUpperCase()}</Instrucao>
          );
      })
    } <Instrucao>{'I:' + indice.toString(16).padStart(3, '0').toUpperCase()}</Instrucao> </OPDiv>
  )
}

export default OPCodes
