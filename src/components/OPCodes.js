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

function OPCodes( {codigos} ) {
  let arrayCodigos = Object.values(codigos);
  
  return (
    <OPDiv>{
      arrayCodigos.map((op, i) => {
        if (op.length == 4) {
          return(
            <Instrucao key={i}>{op}</Instrucao>
          );
        }
      })
    }</OPDiv>
  )
}

export default OPCodes
