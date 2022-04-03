import styled from 'styled-components'

const OPDiv = styled.div`
  height: 12vh;
  margin: 2vh;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`
const Instrucao = styled.span`
  text-align: center;
  margin: 0 12px;
`

function OPCodes( {codigos} ) {
  return (
    <OPDiv>{
      codigos.map((op, i) => {
        return(
          <Instrucao key={i}>{op[0] + op[1] + " " + op[2] + op[3]}</Instrucao>
        );
      })
    }</OPDiv>
  )
}

export default OPCodes
