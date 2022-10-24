import styled from 'styled-components';

const Cartucho = styled.div`
  height: 4vh;
  background-color: #f20553;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
`
const DivDebug = styled.div`
  justify-self: flex-end;
  display: flex;
  gap: 12px;
`
const BtnReset = styled.button`
  width: fit-content; 
`

function Header({ disable, setDisable, Iniciar, handleAjuda, handleDebug, fps, setFps}) {

    // entrada de arquivo (rom)
    let fileReader;
    // contar o fps 
    let fpscount = 0;
    // guardar o periodo passado
    let lastloop = new Date();
    /// manda o arquivo pra ser interpretado
    const handleFileRead = () => {
        const buffer = fileReader.result;
        Iniciar(buffer);
    };
    /// lê o arquivo carregado pelo usuario
    function handleFileChosen(arquivo) {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsArrayBuffer(arquivo);
        setDisable(true);
    }

    //atualiza o fps
    function updateFPS(){
        const thisloop = new Date(); // guardar o periodo atual
        fpscount += ((thisloop - lastloop) - fpscount) / 20;
        fpscount = Math.round(1000/fpscount)
        setFps(Math.round(1000/fpscount));
        lastloop = thisloop;
      }

      function startFPS(){
        setInterval(function(){updateFPS();},1000);
      }

    function reset(){
        window.location.reload();
    }
    
    return (
        <Cartucho>
            {
                (disable) ? <BtnReset onClick={reset}>Reset</BtnReset> : 
                <input 
                    type='file'
                    name='arquivo'
                    accept='.rom,.ch8'
                    onChange={e => handleFileChosen(e.target.files[0])}
                    onClick={e => e.target.value = ''}
                    disabled={disable}
                />
            }
            <DivDebug>
                <a>{fps}</a>
                <button disabled={!disable} onClick={startFPS}>Show FPS</button>
                <button onClick={handleDebug}>Debu<span style = {{textDecoration:'underline'}} >g</span></button>
                <button onClick={handleAjuda}>?</button>
            </DivDebug>
        </Cartucho>
    )
}

export default Header;