class PomodoroTimer {
    constructor() {
        this.timerDisplay = document.getElementById('timer');
        this.progressCircle = document.querySelector('.progress-ring__progress');
        this.startBtn = document.getElementById('start-btn');
        this.WORK_TIME = 25 * 60;
        this.BREAK_TIME = 5 * 60;
        this.CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 140;
        
        this.timeLeft = this.WORK_TIME;
        this.totalTime = this.WORK_TIME;
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;

        this.init();
    }

    init() {
        this.progressCircle.style.strokeDasharray = `${this.CIRCLE_CIRCUMFERENCE} ${this.CIRCLE_CIRCUMFERENCE}`;
        this.progressCircle.style.strokeDashoffset = 0;
        this.updateDisplay();
    }

    setProgress(percent) {
        const offset = this.CIRCLE_CIRCUMFERENCE - percent * this.CIRCLE_CIRCUMFERENCE;
        this.progressCircle.style.strokeDashoffset = offset;
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerDisplay.textContent = text;
        document.title = `${text} - Zen Pomodoro`;
        this.setProgress(this.timeLeft / this.totalTime);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startBtn.textContent = 'Pause';
        
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.pause();
                this.startBtn.textContent = 'Start';
                alert(this.isWorkMode ? 'Time for a break!' : 'Time to focus!');
                this.reset();
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.timerId);
        this.isRunning = false;
        this.startBtn.textContent = 'Start';
    }

    reset() {
        this.pause();
        this.timeLeft = this.isWorkMode ? this.WORK_TIME : this.BREAK_TIME;
        this.totalTime = this.timeLeft;
        this.updateDisplay();
    }

    setMode(workMode, cb) {
        this.isWorkMode = workMode;
        this.reset();
        if (cb) cb(workMode);
    }
}
window.PomodoroTimer = PomodoroTimer;
