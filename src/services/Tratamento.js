const Tratamento = {

  /**
   * converte o buffer inicial pra um array de bytes (ex.:'00100100')
   * @param {buffer} buffer
   * @returns array de bytes
   */
  BufferPraUI8: function (fonte, buffer) {
    let comeco = Uint8Array.from(new Uint8Array(80), () => 0);
    let meio = Uint8Array.from(new Uint8Array(352), () => 0);
    return [...comeco, ...fonte, ...meio, ...buffer];
  },

  /**
   * Transforma 8 caracteres binários em 2 hex
   * @param {*} bin ex.: 00010010
   * @returns ex.: 12
   */
  BinPraHex: function (bin) {
    return parseInt(bin, 2).toString(16).padStart(2, '0');
  },

  /**
   * Transforma um hex em int.
   */
  HexPraInt: function (hex) {
    return parseInt(hex, 16)
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
   * Transforma um int em hex...
   */
   IntPraHex: function (int) {
    return int.toString(16);
  }
}

export default Tratamento;