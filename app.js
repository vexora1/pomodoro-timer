const breakIncrement = document.getElementById("break-increment");
const breakDecrement = document.getElementById("break-decrement");
const breakLength = document.getElementById("break-length");
const sessionIncrement = document.getElementById("session-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionLength = document.getElementById("session-length");

const timerLabel = document.getElementById("timer-label");

const timeLeft = document.getElementById("time-left");
const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");

const audio = document.getElementById("beep");

let breakLengthValue = parseInt(breakLength.textContent);
let sessionLengthValue = parseInt(sessionLength.textContent);

let timeLeftValue = sessionLengthValue * 60;

breakIncrement.addEventListener("click", () => {
  if (breakLengthValue < 60) {
    breakLengthValue++;
    breakLength.textContent = breakLengthValue;
  }
});

breakDecrement.addEventListener("click", () => {
  if (breakLengthValue > 1) {
    breakLengthValue--;
    breakLength.textContent = breakLengthValue;
  }
});

sessionIncrement.addEventListener("click", () => {
  if (sessionLengthValue < 60) {
    sessionLengthValue++;
    sessionLength.textContent = sessionLengthValue;
    timeLeftValue = sessionLengthValue * 60;
    timeLeft.textContent = `${sessionLengthValue}:00`;
  }
});

sessionDecrement.addEventListener("click", () => {
  if (sessionLengthValue > 1) {
    sessionLengthValue--;
    sessionLength.textContent = sessionLengthValue;
    timeLeftValue = sessionLengthValue * 60;
    timeLeft.textContent = `${sessionLengthValue}:00`;
  }
});

let timer;
let isSession = true;
let isRunning = false;

function startTimer() {
  timer = setInterval(() => {
    timeLeftValue--;
    let minutes = Math.floor(timeLeftValue / 60);
    let seconds = timeLeftValue % 60;
    timeLeft.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    if (timeLeftValue === 0) {
      audio.play();
      clearInterval(timer);
      if (isSession) {
        timeLeftValue = breakLengthValue * 60;
        timeLeft.textContent = `${breakLengthValue}:00`;
        isSession = false;
        timerLabel.textContent = "Break";
      } else {
        timeLeftValue = sessionLengthValue * 60;
        timeLeft.textContent = `${sessionLengthValue}:00`;
        isSession = true;
        timerLabel.textContent = "Session";
      }
      startTimer();
    }
  }, 1000);
}

startStop.addEventListener("click", () => {
  if (isRunning) {
    startStop.innerHTML = `<i class="fa-solid fa-play"></i>`;
    clearInterval(timer);
  } else {
    startStop.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    startTimer();
  }
  isRunning = !isRunning;
});

reset.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  isSession = true;
  breakLengthValue = 5;
  sessionLengthValue = 25;
  timeLeftValue = sessionLengthValue * 60;
  breakLength.textContent = breakLengthValue;
  sessionLength.textContent = sessionLengthValue;
  timeLeft.textContent = `${sessionLengthValue}:00`;
  timerLabel.textContent = "Session";
  audio.pause();
  audio.currentTime = 0;
  startStop.innerHTML = `<i class="fa-solid fa-play"></i>`;
});
