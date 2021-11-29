import React from 'react';
import NumberSlider from './NumberSlider';

const Oscillator = () => {

    const audioContext = new AudioContext();
    let osc = audioContext.createOscillator();
    const gain = audioContext.createGain();


    const makeNoise = () => {
        // console.log(audioContext);
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        // console.log(audioContext);
        start();
    }

    const start = () => {
        osc = audioContext.createOscillator();

        osc.type = 'triangle';

        // const gain = audioContext.createGain();
        // gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.9);

        osc.start();
        // osc.connect(audioContext.destination);
        osc.connect(gain).connect(audioContext.destination);
    }

    const stop = () => {
        osc.stop();
    }

    const raiseFrequency = () => {
        // const gain = audioContext.createGain();
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.9);
        // osc.connect(gain);
        osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 1);
    }
    return (
        <div>
            <button onClick={makeNoise}>Start Noise</button>
            <button onClick={stop}>Stop Noise</button>
            <button onClick={raiseFrequency}>Raise Frequency</button>
            <NumberSlider />
        </div>

    )
}

export {};
export default Oscillator;