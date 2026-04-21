/**
 * Cicla entre as instruções, pedindo a próxima até que o programa termine
 */

import Disassembler from "./Disassembler";
import { isJogando, isProximoInput, setProximoInput } from "./Inputs";
import { getPos } from "./Memoria";

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

export const ReiniciarApontador = function () : any {
  apontador.atual = 0x200;
  clearInterval(apontador.intervalo);
}

let instructionUpdateTimeout: number | null = null;
let lastInstructionValue = 0;

function batchedInstructionUpdate(setInstrucao: any, value: number) {
  if (instructionUpdateTimeout !== null) {
    clearTimeout(instructionUpdateTimeout);
  }
  
  lastInstructionValue = value;
  instructionUpdateTimeout = setTimeout(() => {
    setInstrucao(lastInstructionValue);
    instructionUpdateTimeout = null;
  }, 0);
}

function aponta(setInstrucao: any) {
  if (isJogando() || isProximoInput()) {
    let indice = apontador.atual
    apontador.atual = Disassembler(indice, getPos(indice), getPos(indice+1));
    setProximoInput(false);

    batchedInstructionUpdate(setInstrucao, apontador.atual);
  }
}
