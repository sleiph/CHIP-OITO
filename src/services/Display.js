/**
 * Controla todas as ações relacionadas à tela do jogo
 */
const Display = {
    original: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    pixels: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    setter: null,
    debug: false,
    ajuda: false,

    Iniciar: function(setter) {
        this.setter = setter;
        this.LimpaTela();
    },

    LimpaTela: function() {
        this.pixels = this.original
        this.setter(this.pixels);
    },

    SetaPixel: function(x, y) {
        if (x > 0x3f) x -= 0x40;
        else if (x < 0) x += 0x40;
        
        if (y > 0x1f) y -= 0x20;
        else if (y < 0) y += 0x40;

        this.pixels[y][x] ^= 1;
        return this.pixels[y][x] === 0;
    },

    UpdateDisplay : function(x, y, sprite) {
        let isUnset = false;

        for (let i=0; i<sprite.length; i++) {
            let s = sprite[i];
            for (let j=0; j<8; j++) {
                if ((s & 0x80) > 0) {
                    if (this.SetaPixel(x+j, y+i) && !isUnset)
                        isUnset = true;
                }
                s <<= 1;
            }
        }
        this.setter(this.pixels);
        return isUnset;
    },
}

export default Display;