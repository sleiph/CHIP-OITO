import styled from 'styled-components';
import { ToggleJogando } from '../services/Inputs';
import { mudarCor, /*LimpaTela*/ } from '../services/Display';
/*import { ReiniciarMemoria } from '../services/Memoria';
import { ReiniciarRegistradores } from '../services/Registros';
import { ReiniciarApontador } from '../services/Apontador';
import { ReiniciarTimer } from '../services/Timer';*/

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
  justify-self: flex-end;
  display: flex;
  gap: 12px;
  right:0px;
  bottom:0px;
  @media only screen and (max-width : 600px) {
    gap: 6px;
  }
`
const BtnReset = styled.button`
  width: fit-content; 
`

const Underline = styled.span`
    border:none;
    border-bottom: 0.1px solid #1e2f45;
`

function Header({ disable, setDisable, Iniciar, handleAjuda, handleDebug/*, fps, setFps*/}: any ) { //r todo: corrigir o tipo
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

    function reset(){
        //LimpaTela();
        //ReiniciarMemoria();
        //ReiniciarRegistradores(); // talvez funcionando, checar novamente em conjunto dos outros
        //ReiniciarApontador(); // funcionando
        //ReiniciarTimer(); // aparentemente funcionando, tenho minhas duvídas
        //setDisable(false); // funcionando
        //console.log(disable);
        window.location.reload();
    }

    function pauseButton(){
        ToggleJogando()
    }
    
    return (
        <Cartucho>
            {
                (disable) ? <BtnReset onClick={reset}>Reset</BtnReset> :
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