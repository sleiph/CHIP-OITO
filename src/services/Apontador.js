import Disassembler from "./Disassembler";
import Inputs from "./Inputs";
import Memoria from "./Memoria";
import Timer from "./Timer";
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
   */
  Comecar: function (setRegistradores, setDisplay, setIndice, setTimers) {
    setInterval(
      function() {
        aponta(setRegistradores, setDisplay, setIndice, setTimers)
      }, this.velocidade
    );
  }
}

// não consegui deixar essa funcao como parte da const Apontador...
function aponta(setRegistradores, setDisplay, setIndice, setTimers) {
  // se o jogo não ta pausado
  if (Inputs.sendSignal() || Inputs.executarProximo) {
    Apontador.atual = Disassembler(Apontador.atual, setRegistradores, setDisplay, setIndice, setTimers);
    
    // se o jogador aperta pra executar só a proxima instrucao
    if (Inputs.executarProximo)
      Inputs.executarProximo = false;

    let op = Memoria.posicoes[Apontador.atual].hex + Memoria.posicoes[Apontador.atual+1].hex;
    console.log(Tratamento.IntPraHex(Apontador.atual), op);
  }
  // Atualiza os timers
  Timer.tick();
}

export default Apontador;