/*
 * @Author: Jason 
 * @Date: 2017-06-30 15:57:23 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-30 18:58:25
 */

;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory)
    } else if (typeof exports === 'object') {
        module.exports = factory
    } else {
        root.pixGallery = factory()
    }
}(this, () => {

    'use strict'

    class pixGallery {
        constructor(JSON) {
            this.container = document.querySelector(JSON.container || '.pixGallway')
            this.imgs = this.container.getElementsByTagName('img')
            this.height = this.container.clientHeight
            this.width = this.container.clientWidth
            this.urls = JSON.urls || false

            this.init()
        }

        init() {
            this.setSize()
            if (this.urls) {
                this.setLoadingImage()
            }
        }

        setSize() {
            switch (this.imgs.length) {
                case 3:
                    const sizeH = Math.ceil(this.height / 2)
                    this.imgs[0].style.width = (this.width - sizeH) + 'px'
                    this.imgs[1].style.height = sizeH + 'px'
                    this.imgs[1].style.width = sizeH + 'px'
                    this.imgs[2].style.height = sizeH + 'px'
                    this.imgs[2].style.width = sizeH + 'px'

                    break;
            
                case 5:
                    const sizeL = Math.ceil(this.width / 3)
                    this.imgs[1].style.height = sizeL + 'px'
                    this.imgs[2].style.height = (this.height - sizeL) + 'px'
                    break;
            }
        }

        createImage() {
            const imgNode = document.createElement('img')
            this.container.appendChild(imgNode)

            return {
                setSrc(src) {
                    imgNode.src = src
                },
                setID(id) {
                    imgNode.id = id
                }
            }
        }

        setLoadingImage() {
            this.urls.forEach(item => {
                const cImg = this.createImage(),
                    image = new Image()

                cImg.setSrc('./loading.gif')
                cImg.setID('loading')
                image.src = item
                image.onload = () => {
                    cImg.setSrc(item)
                }
            })
        }
    }

    return pixGallery

}))



