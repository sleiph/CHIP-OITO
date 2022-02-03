# Instruções

Decifrando as instruções do arquivo .rom, de acordo com a [tabela na página da Wikipédia do CHIP-8](https://en.wikipedia.org/wiki/CHIP-8).

## Endereços
### 02

#### 0
##### 0
6A 02
Va = 02
##### 2
6B 0C
Vb = 0C
##### 4
6C 3F
Vc = 3F
##### 6
6D 0C
Vd = 0C
##### 8
A2 EA
I = 2EA
##### A
DA B6
draw(Va, Vb, 6)
##### C
DC D6
draw(Vc, Vd, 6)
##### E
6E 00
Ve = 0

#### 1
##### 0 - chama a funcao que desenha o placar
22 D4
*(0x2D4)() => call(02D4)
##### 2
66 03
V6 = 03
##### 4
68 02
V8 = 02
##### 6
60 60
V0 = 60
##### 8
F0 15
delay_timer(V0)
##### A
F0 07
V0 = get_delay()
##### C
30 00
if (V0 == 0) then skip next
##### E
12 1A
goto 21A

#### 2
##### 0
C7 17
V7 = rand(0,255) & 17
##### 2
77 08
V7 += 8
##### 4
69 FF
V9 = FF
##### 6
A2 F0
I = 2F0
##### 8
D6 71
draw(V6, V7, 1)
##### A
A2 EA
I = 2EA
##### C
DA B6
draw(Va, Bb, 6)
##### E
DC D6
draw(Vc, Vd, 6)

#### 3
##### 0
60 01
V0 = 01
##### 2
E0 A1
if ( !key(V0) ) then skip next
##### 4
7B FE
Vb += FE
##### 6
60 04
V0 = 04
##### 8
E0 A1
if ( !key(V0) ) then skip next
##### A
7B 02
Vb += 02
##### C
60 1F
V0 = 1F
##### E
8B 02
Vb &= V0

#### 4
##### 0
DA B6
draw(Va, Vb, 6)
##### 2
60 0C
V0 = 0C
##### 4
E0 A1
if ( !key(V0) ) then skip next
##### 6
7D FE
Vd += FE
##### 8
60 0D
V0 = 0D
##### A
E0 A1
if ( !key(V0) ) then skip next
##### C
7D 02
Vd += 02
##### E
60 1F
V0 = 1F

#### 5
##### 0
8D 02
Vd &= V0
##### 2
DC D6
draw(Vc, Vd, 6)
##### 4
A2 F0
I = 2F0
##### 6
D6 71
draw(V6, V7, 1)
##### 8
86 84
V6 += V8
##### A
87 94
V7 += V9
##### C
60 3F
V0 = 3F
##### E
86 02
V6 &= V0

#### 6
##### 0
61 1F
V1 = 1F
##### 2
87 12
V7 &= V1
##### 4
46 02
if (V6 != 02) then skip next
##### 6
12 78
goto 278
##### 8
46 3F
if (V6 != 3F) then skip next
##### A
12 82
goto 282
##### C
47 1F
if (V7 != 1F) then skip next
##### E
69 FF
V9 = FF

#### 7
##### 0
47 00
if (V7 != 00) then skip next
##### 2
69 01
V9 = 01
##### 4
D6 71
draw(V6, V7, 1)
##### 6
12 2A
goto 22A
##### 8
68 02
V8 = 02
##### A
63 01
V3 = 01
##### C
80 70
V0 = V7
##### E
80 B5
V0 -= Vb

#### 8
##### 0
12 8A
goto 28A
##### 2
68 FE
V8 = FE
##### 4
63 0A
V3 = 0A
##### 6
80 70
V0 = V7
##### 8
80 D5
V0 -= Vd
##### A
3F 01
if (Vf == 1) then skip next
##### C
12 A2
goto 2A2
##### E
61 02
V1 = 02

#### 9
##### 0
80 15
V0 -= V1
##### 2
3F 01
if (Vf == 1) then skip next
##### 4
12 BA
goto 2BA
##### 6
80 15
V0 -= V1
##### 8
3F 01
if (Vf == 1) then skip next
##### A
12 C8
goto 2C8
##### C
80 15
V0 -= V1
##### E
3F 01
if (Vf == 1) then skip next

#### A
##### 0
12 C2
goto 2C2
##### 2
60 20
V0 = 20
##### 4 - som de gol
F0 18
sound_timer(V0)
##### 6 - chama a funcao que desenha o placar
22 D4
*(0x2D4)
##### 8
8E 34
Ve += V3
##### A - chama a funcao que desenha o placar... denovo...
22 D4
*(0x2D4)
##### C
66 3E
V6 = 3E
##### E
33 01
if (V3 == 01) then skip next

#### B
##### 0
66 03
V6 = 03
##### 2
68 FE
V8 = FE
##### 4
33 01
if (V3 = 01) then skip next
##### 6
68 02
V8 = 02
##### 8
12 16
goto 216
##### A
79 FF
V9 += FF
##### C
49 FE
if (V9 == FE) then skip next
##### E
69 FF
V9 = FF

#### C
##### 0
12 C8
goto 2C8
##### 2
79 01
V9 += 1
##### 4
49 02
if (V9 != 02) then skip next
##### 6
69 01
V9 = 1
##### 8
60 04
V0 = 4
##### A - som de defesa
F0 18
sound_timer(V0)
##### C
76 01
V6 += 1
##### E
46 40
if (V6 != 40) then skip next

#### D
##### 0
76 FE
V6 += FE
##### 2
12 6C
goto 26C
##### 4 - começo da funcao que desenha o placar
A2 F2
I = 2F2
##### 6 - transforma o valor HEX do placar em decimal
FE 33
set_BCD(Ve)
##### 8
F2 65
reg_load(V2, &I)
##### A
F1 29
I = sprite_addr[V1]
##### C
64 14
V4 = 14
##### E
65 00
V5 = 0

#### E
##### 0
D4 55
draw(V4, V5, 5)
##### 2
74 15
V4 += 15
##### 4
F2 29
I = sprite_addr[V2]
##### 6
D4 55
draw(V4, V5, 5)
##### 8 - fim da funcao que desenha o placar
00 EE
return
##### A
80 80
V0 = V8
##### C
80 80
V0 = V8
##### E
80 80
V0 = V8

#### F
##### 0
80 00
V0 = V0
##### 2
00 00

##### 4
00 00


## Variáveis

V0 - 
V1 - 
V2 - 
V3 - 
V4 - posicao x dos numeros do placar
V5 - posicao y dos numeros do placar
V6 - posicao x da bola
V7 - posicao y da bola
V8 - velocidade da bola
V9 - 
Va - posição x do jogador 1
Vb - posição y do jogador 1
Vc - posição x do jogador 2
Vd - posição y do jogador 2
Ve - 
Vf - respostas do emulador
