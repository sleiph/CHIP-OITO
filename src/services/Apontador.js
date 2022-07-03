import Disassembler from "./Disassembler";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;
function Apontador(ops, registradores, setRegistradores, display, setDisplay) {
  setInterval( function() {aponta(ops, registradores, setRegistradores, display, setDisplay)}, 500);
}

function aponta(opsx, registradores, setRegistradores, display, setDisplay) {
  op = { 'indice':i, 'op':opsx[i] }
  i = Disassembler(op, registradores, setRegistradores, display, setDisplay);
}

export default Apontador;