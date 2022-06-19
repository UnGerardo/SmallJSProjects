// this timer is inaccurate because it is too slow, might be better to create a future date and update the timer based on the current date, every something miliseconds instead of 
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('#circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration = 0;
// callback funcs allow for 'events' to be emmitted when an action is taken, ex: when start is clicked, onStart is run which can reference objects at window level
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
  },
  onComplete() {
    console.log(this.endDate - this.startDate)
  }
});
