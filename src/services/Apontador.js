import Disassembler from "./Disassembler";
import Inputs from "./Inputs";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
 let i = 0x200;
 let op;

function Apontador(ops, setRegistradores, setDisplay, setIndice) {
  setInterval( function() {aponta(ops, setRegistradores, setDisplay, setIndice)}, 500);
}

function aponta(ops, setRegistradores, setDisplay, setIndice) {
  if (Inputs.sendSignal()) {
    op = { 'indice':i, 'op':ops[i] }
    i = Disassembler(op, setRegistradores, setDisplay, setIndice, ops);
  } 
}

export default Apontador;