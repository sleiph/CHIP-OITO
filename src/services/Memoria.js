import Tratamento from "./Tratamento";

/**
 * guarda os valores da memória do chip 8, incluindo os transferidos do cartucho
 */
const Memoria = {
    // vai guardar o número de instruções no cartucho + 0x200
    TamanhoCartucho: 0x200,
    Indice: 0x200,
    Subrotina: 0x200,
    mapa: [],
    setter: null,

    posicoes: {
        // Fonte
        /// 0
        0x050: {bin: '11110000', hex: 0x0F0},
        0x051: {bin: '10010000', hex: 0x090},
        0x052: {bin: '10010000', hex: 0x090},
        0x053: {bin: '10010000', hex: 0x090},
        0x054: {bin: '11110000', hex: 0x0F0},
        /// 1
        0x055: {bin: '00100000', hex: 0x020},
        0x056: {bin: '01100000', hex: 0x060},
        0x057: {bin: '00100000', hex: 0x020},
        0x058: {bin: '00100000', hex: 0x020},
        0x059: {bin: '01110000', hex: 0x070},
        /// 2
        0x05A: {bin: '11110000', hex: 0x0F0},
        0x05B: {bin: '00010000', hex: 0x010},
        0x05C: {bin: '11110000', hex: 0x0F0},
        0x05D: {bin: '10000000', hex: 0x080},
        0x05E: {bin: '11110000', hex: 0x0F0},
        /// 3
        0x05F: {bin: '11110000', hex: 0x0F0},
        0x060: {bin: '00010000', hex: 0x010},
        0x061: {bin: '11110000', hex: 0x0F0},
        0x062: {bin: '00010000', hex: 0x010},
        0x063: {bin: '11110000', hex: 0x0F0},
        /// 4
        0x064: {bin: '10010000', hex: 0x090},
        0x065: {bin: '10010000', hex: 0x090},
        0x066: {bin: '11110000', hex: 0x0F0},
        0x067: {bin: '00010000', hex: 0x010},
        0x068: {bin: '00010000', hex: 0x010},
        /// 5
        0x069: {bin: '11110000', hex: 0x0F0},
        0x06A: {bin: '10000000', hex: 0x080},
        0x06B: {bin: '11110000', hex: 0x0F0},
        0x06C: {bin: '00010000', hex: 0x010},
        0x06D: {bin: '11110000', hex: 0x0F0},
        /// 6
        0x06E: {bin: '11110000', hex: 0x0F0},
        0x06F: {bin: '10000000', hex: 0x080},
        0x070: {bin: '11110000', hex: 0x0F0},
        0x071: {bin: '10010000', hex: 0x090},
        0x072: {bin: '11110000', hex: 0x0F0},
        /// 7
        0x073: {bin: '11110000', hex: 0x0F0},
        0x074: {bin: '00010000', hex: 0x010},
        0x075: {bin: '00100000', hex: 0x020},
        0x076: {bin: '01000000', hex: 0x040},
        0x077: {bin: '01000000', hex: 0x040},
        /// 8
        0x078: {bin: '11110000', hex: 0x0F0},
        0x079: {bin: '10010000', hex: 0x090},
        0x07A: {bin: '11110000', hex: 0x0F0},
        0x07B: {bin: '10010000', hex: 0x090},
        0x07C: {bin: '11110000', hex: 0x0F0},
        /// 9
        0x07D: {bin: '11110000', hex: 0x0F0},
        0x07E: {bin: '10010000', hex: 0x090},
        0x07F: {bin: '11110000', hex: 0x0F0},
        0x080: {bin: '00010000', hex: 0x010},
        0x081: {bin: '11110000', hex: 0x0F0},
        /// A
        0x082: {bin: '11110000', hex: 0x0F0},
        0x083: {bin: '10010000', hex: 0x090},
        0x084: {bin: '11110000', hex: 0x0F0},
        0x085: {bin: '10010000', hex: 0x090},
        0x086: {bin: '10010000', hex: 0x090},
        /// B
        0x087: {bin: '11100000', hex: 0x0E0},
        0x088: {bin: '10010000', hex: 0x090},
        0x089: {bin: '11100000', hex: 0x0E0},
        0x08A: {bin: '10010000', hex: 0x090},
        0x08B: {bin: '11100000', hex: 0x0E0},
        /// C
        0x08C: {bin: '11110000', hex: 0x0F0},
        0x08D: {bin: '10000000', hex: 0x080},
        0x08E: {bin: '10000000', hex: 0x080},
        0x08F: {bin: '10000000', hex: 0x080},
        0x090: {bin: '11110000', hex: 0x0F0},
        /// D
        0x091: {bin: '11100000', hex: 0x0E0},
        0x092: {bin: '10010000', hex: 0x090},
        0x093: {bin: '10010000', hex: 0x090},
        0x094: {bin: '10010000', hex: 0x090},
        0x095: {bin: '11100000', hex: 0x0E0},
        /// E
        0x096: {bin: '11110000', hex: 0x0F0},
        0x097: {bin: '10000000', hex: 0x080},
        0x098: {bin: '11110000', hex: 0x0F0},
        0x099: {bin: '10000000', hex: 0x080},
        0x09A: {bin: '11110000', hex: 0x0F0},
        /// F
        0x09B: {bin: '11110000', hex: 0x0F0},
        0x09C: {bin: '10000000', hex: 0x080},
        0x09D: {bin: '11110000', hex: 0x0F0},
        0x09E: {bin: '10000000', hex: 0x080},
        0x09F: {bin: '10000000', hex: 0x080},
    },

    /**
     * Recebe um buffer da rom e carrega as instruções na memoria,
     * transforma o arquivo em instrucoes
     */
    Iniciar: function (rom, setter) {
        this.setter = setter;
        this.UpdateIndice(0x200);
        let arrayBinario = Tratamento.BufferPraBin(rom);
        arrayBinario.forEach(e => {
            let posicao = {bin: e, hex: Tratamento.BinPraHex(e)};
            this.posicoes[this.TamanhoCartucho] = posicao;
            this.TamanhoCartucho += 0x001;
        });
        this.Mapear();
    },

    /**
     * Mapa usado no debug pra exibir as instruções do cartucho
     */
    Mapear: function() {
        for (let i=0x201;i<this.TamanhoCartucho; i+=2) {
            
            this.mapa[i-1] = this.posicoes[i-1].hex + this.posicoes[i].hex;
        }
    },

    UpdateIndice: function (x) {
        this.Indice = x;
        this.setter(this.Indice);
    }
}

export default Memoria;