# CHIP-OITO

Emulador de [CHIP-8](https://en.wikipedia.org/wiki/CHIP-8), vai ser criado provavelmente em javaScript, com React, talvez em C++, quem sabe?

## Instruções
Precisa do Node e NPM pra rodar, versão mais atual possível (04-02-2022).

```shell
git clone https://github.com/sleiph/CHIP-OITO.git
cd CHIP-OITO
```

```shell
npm install
```

```shell
npm start
```

O servidor fica ativo na [porta 3000](http://localhost:3000/).

Um arquivo "binário" pra testes pode ser encontrado [aqui](./src/data/pong.txt).

## Referências

- [Introduction to CHIP-8](http://www.emulator101.com/introduction-to-chip-8.html)
- [Writing an Emulator in JavaScript (Chip-8)](https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/)
- [Cowgod's Chip-8 Technical Reference v1.0](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)
- [How to write an emulator (CHIP-8 interpreter)](https://multigesture.net/articles/how-to-write-an-emulator-Chip-8-interpreter/)
- [Mastering CHIP‐8](https://github.com/mattmikolay/chip-8/wiki/Mastering-CHIP%E2%80%908)

### Processo de pesquisa

1. [Leitura de guias práticos de criação de emuladores](http://www.emulator101.com/introduction-to-chip-8.html).

2. [Estudo dos opcodes do CHIP-8](https://en.wikipedia.org/wiki/CHIP-8#Opcode_table).

3. Aplicação [instrução por instrução](/roms/pong/pong-instr.md) da tabela de opcodes em alguns [roms de CHIP-8](/roms).

4. Estudo de prática das roms rodando em um [emulador de terceiros](https://github.com/massung/CHIP-8), que possui um sistema de debug.

### Fazer

Bastante coisa...
- Ler arquivos binários de verdade, não os .txt que ele lê por enquanto (a leitura de arquivos por enquanto é feita direto na página home, talvez mudar essa parte pra um serviço)
    - [JavaScript global method: writeFile](https://docs.microfocus.com/SM/9.51/Hybrid/Content/programming/javascript/reference/javascript_global_method_writefile.htm)
- Escrever arquivos binários, se a gente for deixar o jogador editar as roms
    - [Writing Byte Array To Binary File Javascript](https://stackoverflow.com/questions/26244126/writing-byte-array-to-binary-file-javascript)
- Interpretar as instruções, por enquanto ele só identifica o que deve ser feito, pelo arquivo [Disassembler](./src/services/Disassembler.js)
    -[taniarascia/chip8](https://github.com/taniarascia/chip8/tree/master/classes)
- Achar um jeito de ler continuar lendo as instruções em loop, provavelmente só um while tá bom, não sei...
