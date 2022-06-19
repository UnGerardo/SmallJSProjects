const timerWidget = document.getElementById("timerWidget");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
let initialTime = timer.value;
let timerChange = true;
let timerInterval = 0;
let barInterval = 0;

timer.addEventListener('click', () => { 
  clearInterval(timerInterval);
  clearInterval(barInterval);
});
timer.addEventListener('change', () => { timerChange = true; })

playBtn.addEventListener('click', () => {
  // if timer was changed, start over with new value, otherwise keep running with current state
  if(timerChange) {
    initialTime = timer.value;
    timerChange = false;
    timerWidget.style.backgroundImage = `conic-gradient(white 0deg, black 0deg, black 360deg)`;
  }
  timerInterval = setInterval(decreaseTime, 1000);
  barInterval = setInterval(decreaseBar, 1000);
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  clearInterval(barInterval);
});

function decreaseTime() {
  timer.value = parseInt(timer.value) - 1;
  if(timer.value == "0") {
    clearInterval(timerInterval);
  }
}

function decreaseBar() {
  let startingTime = parseInt(initialTime);
  let currentTime = parseInt(timer.value);

  let degreeChange = (1 - currentTime/startingTime)*360;
  timerWidget.style.backgroundImage = `conic-gradient(white ${degreeChange}deg, black ${degreeChange}deg, black 360deg)`;
  
  if(timer.value == "0") {
    clearInterval(barInterval);
  }
}