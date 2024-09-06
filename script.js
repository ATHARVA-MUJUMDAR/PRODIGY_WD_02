let timer;
let startTime = 0;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 100);
    startStopBtn.textContent = 'Stop';
    running = true;
    lapBtn.disabled = false;
  } else {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  elapsedTime = 0;
  lapCount = 0;
  running = false;
  startStopBtn.textContent = 'Start';
  display.textContent = '00:00:00';
  lapBtn.disabled = true;
  laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  lapCount++;
  const lapTime = formatTime(Date.now() - startTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  laps.appendChild(lapItem);
});

function updateTime() {
  const currentTime = Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? `0${number}` : number;
}
