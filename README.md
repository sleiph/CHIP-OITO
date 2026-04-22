# CHIP-OITO - desenvolvimento

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
npm run dev
```

O servidor fica ativo na [porta 5173](http://localhost:5173/).

Arquivos binários pra testes podem ser encontrados na [documentação](./documentacao).


## Fazer

* Arrumar a função 8XY6.
* Fazer o emulador passar nos testes avançados (10 a 24).
* arrumar o FPS
* Melhorar a tela de apresentação
* melhorar o teclado virtual pra celular
* (Pong) as vezes o som não toca
* tá meio rápido demais agora, padronizar a velocidade
* (Tetris) o jogo trava quando o usuário aperta alguma tecla
* revisar os atalhos de teclado
* remover todos esses 'any'


### Extras

* adicionar uma rom de demonstração (sem direitos autorais de ninguém)
* Poder mudar o valor de qualquer registrador a qualquer momento
* Mostrar pro usuário um pseudo-código das instruções no cartucho
* adicionar uma interface de debug, com breakpoints e step-through


## Referências

- [Writing an Emulator in JavaScript (Chip-8)](https://www.taniarascia.com/writing-an-emulator-in-javascript-chip8/)
- [Cowgod's Chip-8 Technical Reference v1.0](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)
- [Mastering CHIP‐8](https://github.com/mattmikolay/chip-8/wiki/Mastering-CHIP%E2%80%908)
- [Guide to making a CHIP-8 emulator](https://tobiasvl.github.io/blog/write-a-chip-8-emulator/#fx07-fx15-and-fx18-timers)
- [Rom used for test 1](https://github.com/corax89/chip8-test-rom)
- [Rom used for test 2](https://github.com/metteo/chip8-test-rom)


### Processo de pesquisa

1. [Estudo dos opcodes do CHIP-8](https://en.wikipedia.org/wiki/CHIP-8#Opcode_table).
2. Aplicação [instrução por instrução](/documentacao/roms/pong/pong-instr.md) da tabela de opcodes em alguns [roms de CHIP-8](/roms).
3. Estudo de prática das roms rodando em um [emulador de terceiros](https://github.com/massung/CHIP-8), que possui um sistema de debug.

## Créditos

Som por [qubodup](https://freesound.org/people/qubodup/sounds/67619/).
