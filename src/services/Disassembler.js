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
          return Instrucoes.LimpaTela(indice);
        } else if (op[3]==='e') {
          // 00ee: volta pra linha que chamou a subrotina
          return Instrucoes.Retorna();
        }
      }
      else // 0NNN
        return Instrucoes.Vazio(indice);
      console.log("0 alguma coisa...");
      return indice + 0x002;
    case '1': // 1NNN: pula pro endereço descrito na instrucao
      return Instrucoes.StrHex(nnn);
    case '2': // 2NNN: manda pra uma subrotina
      return Instrucoes.StrRot(nnn, indice);
    // condicionais
    case '3': // 3XNN: skipa a proxima se x=nn
      return Instrucoes.skipXNNTrue(ope1, valor, indice);
    case '4': // 4XNN: skipa a proxima se x!=nn
      return Instrucoes.skiptXNNFalse(ope1, valor, indice);
    case '5': // 5XY0: skipa a proxima se x=y
      return Instrucoes.skipXYTrue(ope1, ope2, indice);
    case '6': // 6XNN: atribui o valor de uma das variaveis
      return Instrucoes.setRegistrar(ope1, valor, indice);
    case '7': // 7XNN: adiciona ao valor de uma variavel
      return Instrucoes.setAdd(ope1, valor, indice);
    case '8':
      // operações com as variaveis
      switch(op[3]) {
        case '0':
          return Instrucoes.setIgual(ope1, ope2, indice);
        case '1':
          return Instrucoes.setOR(ope1, ope2, indice);
        case '2':
          return Instrucoes.setAND(ope1, ope2, indice);
        case '3':
          return Instrucoes.setXOR(ope1, ope2, indice);
        case '4':
          return Instrucoes.setAddop(ope1, ope2, indice);
        case '5':
          return Instrucoes.setSubop(ope1, ope2, indice);
        case '6':
          return Instrucoes.setRightShift(ope1, indice);
        case '7':
          return Instrucoes.setRestop(ope1, ope2, indice);
        case 'e':
          return Instrucoes.setLeftShift(ope1, indice);
        default:
          console.log("8 e alguma coisa...");
          return indice + 0x002;
      }
    case '9': // 9XY0: skipa a proxima se x!=y
      return Instrucoes.skipXYFalse(ope1, ope2, indice);
    case 'a': // ANNN: muda o valor do apontador (I)
      return Instrucoes.setIndico(nnn, indice);
    case 'b': // BNNN: pula pro endereço V0 + instrucao enviada
      return Instrucoes.pulaPraNNN(nnn);
    case 'c': // CXNN: atribui um valor aleatorio pro registrador[x]
      return Instrucoes.setRandom(ope1, valor, indice);
    case 'd': // DXYN: desenha na tela
      return Instrucoes.Desenha(ope1, ope2, n, indice);
    case 'e':
      // entrada de teclado
      if (op[3]==='e') // EX9e: skipa a proxima instrucao se a tecla pedida tiver sendo apertada
        return Instrucoes.isApertando(ope1, indice);
      else if (op[3]==='1') //EXa1: skipa a proxima instrucao se a tecla pedida NÃO tiver sendo apertada
        return Instrucoes.isNotApertando(ope1, indice);
      console.log("E alguma coisa...");
      return indice + 0x002;
    case 'f':
      switch(op[3]) {
        case '3': // fX33: transforma o valor decimal de Vx em hexadecimal e salva nas posicoes I, I+1 e I+2 da memoria
          return Instrucoes.setBCD(ope1, indice);
        case '5':
          if (op[2] === '1') // FX15: seta o delay timer
            return Instrucoes.setTimer(ope1, indice);
          else if (op[2] === '5') // FX55: guarda os valores das variaveis a partir de X na memória
            return Instrucoes.save(ope1, indice);
          else if (op[2] === '6') // FX65: preenche as variávels a partir de X com valores da memória
            return Instrucoes.load(ope1, indice);
          console.log("F alguma coisa alguma coisa 5...");
          return indice + 0x002;
        case '7': // FX07: usa o delay timer
          return Instrucoes.registraTimer(ope1, indice);
        case '8': // FX18: toca um somzin
          return Instrucoes.setSound(ope1, indice);
        case '9': //FX29: seta um sprite na memoria
          return Instrucoes.registraIndice(ope1, indice);
        case 'a': //FX0a: espera até que o usuario aperte uma tecla
          return Instrucoes.esperarTecla(ope1, indice);
        case 'e': // FX1E: adiciona o valor de uma variavel ao apontador
          return Instrucoes.setAddIndice(ope1, indice);
        default: // só pra garantir
          console.log("F total");
      }
      return indice + 0x002;
    default:
      throw new Error("instrução " + op + " não entendida");
  }
}

export default Disassembler;