import Disassembler from "./Disassembler";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;
function Apontador(ops, registradores, setRegistradores){
  setInterval( function() {aponta(ops, registradores, setRegistradores)}, 1000);
}

function aponta(opsx, registradores, setRegistradores) {
  op = { 'indice':i, 'op':opsx[i] }
  i = Disassembler(op, registradores, setRegistradores);
}

export default Apontador;