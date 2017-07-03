import { getPhotos } from './utils';
import { Waterfall } from './waterfall';

let num = 0
const waterfall = new Waterfall('.main', 4, 15)

const scrollHandle = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
        boxTop = waterfall.container.offsetHeight + waterfall.container.offsetTop

    if (scrollTop + innerHeight >= boxTop) {
        if (num >= 8) num = 0
        setPhoto()
    }
}

const setPhoto = () => {
    getPhotos(num++)
        .then(data => {
            data.forEach(item => {    
                waterfall.setImgsBox(item)
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const init = () => {
    setPhoto()
    window.addEventListener('scroll', scrollHandle)
}

