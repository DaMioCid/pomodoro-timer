import Control from './control'

export class Ui {
    static start(e) {
        Effects.scaleStart(e);
        Effects.animateReversePause(e.parentElement.children[1]);
        Effects.animateReverseReset(e.parentElement.children[2]);
        setTimeout(function() {
            e.style.height = '0';
            e.style.width = '0';
            for (let i = 1; i < e.parentElement.children.length; i++) {
                e.parentElement.children[i].style.height = '40px';
                e.parentElement.children[i].style.width = '40px';
            }
            Effects.animateReversePauseRemove(e.parentElement.children[1]);
            Effects.animateReverseResetRemove(e.parentElement.children[2]);
            Effects.scaleStartRemove(e);
        }, 500)
    }
    static pause(e) {
        Effects.animatePause(e.parentElement.children[1]);
        Effects.animateReset(e.parentElement.children[2]);
        Effects.scaleReverseStart(e.previousElementSibling);
        setTimeout(function() {
            e.previousElementSibling.style.height = '40px';
            e.previousElementSibling.style.width = '40px';
            for (let i = 1; i < e.parentElement.children.length; i++) {
                e.parentElement.children[i].style.height = '0';
                e.parentElement.children[i].style.width = '0';
            }
            Effects.animatePauseRemove(e.parentElement.children[1]);
            Effects.animateResetRemove(e.parentElement.children[2]);
        }, 500)
        Effects.scaleReverseStartRemove(e.previousElementSibling);
    }
    static reset(e) {
        e.parentElement.parentElement.children[0].innerHTML = 'SESSION';
        Effects.animatePause(e.parentElement.children[1]);
        Effects.animateReset(e.parentElement.children[2]);
        Effects.scaleReverseStart(e.previousElementSibling.previousElementSibling);
        setTimeout(function() {
            e.previousElementSibling.previousElementSibling.style.height = '40px';
            e.previousElementSibling.previousElementSibling.style.width = '40px';
            for (let i = 1; i < e.parentElement.children.length; i++) {
                e.parentElement.children[i].style.height = '0';
                e.parentElement.children[i].style.width = '0';
            }
            Effects.animatePauseRemove(e.parentElement.children[1]);
            Effects.animateResetRemove(e.parentElement.children[2]);
        }, 500)
        Effects.scaleReverseStartRemove(e.previousElementSibling.previousElementSibling);
    }
    static displayFontHours(display, { h, s, m }) {
        display.style.fontSize = '120px';
        display.innerHTML = h + ":" + this.leadingZeros(m, s).mins + ":" + this.leadingZeros(m, s).secs;
    }
    static displayFontMinutes(display, { m, s }) {
        display.style.fontSize = '150px';
        display.innerHTML = this.leadingZeros(m, s).mins + ":" + this.leadingZeros(m, s).secs;
    }
    static displayFontSeconds(display, { s }) {
        display.style.fontSize = '200px';
        display.innerHTML = s;
    }
    static leadingZeros(mins, secs) {
        mins = mins < 10 ? '0' + mins : mins;
        secs = secs < 10 ? '0' + secs : secs;
        return {
            mins: mins,
            secs: secs
        }
    }
}

