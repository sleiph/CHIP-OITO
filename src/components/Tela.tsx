import styled from 'styled-components';

const DisplayDiv = styled.div`
  height: 70vh;
  margin: 2vh;
  display: grid;
  grid-template-columns: repeat(64, 1fr);
`

function Tela( { display }: any ) {

  return (
    <DisplayDiv>{
      display.map((linha: Array<number>, i: number) => {
        return(
          linha.map((pixel, j) => {
            return( 
              <div key={i + "-" + j}
                style={{backgroundColor: (pixel===1) ? '#62afb7' : '#d9ffea'}}
              />
            );
          })
        )
      })
    }</DisplayDiv>
  )
}

export default Tela;
