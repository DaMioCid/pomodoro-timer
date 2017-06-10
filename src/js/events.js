import Control from './control'
import { Ui, Effects } from './ui'

export default class Events {
    constructor(controls) {
        this.controls = controls;
    }
    addListeners() {
        for (const input of this.controls) {
            input.addEventListener('click', element => {
                this.actOn(element);
            });
        }
    }
    actOn(e) {
        switch (e.target.className) {
            case 'add':
                Control.add(e.target);
                break;
            case 'sub':
                Control.sub(e.target);
                break;
            case 'start':
                Control.start(e.target);
                Control.disableControls(this.controls);
                break;
            case 'pause':
                Control.pause(e.target);
                Control.enableControls(this.controls);
                break;
            case 'resume':
                Control.resume(e.target);
                Control.disableControls(this.controls);
                break;
            case 'reset':
                Control.reset(e.target);
                Control.enableControls(this.controls);
                break;
        }
    }
}