import React, { useState } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #000000 20%, #2da302 55%);
  text-align: center;
  font-family: "Bahnschrift"
`
const Title = styled.div`
    color: white;
    font-size: 4em;
`
const Text = styled.div`
    color: white;
    font-size: 2em;
`

function Opening() {
    return (
        <Container>
            <Title>Nome do emulador</Title>
            <Text>Feito por Ricardo e Tiago</Text>
        </Container>
    )
}

export default Opening;