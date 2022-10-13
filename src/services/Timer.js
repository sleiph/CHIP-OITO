import beep from '../data/67619_beep.flac';

const Timer = {
    DT: 0,
    ST: 0,
    track: new Audio(beep),
    velocidade: 8,
    setter: null,

    Iniciar: function (setter) {
        this.setter = setter;
        this.updateTimers([0, 0])
    },

    tick: function () {
        if (this.DT!==0 || this.ST!==0) {
            if (this.DT > 0)
                this.DT-=this.velocidade;
            else
                this.DT = 0;
            if (this.ST > 0) {
                this.ST-=this.velocidade;
                if (!this.isTocando(this.track))
                    this.track.play();
            } else
                this.ST = 0;
            this.updateTimers([this.DT, this.ST]);
        } else {
            if (this.isTocando(this.track))
                this.track.pause();
        }
    },
    updateTimers: function(arr) {
        this.DT = arr[0];
        this.ST = arr[1];
        this.setter(arr);
    },
    setDelay: function(delay) {
        this.updateTimers([delay, this.ST]);
    },
    setSom: function(som) {
        this.updateTimers([this.DT, som]);
    },
    isTocando: function(sound) {
        return !sound.paused;
    }
}

export default Timer;