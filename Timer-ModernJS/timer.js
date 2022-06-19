class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if(callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    this.startDate = new Date();
    this.futureDate = new Date(Date.now() + parseFloat(this.durationInput.value)*1000)
    if(this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.interval = setInterval(this.tick, 10);
  };
  
  pause = () => {
    clearInterval(this.interval);
  };
  
  tick = () => {
    const dateNow = new Date();
    this.timeRemaining = (this.futureDate - dateNow)/1000;
    
    if(this.onTick) { this.onTick(this.timeRemaining); }
    if(dateNow >= this.futureDate) {
      this.timeRemaining = 0;
      this.endDate = new Date();
      this.pause();

      if(this.onComplete) { this.onComplete(this.startDate, this.endDate); }
    }
  };
  
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}