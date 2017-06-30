import './css/style.scss'
import { Calendar } from './js/calendar';

new Calendar({
    append: '.main',       // 追加元素
    input: 'inp',          // (可选)input单独类
    multi: true,           // (可选)true为选择时间跨度日历，false为单日
    min: 3,                // (可选)最小跨度天数
    max: 100,              // (可选)最大跨度天数
    multiCallBack() {               // 当不满足跨度设置时的回调函数接口
        alert('时间跨度不满足回调')
    },
    callBack() {
        console.log('callback')
    }
})

new Calendar({
    append: '.main2',
    callBack() {
        console.log('callback')
    }
})