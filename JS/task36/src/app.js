import './css/style.scss'
import { Robot } from './js/robot'
import { Map } from './js/map'

const mapCanvas = document.querySelector('.map')

new Map({
    count: 20,
    canvas: mapCanvas,
    canvasWH: 780
})

const robot = new Robot('.robot')

document.addEventListener('keydown', function() {
    const direction = {37: 1, 38: 2, 39: 3, 40: 0}[event.keyCode]
    if (typeof direction != 'undefined') {
        event.preventDefault()
        if (robot.direction === direction) {
            robot.move(1)
        } else {
            robot.turn(direction)
        }
    }
 })

