import './css/style.scss'
import { getPhotos } from './js/utils';
import { Waterfall } from './js/waterfall';


const waterfall = new Waterfall('.main', 4)
let num = 1;

const init = (() => {
    getPhotos(1).then((data) => {
        data.forEach(item => {    
            waterfall.setImgsBox(item)
        })
    })
})()

const scrollHandle = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
        boxTop = waterfall.container.offsetHeight + waterfall.container.offsetTop

    if (scrollTop + innerHeight >= boxTop - 10) {
        if (num >= 8) num = 0
        getPhotos(num++).then((data) => {
            data.forEach(item => {    
                waterfall.setImgsBox(item)
            })
        })
    }
}

window.addEventListener('scroll', scrollHandle)