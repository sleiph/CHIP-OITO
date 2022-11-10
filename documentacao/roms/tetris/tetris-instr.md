# Instruções

Decifrando as instruções do arquivo .rom, de acordo com a [tabela na página da Wikipédia do CHIP-8](https://en.wikipedia.org/wiki/CHIP-8).

## Endereços
### 02
#### 0
##### 0
A2 B4 - I = 2B4
##### 2
23 E6 - call(3E6)
##### 4 
22 B6 - call(2B6)
##### 6 
70 01 - V0 = 1
##### 8 
D0 11 - draw(V0,V1, 1)
##### A 
30 25 - if (V0 == 25) then skip
##### C 
12 06 - goto(206)
##### E 
71 FF - V1 += FF

#### 1
##### 0
D0 11 - draw(V0,V1, 1)
##### 2
60 1A - V0 = 1A
##### 4
D0 11 - draw(V0,V1, 1)
##### 6
60 25 - V0 = 25
##### 8
31 00 - if (V1 = 0) then skip
##### A
12 0E - goto(20E)
##### C
C4 70 - V4 = rand() & 70
##### E
44 70 - if (V4 != 70) then skip

#### 2
##### 0
12 1C - goto(21C)
##### 2
C3 03 - V3 = rand() & 03
##### 4
60 1E - V0 = 1E
##### 6
61 03 - V1 = 03
##### 8
22 5C - call(25C)
##### A
F5 15 - delay_timer(V5)
##### C
D0 14 - draw(V0,V1, 4)
##### E
3F 01 - if (Vf == 01) then skip

#### 3
##### 0
12 3C - goto(23C)
##### 2
D0 14 - draw(V0,V1, 4)
##### 4
71 FF - V1 += FF
##### 6
D0 14 - draw(V0,V1, 4)
##### 8
23 40 - call(340)
##### A
12 1C - goto(21C)
##### C
E7 A1 - if (key() != V7) then skip
##### E
22 72 - call(272)

#### 4
##### 0
E8 A1 - if (key() != V8) then skip
##### 2
22 84 - call(284)
##### 4
E9 A1 - if (key() != V9) then skip
##### 6
22 96 - call(296)
##### 8
E2 9E - if (key() == V2) then skip
##### A
12 50 - goto(250)
##### C
66 00 - V6 = 0
##### E
F6 15 - delay_timer(V6)

#### 5
##### 0
F6 07 - V6 = get_delay()
##### 2
36 00 - if (V6 == 0) then skip
##### 4
12 3C - goto(23C)
##### 6
D0 14 - draw(V0,V1, 4)
##### 8
71 01 - V1 += 1
##### A
12 2A - goto(22A)
##### C - subrotina
A2 C4 - I = 2C4 //muito provavelmente esse dq
##### E
F4 1E - I += V4

#### 6
##### 0
66 00 - V6 = 0
##### 2
43 01 - if (V3 != 1) then skip
##### 4
66 04 - V6 = 4
##### 6
43 02 - if (V3 != 2) then skip
##### 8
66 08 - V6 = 8
##### A
43 03 - if (V3 != 3) then skip
##### C
66 0C - V6 = 0C
##### E
F6 1E - I += V6

#### 7
##### 0 - end subrotina
00 EE - return
##### 2 - subrotina
D0 14 - draw(V0,V1, 4)
##### 4
70 FF - V0 += FF
##### 6
23 34 - call(334)
##### 8
3F 01 - if (VF == 1) then skip // esse aq
##### A - end subrotina
00 EE - return
##### C - subrotina
D0 14 - draw(V0, V1, 4)
##### E
70 01 - V0 += 1

#### 8
##### 0
23 34 - call(334)
##### 2 - end subrotina
00 EE - return
##### 4 - subrotina
D0 14 - draw(V0,V1, 4)
##### 6
70 01 - V0 += 1
##### 8
23 34 - call(334)
##### A
3F 01 - if (VF == 1) then skip
##### C - end subrotina
00 EE - 
##### E - subrotina
D0 14 - draw(V0,V1, 4)

#### 9
##### 0
70 FF - V0 += FF
##### 2
23 34 - call(334)
##### 4 - end subrotina
00 EE - return
##### 6 - subrotina
D0 14 - draw(V0,V1, 4)
##### 8
73 01 - V3 += 1
##### A
43 04 - if (V3 != 4) then skip
##### C
63 00 - V3 = 0
##### E
22 5C - call(25C)

#### A
##### 0
23 34 - call(334)
##### 2
3F 01 - if(VF == 1) then skip
##### 4 - end subrotina
00 EE - return
##### 6
D0 14 - draw(V0,V1, 4)
##### 8
73 FF - V3 += FF
##### A
43 FF - if(V3 != FF) then skip
##### C
63 03 - V3 = 3
##### E
22 5C - call(25C)

#### B
##### 0
23 34 - call(334)
##### 2
00 EE - return
##### 4
80 00 - V0 = V0
##### 6 - subrotina
67 05 - V7 = 5
##### 8
68 06 - V8 = 6
##### A
69 04 - V9 = 4
##### C
61 1F - V1 = 1F
##### E
65 10 - V5 = 10

#### C
##### 0
62 07 - V2 = 7
##### 2 - end subrotina
00 EE - return
##### 4
40 E0 - if (V0 != E0) then skip
##### 6
00 00 - nada
##### 8
40 C0 - if (V0 != C0) then skip
##### A
40 00 - if (V0 != 0) then skip
##### C
00 E0 - cls()
##### E
40 00 - if (V0 != 0) then skip

#### D
##### 0
40 60 - if (V0 != 60) then skip
##### 2
40 00 - if (V0 != 0) then skip
##### 4
40 40 - if (V0 != 40) then skip
##### 6
60 00 - V0 = 0
##### 8
20 E0 - call(0E0)
##### A
00 00 - nada
##### C
C0 40 - V0 = rand() & 40
##### E
40 00 - if (V0 != 0) then skip

#### E
##### 0
00 E0 - cls()
##### 2
80 00 - V0 = V0
##### 4
40 40 - if (V0 != 40) then skip
##### 6
C0 00 - V0 = rand() & 0
##### 8
00 E0 - cls()
##### A
20 00 - call(000)
##### C
60 40 - V0 = 40
##### E
40 00 - if (V0 != 0) then skip

#### F
##### 0
80 E0 - V0 = VE
##### 2
00 00 - nada
##### 4
40 C0 - if (V0 != C0) then skip
##### 6
80 00 - V0 = V0
##### 8
C0 60 - V0 = rand() & 60
##### A
00 00 - nada
##### C
40 C0 - if(V0 != C0) then skip
##### E
80 00 - V0 = V0

### 03
#### 0
##### 0
C0 60 - V0 = rand() & 60
##### 2
00 00 - nada
##### 4
80 C0 - V0 = VC
##### 6
40 00 - if (V0 != 0) then skip
##### 8
00 60 - ???????
##### A
C0 00 - V0 = rand() & 0
##### C
80 C0 - V0 = VC
##### E
40 00 - if (V0 != 0) then skip

#### 1
##### 0
00 60 - ???????
##### 2
C0 00 - V0 = rand() & 0
##### 4
C0 C0 - V0 = rand() & C0
##### 6
00 00 - nada
##### 8
C0 C0 - V0 = rand() & C0
##### A
00 00 - nada
##### C
C0 C0 - V0 = rand() & C0
##### E
00 00 - nada

#### 2
##### 0
C0 C0 - V0 = rand() & C0
##### 2
00 00 - nada
##### 4
40 40 - if (V0 != 40) then skip
##### 6
40 40 - if (V0 != 40) then skip
##### 8
00 F0 - ???????
##### A
00 00 - nada
##### C
40 40 - if (V0 != 40) then skip
##### E
40 40 - if (V0 != 40) then skip

#### 3
##### 0
00 F0 - ????????
##### 2
00 00 - nada
##### 4 - subrotina
D0 14 - draw(V0,V1, 4)
##### 6
66 35 - V6 = 35
##### 8
76 FF - V6 += FF
##### A
36 00 - if (V6 == 0) then skip
##### C
13 38 - goto(338)
##### E - end subrotina
00 EE - return

#### 4
##### 0 - subrotina
A2 B4 - I = 2B4
##### 2
8C 10 - VC = V1
##### 4
3C 1E - if (VC == 1E) then skip
##### 6
7C 01 - VC += 1
##### 8
3C 1E - if (VC == 1E) then skip
##### A
7C 01 - VC += 1
##### C
3C 1E - if (VC == 1E) then skip
##### E
7C 01 - VC += 1

#### 5
##### 0
23 5E - call(35E)
##### 2
4B 0A - if (VB != 0A) then skip
##### 4
23 72 - call(372)
##### 6
91 C0 - if (V1 != VC) then skip
##### 8 - end subrotina
00 EE - return
##### A
71 01 - V1 += 1
##### C
13 50 - goto(350)
##### E - subrotina
60 1B - V0 = 1B

#### 6
##### 0
6B 00 - VB = 0
##### 2
D0 11 - draw(V0,V1, 1)
##### 4
3F 00 - if (VF == 0) then skip
##### 6
7B 01 - VB += 1
##### 8
D0 11 - draw(V0,V1, 1)
##### A
70 01 - V0 += 1
##### C
30 25 - if (V0 == 25) then skip
##### E
13 62 - goto(362)

#### 7
##### 0 - end subrotina
00 EE - return
##### 2 - subrotina
60 1B - V0 = 1B
##### 4
D0 11 - draw(V0,V1, 1)
##### 6
70 01 - V0 += 1
##### 8
30 25 - if (V0 == 25) then skip
##### A
13 74 - goto(374)
##### C
8E 10 - VE = V1
##### E
8D E0 - VD = VE

#### 8
##### 0
7E FF - VE += FF
##### 2
60 1B - V0 = 1B
##### 4
6B 00 - VB = 0
##### 6
D0 E1 - draw(V0,VE, 1)
##### 8
3F 00 - if (VF == 0) then skip
##### A
13 90 - goto(390)
##### C
D0 E1 - draw(V0,VE, 1)
##### E
13 94 - goto(394)

#### 9
##### 0
D0 D1 - draw(V0,VD, 1)
##### 2
7B 01 - VB += 1
##### 4
70 01 - V0 += 1
##### 6
30 25 - if (V0 == 25) then skip
##### 8
13 86 - goto(386)
##### A
4B 00 - if (VB != 0) then skip
##### C
13 A6 - goto(3A6)
##### E
7D FF - VD += FF

#### A
##### 0
7E FF - VE += FF
##### 2
3D 01 - if (VD == 1) then skip
##### 4
13 82 - goto(382)
##### 6
23 C0 - call(3C0)
##### 8
3F 01 - if (VF == 1) then skip
##### A
23 C0 - call(3C0)
##### C
7A 01 - VA += 1
##### E
23 C0 - call(3C0)

#### B
##### 0
80 A0 - V0 = VA
##### 2
6D 07 - VD = 7
##### 4
80 D2 - V0 &= VD
##### 6
40 04 - if (V0 != 4) then skip
##### 8
75 FE - V5 += FE
##### A
45 02 - if (V5 != 2) then skip
##### C
65 04 - V5 = 4
##### E - end subrotina
00 EE - return

#### C
##### 0 - subrotina
A7 00 - I = 700
##### 2
F2 55 - reg_dump(V2, &I)
##### 4
A8 04 - I = 804
##### 6
FA 33 - set_BCD(VA)
##### 8
F2 65 - reg_load(V2)
##### A
F0 29 - I = sprite_add[V0]
##### C
6D 32 - VD = 32
##### E
6E 00 - VE = 0

#### D
##### 0
DD E5 - draw(VD,VE, 5)
##### 2
7D 05 - VD += 5
##### 4
F1 29 - I = sprite_add[V1]
##### 6
DD E5 - draw(VD,VE, 5)
##### 8
7D 05 - VD += 5
##### A
F2 29 - I = sprite_add[V2]
##### C
DD E5 - draw(VD,VE, 5)
##### E
A7 00 - I = 700

#### E
##### 0
F2 65 - reg_load(V2, &I)
##### 2
A2 B4 - I = 2B4
##### 4
00 EE - return
##### 6 - subrotina
6A 00 - VA = 0
##### 8
60 19 - V0 = 19
##### A - end subrotina
00 EE - return
##### C
37 23 - if (V7 == 23) then skip

O código termina com um if??????!?!!?!!!!!

## Variáveis
V0 - 
V1 - 
V2 - 
V3 - 
V4 - 
V5 - 
V6 - 
V7 - 
V8 - 
V9 - 
Va - 
Vb - 
Vc - 
Vd - 
Ve - 
Vf - 
