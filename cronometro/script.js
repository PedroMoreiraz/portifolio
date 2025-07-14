const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const miliseconds = document.getElementById('miliseconds');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const restartBtn = document.getElementById('restart');

let startTime = 0;
let elapsedTime = 0;
let intervalId = null;
let running = false;

function startTimer() {
    if (running) return;

    running = true;
    startTime = Date.now() - elapsedTime;

    intervalId = setInterval(() => {
        elapsedTime = Date.now() - startTime;

        const hrs = Math.floor(elapsedTime / 3600000);
        const mins = Math.floor((elapsedTime % 3600000) / 60000);
        const secs = Math.floor((elapsedTime % 60000) / 1000);
        const ms = Math.floor((elapsedTime % 1000) / 10);

        hours.textContent = String(hrs).padStart(2, '0');
        minutes.textContent = String(mins).padStart(2, '0');
        seconds.textContent = String(secs).padStart(2, '0');
        miliseconds.textContent = String(ms).padStart(2, '0');

    }, 10);
}

startBtn.addEventListener('click', startTimer);

function pauseTimer() {
    if (!running) return;

    clearInterval(intervalId);
    running = false;
}

pauseBtn.addEventListener('click', pauseTimer);

function resetTimer() {
    clearInterval(intervalId);
    running = false;
    elapsedTime = 0;

    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    miliseconds.textContent = '00';
}

restartBtn.addEventListener('click', resetTimer);