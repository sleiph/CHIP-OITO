import React from 'react';
import styled, { keyframes } from 'styled-components';
let x = 0;

const changeBack = keyframes`
    0% { background-position:  0% 80%; }
    50% { background-position: 80% 100%; }
    100% { background-position: 0% 90%; }
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(-45deg, #19f505, #70c269, #425e3f, #042601);
    background-size: 400% 400%;
    text-align: center;
    font-family: monospace;
    animation-name: ${changeBack};
    animation-duration: 8s;
    animation-iteration-count: infinite;
    justify-content: center;
`

const Title = styled.div`
    color: white;
    font-size: 4em;
`

const Partes = styled.div`
    display: flex;
    align-self: flex-end;
    gap: 16px;
`

const Assinatura = styled.div`
    color: white;
    font-size: 1em;
    align-self: end;
`

const Text = styled.div`
    color: white;
    font-size: 1.5em;
    padding-top: 1em;
`

function Opening() {
    return (
        <Container>
            <Title>chip-OITO</Title>
            <Partes>
                <Text>Use o botão na parte superior esquerda para selecionar o arquivo desejado.</Text>
                <Text>Você pode usar seu teclado fisíco ou o teclado do site para interagir com o jogo. Cada jogo usa o teclado de forma difente, boa sorte achando a tecla certa!</Text>
                <Text>Se quiser pausar o jogo a qualquer momento, pressione "p"</Text>
                <Text>Se quiser avançar só uma instrução, pressione seta pra direita, as instruções não voltam, então cuidado...</Text>
                <Text>Se quiser retornar para esta tela, pressione "h"</Text>
                <Text>Aperte qualquer tecla</Text>
            </Partes>
            
            <Assinatura>Feito por Ricardo e Tiago.</Assinatura>
        </Container>
    )
}

export default Opening;