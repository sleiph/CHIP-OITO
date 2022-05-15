import Disassembler from "./Disassembler";

function Apontador(ops){
  let i = 0x200

  while (true) {
    let op = { 'indice':i, 'op':ops[i] };
    i = Disassembler(op);
    
    if (i == -1){
      break;
    }
  }
}

export default Apontador;