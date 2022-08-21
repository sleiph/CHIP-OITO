import Disassembler from "./Disassembler";
import Inputs from "./Inputs";
import Instrucoes from './Instrucoes';

const Apontador = {
  // velocidade das instruções em milisegundos
  velocidade: 500,

  /**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 * @param {Object} ex:{0x200:6a02, 0x202:6b0c, ...} 
 */
  atual: 0x200,

  /**
   * Começa a executar as instruções gravadas na memória
   * @param {*} setRegistradores 
   * @param {*} setDisplay 
   * @param {*} setIndice 
   */
  Comecar: function (setRegistradores, setDisplay, setIndice) {
    setInterval( function() {aponta(setRegistradores, setDisplay, setIndice)}, this.velocidade);
  }
}

function aponta(setRegistradores, setDisplay, setIndice) {
  if (Inputs.sendSignal()) {
    Apontador.atual = Disassembler(Apontador.atual, setRegistradores, setDisplay, setIndice);
    Instrucoes.updateTimer();
  } 
}

export default Apontador;