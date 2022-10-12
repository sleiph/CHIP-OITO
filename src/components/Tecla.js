import Inputs from '../services/Inputs'
import styled from 'styled-components';

const TeclaDiv = styled.div`
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

function Tecla( {chave, tecla} ) {
    return (
        <TeclaDiv tabIndex = {parseInt(chave, 16)+1}>
            <button
                onClick = {() => {
                    Inputs.Teclou(tecla);
                }}
            >{chave}</button>
        </TeclaDiv>
    )
}

export default Tecla;
