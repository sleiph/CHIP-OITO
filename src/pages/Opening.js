import React from 'react';
import styled, { keyframes } from 'styled-components';
let x = 0;

const changeBack = keyframes`
    0% { background-position:  0% 80%; }
    50% { background-position: 80% 100%; }
    100% { background-position: 0% 90%; }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(-45deg, #19f505, #70c269, #425e3f, #042601);
    background-size: 400% 400%;
    text-align: center;
    font-family: "Bahnschrift";
    animation-name: ${changeBack};
    animation-duration: 8s;
    animation-iteration-count: infinite;
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
    font-size: 1.5em;
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
            <Text>Para continuar, clique em qualquer tecla. Se quiser retornar para esta tela, pressione "o" após sair.</Text>
        </Container>
    )
}

export default Opening;