/**
 * recebe 4 chars hexadecimais e interpreta a instrução
 * de acordo com a Opcode table na wiki
 * https://en.wikipedia.org/wiki/CHIP-8
 */ 
function Disassembler(dop) {
  // TODO: Tem q trocar tudo esses console.log() por funções reais
  let op = dop['op']
  console.log(dop)
  switch(op[0]) {
    case '0':
      if (op[2]==='e') {
        if (op[3]==='0')
          console.log("cls()")
        else {
          console.log("return")
          return -1
        }
      }
      else 
        console.log("vazio")
      break;
    case '1':
      console.log("goto " + op[1]+op[2]+op[3])
      return dop['indice'] + 1
    case '2':
      console.log("call " + op[1]+op[2]+op[3])
      return dop['indice'] + 1
    case '3':
      console.log("if (V" + op[1] + " === " + op[2]+op[3]+")")
      return dop['indice'] + 1
    case '4':
      console.log("if (V" + op[1] + " != " + op[2]+op[3]+")")
      return dop['indice'] + 1
    case '5':
      console.log("if (V" + op[1] + " === V" + op[2] + ")")
      return dop['indice'] + 1
    case '6':
      console.log("V"+op[1] + " = " + op[2]+op[3])
      op = '2345'
      return dop['indice'] + 1
    case '7':
      console.log("V"+op[1] + " += " + op[2]+op[3])
      return dop['indice'] + 1
    case '8':
      switch(op[3]) {
        case '0':
          console.log("V"+op[1] + " = V" + op[2])
          return dop['indice'] + 1
        case '1':
          console.log("V"+op[1] + " |= V" + op[2])
          return dop['indice'] + 1
        case '2':
          console.log("V"+op[1] + " &= V" + op[2])
          return dop['indice'] + 1
        case '3':
          console.log("V"+op[1] + " ^= V" + op[2])
          return dop['indice'] + 1
        case '4':
          console.log("V"+op[1] + " += V" + op[2])
          return dop['indice'] + 1
        case '5':
          console.log("V"+op[1] + " -= V" + op[2])
          return dop['indice'] + 1
        case '6':
          console.log("V"+op[1] + " >>= 1")
          return dop['indice'] + 1
        case '7':
          console.log("V"+op[1] + " = V" + op[2] + " - V" + op[1])
          return dop['indice'] + 1
        case 'e':
          console.log("V"+op[1] + " <<= 1")
          return dop['indice'] + 1
        default:
          console.log("8 e alguma coisa...")
      }
      return dop['indice'] + 1
    case '9':
      console.log("if (V" + op[1] + " != V" + op[2] + ")")
      return dop['indice'] + 1
    case 'a':
      console.log("I = " + op[1] + op[2] + op[3])
      return dop['indice'] + 1
    case 'b':
      console.log("pula pra " + op[1] + op[2] + op[3] + " + V0")
      return dop['indice'] + 1
    case 'c':
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3])
      return dop['indice'] + 1
    case 'd':
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")")
      return dop['indice'] + 1
    case 'e':
      if (op[3]==='e')
        console.log("if (key() === " + op[1] + ")")
      else if (op[3]==='1')
        console.log("if (key() != " + op[1] + ")")
      else
      console.log("E e alguma coisa...")
      return dop['indice'] + 1
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
          return dop['indice'] + 1
        case '7':
          console.log("V" + op[1] + " = get_delay()")
          return dop['indice'] + 1
        case '8':
          console.log("sound_timer(V" + op[1] + ")")
          return dop['indice'] + 1
        case '9':
          console.log("I = sprite_addr[V" + op[1] + "]")
          return dop['indice'] + 1
        case 'a':
          console.log("V" + op[1] + " = get_key()")
          return dop['indice'] + 1
        case 'e':
          console.log("I += V" + op[1])
          return dop['indice'] + 1
        default:
          console.log("F total")
      }
      return dop['indice'] + 1
    default:
      console.log("instrução "+op[0]+op[1]+op[2]+op[3]+" não entendida")
  }
  return -1
}


export default Disassembler
