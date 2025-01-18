import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import styled from 'styled-components';

const AppDiv = styled.div`
  height: 100vh;
  background: #363636;
  display: flex;
  justify-content: center;
  align-items: center;
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppDiv>
      <App />
    </AppDiv>
  </StrictMode>,
)
