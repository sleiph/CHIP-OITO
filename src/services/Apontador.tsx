/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 */

import Disassembler from "./Disassembler";
import { isJogando, isProximoInput, setProximoInput } from "./Inputs";
import { getPos } from "./Memoria";
import { tick } from "./Timer";

export interface IApontador {
  atual: number,
  // delay entre instruções em milisegundos
  velocidade: number,
  intervalo: any
}

let apontador: IApontador = {
  atual: 0x200,
  velocidade: 0,
  intervalo: function(setInstrucao: any, velocidade: number) {
    setInterval(
      function() {
        aponta(setInstrucao);
        // Atualiza os timers
        tick();
      }, velocidade
    )
  }
}

/**
   * Começa a executar as instruções gravadas na memória
   */
export const IniciarApontador = function (setInstrucao: any) {
  apontador.atual = 0x200;
  clearInterval(apontador.intervalo);
  apontador.intervalo(setInstrucao);
}

function aponta(setInstrucao: any) {
  if (isJogando() || isProximoInput()) {
    let indice = apontador.atual
    apontador.atual = Disassembler(indice, getPos(indice), getPos(indice+1));
    setProximoInput(false);

    // esse hook q tá deixando ele lento, mas eh importante pro debug :(
    setInstrucao(apontador.atual);
  }
}
