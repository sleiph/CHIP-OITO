import Disassembler from "./Disassembler";
import Inputs from "./Inputs";
import Instrucoes from './Instrucoes';
import Memoria from "./Memoria";
import Tratamento from "./Tratamento";

const Apontador = {
  // delay entre instruções em milisegundos
  velocidade: 50,

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

// não consegui deixar essa funcao como parte da const Apontador...
function aponta(setRegistradores, setDisplay, setIndice) {
  if (Inputs.sendSignal()) {
    Apontador.atual = Disassembler(Apontador.atual, setRegistradores, setDisplay, setIndice);
    Instrucoes.updateTimer();

    let op = Memoria.posicoes[Apontador.atual].hex + Memoria.posicoes[Apontador.atual+1].hex;
    console.log(Tratamento.IntPraHex(Apontador.atual), op);
  } else if (Inputs.executarProximo) {
    Apontador.atual = Disassembler(Apontador.atual, setRegistradores, setDisplay, setIndice);
    Instrucoes.updateTimer();
    Inputs.executarProximo = false;

    let op = Memoria.posicoes[Apontador.atual].hex + Memoria.posicoes[Apontador.atual+1].hex;
    console.log(Tratamento.IntPraHex(Apontador.atual), op);
  }
  
}

export default Apontador;