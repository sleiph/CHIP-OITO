import Disassembler from "./Disassembler";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
function Apontador(ops){
  let i = 0x200;

  while (true) {
    let op = { 'indice':i, 'op':ops[i] };
    i = Disassembler(op);
    
    // se chegou no fim das instruções
    if (i >= ops['limite']) {
      // volta pro começo
      i = 0x200;
    }
    // se o jogo acabou
    if (i === -1){
      break;
    }
  }
}

export default Apontador;