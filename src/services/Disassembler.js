function Vazio() {
  console.log("vazio");
}

// Instruções e subrotinas
function Retorna() {
  console.log("return");
}

// Variáveis

// Condicionais

// Operações

// Display
function LimpaTela() {
  console.log("cls()");
}

// Teclado

// Timers

/**
 * recebe 4 chars hexadecimais e interpreta a instrução
 * de acordo com a Opcode table na wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */
function Disassembler(instrucao) {
  // TODO: Tem q trocar tudo esses console.log() por funções reais
  console.log(instrucao);
  let op = instrucao.op;

  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        // limpa a tela
        if (op[3]==='0') {
          LimpaTela();
        }
        // TODO: vai voltar pra linha que chamou a subrotina, mas
        // por enquanto só termina o processo pra evitar loops infinitos
        else if (op[3]==='e') {
          Retorna();
          return -1;
        }
      }
      // faz é nada
      else {
        Vazio();
      }
      return instrucao.indice + 0x002;
    // pula pro endereço descrito na instrucao
    case '1':
      console.log("goto " + op[1]+op[2]+op[3]);
      return instrucao.indice + 0x002;
    // manda pra uma subrotina
    case '2':
      console.log("call " + op[1]+op[2]+op[3]);
      return instrucao.indice + 0x002;
    // condicionais
    case '3':
      console.log("if (V" + op[1] + " === " + op[2]+op[3]+")");
      return instrucao.indice + 0x002;
    case '4':
      console.log("if (V" + op[1] + " != " + op[2]+op[3]+")");
      return instrucao.indice + 0x002;
    case '5':
      console.log("if (V" + op[1] + " === V" + op[2] + ")");
      return instrucao.indice + 0x002;
    // atribui o valor de uma das variaveis
    case '6':
      console.log("V"+op[1] + " = " + op[2]+op[3]);
      return instrucao.indice + 0x002;
    // adiciona ao valor de uma variavel
    case '7':
      console.log("V"+op[1] + " += " + op[2]+op[3]);
      return instrucao.indice + 0x002;
    // operações com as variaveis
    case '8':
      switch(op[3]) {
        case '0':
          console.log("V"+op[1] + " = V" + op[2]);
          return instrucao.indice + 0x002;
        case '1':
          console.log("V"+op[1] + " |= V" + op[2]);
          return instrucao.indice + 0x002;
        case '2':
          console.log("V"+op[1] + " &= V" + op[2]);
          return instrucao.indice + 0x002;
        case '3':
          console.log("V"+op[1] + " ^= V" + op[2]);
          return instrucao.indice + 0x002;
        case '4':
          console.log("V"+op[1] + " += V" + op[2]);
          return instrucao.indice + 0x002;
        case '5':
          console.log("V"+op[1] + " -= V" + op[2]);
          return instrucao.indice + 0x002;
        case '6':
          console.log("V"+op[1] + " >>= 1");
          return instrucao.indice + 0x002;
        case '7':
          console.log("V"+op[1] + " = V" + op[2] + " - V" + op[1]);
          return instrucao.indice + 0x002;
        case 'e':
          console.log("V"+op[1] + " <<= 1");
          return instrucao.indice + 0x002;
        default:
          console.log("8 e alguma coisa...");
      }
      return instrucao.indice + 0x002;
    // condicional com duas variaveis
    case '9':
      console.log("if (V" + op[1] + " != V" + op[2] + ")");
      return instrucao.indice + 0x002;
    // muda o valor do apontador (I)
    case 'a':
      console.log("I = " + op[1] + op[2] + op[3]);
      return instrucao.indice + 0x002;
    // pula pro endereço V0 + instrucao enviada
    case 'b':
      console.log("pula pra " + op[1] + op[2] + op[3] + " + V0");
      return instrucao.indice + 0x002;
    // atribui um valor aleatorio pra uma variavel
    case 'c':
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3]);
      return instrucao.indice + 0x002;
    // desenha na tela
    case 'd':
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")");
      return instrucao.indice + 0x002;
    // entrada de teclado
    case 'e':
      // skipa a proxima instrucao se a tecla pedida tiver sendo apertada
      if (op[3]==='e')
        console.log("if (key() === " + op[1] + ")");
      // skipa a proxima instrucao se a tecla pedida NÃO tiver sendo apertada
      else if (op[3]==='1')
        console.log("if (key() != " + op[1] + ")");
      else
        console.log("E e alguma coisa...");
      return instrucao.indice + 0x002;
    case 'f':
      switch(op[3]) {
        // sinceramente? não faço ideia...
        case '3':
          console.log("set_BCD(V" + op[1] + ")");
          return instrucao.indice + 0x002;
        // seta timers
        case '5':
          if (op[2] === '1')
            console.log("delay_timer(V" + op[1] + ")");
          else if (op[2] === '5')
            console.log("reg_dump(V" + op[1] + ", &I)");
          else if (op[2] === '6')
            console.log("reg_load(V" + op[1] + ", &I)");
          else
            console.log("F alguma coisa 5...");
          return instrucao.indice + 0x002;
        // usa os timers
        case '7':
          console.log("V" + op[1] + " = get_delay()");
          return instrucao.indice + 0x002;
        // toca um somzin
        case '8':
          console.log("sound_timer(V" + op[1] + ")");
          return instrucao.indice + 0x002;
        // seta um sprite na memoria
        case '9':
          console.log("I = sprite_addr[V" + op[1] + "]");
          return instrucao.indice + 0x002;
        // espera até que o usuario aperte uma tecla
        case 'a':
          console.log("V" + op[1] + " = get_key()");
          return instrucao.indice + 0x002;
        // adiciona o valor de uma variavel ao apontador
        case 'e':
          console.log("I += V" + op[1]);
          return instrucao.indice + 0x002;
        default:
          console.log("F total");
      }
      return instrucao.indice + 0x002;
    default:
      console.log("instrução " + op + " não entendida");
  }
  // termina o processo
  return -1;
}

export default Disassembler;
