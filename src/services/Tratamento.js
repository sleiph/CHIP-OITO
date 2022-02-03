function Tratamento(conteudo) {
  var bytes = [];
  var byte = []

  for (let i=0, charsLength=conteudo.length; i<charsLength; i += 4) {
    let temp = conteudo.substring(i, i + 4)
    temp = parseInt(temp, 2).toString(16).toUpperCase()
    bytes.push(temp)
  }
  return bytes
}

export default Tratamento
