import { getPhotos } from './utils';
import { Barrel } from './barrel';

let num = 0
const barrel = new Barrel('.main', 300)

const scrollHandle = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
        boxTop = barrel.container.offsetHeight + barrel.container.offsetTop

    if (scrollTop + innerHeight >= boxTop) {
        if (num >= 8) num = 0
        setPhoto()
    }
}

const setPhoto = () => {
    getPhotos(num++)
        .then(data => {
            barrel.appendRow(data)
        })
        .catch(error => {
            throw error
        })
}

export const init = () => {
    setPhoto()
    window.addEventListener('scroll', scrollHandle)
}

