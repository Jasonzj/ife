import './css/style.scss'
import { Map } from './js/map'
import { Control } from './js/control';

const mapCanvas = document.querySelector('.map')

const map = new Map({ count: 20, canvas: mapCanvas, canvasWH: 780})     // 初始化地图

const control = new Control('.robot', '.console', 20, '.console-btn')   // 初始化控制台
