import Disassembler from "./Disassembler";
import Instrucoes from "./Instrucoes";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;

function Apontador(ops, setRegistradores, setDisplay) {
  setInterval( function() {aponta(ops, setRegistradores, setDisplay)}, 500);
}

function aponta(opsx, setRegistradores, setDisplay) {
  if (Instrucoes.sendSignal()) {
    op = { 'indice':i, 'op':opsx[i] }
    i = Disassembler(op, setRegistradores, setDisplay);
  } 
}

export default Apontador;