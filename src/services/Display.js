import Tratamento from "./Tratamento";

const Display = {
    pixels: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
    original: Array.from(Array(32), () => Array.from(Array(64), () => 0)),
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

    UpdateDisplay : function(x, y, sprite) {
        let isUnset = false;

        for (let i=0; i<sprite.length; i++) {
            let s = Tratamento.IntPraBin(sprite[i]);
            for (let j=0; j<8; j++) {
                if (x+j < 64 && y+i < 32) {
                    let original = parseInt(this.pixels[y+i][x+j]);
                    this.pixels[y+i][x+j] ^= parseInt(s[j]);
                    // VF is set to 1 if any screen pixels are flipped from set to unset when the sprite is drawn,
                    if (original === 1 && parseInt(this.pixels[y+i][x+j]) === 0)
                        isUnset = true;
                }
            }
        }
        this.setter(this.pixels);
        return isUnset;
    },
}

export default Display;