export class Effects {
    static beating(e) {
        Control.display(e).classList.contains('beat-paused') ?
            Control.display(e).classList.remove('beat-paused') :
            Control.display(e).classList.add('beat-active')

        Control.display(e).parentElement.parentElement.children[3].classList.contains('shadow-paused') ?
            Control.display(e).parentElement.parentElement.children[3].classList.remove('shadow-paused') :
            Control.display(e).parentElement.parentElement.children[3].classList.add('shadow-active')
    }
    static beatingPaused(e) {
        Control.display(e).classList.add('beat-paused');
        Control.display(e).parentElement.classList.add('shadow-paused');
    }
    static beatingRemoved(e) {
        Control.display(e).classList.remove('beat-active')
        Control.display(e).parentElement.classList.remove('shadow-active')
    }
    static shake(e) {
        e.parentElement.classList.add('shake');
    }
    static shakeRemoved(e) {
        setTimeout(function() {
            e.parentElement.classList.remove('shake');
        }, 1000)
    }
    static scaleStart(e) {
        e.classList.add('ani-start');
    }
    static scaleStartRemove(e) {
        e.classList.remove('ani-start');
    }
    static animatePause(e) {
        e.classList.add('ani-pause');
    }
    static animatePauseRemove(e) {
        e.classList.remove('ani-pause');
    }
    static animateReset(e) {
        e.classList.add('ani-reset');
    }
    static animateResetRemove(e) {
        e.classList.remove('ani-reset');
    }
    static scaleReverseStart(e) {
        e.classList.add('ani-start');
        e.style.animationDirection = 'reverse'
    }
    static scaleReverseStartRemove(e) {
        setTimeout(function() {
            e.style.animationDirection = 'normal'
            e.classList.remove('ani-start');
        }, 1000)
    }
    static animateReversePause(e) {
        e.classList.add('ani-pause');
        e.style.animationDirection = 'reverse';
    }
    static animateReversePauseRemove(e) {
        setTimeout(function() {
            e.style.animationDirection = 'normal'
            e.classList.remove('ani-pause');
        }, 500)
    }
    static animateReverseReset(e) {
        e.classList.add('ani-reset');
        e.style.animationDirection = 'reverse'
    }
    static animateReverseResetRemove(e) {
        setTimeout(function() {
            e.style.animationDirection = 'normal'
            e.classList.remove('ani-reset');
        }, 500)
    }
    static shrinkTheWrapper(e) {
        e.classList.add('shrink-All');
    }
    static removeShrinkWrapper(e, k) {
        const p = e.parentElement;
        const kid = p.children[k];

        setTimeout(function() {
            p.removeChild(kid);
            p.children[k].classList.remove('shrink-All');
        }, 2000)
    }
    static clone(e, n, w) {
        const mainOffsetLeft = e.parentElement.parentElement.children[n].offsetLeft;
        const parent = e.parentElement.parentElement;
        const item = parent.children[n];
        const clone = item.cloneNode(true);
        this.shrinkTheWrapper(e.parentElement.parentElement.children[n]);
        parent.insertBefore(clone, item);
        //THE WRAPPER
        if (w) {
            const x = parent.children[1].offsetLeft - parent.children[0].offsetLeft + 70;
            clone.style.transform = `translateX(${x}px)`;
        } else if (!w) {
            const x = parent.children[2].offsetLeft - parent.children[1].offsetLeft + 70;
            clone.style.transform = `translateX(-${x}px)`;
        }
        clone.style.transition = 'all 1s ease-out';
        clone.style.position = 'absolute';
        clone.style.backgroundColor = '#52B3D9';
        clone.style.left = `${mainOffsetLeft}px`;
        clone.style.height = '400px';
        clone.style.width = '400px';
        clone.style.zIndex = '2000';
        //TITLEDIV
        clone.children[0].style.transition = 'all 1s ease-out';
        //BREAK 
        clone.children[0].children[0].style.transition = 'all 1s ease-out';
        clone.children[0].children[0].style.fontSize = '50px';
        clone.children[0].children[0].style.fontWeight = '500';
        //LENGTH
        clone.children[0].children[1].style.transition = 'all 1s ease-out';
        clone.children[0].children[1].style.fontSize = '0';
        //NUMBER
        clone.children[1].style.transition = 'all 1s ease-in-out';
        clone.children[1].style.fontSize = '200px';
        clone.children[1].style.fontWeight = '400';
        //CONTROLS
        clone.children[2].style.transition = 'all 1s ease-out';
        //+-pr
        clone.children[2].children[0].style.display = 'none';
        clone.children[2].children[1].style.display = 'none';
        clone.children[2].children[2].style.display = 'block';
        clone.children[2].children[3].style.display = 'block';
        //+
        clone.children[2].children[0].style.height = '0px';
        clone.children[2].children[0].style.width = '0px';
        //-
        clone.children[2].children[1].style.height = '0px';
        clone.children[2].children[1].style.width = '0px';
        //pause and reset dumms
        clone.children[2].children[2].style.height = '40px';
        clone.children[2].children[2].style.width = '40px';
        clone.children[2].children[3].style.height = '40px';
        clone.children[2].children[3].style.width = '40px';

        setTimeout(function() {

            if (w) {
                const x = parent.children[1].offsetLeft - parent.children[0].offsetLeft;
                clone.style.transform = `translateX(${x}px)`;
            } else {
                const x = parent.children[2].offsetLeft - parent.children[1].offsetLeft - 494; //this
                clone.style.transform = `translateX(${x}px)`;
            }
            //THE WRAPPER
            clone.style.backgroundColor = '#03A678';
            clone.style.opacity = '1';
            clone.style.height = '200px';
            clone.style.width = '200px';
            clone.style.zIndex = '0';
            //SESSION
            clone.children[0].children[0].style.fontSize = '20px';
            clone.children[0].children[0].style.fontWeight = '500';
            //LENGTH
            clone.children[0].children[1].style.fontSize = '20px';
            //NUMBER
            clone.children[1].style.fontSize = '80px';
            //CONTROLS
            //+-pr
            clone.children[2].children[0].style.display = 'block';
            clone.children[2].children[1].style.display = 'block';
            clone.children[2].children[2].style.display = 'none';
            clone.children[2].children[3].style.display = 'none';
            //+
            clone.children[2].children[0].style.height = '25px';
            clone.children[2].children[0].style.width = '25px';
            //-
            clone.children[2].children[1].style.height = '25px';
            clone.children[2].children[1].style.width = '25px';
            //pause and reset dumms
            clone.children[2].children[2].style.height = '0';
            clone.children[2].children[2].style.width = '0';
            clone.children[2].children[3].style.height = '0';
            clone.children[2].children[3].style.width = '0';
        }, 1000)

        this.removeShrinkWrapper(e.parentElement.parentElement.children[n], n);
    }
}