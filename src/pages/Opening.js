import React from 'react';
import styled from 'styled-components'
import App from '../App';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #000000 15%, #2da302 55%);
  text-align: center;
  font-family: "Bahnschrift"
`

const Title = styled.div`
    color: white;
    font-size: 4em;
`

const Subtitle = styled.div`
    color: white;
    font-size: 2em;
`

const Text = styled.div`
    color: white;
    font-size: 2em;
    padding-top: 1em;
`

function Opening() {
    return (
        <Container>
            <Title>Nome do emulador</Title>
            <Subtitle >Feito por Ricardo e Tiago.</Subtitle>
            <Text>Esse é um emulador de chip-8 feito em React.js.</Text>
            <Text>Para usar o emulador você deve possuir ás roms com os jogos compátiveis, não disponibilizamos nenhuma rom em nossa aplicação. Use o botão na parte superior esquerda para selecionar o arquivo desejável.</Text>
            <Text>Você pode usar seu teclado fisíco ou o teclado do site para interagir com ele. Ás teclas usadas são q, w, e, a, s e d. Cada jogo irá usa-las de forma difente.</Text>
        </Container>
    )
}

export default Opening;