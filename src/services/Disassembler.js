import Instrucoes from './Instrucoes';
import Memoria from './Memoria';
import Tratamento from './Tratamento';

/**
 * recebe o índice da Memória que está sendo executado,
 * interpreta a instrução de acordo com a Opcode table da wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */
function Disassembler(indice) {
  let op = Memoria.posicoes[indice].hex + Memoria.posicoes[indice+1].hex;
  
  let ope1 = Tratamento.HexPraInt(op[1]);
  let ope2 = Tratamento.HexPraInt(op[2]);
  let nnn = Tratamento.HexPraInt(op[1] + op[2] + op[3]);
  let n = Tratamento.HexPraInt(op[3]);
  let valor = Tratamento.HexPraInt(Memoria.posicoes[indice+1].hex);

  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        if (op[3]==='0') {
          // 00e0: limpa a tela
          return indice + Instrucoes.LimpaTela();
        } else if (op[3]==='e') {
          // 00ee: volta pra linha que chamou a subrotina
          return Instrucoes.Retorna();
        }
      }
      else // 0NNN
        return indice + Instrucoes.Vazio();
      throw new Error("0 alguma coisa...");
    case '1': // 1NNN: pula pro endereço descrito na instrucao
      return Instrucoes.StrHex(nnn);
    case '2': // 2NNN: manda pra uma subrotina
      return Instrucoes.StrRot(nnn, indice);
    // condicionais
    case '3': // 3XNN: skipa a proxima se x=nn
      return indice + Instrucoes.skipXNNTrue(ope1, valor);
    case '4': // 4XNN: skipa a proxima se x!=nn
      return indice + Instrucoes.skiptXNNFalse(ope1, valor, );
    case '5': // 5XY0: skipa a proxima se x=y
      return indice + Instrucoes.skipXYTrue(ope1, ope2);
    case '6': // 6XNN: atribui o valor de uma das variaveis
      return indice + Instrucoes.setRegistrar(ope1, valor);
    case '7': // 7XNN: adiciona ao valor de uma variavel
      return indice + Instrucoes.setAdd(ope1, valor);
    case '8':
      // operações com as variaveis
      switch(op[3]) {
        case '0':
          return indice + Instrucoes.setIgual(ope1, ope2);
        case '1':
          return indice + Instrucoes.setOR(ope1, ope2);
        case '2':
          return indice + Instrucoes.setAND(ope1, ope2);
        case '3':
          return indice + Instrucoes.setXOR(ope1, ope2);
        case '4':
          return indice + Instrucoes.setAddop(ope1, ope2);
        case '5':
          return indice + Instrucoes.setSubop(ope1, ope2);
        case '6':
          return indice + Instrucoes.setRightShift(ope1);
        case '7':
          return indice + Instrucoes.setRestop(ope1, ope2);
        case 'e':
          return indice + Instrucoes.setLeftShift(ope1);
        default:
          throw new Error("8 e alguma coisa...");
      }
    case '9': // 9XY0: skipa a proxima se x!=y
      return indice + Instrucoes.skipXYFalse(ope1, ope2);
    case 'a': // ANNN: muda o valor do apontador (I)
      return indice + Instrucoes.setIndico(nnn);
    case 'b': // BNNN: pula pro endereço V0 + instrucao enviada
      return Instrucoes.pulaPraNNN(nnn);
    case 'c': // CXNN: atribui um valor aleatorio pro registrador[x]
      return indice + Instrucoes.setRandom(ope1, valor);
    case 'd': // DXYN: desenha na tela
      return indice + Instrucoes.Desenha(ope1, ope2, n);
    case 'e':
      // entrada de teclado
      if (op[3]==='e') // EX9e: skipa a proxima instrucao se a tecla pedida tiver sendo apertada
        return indice + Instrucoes.isApertando(ope1);
      else if (op[3]==='1') //EXa1: skipa a proxima instrucao se a tecla pedida NÃO tiver sendo apertada
        return indice + Instrucoes.isNotApertando(ope1);
      throw new Error("E alguma coisa...");
    case 'f':
      switch(op[3]) {
        case '3': // fX33: transforma o valor decimal de Vx em hexadecimal e salva nas posicoes I, I+1 e I+2 da memoria
          return indice + Instrucoes.setBCD(ope1);
        case '5':
          if (op[2] === '1') // FX15: seta o delay timer
            return indice + Instrucoes.setTimer(ope1);
          else if (op[2] === '5') // FX55: guarda os valores das variaveis a partir de X na memória
            return indice + Instrucoes.save(ope1);
          else if (op[2] === '6') // FX65: preenche as variávels a partir de X com valores da memória
            return indice + Instrucoes.load(ope1);
          throw new Error("F alguma coisa alguma coisa 5...");
        case '7': // FX07: usa o delay timer
          return indice + Instrucoes.registraTimer(ope1);
        case '8': // FX18: toca um somzin
          return indice + Instrucoes.setSound(ope1);
        case '9': //FX29: seta um sprite na memoria
          return indice + Instrucoes.registraIndice(ope1);
        case 'a': //FX0a: espera até que o usuario aperte uma tecla
          return indice + Instrucoes.esperarTecla(ope1);
        case 'e': // FX1E: adiciona o valor de uma variavel ao apontador
          return indice + Instrucoes.setAddIndice(ope1);
        default: // só pra garantir
          throw new Error("F total");
      }
    default:
      throw new Error("instrução " + op + " não entendida");
  }
}

export default Disassembler;