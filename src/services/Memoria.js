import Tratamento from "./Tratamento";

const Memoria = {
    posicoes: {

    },
    TamanhoCartucho: 0x200,

    /**
     * Recebe um buffer da rom e carrega as instruções na memoria
     * @param {*} rom 
     */
     CarregaInstrucoes: function (rom) {
        let arrayBinario = Tratamento.BufferPraBin(rom);
        arrayBinario.forEach(e => {
            let posicao = {bin: e, hex: Tratamento.BinPraHex(e)};
            this.posicoes[this.TamanhoCartucho] = posicao;
            this.TamanhoCartucho += 0x001;
        });
    }
}

export default Memoria;
