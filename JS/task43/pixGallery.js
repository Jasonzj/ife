/*
 * @Author: Jason 
 * @Date: 2017-06-30 15:57:23 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-01 16:33:35
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
        /**
         * Creates an instance of pixGallery.
         * @param {Object} JSON 
         * {
         *   container: '.pixGallway-1',    指定的容器
         *   urls: [                        (可选)如果图片需要占位图loading，指定加载的图片
         *       'http://placehold.it/2000x1000/E97452/fff'
         *   ]
         * }
         * @memberof pixGallery
         */
        constructor(JSON) {
            this.container = document.querySelector(JSON.container || '.pixGallway')
            this.height = this.container.clientHeight
            this.width = this.container.clientWidth
            this.urls = JSON.urls || false

            this.init()
        }

        /**
         * 初始化
         * 
         * @memberof pixGallery
         */
        init() {
            if (this.urls) {
                this.setLoadingImage()
            }
            this.setSize()
        }

        /**
         * 设置尺寸
         * 
         * @memberof pixGallery
         */
        setSize() {
            this.setImgs()
            this.setClassN(this.container, `pixImgs${this.imgs.length}`)
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

        /**
         * 创建图片
         * 
         * @returns setSrc
         * @memberof pixGallery
         */
        createImage() {
            const imgNode = document.createElement('img')
            this.container.appendChild(imgNode)

            return {
                setSrc(src) {
                    imgNode.src = src
                }
            }
        }

        /**
         * 设置加载图片
         * 
         * @memberof pixGallery
         */
        setLoadingImage() {
            this.urls.forEach(item => {
                const cImg = this.createImage(),
                    image = new Image()

                cImg.setSrc('./loading.gif')
                image.src = item
                image.onload = () => {
                    cImg.setSrc(item)
                    this.setImgs()
                    this.setClassN(this.container, `pixImgs${this.imgs.length}`)
                }
            })
        }

        /**
         * 设置this.imgs(所有图片Array)
         * 
         * @memberof pixGallery
         */
        setImgs() {
            this.imgs = this.container.getElementsByTagName('img')
        }

        /**
         * 添加目标className
         * 
         * @param {Element} target 目标元素
         * @param {String} classN 指定的className
         * @memberof pixGallery
         */
        setClassN(target, classN) {
            target.classList.add(classN)
        }
    }

    return pixGallery

}))



