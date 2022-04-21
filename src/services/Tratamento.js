function Tratamento(conteudo) {
  var bytes = [];
  var ops = [];
  var cnt = 0; 

   var result = "";
   for (var i = 0; i < conteudo.length; i++) {
     var bin = conteudo[i].charCodeAt().toString(16);
     result += Array(8 - bin.length + 1).join("0") + bin;
   }

    //console.log(result);  

  for (let i=0, charsLength=conteudo.length; i<charsLength; i += 4) {
    let temp = conteudo.substring(i, i + 4)
    temp = parseInt(temp, 2).toString(16).toUpperCase()
    bytes.push(temp)
    cnt+=1;
    if (cnt%4===0) {
      ops.push(bytes)
      bytes= []
    }
  }
  return ops
}

export default Tratamento
