import styled from 'styled-components';
import { ToggleJogando, isJogando } from '../services/Inputs';
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

type HeaderProps = {
    disable: boolean;
    setDisable: (disable: boolean) => void;
    Iniciar: (buffer: ArrayBuffer) => void;
    handleAjuda: () => void;
    handleDebug: () => void;
}

function Header({ disable, setDisable, Iniciar, handleAjuda, handleDebug }: HeaderProps) {
    // entrada de arquivo (rom)
    let fileReader: FileReader;
    /// manda o arquivo pra ser interpretado
    const handleFileRead = () => {
        const buffer = fileReader.result;
        Iniciar(buffer as ArrayBuffer);
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
    }

    function pauseButton() {
        ToggleJogando()
    }

    return (
        <Cartucho>
            {
                //TODO: implementar atalho pra abrir ROMs
                (disable) ? <BtnReset onClick={reset}><Underline>R</Underline>eset</BtnReset> :
                <StyledFileInput> <Underline>O</Underline>pen ROM
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
                <button disabled={!disable} onClick={pauseButton}>{isJogando() ? <span><Underline>P</Underline>ause</span> : <span>Resume</span>}</button>
                <button disabled={!disable} onClick={() => mudarCor()}>Change <Underline>T</Underline>heme</button>
                <button onClick={handleDebug}>Debu<Underline>G</Underline></button>
                <button onClick={handleAjuda}><Underline>H</Underline>elp</button>
            </DivDebug>
        </Cartucho>
    )
}

export default Header;