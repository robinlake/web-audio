import React from 'react';
// import NumberSlider from './NumberSlider';

const Oscillator = () => {

    let audioContext = new AudioContext();
    let analyserNode = new AnalyserNode(audioContext, { fftSize: 256 });
    const visualizer:any = document.getElementById('visualizer');

    const getAudioSource = () => {
        navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                autoGainControl: false,
                noiseSuppression: false,
                latency: 0
            }
        })
        .then(stream => {
            const source = audioContext.createMediaStreamSource(stream);
            source
            .connect(analyserNode)
            .connect(audioContext.destination);
            
        })
        .catch(error => console.error(error))
    }
    // getAudioSource();

    // let osc = audioContext.createOscillator();
    // const gain = audioContext.createGain();


    // const makeNoise = () => {
    //     if (audioContext.state === 'suspended') {
    //         audioContext.resume();
    //     }
    //     start();
    // }

    const drawVisualizer = () => {
        // console.log("analyserNode: ", analyserNode);
        requestAnimationFrame(drawVisualizer);
        if (visualizer) {
            const bufferLength = analyserNode.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserNode.getByteFrequencyData(dataArray);
            if (dataArray[0] !== 0) {
                console.log("dataArray: ", dataArray);
            }
            const width = visualizer?.width;
            const height = visualizer?.height;
            const barWidth = width / bufferLength;

            const canvasContext = visualizer.getContext('2d');
            canvasContext.clearRect(0,0,width, height);

            dataArray.forEach((item, index) => {
                const y = item / 255 * height / 2
                const x = barWidth * index
            
                canvasContext.fillStyle = `hsl(${y / height * 400}, 100%, 50%)`
                canvasContext.fillRect(x, height - y, barWidth, y)
            })
        }

    }

    // drawVisualizer();

    const initialize = () => {
        audioContext = new AudioContext();
        analyserNode = new AnalyserNode(audioContext, { fftSize: 256 });
        getAudioSource();
        drawVisualizer();
    }


    // const start = () => {
    //     osc = audioContext.createOscillator();

    //     osc.type = 'triangle';

    //     // const gain = audioContext.createGain();
    //     // gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.9);

    //     osc.start();
    //     // osc.connect(audioContext.destination);
    //     osc.connect(gain).connect(audioContext.destination);
    // }

    // const stop = () => {
    //     osc.stop();
    // }

    // const raiseFrequency = () => {
    //     // const gain = audioContext.createGain();
    //     gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.9);
    //     // osc.connect(gain);
    //     osc.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 1);
    // }
    return (
        <div>
            {/* <button onClick={makeNoise}>Start Noise</button>
            <button onClick={stop}>Stop Noise</button>
            <button onClick={raiseFrequency}>Raise Frequency</button>
            <NumberSlider /> */}
            <button onClick={initialize}>Start</button>
            <canvas id="visualizer"></canvas>
        </div>

    )
}

export {};
export default Oscillator;