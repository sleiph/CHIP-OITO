/**
 * Controla todas as ações relacionadas à tela do jogo
 */

export interface IDisplay {
    original: Array<Array<number>>,
    pixels: Array<Array<number>>,
    setter: any,
    debug: boolean,
    ajuda: boolean,
    cor: string[],
    temas: string[][],
}

let display: IDisplay = {
    original: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    pixels: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    setter: null,
    debug: false,
    ajuda: false,
    cor: ['#62afb7', '#d9ffea'],
    temas: [["#550000", "#ef0000"], ["#c7f0d8", "#43523d"], ["#FFFFFF", "#000000"], ["#f44f53", "#5c46ab"], ["#1d337c", "#4d8dbc"]]
}

export const IniciarDisplay = function(setter: any) {
    display.setter = setter;
    LimpaTela();
}

export const LimpaTela = function() {
    display.pixels = display.original
    display.setter(display.pixels);
}

export const SetaPixel = function(x: number, y: number) {
    if (x > 0x3f) x -= 0x40;
    else if (x < 0) x += 0x40;
    
    if (y > 0x1f) y -= 0x20;
    else if (y < 0) y += 0x40;

    display.pixels[y][x] ^= 1;
    return display.pixels[y][x] === 0;
}

export const UpdateDisplay = function(x: number, y: number, sprites: string[]): boolean {
    let isUnset = false;

    for (let i=0; i<sprites.length; i++) {
        let s: number = parseInt(sprites[i]);
        for (let j=0; j<8; j++) {
            if ((s & 0x80) > 0) {
                if (SetaPixel(x+j, y+i) && !isUnset)
                    isUnset = true;
            }
            s <<= 1;
        }
    }
    display.setter(display.pixels);
    return isUnset;
}

export const getOriginalDisplay = function(): Array<Array<number>> {
    return display.original;
}

export const isAjuda = function(): boolean {
    return display.ajuda;
}

export const isDebug = function(): boolean {
    return display.debug;
}

export const setAjudaDisplay = function(ajuda: boolean) {
    display.ajuda = ajuda;
}

export const setDebugDisplay = function(debug: boolean) {
    display.debug = debug;
}

export const toggleAjuda = function() {
    display.ajuda = !display.ajuda;
}

export const toggleDebug = function() {
    display.debug = !display.debug;
}

export const pegarCor = function(x : number) : string {
    return display.cor[x];
}

export const mudarCor = function() {
    display.temas.push(display.cor)
    display.cor = display.temas[0];
    display.temas.shift();
}
