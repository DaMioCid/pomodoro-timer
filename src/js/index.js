import '../css/index.sass'
import '../html/index.pug'
import Events from './events'

const controls = document.querySelectorAll('input');

new Events(controls).addListeners();