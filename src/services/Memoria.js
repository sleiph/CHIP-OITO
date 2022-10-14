/**
 * guarda os valores da memória do chip 8, incluindo os transferidos do cartucho
 */
const Memoria = {
    Indice: 0x200,
    Subrotina: 0x200,
    rom: [],
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
     * Recebe um buffer da rom e carrega as instruções na memoria,
     * transforma o arquivo em instrucoes
     */
    Iniciar: function (rom, setter) {
        this.rom = [...new Uint8Array(rom)];
        this.pos = this.CriaPosicoes(this.fonte, this.rom);
        this.setter = setter;
        this.UpdateIndice(0x200);
    },

    /**
   * converte o buffer inicial pra um array de bytes (ex.:'00100100')
   * e cria as posições da memória
   */
    CriaPosicoes: function (fonte, buffer) {
        let comeco = Uint8Array.from(new Uint8Array(80), () => 0);
        let meio = Uint8Array.from(new Uint8Array(352), () => 0);
        return [...comeco, ...fonte, ...meio, ...buffer];
    },

    UpdateIndice: function (x) {
        this.Indice = x;
        this.setter(this.Indice);
    }
}

export default Memoria;