import React, { useState, useEffect } from 'react';

import Tratamento from '../services/Tratamento';

import styled from 'styled-components'

const Container = styled.div`
  margin: 0;
  padding: 0;
  overflow-wrap: break-word;
`

function Home(  ) {
  const [arquivo, setArquivo] = useState(0);

  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content)
    let tratado = Tratamento(content)
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
      <p>{
        arquivo.map((byte, i) => {
          return(
            <spam key={i}>{(i%2==0) ? " " + byte : byte}</spam>
          );
        })
      }</p>
    </Container>
  )
}

export default Home
