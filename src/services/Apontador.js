import Disassembler from "./Disassembler";

function Apontador(ops){
  let i = 512
  let j = 512
  while (true) {
    let op = {'op':ops[(i-j)], 'indice':i}
    i = Disassembler(op)
    j++
    if (i == -1){
      break;
    }
  }
}

export default Apontador;