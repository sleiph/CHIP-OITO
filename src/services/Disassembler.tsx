import Instrucoes from './Instrucoes';

/**
 * recebe o índice da Memória que está sendo executado,
 * interpreta a instrução de acordo com a Opcode table da wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */
function Disassembler(indice: number, inst1: number, inst2: number) {
  let op =inst1 >> 4,   // primeira posicao da instrucao
      x = inst1 & 0xf,  // segunda posicao
      y = inst2 >> 4,   // terceira posicao
      n = inst2 & 0xf;  // quarta posicao

  switch(op) {
    case 0:
      if (y===14) {
        if (n===0) {
          // 00e0: limpa a tela
          return indice + Instrucoes.LimpaTela();
        } else if (n===14) {
          // 00ee: volta pra linha que chamou a subrotina
          return Instrucoes.Retorna();
        } else {
          throw new Error("0 e alguma coisa...");
        }
      }
      else // 0NNN
        return indice + Instrucoes.Vazio();

    case 1: // 1NNN: pula pro endereço descrito na instrucao
      return Instrucoes.StrHex(((inst1&0xf)<<8) + inst2);
    case 2: // 2NNN: manda pra uma subrotina
      return Instrucoes.StrRot(((inst1&0xf)<<8) + inst2, indice);
    // condicionais
    case 3: // 3XNN: skipa a proxima se x=nn
      return indice + Instrucoes.skipXNNTrue(x, inst2);
    case 4: // 4XNN: skipa a proxima se x!=nn
      return indice + Instrucoes.skiptXNNFalse(x, inst2);
    case 5: // 5XY0: skipa a proxima se x=y
      return indice + Instrucoes.skipXYTrue(x, y);
    case 6: // 6XNN: atribui o valor de uma das variaveis
      return indice + Instrucoes.setRegistrar(x, inst2);
    case 7: // 7XNN: adiciona ao valor de uma variavel
      return indice + Instrucoes.setAdd(x, inst2);
    case 8:
      // operações com as variaveis
      switch(n) {
        case 0:
          return indice + Instrucoes.setIgual(x, y);
        case 1:
          return indice + Instrucoes.setOR(x, y);
        case 2:
          return indice + Instrucoes.setAND(x, y);
        case 3:
          return indice + Instrucoes.setXOR(x, y);
        case 4:
          return indice + Instrucoes.setAddop(x, y);
        case 5:
          return indice + Instrucoes.setSubop(x, y);
        case 6:
          return indice + Instrucoes.setRightShift(x);
        case 7:
          return indice + Instrucoes.setRestop(x, y);
        case 14:
          return indice + Instrucoes.setLeftShift(x);
        default:
          throw new Error("8 e alguma coisa...");
      }

    case 9: // 9XY0: skipa a proxima se x!=y
      return indice + Instrucoes.skipXYFalse(x, y);
    case 10: // ANNN: muda o valor do apontador (I)
      return indice + Instrucoes.setIndico(((inst1&0xf)<<8) + inst2);
    case 11: // BNNN: pula pro endereço V0 + instrucao enviada
      return Instrucoes.pulaPraNNN(((inst1&0xf)<<8) + inst2);
    case 12: // CXNN: atribui um valor aleatorio pro registrador[x]
      return indice + Instrucoes.setRandom(x, inst2);
    case 13: // DXYN: desenha na tela
      return indice + Instrucoes.Desenha(x, y, n);
    case 14: // E
      // entrada de teclado
      if (n===14) // EX9e: skipa a proxima instrucao se a tecla pedida tiver sendo apertada
        return indice + Instrucoes.isApertando(x);
      else if (n===1) //EXa1: skipa a proxima instrucao se a tecla pedida NÃO tiver sendo apertada
        return indice + Instrucoes.isNotApertando(x);
      throw new Error("E alguma coisa...");

    case 15: // F
      switch(n) {
        case 3: // fX33: transforma o valor decimal de Vx em hexadecimal e salva nas posicoes I, I+1 e I+2 da memoria
          return indice + Instrucoes.setBCD(x);
        case 5:
          if (y === 1) // FX15: seta o delay timer
            return indice + Instrucoes.setTimer(x);
          else if (y === 5) // FX55: guarda os valores das variaveis a partir de X na memória
            return indice + Instrucoes.save(x);
          else if (y === 6) // FX65: preenche as variávels a partir de X com valores da memória
            return indice + Instrucoes.load(x);
          throw new Error("F alguma coisa alguma coisa 5...");
        case 7: // FX07: usa o delay timer
          return indice + Instrucoes.registraTimer(x);
        case 8: // FX18: toca um somzin
          return indice + Instrucoes.setSound(x);
        case 9: //FX29: seta um sprite na memoria
          return indice + Instrucoes.registraIndice(x);
        case 10: //FX0a: espera até que o usuario aperte uma tecla
          return indice + Instrucoes.esperarTecla(x);
        case 14: // FX1E: adiciona o valor de uma variavel ao apontador
          return indice + Instrucoes.setAddIndice(x);
        default: // só pra garantir
          throw new Error("F total");
      }
    default:
      throw new Error("instrução " + indice + " não entendida");
  }
}

export default Disassembler;
