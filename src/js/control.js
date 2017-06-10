import { Ui, Effects } from './ui'

export default class Control {

    static add(element) {
        this.display(element).innerHTML = ++this.display(element).innerHTML;
        if (this.getTimerFromSession(element)) {
            this.getTimerFromSession(element).innerHTML = this.display(element).innerHTML;
            this.changeClasses(element);
        }
    }
    static sub(element) {
        if (this.display(element).innerHTML > 1) {
            this.display(element).innerHTML = --this.display(element).innerHTML;
        }
        if (this.getTimerFromSession(element)) {
            this.getTimerFromSession(element).innerHTML = this.display(element).innerHTML;
            this.changeClasses(element);
        }
    }
    static start(element) {
        Ui.start(element);
        Effects.beating(element);
        let time = element.parentElement.previousElementSibling.innerHTML,
            timerDisplay = this.display(element);
        this.t = this.timer(time * 60, timerDisplay); // add * 60 for minutes
        this.changeClasses(element);
        // Effects.cloneBreak(element.parentElement.previousElementSibling);
        // Effects.cloneSession(element.parentElement.previousElementSibling);
    }
    static resume(element) {
        Ui.start(element);
        Effects.beating(element);
        if (this.display(element).innerHTML.includes(':')) {
            let timeSplit = this.display(element).innerHTML.split(':');
            if (timeSplit.length < 3) {
                timeSplit.unshift('0');
            }
            let [h, m, s] = timeSplit;
            let pausedTime = parseInt(s) + (parseInt(m) * 60) + (parseInt(h) * 60 * 60);
            this.t = this.timer(pausedTime, this.display(element));
        } else {
            let pausedTime = this.display(element).innerHTML;
            this.t = this.timer(pausedTime, this.display(element));
        }
    }
    static timer(sTime, display) {
        let time = (parseInt(sTime)) - 1, //always take in min
            hours, minutes, seconds;

        let t = setInterval(() => {
            hours = parseInt((time / 60 / 60) % 60, 10);
            minutes = parseInt((time / 60) % 60, 10);
            seconds = parseInt(time % 60, 10);


            if (hours > 0) {
                Ui.displayFontHours(display, { h: hours, m: minutes, s: seconds });
            } else if (minutes > 0) {
                Ui.displayFontMinutes(display, { m: minutes, s: seconds });
            } else {
                Ui.displayFontSeconds(display, { s: seconds });
            }
            --time;
            let title = this.timerTitle(display);
            this.sessionBreakToggle(t, time, title, display);
        }, 1000);

        return t;
    }
    static sessionBreakToggle(t, time, title, display) {
        if (time < 0 && title.innerHTML === 'SESSION') {
            clearInterval(t);
            Effects.shake(display);
            this.t = this.timer(parseInt(this.fromTimerGetBreak(display) * 60), display); // add * 60 for minutes
            Effects.shakeRemoved(display);
            Effects.clone(display, 0, true)
            setTimeout(function() {
                title.innerHTML = 'BREAK';
            }, 1000)
        } else if (time < 0 && title.innerHTML === 'BREAK') {
            clearInterval(t);
            Effects.shake(display);
            this.t = this.timer(parseInt(this.fromTimerGetSession(display) * 60), display); // add * 60 for minutes
            Effects.shakeRemoved(display);
            Effects.clone(display, 2, false);
            setTimeout(function() {
                title.innerHTML = 'SESSION';
            }, 1000)

        }
    }
    static changeClasses(element) {
        if (element.classList.contains('start')) {
            element.classList.remove('start');
            element.classList.add('resume');
        } else if (element.classList.contains('resume')) {
            element.classList.remove('resume')
            element.classList.add('start');
        } else if (element.classList.contains('add') || element.classList.contains('sub')) {
            element.parentElement.parentElement.parentElement.children[1].children[2].children[0].classList.remove('resume');
            element.parentElement.parentElement.parentElement.children[1].children[2].children[0].classList.add('start')
        } else if (element.classList.contains('reset')) {
            element.parentElement.children[0].classList.remove('resume');
            element.parentElement.children[0].classList.add('start');
        }
    }
    static pause(element) {
        Ui.pause(element);
        Effects.beatingPaused(element);
        clearInterval(this.t);
    }
    static reset(element) {
        Ui.reset(element);
        Effects.beatingRemoved(element);
        clearInterval(this.t);
        this.display(element).innerHTML = this.fromTimerGetSession(this.display(element));
        this.changeClasses(element);
    }
    static display(e) {
        return e.parentElement.previousElementSibling;
    }

    static getTimerFromSession(e) {
        if (e.parentElement.parentElement.children[0].innerHTML.includes('SESSION')) {
            return e.parentElement.parentElement.previousElementSibling.children[1];
        } else {
            return false;
        }
    }
    static fromTimerGetBreak(timer) {
        return timer.parentElement.previousElementSibling.children[1].innerHTML;
    }
    static fromTimerGetSession(timer) {
        return timer.parentElement.nextElementSibling.children[1].innerHTML;
    }

    static timerTitle(timer) {
        return timer.previousElementSibling;
    }
    static disableControls(controls) {
        for (const input of controls) {
            if (input.className === 'add' || input.className === 'sub') {
                input.disabled = true;
            }
        }
    }
    static enableControls(controls) {
        for (const input of controls) {
            if (input.className === 'add' || input.className === 'sub') {
                input.disabled = false;
            }
        }
    }
}