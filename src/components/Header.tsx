import styled from 'styled-components';
import { ToggleJogando } from '../services/Inputs';
import { mudarCor, ReiniciarDisplay } from '../services/Display';
import { ReiniciarMemoria } from '../services/Memoria';
import { ReiniciarRegistradores } from '../services/Registros';
import { ReiniciarApontador } from '../services/Apontador';
import { ReiniciarTimer } from '../services/Timer';

const Cartucho = styled.div`
    height: 4vh;
    background-color: #f20553;
    padding: 0 16px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    position:relative;
`

const DivDebug = styled.div`
    height: 100%;
    justify-self: flex-end;
    display: flex;
    column-gap: 12px;

    button {
        padding: 0px 16px;
        color: white;
        background-color: #c00442;
        border: none;
        cursor: pointer;
        transition: 0.1s all;

        &:hover {
            background-color: #a70339;
        }
        
        &:active {
            transform: scale(0.98);
            outline: solid #f20553;
            outline-offset: -8px;
        }
    }

    @media only screen and (max-width : 600px) {
        gap: 6px;
    }
`
const BtnReset = styled.button`
    padding: 0px 16px;
    height: 100%;
    width: fit-content;
    color: white;
    background-color: #c00442;
    border: none;
    cursor: pointer;
    transition: 0.1s all;

    &:hover {
        background-color: #a70339;
    }
        
    &:active {
        transform: scale(0.98);
        outline: solid #f20553;
        outline-offset: -8px;
    }
`

const StyledFileInput = styled.label`
    height: 100%;
    width: fit-content;
    padding: 0px 16px;
    color: white;
    background-color: #c00442;
    cursor: pointer;
    font-size: 16px;
    align-content: center;
    transition: 0.1s all;

    input {
        display: none;
    }
    
    &:hover {
        background-color: #a70339;
    }
    
    &:active {
        transform: scale(0.98);
        outline: solid #f20553;
        outline-offset: -8px;
    }
`

const Underline = styled.span`
    border:none;
    border-bottom: 0.1px solid #1e2f45;
`

function Header({ disable, setDisable, Iniciar, handleAjuda, handleDebug/*, fps, setFps*/ }: any) { //r todo: corrigir o tipo
    // entrada de arquivo (rom)
    let fileReader: FileReader;
    /// manda o arquivo pra ser interpretado
    const handleFileRead = () => {
        const buffer = fileReader.result;
        Iniciar(buffer);
    };
    /// lê o arquivo carregado pelo usuario
    function handleFileChosen(arquivo: File) {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsArrayBuffer(arquivo);
        setDisable(true);
    }

    function reset() {
        ReiniciarMemoria();
        ReiniciarRegistradores();
        ReiniciarTimer();
        ReiniciarApontador();
        ReiniciarDisplay();
        setDisable(false);
        //window.location.reload();
    }

    function pauseButton() {
        ToggleJogando()
    }

    return (
        <Cartucho>
            {
                (disable) ? <BtnReset onClick={reset}>Reset</BtnReset> :
                <StyledFileInput> Escolher Arquivo
                    <input 
                        type='file'
                        name='arquivo'
                        accept='.rom,.ch8'
                        onChange={e => {
                            if (e.target.files == null)
                                throw new Error("sem arquivo para iniciar");
                            handleFileChosen( e.target.files[0] )
                        }}
                        onClick={e => (e.target as HTMLInputElement).value = ''}
                        disabled={disable}
                    />
                </StyledFileInput>
            }
            <DivDebug>
                <button disabled={!disable} onClick={pauseButton}>Pause</button>
                <button disabled={!disable} onClick={() => mudarCor()}>Change Theme</button>
                <button onClick={handleDebug}>Debu<Underline>g</Underline></button>
                <button onClick={handleAjuda}>?</button>
            </DivDebug>
        </Cartucho>
    )
}

export default Header;