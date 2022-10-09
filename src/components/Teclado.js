import Tecla from './Tecla'

import styled from 'styled-components'

const TecladoDiv = styled.div`
    height: 12vh;
    margin: 0 2vh 2vh 2vh;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 24px;
    overflow: auto;
`

const NumDiv = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 8px;

    div {
        flex-basis: 18%;
    }
`
const AlfaDiv = styled.div`
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 8px;

    div {
        flex-basis: 30%;
    }
`

function Teclado(  ) {
    
  
  return (
    <TecladoDiv>
        <NumDiv>
            <Tecla chave="0" tecla="0" />
            <Tecla chave="1" tecla="1" />
            <Tecla chave="2" tecla="2" />
            <Tecla chave="3" tecla="3" />
            <Tecla chave="4" tecla="4" />
            <Tecla chave="5" tecla="5" />
            <Tecla chave="6" tecla="6" />
            <Tecla chave="7" tecla="7" />
            <Tecla chave="8" tecla="8" />
            <Tecla chave="9" tecla="9" />
        </NumDiv>
        <AlfaDiv>
            <Tecla chave="A" tecla="q" />
            <Tecla chave="B" tecla="w" />
            <Tecla chave="C" tecla="e" />
            <Tecla chave="D" tecla="a" />
            <Tecla chave="E" tecla="s" />
            <Tecla chave="F" tecla="d"/>
        </AlfaDiv>
        
    </TecladoDiv>
  )
}

export default Teclado;
