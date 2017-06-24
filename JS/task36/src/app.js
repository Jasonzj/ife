import './css/style.scss'
import { Robot } from './js/robot'
import { Map } from './js/map'
import { Editor } from './js/editor'

const mapCanvas = document.querySelector('.map')

const map = new Map({
    count: 20,
    canvas: mapCanvas,
    canvasWH: 780
})

const robot = new Robot('.robot', 20)

const editor = new Editor('.console')

// document.addEventListener('keydown', function() {
//     const direction = {37: 1, 38: 2, 39: 3, 40: 0}[event.keyCode]
//     if (typeof direction != 'undefined') {
//         event.preventDefault()
//         if (robot.direction === direction) {
//             robot.move(1)
//             return false
//         } 
//         robot.turn(direction)
//     }
//  })

//  document.addEventListener('keydown', () => {
//      console.log(event.keyCode);
//      if (event.keyCode === 32) {
//         robot.buildWall()
//      } else if (event.keyCode === 18) {
//         robot.paintWall('#1abc9c')
//      } else if (event.keyCode === 17) {
//         robot.splitWall()
//      }
//  })

