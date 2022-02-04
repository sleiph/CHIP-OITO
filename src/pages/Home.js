import React, { useState } from 'react';

import Tratamento from '../services/Tratamento';
import Disassembler from '../services/Disassembler';
import OPCodes from '../components/OPCodes';

import styled from 'styled-components'

const Container = styled.div`
  margin: 42px;
  padding: 0;
  overflow-wrap: break-word;
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
      <input
        type='file'
        id='file'
        className='input-file'
        accept='.rom,.txt'
        onChange={e => handleFileChosen(e.target.files[0])}
      />
      <OPCodes codigos={arquivo}/>
    </Container>
  )
}

export default Home
