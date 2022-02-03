import styled from 'styled-components'

const OPDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`

function OPCodes( {codigos} ) {
  return (
    <OPDiv>{
      codigos.map((op, i) => {
        return( 
          <span key={i}>{op[0] + op[1] + " " + op[2] + op[3]}</span>
        );
      })
    }</OPDiv>
  )
}

export default OPCodes
