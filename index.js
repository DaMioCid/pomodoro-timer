var bnum = 5;
var snum = 25;
var secs0;
var mins1;
var hours2;
var t;
var display;
var h2;
var x;
var y;
var z;

window.onload = function() {
    document.getElementById('breakTime').innerHTML = bnum;
    document.getElementById('sessionTime').innerHTML = snum;
    document.getElementById('timer').innerHTML = snum;
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';

    display = document.querySelector('#timer');
    fontSecs();
}

function breakAdd() {
    bnum++;
    document.getElementById('breakTime').innerHTML = bnum;
    if (bnum >= 1) {

        breakLengthSubEnabled();
    }
}

function breakSub() {
    bnum--;
    console.log(document.getElementById("bsub").onclick);
    document.getElementById('breakTime').innerHTML = bnum;
    if (bnum === 1) {

        breakLengthSubDiseabled();
    }
}

function sesAdd() {
    snum++;
    document.getElementById('sessionTime').innerHTML = snum;
    document.getElementById('timer').innerHTML = snum;
    if (snum >= 1) {

        sessionLengthSubEnabled();
    }
}

function sesSub() {
    snum--;
    document.getElementById('sessionTime').innerHTML = snum;
    document.getElementById('timer').innerHTML = snum;
    if (snum === 1) {
        sessionLengthSubDiseabled();
    }
}

function timer(sesTime, display) {
    var time = sesTime - 1,
        hours, minutes, seconds;

    t = setInterval(function() {
        hours = parseInt((time / 60 / 60) % 60, 10);
        minutes = parseInt((time / 60) % 60, 10);
        seconds = parseInt(time % 60, 10);

        if (hours > 0) {
            fontHours();
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = hours + ":" + minutes + ":" + seconds;
        } else if (minutes > 0) {
            fontMins();
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
        } else {
            fontSecs();
            display.textContent = seconds;
        }
        --time;
        sessionBreakToggle(time);
    }, 1000);
}

function sessionBreakToggle(time) {
    h2 = document.getElementById('h2').innerHTML;

    if (time < 0 && h2 === 'SESSION') {
        breakTime(time);
    } else if (time < 0 && h2 === 'BREAK') {
        sessionTime(time);
    }
}

function breakTime(time) {
    timerBreak();
    if (time < 0) {
        clearInterval(t);
        bnum = parseInt(document.getElementById('breakTime').innerHTML) * 60;
        timer(bnum, display);
    }
}

function sessionTime(time) {
    timerSession();
    if (time < 0) {
        clearInterval(t);
        snum = parseInt(document.getElementById('sessionTime').innerHTML) * 60;
        timer(snum, display);
    }
}

function start() {
    x = document.getElementById('startButton');
    x.style.display = x.style.display === '' ? 'none' : '';
    y = document.getElementById('pauseButton')
    y.style.display = y.style.display === 'none' ? '' : 'none';
    z = document.getElementById('resetButton');
    z.style.display = z.style.display === 'none' ? '' : 'none';
    snum = parseInt(document.getElementById('timer').innerHTML) * 60;

    timer(snum, display);
    allButtonsDisabled();
}

function pause() {
    y = document.getElementById('pauseButton');
    y.style.display = y.style.display === '' ? 'none' : '';
    x = document.getElementById('startButton');
    x.style.display = x.style.display === 'none' ? '' : 'none';

    document.getElementById('startButton').onclick = function() { resume() };
    clearInterval(t);
    var z = (document.getElementById("timer").innerHTML).split(":").reverse();

    for (var i = 2; i > 0; i--) {
        if (typeof z[i] === 'undefined') {
            z[i] = 0;
        }
    }
    secs0 = parseInt(z[0]);
    mins1 = parseInt(z[1]);
    hours2 = parseInt(z[2]);
}

function resume() {
    x = document.getElementById('startButton');
    x.style.display = x.style.display === '' ? 'none' : '';
    y = document.getElementById('pauseButton')
    y.style.display = y.style.display === 'none' ? '' : 'none';
    var s = secs0 + (mins1 * 60) + (hours2 * 60 * 60);
    display = document.querySelector('#timer');
    timer(s, display);
}

function reset() {
    bnum = 5;
    snum = 10;
    clearInterval(t);
    document.getElementById('startButton').style.display = '';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';

    document.getElementById('startButton').onclick = function() { start() };
    document.getElementById('timer').innerHTML = snum;
    document.getElementById('breakTime').innerHTML = bnum;
    document.getElementById('sessionTime').innerHTML = snum;

    allButtonsEnabled();
    fontSecs();
}

function timerBreak() {
    document.getElementById('h2').innerHTML = "BREAK";
}

function timerSession() {
    document.getElementById('h2').innerHTML = "SESSION";
}

function fontHours() {
    document.getElementById('timer').className = "htimer";
}

function fontMins() {
    document.getElementById('timer').className = "mtimer";
}

function fontSecs() {
    document.getElementById('timer').className = "stimer";
}

function breakLengthSubEnabled() {
    document.getElementById('bsub').removeAttribute('disabled');
}

function breakLengthSubDiseabled() {
    document.getElementById('bsub').setAttribute('disabled', 'disabled');
}

function sessionLengthSubEnabled() {
    document.getElementById('ssub').removeAttribute('disabled');
}

function sessionLengthSubDiseabled() {
    document.getElementById('ssub').setAttribute('disabled', 'disabled');
}

function allButtonsEnabled() {
    document.getElementById('badd').removeAttribute('disabled');
    document.getElementById('bsub').removeAttribute('disabled');
    document.getElementById('sadd').removeAttribute('disabled');
    document.getElementById('ssub').removeAttribute('disabled');
}

function allButtonsDisabled() {
    document.getElementById('badd').setAttribute('disabled', 'disabed');
    document.getElementById('bsub').setAttribute('disabled', 'disabed');
    document.getElementById('sadd').setAttribute('disabled', 'disabed');
    document.getElementById('ssub').setAttribute('disabled', 'disabed');
}