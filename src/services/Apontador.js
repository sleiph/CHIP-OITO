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
  velocidade: 10,
  atual: 0x200,

  /**
   * Começa a executar as instruções gravadas na memória
   */
  Comecar: function (setRegistradores, setDisplay, setIndice, setTimers, setInstrucao) {
    setInterval(
      function() {
        aponta(setRegistradores, setDisplay, setIndice, setTimers, setInstrucao)
      }, this.velocidade
    );
  }
}

// não consegui deixar essa funcao como parte da const Apontador...
function aponta(setRegistradores, setDisplay, setIndice, setTimers, setInstrucao) {
  // se o jogo não ta pausado
  if (Inputs.sendSignal() || Inputs.executarProximo) {
    Apontador.atual = Disassembler(Apontador.atual, setRegistradores, setDisplay, setIndice, setTimers);
    
    // se o jogador aperta pra executar só a proxima instrucao
    if (Inputs.executarProximo)
      Inputs.executarProximo = false;

    let op = Memoria.posicoes[Apontador.atual].hex + Memoria.posicoes[Apontador.atual+1].hex;
    setInstrucao([Tratamento.IntPraHex(Apontador.atual), op]);
  }
  // Atualiza os timers
  Timer.tick();
}

export default Apontador;