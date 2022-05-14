import React, { useState } from 'react';

import Tratamento from '../services/Tratamento';
import Disassembler from '../services/Disassembler';
import Display from '../components/Display';
import OPCodes from '../components/OPCodes';
import Teclado from '../components/Teclado';

import styled from 'styled-components'
import Apontador from '../services/Apontador';

const Container = styled.div`
  width: 90vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  background-color: #63bda4;
`
const Cartucho = styled.div`
  height: 4vh;
  background-color: #f20553;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`

function Home(  ) {
  const [arquivo, setArquivo] = useState([]);

  let fileReader;
  
  // trata e manda o arquivo pra ser interpretado
  const handleFileRead = (e) => {
    const conteudo = fileReader.result;
    
    let tratado = Tratamento(conteudo);
    setArquivo(tratado);

    Apontador(tratado)
  };
  
  // lê o arquivo carregado pelo usuario
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <Container>
      <Cartucho>
        <input
          type='file'
          id='file'
          accept='.rom'
          onChange={e => handleFileChosen(e.target.files[0])}
        />
        <OPCodes codigos={arquivo} />
      </Cartucho>

      <Display />
      <Teclado />
      
    </Container>
  )
}

export default Home;
