import Tratamento from "./Tratamento";

/**
 * guarda os valores da memória do chip 8, incluindo os transferidos do cartucho
 */
const Memoria = {
    // vai guardar o número de instruções no cartucho + 0x200
    tamanho: 0x200,
    Indice: 0x200,
    Subrotina: 0x200,
    mapa: [],
    pos: null,
    setter: null,

    fonte: new Uint8Array([
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
    ]),

    /**
     * cria uma posição da memória a partir de um valor inteiro
     */
    CriaPosicao: function (valor) {
        return {
            bin: Tratamento.IntPraBin(valor),
            hex: Tratamento.IntPraHex(valor)
        }
    },

    /**
     * Recebe um buffer da rom e carrega as instruções na memoria,
     * transforma o arquivo em instrucoes
     */
    Iniciar: function (rom, setter) {
        this.tamanho = rom.length;
        this.mapa = [...new Uint8Array(rom)];
        this.pos = Tratamento.BufferPraUI8(this.fonte, this.mapa);
        this.setter = setter;
        this.UpdateIndice(0x200);
    },

    UpdateIndice: function (x) {
        this.Indice = x;
        this.setter(this.Indice);
    }
}

export default Memoria;