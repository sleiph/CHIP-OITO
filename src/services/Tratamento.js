/**
 * converte o buffer array recebido do arquivo pra uma string de hexs
 * @param {buffer} buffer
 * @returns array de hex
 */
function buf2hex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * 
 * @param {string} conteudo 
 * @returns objeto com posicao na memoria e instrucao
 */
function criaPosicoes(bytes) {
  let ops = {};
  let posicao = 0x200;

  for (let i=4; i<bytes.length; i+=4) {
    ops[posicao] = bytes.slice(i-4, i);
    posicao += 0x002;
  }
  ops['limite'] = posicao;
  
  return ops;
}

/**
 * converte o binário do arquivo .rom pra um array de 4xn hexadecimais
 * @param {fileReader.result} buffer
 * @returns ex: { '0200': "6a02", '0202':"6b0c", ... ]
 */
function Tratamento(conteudo) {
  var buffer = new Uint8Array(conteudo).buffer;
  var bytes = buf2hex(buffer);
  
  return criaPosicoes(bytes);
}

export default Tratamento;
