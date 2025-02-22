/**
 * guarda os valores da memória do chip 8, incluindo os transferidos do cartucho
 */
export interface IMemoria {
    Indice: number,
    Subrotinas: Array<number>,
    rom: any[], //R TODO: arrumar esse tipo
    pos: number[] | null, //R TODO: arrumar esse tipo
    setter: any
}

let memoria: IMemoria = {
    Indice: 0x200,
    Subrotinas: [],
    rom: [],
    pos: null,
    setter: null,
}

const fonte: Uint8Array = new Uint8Array([
    /// 0
    0xF0, 0x90, 0x90, 0x90, 0xF0,
    /// 1
    0x20, 0x60, 0x20, 0x20, 0x70,
    /// 2
    0xF0, 0x10, 0xF0, 0x80, 0xF0,
    /// 3
    0xF0, 0x10, 0xF0, 0x10, 0xF0,
    /// 4
    0x90, 0x90, 0xF0, 0x10, 0x10,
    /// 5
    0xF0, 0x80, 0xF0, 0x10, 0xF0,
    /// 6
    0xF0, 0x80, 0xF0, 0x90, 0xF0,
    /// 7
    0xF0, 0x10, 0x20, 0x40, 0x40,
    /// 8
    0xF0, 0x90, 0xF0, 0x90, 0xF0,
    /// 9
    0xF0, 0x90, 0xF0, 0x10, 0xF0,
    /// A
    0xF0, 0x90, 0xF0, 0x90, 0x90,
    /// B
    0xE0, 0x90, 0xE0, 0x90, 0xE0,
    /// C
    0xF0, 0x80, 0x80, 0x80, 0xF0,
    /// D
    0xE0, 0x90, 0x90, 0x90, 0xE0,
    /// E
    0xF0, 0x80, 0xF0, 0x80, 0xF0, 
    /// F
    0xF0, 0x80, 0xF0, 0x80, 0x80,
]);

/**
 * Recebe um buffer da rom e carrega as instruções na memoria,
 * transforma o arquivo em instrucoes
 */
export const IniciarMemoria = function (rom: ArrayBuffer, setter: any) {
    memoria.rom = [...new Uint8Array(rom)];
    memoria.pos = CriaPosicoes(memoria.rom);
    memoria.setter = setter;
    UpdateIndice(0x200);
};

export const ReiniciarMemoria = function() : void  {
    memoria.Subrotinas = [];
    memoria.rom = [];
    memoria.pos = []; //fazendo o emulador ir de f (literalmente)
    memoria.setter(null);
    UpdateIndice(0x200);
}

/**
 * converte o buffer inicial pra um array de bytes (ex.:'00100100')
 * e cria as posições da memória
 */
export const CriaPosicoes = function (buffer: any[]) { //R TODO: corrigir esse tipo
    let comeco = Uint8Array.from(new Uint8Array(80), () => 0);
    let meio = Uint8Array.from(new Uint8Array(352), () => 0);
    return [...comeco, ...fonte, ...meio, ...buffer];
};

export const GetIndice = function (): number {
    return memoria.Indice;
};

export const UpdateIndice = function (x: number) {
    memoria.Indice = x;
    memoria.setter(memoria.Indice);
};

export const SubrotinaPop = function (): number {
    let result = memoria.Subrotinas.pop();
    if (result == undefined)
        return -1;
    return result;
};

export const SubrotinaPush = function (instrucao: number) {
    return memoria.Subrotinas.push(instrucao);
};

export const getPos = function(n: number): number {
    if (memoria.pos == null) {
        console.log("Erro encontrado as posicoes");
        return 0xF0;
    }
    return memoria.pos[n];
}

export const getIndicePos = function (n: number): number {
    if (memoria.pos == null) {
        console.log("Erro encontrado as posicoes");
        return 0xF0;
    }
    return memoria.pos[memoria.Indice+n];
}

export const setIndicePos = function (i: number, val: number) {
    if (memoria.pos == null) {
        console.log("Erro encontrado sprite");
        return;
    }
    memoria.pos[memoria.Indice+i] = val;
}

export const getSprites = function (n: number): number[] {
    if (memoria.pos == null) {
        console.log("Erro encontrado sprite");
        return [0xF0];
    }
    return memoria.pos.slice(memoria.Indice, memoria.Indice+n)
}

export const getMapaMemoria = () => memoria.rom.reduce((acc: any, _curr: any, i: number) => {
    if (i%2 === 0) {
        acc[i+0x200] = ([memoria.rom[i], memoria.rom[i+1]]);
    }
    return acc;
}, [])
