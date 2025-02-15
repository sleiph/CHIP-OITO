import styled from 'styled-components';
import { pegarCor } from '../services/Display';

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
                style={{backgroundColor: (pixel===1) ? pegarCor(0) : pegarCor(1)}}
              />
            );
          })
        )
      })
    }</DisplayDiv>
  )
}

export default Tela;
