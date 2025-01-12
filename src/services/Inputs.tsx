/**
 * Controla a entrada de comandos (teclado) do emulador
 */

export interface IInputs {
    teclas: string[],
    isJogando: boolean,
    proximo: boolean,
    apertando: boolean,
    apertadas: string[]
}

let inputs: IInputs = {
    teclas: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "q", "w", "e", "a", "s", "d"],
    isJogando: true,
    proximo: false,
    apertando: false,
    apertadas: [],
}

export const isJogando = function(): boolean {
    return inputs.isJogando;
}

/**
     * garante que o pause só seja executado uma vez
     */
export const ToggleJogando = function() {
    inputs.isJogando = !inputs.isJogando;
}

/**
     * Executa ações do teclado
     */
export const Teclou = function(tecla: string) {
    inputs.apertando = true;
    let indice: number = inputs.teclas.indexOf(tecla);
    if (indice !== -1 && inputs.apertadas.indexOf(indice.toString()) === -1) {
        inputs.apertadas.push(indice.toString());
    }
}

export const Soltou = function(tecla: string) {
    inputs.apertando = false;
    let indice = inputs.teclas.indexOf(tecla);
    if (indice !== -1 && inputs.apertadas.indexOf(indice.toString()) !== -1)
        inputs.apertadas.splice(inputs.apertadas.indexOf(indice.toString()), 1);
}

export const isApertando = function(): boolean {
    return inputs.apertando;
}

export const getIndiceApertadas = function(n: string): number {
    return inputs.apertadas.indexOf(n);
}

export const getUltimaApertada = function(): string {
    return inputs.apertadas[inputs.apertadas.length-1];
}

export const isProximoInput = function(): boolean {
    return inputs.proximo;
}

export const setProximoInput = function(val: boolean) {
    inputs.proximo = val;
}
