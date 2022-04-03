import React, { useState } from 'react';

import Tratamento from '../services/Tratamento';
import Disassembler from '../services/Disassembler';
import Display from '../components/Display';
import OPCodes from '../components/OPCodes';

import styled from 'styled-components'

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
  display: flex;
  align-self: flex-end;
  align-items: center;
`

function Home(  ) {
  const [arquivo, setArquivo] = useState([]);

  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    let tratado = Tratamento(content)
    tratado.forEach(Disassembler)
    setArquivo(tratado)
  };
  
  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <Container>
      <Cartucho>
        <input
          type='file'
          id='file'
          accept='.rom,.txt'
          onChange={e => handleFileChosen(e.target.files[0])}
        />
      </Cartucho>

      <Display />
      <OPCodes codigos={arquivo} />
    </Container>
  )
}

export default Home
