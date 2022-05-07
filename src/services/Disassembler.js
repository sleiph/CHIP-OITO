/**
 * recebe 4 chars hexadecimais e interpreta a instrução
 * de acordo com a Opcode table na wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */ 
function Disassembler(op) {
  // TODO: Tem q trocar tudo esses console.log() por funções reais
  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        if (op[3]==='0')
          console.log("cls()")
        else
          console.log("return")
      }
      else 
        console.log("vazio")
      break;
    case '1':
      console.log("goto " + op[1]+op[2]+op[3])
      break;
    case '2':
      console.log("call " + op[1]+op[2]+op[3])
      break;
    case '3':
      console.log("if (V" + op[1] + " === " + op[2]+op[3]+")")
      break;
    case '4':
      console.log("if (V" + op[1] + " != " + op[2]+op[3]+")")
      break;
    case '5':
      console.log("if (V" + op[1] + " === V" + op[2] + ")")
      break;
    case '6':
      console.log("V"+op[1] + " = " + op[2]+op[3])
      op = '2345'
      return op
      break;
    case '7':
      console.log("V"+op[1] + " += " + op[2]+op[3])
      break;
    case '8':
      switch(op[3]) {
        case '0':
          console.log("V"+op[1] + " = V" + op[2])
          break;
        case '1':
          console.log("V"+op[1] + " |= V" + op[2])
          break;
        case '2':
          console.log("V"+op[1] + " &= V" + op[2])
          break;
        case '3':
          console.log("V"+op[1] + " ^= V" + op[2])
          break;
        case '4':
          console.log("V"+op[1] + " += V" + op[2])
          break;
        case '5':
          console.log("V"+op[1] + " -= V" + op[2])
          break;
        case '6':
          console.log("V"+op[1] + " >>= 1")
          break;
        case '7':
          console.log("V"+op[1] + " = V" + op[2] + " - V" + op[1])
          break;
        case 'e':
          console.log("V"+op[1] + " <<= 1")
          break;
        default:
          console.log("8 e alguma coisa...")
      }
      break;
    case '9':
      console.log("if (V" + op[1] + " != V" + op[2] + ")")
      break;
    case 'a':
      console.log("I = " + op[1] + op[2] + op[3])
      break;
    case 'b':
      console.log("pula pra " + op[1] + op[2] + op[3] + " + V0")
      break;
    case 'c':
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3])
      break;
    case 'd':
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")")
      break;
    case 'e':
      if (op[3]==='e')
        console.log("if (key() === " + op[1] + ")")
      else if (op[3]==='1')
        console.log("if (key() != " + op[1] + ")")
      else
      console.log("E e alguma coisa...")
      break;
    case 'f':
      switch(op[3]) {
        case '3':
          console.log("set_BCD(V" + op[1] + ")")
          break;
        case '5':
          if (op[2] === '1')
            console.log("delay_timer(V" + op[1] + ")")
          else if (op[2] === '5')
            console.log("reg_dump(V" + op[1] + ", &I)")
          else if (op[2] === '6')
            console.log("reg_load(V" + op[1] + ", &I)")
          else
            console.log("F alguma coisa 5...")
          break;
        case '7':
          console.log("V" + op[1] + " = get_delay()")
          break;
        case '8':
          console.log("sound_timer(V" + op[1] + ")")
          break;
        case '9':
          console.log("I = sprite_addr[V" + op[1] + "]")
          break;
        case 'a':
          console.log("V" + op[1] + " = get_key()")
          break;
        case 'e':
          console.log("I += V" + op[1])
          break;
        default:
          console.log("F total")
      }
      break;
    default:
      console.log("instrução "+op[0]+op[1]+op[2]+op[3]+" não entendida")
  }
  return ""
}


export default Disassembler
