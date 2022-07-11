import Disassembler from "./Disassembler";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;
 let tempo = 500;

function Apontador(ops, setRegistradores, setDisplay) {
  setTimeout(() => { console.log("World!"); }, 5000);
  setInterval( function() {aponta(ops, setRegistradores, setDisplay)}, tempo);
}

function aponta(opsx, setRegistradores, setDisplay) {
  op = { 'indice':i, 'op':opsx[i] }
  i = Disassembler(op, setRegistradores, setDisplay);
}

export default Apontador;