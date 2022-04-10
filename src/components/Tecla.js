import styled from 'styled-components'

const TeclaDiv = styled.div`
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    button {
        height: 100%;
        width: 100%;
        border-style: none;
        margin: 0;
        padding: 0;
        background-color: #3f956f;
    }
`

function Tecla( {valor} ) {
  return (
    <TeclaDiv>
        <button onClick={() => console.log(valor)}>{valor}</button>
    </TeclaDiv>
  )
}

export default Tecla
