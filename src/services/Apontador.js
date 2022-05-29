import Disassembler from "./Disassembler";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;
function Apontador(ops){
  setInterval( function() {aponta(ops)}, 1000 );
}

function aponta(opsx) {
  op = { 'indice':i, 'op':opsx[i] }
  i = Disassembler(op);
}

export default Apontador;