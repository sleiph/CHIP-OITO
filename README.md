# CHIP-OITO

Emulador de [CHIP-8](https://en.wikipedia.org/wiki/CHIP-8), criado em javaScript, com React.

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

Arquivos binários pra testes podem ser encontrados na [documentação](./documentacao).

## Fazer

* Tela de apresentação com informações de como jogar
* Função de reset do videogame
* melhorar **MUITO** a performance, pra rodar em uma velocidade boa (Obs: 0:22:50 || 0:05:00).
* tentar achar pq o tetris ta errado
* achar um jeito de parar o teclado quando solta o botão
* melhorar o hook do display pra ser menos custoso

### Extras

* mostrar no teclado que a tecla foi apertada.
* melhorar o menu de Debug
* adicionar uma rom de demonstração (sem direitos autorais de ninguém)
* Poder mudar o valor de qualquer registrador a qualquer momento
* Mostrar pro usuário um pseudo-código das instruções no cartucho
* colocar os FPS

## Referências

- [Introduction to CHIP-8](http://www.emulator101.com/introduction-to-chip-8.html)
- [Writing an Emulator in JavaScript (Chip-8)](https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/)
- [Cowgod's Chip-8 Technical Reference v1.0](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)
- [How to write an emulator (CHIP-8 interpreter)](https://multigesture.net/articles/how-to-write-an-emulator-Chip-8-interpreter/)
- [Mastering CHIP‐8](https://github.com/mattmikolay/chip-8/wiki/Mastering-CHIP%E2%80%908)
- [Guide to making a CHIP-8 emulator](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/#fx07-fx15-and-fx18-timers)

### Processo de pesquisa

1. [Leitura de guias práticos de criação de emuladores](http://www.emulator101.com/introduction-to-chip-8.html).

2. [Estudo dos opcodes do CHIP-8](https://en.wikipedia.org/wiki/CHIP-8#Opcode_table).

3. Aplicação [instrução por instrução](/roms/pong/pong-instr.md) da tabela de opcodes em alguns [roms de CHIP-8](/roms).

4. Estudo de prática das roms rodando em um [emulador de terceiros](https://github.com/massung/CHIP-8), que possui um sistema de debug.

## Créditos

Som por [qubodup](https://freesound.org/people/qubodup/sounds/67619/).
