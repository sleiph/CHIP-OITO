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

function Ajuda() {
    return(
        <OPDiv>
            <Fundo />
            <Grupo>
                <h2>CHIP-8:</h2>
                <Subtitle >Feito por Ricardo e Tiago.</Subtitle>
            </Grupo>
            <Grupo>
                <p>Esse é um emulador de chip-8 feito em React.js.</p>
                <p>Para usar o emulador você deve possuir ás roms com os jogos compátiveis, não disponibilizamos nenhuma rom em nossa aplicação. Use o botão na parte superior esquerda para selecionar o arquivo desejável.</p>
                <p>Você pode usar seu teclado fisíco ou o teclado do site para interagir com ele. Ás teclas usadas são q, w, e, a, s e d. Cada jogo irá usa-las de forma difente.</p>
            </Grupo>
            <Grupo>
                <p>Pra fechar ou abrir esse menu denovo, aperte h.</p>
            </Grupo>
        </OPDiv>
    )
}

export default Ajuda;