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
            <Tecla valor="1"/>
            <Tecla valor="2"/>
            <Tecla valor="3"/>
            <Tecla valor="4"/>
            <Tecla valor="5"/>
            <Tecla valor="6"/>
            <Tecla valor="7"/>
            <Tecla valor="8"/>
            <Tecla valor="9"/>
            <Tecla valor="0"/>
        </NumDiv>
        <AlfaDiv>
            <Tecla valor="A"/>
            <Tecla valor="B"/>
            <Tecla valor="C"/>
            <Tecla valor="D"/>
            <Tecla valor="E"/>
            <Tecla valor="F"/>
        </AlfaDiv>
        
    </TecladoDiv>
  )
}

export default Teclado
