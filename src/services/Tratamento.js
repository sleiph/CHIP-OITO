const Tratamento = {

  /**
   * converte o buffer inicial pra um array de bytes (ex.:'00100100')
   * @param {buffer} buffer
   * @returns array de bytes
   */
  BufferPraBin: function (buffer) {
    return [...new Uint8Array(buffer)]
      .map(x => this.IntPraBin(x));
  },

  /**
   * Transforma um int em 8 caracteres binários
   * @param {*} int ex.: 18
   * @returns string com len 8, ex.: 00010010
   */
  IntPraBin: function (int) {
    return int.toString(2).padStart(8, '0');
  },

  /**
   * Transforma 8 caracteres binários em 2 hex
   * @param {*} bin ex.: 00010010
   * @returns ex.: 12
   */
  BinPraHex: function (bin) {
    return parseInt(bin, 2).toString(16).padStart(2, '0');
  }
}

export default Tratamento;
