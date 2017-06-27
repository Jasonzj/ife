import './css/style.scss'
import { Map } from './js/map'
import { Control } from './js/control';

const mapCanvas = document.querySelector('.map')

new Map({       // 初始化地图
    count: 20, 
    canvas: mapCanvas, 
    canvasWH: 780
})     

new Control({   // 初始化控制类
    robotEle: '.robot',
    editorEle: '.console',
    selectImg: '.image',
    selectBox: '.duration',
    btnBox: '.console-btn',
    count: 20
})


