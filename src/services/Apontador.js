import Disassembler from "./Disassembler";
import Inputs from "./Inputs";
import Memoria from "./Memoria";
import Timer from "./Timer";
import Tratamento from "./Tratamento";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 */
const Apontador = {
  // delay entre instruções em milisegundos
  velocidade: 0,
  atual: 0x200,

  /**
   * Começa a executar as instruções gravadas na memória
   */
  Comecar: function (setInstrucao) {
    this.atual = 0x200;
    setInterval(
      function() {
        aponta(setInstrucao)
      }, this.velocidade
    );
  }
}

// não consegui deixar essa funcao como parte da const Apontador...
function aponta(setInstrucao) {
  // se o jogo não ta pausado
  if (Inputs.sendSignal() || Inputs.executarProximo) {
    Apontador.atual = Disassembler(Apontador.atual);
    
    // se o jogador aperta pra executar só a proxima instrucao
    if (Inputs.executarProximo)
      Inputs.executarProximo = false;

    // esse hook q tá deixando ele lento, mas eh importante pro debug :(
    //setInstrucao(Apontador.atual);
  }
  // Atualiza os timers
  Timer.tick();
}

export default Apontador;