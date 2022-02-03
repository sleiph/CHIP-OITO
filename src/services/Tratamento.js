function Tratamento(conteudo) {
  var bytes = []
  var ops =[]
  var cnt = 0

  for (let i=0, charsLength=conteudo.length; i<charsLength; i += 4) {
    let temp = conteudo.substring(i, i + 4)
    temp = parseInt(temp, 2).toString(16).toUpperCase()
    bytes.push(temp)
    cnt+=1;
    if (cnt%4==0) {
      ops.push(bytes)
      bytes= []
    }
  }
  return ops
}

export default Tratamento
