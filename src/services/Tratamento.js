/**
 * converte o buffer array recebido do arquivo pra uma string de hexs
 * @param {*} buffer 
 * @returns array de hex
 */
function buf2hex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * converte o binário do arquivo .rom pra um array de 4xn hexadecimais
 * @param {*} buffer 
 * @returns ex: [ "6a02", "6b0c" ]
 */
function Tratamento(conteudo) {
  var buffer = new Uint8Array(conteudo).buffer;
  var bytes = buf2hex(buffer);
  var ops = bytes.match(/.{1,4}/g);

  return ops;
}

export default Tratamento;
