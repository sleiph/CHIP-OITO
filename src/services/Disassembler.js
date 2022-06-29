import Instrucoes from './Instrucoes';

/**
 * recebe 4 chars hexadecimais e interpreta a instrução
 * de acordo com a Opcode table na wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */
function Disassembler(instrucao, registradores, setRegistradores) {
  console.log(instrucao.indice.toString(16));
  console.log(instrucao);

  let op = instrucao.op;

  let ope1 = parseInt(op[1], 16);
  let ope2 = parseInt(op[2], 16);
  let valor = parseInt(op.slice(-2), 16);

  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        if (op[3]==='0') {
          // limpa a tela
          return Instrucoes.LimpaTela(instrucao.indice);
        }
        else if (op[3]==='e') {
          // TODO: vai voltar pra linha que chamou a subrotina, mas
          // por enquanto só volta pra primeira instrucao
          return Instrucoes.Retorna(instrucao.indice);
        }
      }
      else {
        // faz é nada
        return Instrucoes.Vazio(instrucao.indice);
      }
    case '1':
      // pula pro endereço descrito na instrucao
      // TODO: Tem q trocar tudo esses console.log() por funções reais
      return Instrucoes.StrHex(op[1] + op[2] + op[3]);
    case '2':
      // manda pra uma subrotina
      console.log("call " + op[1]+op[2]+op[3]);
      return instrucao.indice + 0x002;
    // condicionais
    case '3':
    case '4':
    case '5':
    case '9':
      return Instrucoes.setJump(op, ope1, valor, instrucao.indice);
    case '6':
      // atribui o valor de uma das variaveis
      return Instrucoes.setRegistrar(ope1, valor, instrucao.indice, registradores, setRegistradores);
    case '7':
      // adiciona ao valor de uma variavel
      return Instrucoes.setAdd(ope1, valor, instrucao.indice, registradores, setRegistradores);
    case '8':
      // operações com as variaveis
      switch(op[3]) {
        case '0':
          return Instrucoes.setIgual(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '1':
          return Instrucoes.setOR(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '2':
          return Instrucoes.setAND(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '3':
          return Instrucoes.setXOR(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '4':
          return Instrucoes.setAddop(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '5':
          return Instrucoes.setSubop(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case '6':
          console.log("V"+op[1] + " >>= 1");
          return Instrucoes.setRightShift(ope1, instrucao.indice, registradores, setRegistradores);
        case '7':
          return Instrucoes.setRestop(ope1, ope2, instrucao.indice, registradores, setRegistradores);
        case 'e':
          console.log("V"+op[1] + " <<= 1");
          return Instrucoes.setRightShift(ope1, instrucao.indice, registradores, setRegistradores);
        default:
          console.log("8 e alguma coisa...");
      }
      return instrucao.indice + 0x002;
    case 'a':
      // muda o valor do apontador (I)
      console.log("I = " + op[1] + op[2] + op[3]);
      return instrucao.indice + 0x002;
    case 'b':
      // pula pro endereço V0 + instrucao enviada
      console.log("pula pra " + op[1] + op[2] + op[3] + " + V0");
      return instrucao.indice + 0x002;
    case 'c':
      // atribui um valor aleatorio pra uma variavel
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3]);
      return instrucao.indice + 0x002;
    case 'd':
      // desenha na tela
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")");
      return instrucao.indice + 0x002;
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
      return instrucao.indice + 0x002;
    case 'f':
      switch(op[3]) {
        case '3':
          // sinceramente? não faço ideia... mas é importante
          console.log("set_BCD(V" + op[1] + ")");
          return instrucao.indice + 0x002;
        case '5':
          // seta timers
          if (op[2] === '1')
            console.log("delay_timer(V" + op[1] + ")");
          else if (op[2] === '5')
            console.log("reg_dump(V" + op[1] + ", &I)");
          else if (op[2] === '6')
            console.log("reg_load(V" + op[1] + ", &I)");
          else
            console.log("F alguma coisa 5...");
          return instrucao.indice + 0x002;
        case '7':
          // usa os timers
          console.log("V" + op[1] + " = get_delay()");
          return instrucao.indice + 0x002;
        case '8':
          // toca um somzin
          console.log("sound_timer(V" + op[1] + ")");
          return instrucao.indice + 0x002;
        case '9':
          // seta um sprite na memoria
          console.log("I = sprite_addr[V" + op[1] + "]");
          return instrucao.indice + 0x002;
        case 'a':
          // espera até que o usuario aperte uma tecla
          console.log("V" + op[1] + " = get_key()");
          return instrucao.indice + 0x002;
        case 'e':
          // adiciona o valor de uma variavel ao apontador
          console.log("I += V" + op[1]);
          return instrucao.indice + 0x002;
        default:
          // só pra garantir
          console.log("F total");
      }
      return instrucao.indice + 0x002;
    default:
      console.log("instrução " + op + " não entendida");
  }
  // volta pro começo das instruções
  return 0x200;
}

export default Disassembler;
