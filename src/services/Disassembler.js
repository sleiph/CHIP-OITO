import Instrucoes from './Instrucoes';
import Memoria from './Memoria';
import Tratamento from './Tratamento';

/**
 * recebe 4 chars hexadecimais e interpreta a instrução
 * de acordo com a Opcode table na wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */
function Disassembler(indice, setRegistradores, setDisplay, setIndice) {
  let op = Memoria.posicoes[indice].hex + Memoria.posicoes[indice+1].hex;
  console.log(indice, op);
  Instrucoes.show();
  
  let ope1 = Tratamento.HexPraInt(op[1]);
  let ope2 = Tratamento.HexPraInt(op[2]);
  let x = Tratamento.HexPraInt(op[1] + op[2] + op[3]);
  let n = Tratamento.HexPraInt(op[3]);
  let valor = Tratamento.HexPraInt(Memoria.posicoes[indice+1].hex);

  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        if (op[3]==='0') {
          // limpa a tela
          //00e0
          return Instrucoes.LimpaTela(indice, setDisplay);
        }
        else if (op[3]==='e') {
          // volta pra linha que chamou a subrotina
          //00ee
          return Instrucoes.Retorna();
        }
      }
      else {
        // faz é nada
        // 0NNN
        return Instrucoes.Vazio(indice);
      }
    break;
    case '1':
      // pula pro endereço descrito na instrucao
      return Instrucoes.StrHex(op[1] + op[2] + op[3]);
    case '2':
      // manda pra uma subrotina
      console.log("call " + op[1]+op[2]+op[3]);
      return Instrucoes.StrRot(op[1] + op[2] + op[3], indice);
    // condicionais
    case '3':
    case '4':
    case '5':
    case '9':
      return Instrucoes.setJump(op, ope1, valor, indice);
    case '6':
      // atribui o valor de uma das variaveis
      return Instrucoes.setRegistrar(ope1, valor, indice, setRegistradores);
    case '7':
      // adiciona ao valor de uma variavel
      return Instrucoes.setAdd(ope1, valor, indice, setRegistradores);
    case '8':
      // operações com as variaveis
      switch(op[3]) {
        case '0':
          return Instrucoes.setIgual(ope1, ope2, indice, setRegistradores);
        case '1':
          return Instrucoes.setOR(ope1, ope2, indice, setRegistradores);
        case '2':
          return Instrucoes.setAND(ope1, ope2, indice, setRegistradores);
        case '3':
          return Instrucoes.setXOR(ope1, ope2, indice, setRegistradores);
        case '4':
          return Instrucoes.setAddop(ope1, ope2, indice, setRegistradores);
        case '5':
          return Instrucoes.setSubop(ope1, ope2, indice, setRegistradores);
        case '6':
          console.log("V"+op[1] + " >>= 1");
          return Instrucoes.setRightShift(ope1, indice, setRegistradores);
        case '7':
          return Instrucoes.setRestop(ope1, ope2, indice, setRegistradores);
        case 'e':
          console.log("V"+op[1] + " <<= 1");
          return Instrucoes.setLeftShift(ope1, indice, setRegistradores);
        default:
          console.log("8 e alguma coisa...");
      }
      return indice + 0x002;
    case 'a':
      // muda o valor do apontador (I)
      return Instrucoes.setIndico(x, indice, setIndice);
    case 'b':
      // pula pro endereço V0 + instrucao enviada
      return Instrucoes.setNext(x);
    case 'c':
      // atribui um valor aleatorio pra uma variavel
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3]);
      return Instrucoes.setRandom(ope1, valor, indice, setRegistradores);
    case 'd':
      // desenha na tela
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")");
      return Instrucoes.Desenha(indice, ope1, ope2, n, setDisplay, setRegistradores);
    case 'e':
      // entrada de teclado
      if (op[3]==='e')
        // skipa a proxima instrucao se a tecla pedida tiver sendo apertada
        console.log("if (key() === " + op[1] + ")");
      else if (op[3]==='1')
        // skipa a proxima instrucao se a tecla pedida NÃO tiver sendo apertada
        console.log("if (key() != " + op[1] + ")");
      else {
        // sei lá...
        console.log("E e alguma coisa...");
      }
      return indice + 0x002;
    case 'f':
      switch(op[3]) {
        case '3':
          // sinceramente? não faço ideia... mas é importante
          //return Instrucoes.setBCD(ope1, instrucao.indice, setIndice);
          return indice + 0x002;
        case '5':
          // seta timers
          if (op[2] === '1') return Instrucoes.setTimer(ope1, indice);
          else if (op[2] === '5') return Instrucoes.save(ope1, indice, setIndice);
          else if (op[2] === '6') return Instrucoes.load(ope1, indice, setRegistradores);
          else
            console.log("F alguma coisa 5...");
          return indice + 0x002;
          case '7':
            // usa os timers
            return Instrucoes.registraTimer(ope1, indice, setRegistradores);
        case '8':
          // toca um somzin
          return Instrucoes.setSound(ope1, indice);
        case '9':
          // seta um sprite na memoria
          console.log("I = sprite_addr[V" + op[1] + "]");
          return Instrucoes.registraIndice(ope1, indice, setIndice);
        case 'a':
          // espera até que o usuario aperte uma tecla
          console.log("V" + op[1] + " = get_key()");
          return Instrucoes.aperta(ope1, indice);
        case 'e':
          // adiciona o valor de uma variavel ao apontador
          console.log("I += V" + op[1]);
          return Instrucoes.setAddIndice(ope1, indice, setIndice);
        default:
          // só pra garantir
          console.log("F total");
      }
      return indice + 0x002;
    default:
      console.log("instrução " + op + " não entendida");
  }
  // volta pro começo das instruções
  return 0x200;
}

export default Disassembler;
