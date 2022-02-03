function Disassembler(op) {
  switch(op[0]) {
    case '0':
      if (op[2]=='E') {
        if (op[3]=='0')
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
      console.log("if (V" + op[1] + " == " + op[2]+op[3]+")")
      break;
    case '4':
      console.log("if (V" + op[1] + " != " + op[2]+op[3]+")")
      break;
    case '5':
      console.log("if (V" + op[1] + " == V" + op[2] + ")")
      break;
    case '6':
      console.log("V"+op[1] + " = " + op[2]+op[3])
      break;
    case '7':
      console.log("V"+op[1] + " += " + op[2]+op[3])
      break;
    case '8':
      console.log("operacao matematica")
      break;
    case '9':
      console.log("if (V" + op[1] + " != V" + op[2] + ")")
      break;
    case 'A':
      console.log("I = " + op[1] + op[2] + op[3])
      break;
    case 'B':
      console.log("pula pra " + op[1] + op[2] + op[3] + " + V0")
      break;
    case 'C':
      console.log("V" + op[1] + " = rand() & " + op[2] + op[3])
      break;
    case 'D':
      console.log("draw(V" + op[1] + ", V" + op[2] + ", " + op[3] + ")")
      break;
    case 'E':
      if (op[3]=='E')
        console.log("if (key() == " + op[1] + ")")
      else
        console.log("if (key() != " + op[1] + ")")
      break;
    case 'F':
      console.log("F total")
      break;
    default:
      console.log("instrução "+op[0]+op[1]+op[2]+op[3]+" não entendida")
  }
}

export default Disassembler
