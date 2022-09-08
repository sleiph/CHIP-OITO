import guns from '../data/Guns_N_Roses_Paradise_City.mp3';

const Timer = {
    DT: 0,
    ST: 0,
    Hook: '',
    track: new Audio(guns),
    velocidade: 4,

    tick: function () {
        if (this.DT > 0) {
            this.DT-=this.velocidade;
            this.updateTimers();
        } else if (this.DT > 0)
            this.DT = 0;
        if (this.ST > 0) {
            this.ST-=this.velocidade;
            this.updateTimers();

            if (!this.isTocando(this.track))
                this.track.play();
        } else if (this.ST < 0)
            this.ST = 0;
        else {
            if (this.isTocando(this.track))
                this.track.pause();
        }
    },
    updateTimers: function() {
        if (this.Hook !== '') {
            let temp = [this.DT, this.ST];
            this.Hook(temp);
        } 
    },
    isTocando: function(sound) {
        return !sound.paused;
    },
    setHook: function(hook) {
        if (hook !== this.Hook)
            this.Hook = hook;
    }
}

export default Timer;