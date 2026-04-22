import styled from 'styled-components';

import { Soltou, Teclou } from '../services/Inputs'

const TeclaDiv = styled.div<{ $apertada: boolean }>`
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    button {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        color: white;
        background-color: #3f956f;
        font-size: 16px;
        border-radius: 5px;
        text-decoration: none;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.1s all;
        
        ${props => props.$apertada && `
            transform: scale(0.98);
            outline: solid #f20553;
            outline-offset: -8px;
        `}
    }
    button:hover {
        background-color: #388663;
    }
    button:active {
        transform: scale(0.98);
        outline: solid #f20553;
        outline-offset: -8px;
    }
`

type TeclaProps = {
    chave: string;
    tecla: string;
    apertada: boolean;
}

function Tecla({ chave, tecla, apertada }: TeclaProps) {

    const handleMouseDown = () => {
        Teclou(tecla);
    }
    const handleMouseUp = () => {
        Soltou(tecla);
    }

    return (
        <TeclaDiv
            $apertada={apertada}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            tabIndex={parseInt(chave, 16) + 1}>
            <button>{chave}{chave != tecla ? ` (${tecla})` : ''}</button>
        </TeclaDiv>
    )
}

export default Tecla;
