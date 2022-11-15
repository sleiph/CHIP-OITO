import styled, { keyframes } from 'styled-components';

import {Grupo, OPDiv} from './Debug';

const changeBack = keyframes`
    0% { background-position:  0% 80%; }
    50% { background-position: 80% 100%; }
    100% { background-position: 0% 90%; }
`
export const Fundo = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(-45deg, #19f505, #70c269, #425e3f, #042601);
    animation-name: ${changeBack};
    animation-duration: 8s;
    animation-iteration-count: infinite;
    opacity: .5;
    outline: solid #d9ffea;
    outline-offset: -8px;
    z-index: -1000;
`
const Subtitle = styled.div`
    color: white;
    width: -webkit-fill-available;
`

const highLighted = {
    color: "red",
    fontWeight: "bold"
}

function Ajuda({passar, setPassar}) {
    function continuarAjuda(){ 
        if (passar > 2) setPassar(0);
        else setPassar(passar + 1);
    }

    function paginacao(pagina) {
        if (pagina === 0) 
            return <p>Para usar o emulador você deve possuir as ROMs com os jogos compatíveis, não disponibilizamos nenhuma ROM em nossa aplicação. Use o botão na parte superior esquerda para selecionar o arquivo desejado.</p>
        else if (pagina === 1)
            return <p>Você pode usar seu teclado físico ou o teclado do site para interagir. As teclas usadas são <span style={highLighted}>Q, W, E, A, S</span> e <span style={highLighted}>D</span>. Cada jogo irá usá-las de forma difente. Há certas teclas com funcões especiais, o <span style={highLighted}>P</span> pode pausar a aplicação, o <span style={highLighted}>G</span> pode abrir o menu de debug e o <span style={highLighted}>H</span> pode abrir o menu de ajuda. Você também pode utilizar o botões na parte superior.</p>
        else if (pagina === 2)
            return <p>Através do botão Debug, você pode acessar uma janela com as informações sobre o que está acontecendo no emulador. Nela você pode verificar quais instruções estão sendo chamadas e quais registradores estão sendo alterados no momento.</p>
        else
            return <p>Se quiser ver a quantidade de frames por segundo(FPS) da aplicação, você pode clicar em "show FPS". FPS é uma unidade de medida sobre o número de imagens processadas por segundo, é uma forma de se medir desempenho. Você pode desfazer esta ação através do mesmo botão.</p>
    }

    return(
        <OPDiv>
            <Fundo />
            <Grupo>
                <h2>CHIP-OITO:</h2>
                <Subtitle >Feito por Ricardo e Tiago.</Subtitle>
            </Grupo>
            <Grupo>
                <p>Esse é um emulador de CHIP-8 feito em React.js.</p>
                { paginacao(passar) }
            </Grupo>
            <Grupo style={{alignSelf: 'flex-end'}}> 
                <button onClick={continuarAjuda}>Continuar</button>
            </Grupo>
            <Grupo style={{position: 'absolute', bottom: 0, right: 0}}>
                <p><span style={highLighted}>H</span> pra fechar ou abrir esse menu.</p>
            </Grupo>
        </OPDiv>
    )
}

export default Ajuda;