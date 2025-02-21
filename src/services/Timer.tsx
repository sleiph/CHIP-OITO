import beep from '../assets/67619_beep.flac';

export interface ITimer {
    DT: number,
    ST: number,
    track: HTMLAudioElement,
    velocidade: number,
    setter: any,
};

let timer : ITimer = {
    DT: 0,
    ST: 0,
    track: new Audio(beep),
    velocidade: 16,
    setter: null
};

export const IniciarTimer = function(setter: React.Dispatch<React.SetStateAction<number[]>>) {
    timer.setter = setter;
    updateTimers([0, 0])
};

export const ReiniciarTimer = function() {
    timer.setter(null);
    timer.DT = 0;
    timer.ST = 0;
    updateTimers([0, 0]);
}

export const tick = function () {
    if (timer.DT!==0 || timer.ST!==0) {
        if (timer.DT > 0)
            timer.DT-=timer.velocidade;
        else
            timer.DT = 0;
        if (timer.ST > 0) {
            timer.ST-=timer.velocidade;
            if (!isTocando(timer.track))
                timer.track.play();
        } else {
            timer.ST = 0;
        }
        updateTimers([timer.DT, timer.ST]);
    } else {
        if (isTocando(timer.track))
            timer.track.pause();
    }
};

export const updateTimers = function(arr: Array<number>) {
    timer.DT = arr[0];
    timer.ST = arr[1];
    timer.setter(arr);
};

export const setDelay = function(delay: number) {
    updateTimers([delay, timer.ST]);
};

export const setSom = function(som: number) {
    updateTimers([timer.DT, som]);
};

export const isTocando = function(sound: HTMLAudioElement) {
    return !sound.paused;
};

export const getDT = function(): number {
    return timer.DT;
}
