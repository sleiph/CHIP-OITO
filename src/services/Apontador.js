import Disassembler from "./Disassembler";
import Inputs from "./Inputs";
import Memoria from "./Memoria";
import Timer from "./Timer";

/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 */
const Apontador = {
  atual: 0x200,
  // delay entre instruções em milisegundos
  velocidade: 0,

  intervalo: function(setInstrucao) {
    setInterval(
      function() {
        aponta(setInstrucao);
        // Atualiza os timers
        Timer.tick();
      }, this.velocidade
    )
  },

  /**
   * Começa a executar as instruções gravadas na memória
   */
  Comecar: function (setInstrucao) {
    this.atual = 0x200;
    clearInterval(this.intervalo);
    this.intervalo(setInstrucao);
  }
}

function aponta(setInstrucao) {
  if (Inputs.isJogando || Inputs.proximo) {
    let indice = Apontador.atual
    Apontador.atual = Disassembler(indice, Memoria.pos[indice], Memoria.pos[indice+1]);
    Inputs.proximo = false;

    // esse hook q tá deixando ele lento, mas eh importante pro debug :(
    setInstrucao(Apontador.atual);
  }
}

export default Apontador;