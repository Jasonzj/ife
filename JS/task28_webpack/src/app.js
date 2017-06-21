import './css/reset.scss'
import './css/style.scss'
import { God_Planet, God_Commander } from './js/Commander'
import { buttonHandel } from './js/buttonHandel'
import { Spaceship } from './js/Spaceship'

let Planet = new God_Planet() // 初始化形星
let Commander = new God_Commander() // 初始化指挥官

Planet.init() // 初始化形星
buttonHandel.init() // 初始化事件绑定

export { Commander, Planet }
