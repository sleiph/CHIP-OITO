import styled from 'styled-components'

const DisplayDiv = styled.div`
  height: 70vh;
  margin: 2vh;
  display: grid;
  grid-template-columns: repeat(64, 1fr);

  @media (max-width: 1024px) {

  }
`

const PixelDiv = styled.div`

`

function Display( { display, setDisplay } ) {

  return (
    <DisplayDiv>{
      display.map((linha, i) => {
        return(
          linha.map((pixel, j) => {
            return( 
              <PixelDiv key={i + "-" + j}
                style={{backgroundColor: (pixel===1) ? '#62afb7' : '#d9ffea'}}
              />
            );
          })
        )
      })
    }</DisplayDiv>
  )
}

export default Display;
