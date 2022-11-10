# Possiveis causas
## Registradores errados
não até onde onde o emulador começa a loopar, depois disso V1 e V0 mudam
## Instruções erradas
provável
## Stack errado
mais provavel até agora

# Instruções
## Emulador externo
36a
36c
370
352:4b0a (pula uma instrução se VB!=0A)
356:91c0 (pula uma instrução se V1!=VC)
358:00ee (retorna)
23a
21c
21e
222
224
226 muda o valor de v0 de 25 pra 1e (mesmo do v1)
228 muda o valor de v1
## E8
36a
36c
370
352
356
358 loopa pro 352

# Stack 
Usado para armazenar endereços de retorno quando as sub-rotinas são chamadas.
Funciona no formato de pilha(FILO)
## Instruções que interferem
### 00EE 
Retorno de uma sub-rotina. O intérprete define o contador do programa para o endereço no topo da pilha e, em seguida, subtrai 1 do ponteiro da pilha.
### 2nnn
Chamar a sub-rotina em nnn. O interpretador incrementa o ponteiro da pilha, então coloca o PC atual no topo da pilha. O PC é então definido como nnn.
## Emulador externo
no momento que outro começa a loopar ele possui apenas um valor: 238. Um pouco antes, ele possui 350, 238.
PC normalmete alterna entre 23c e 254 de forma crescente. A exceção é quando a peça encosta no fundo, nesse momento ela se encontra entre 36a e 368.
## E8
No momento que outro começa a loopar ele possui: 850. 
Curiosamente há apenas 3 variações de valores:  516, 518, 554 e 580.
Não parece ser uma pilha.