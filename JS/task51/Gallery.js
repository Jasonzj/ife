/**
 * Gallery
 * Version: v0.0.1
 * @Author: Jason 
 */

;((root, factory) => {
    if (typeof define === 'function' && define.amd) {
        define(factory)
    } else if (typeof exports === 'object') {
        module.exports = factory
    } else {
        root.Gallery = factory()
    }
})(this, () => {

    'use strict'

    class Gallery {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector)
            this.galleryBox = null
            this.LAYOUT = {
                PUZZLE: 1,      // 拼图
                WATERFALL: 2,   // 瀑布流
                BARREL: 3       // 木桶
            }
            this.options = {
                layout: 1,                  // 布局类型
                waterfallColumn: 4,         // 瀑布流布局列数
                fullscreenState: false,     // 是否全屏
                puzzleHeight: 500,          // 拼图高度
                images: [],                 // 图片数组
            }
        }

        /**
         * 初始化并设置相册
         * 当相册原本包含图片时，该方法会替换原有图片
         * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
         * @param {object} option 配置项
         */
        setImage(image, option) {
            if (typeof image === 'string') {
                image = [image]
            }

            for (const key in this.options) {
                this.options[key] = option[key] || this.options[key]
            }
            
            this.addImage(image)
            this.setLayout(option.layout)
        }

        /**
         * 获取相册所有图像对应的 DOM 元素
         * 可以不是 ，而是更外层的元素
         * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
         */
        getImageDomElements() {
            return this.options.images
        }

        /**
         * 向相册添加图片
         * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
         * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
         */
        addImage(image) {
            if (typeof image === 'string') {
                image = [image]
            }
            
            const gallerybox = document.createElement('div')
            gallerybox.className = 'galleryBox'
            gallerybox.style.height = this.options.puzzleHeight + 'px'

            image.forEach(img => {
                const wrap = document.createElement('div')
                wrap.innerHTML = `<img src=${img}>`
                this.options.images.push(wrap)
                gallerybox.appendChild(wrap)
            })

            this.galleryBox = gallerybox
            this.container.appendChild(gallerybox)
        }

        /**
         * 移除相册中的图片
         * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
         * @return {boolean} 是否全部移除成功
         */
        removeImage(image) {
            if (typeof image === 'string') {
                image = [image]
            }

            const imageArr = this.options.images

            image.forEach(ele => {
                imageArr = imageArr.filter(img => ele === img)
                ele.remove()
            })
        }

        /**
         * 设置相册的布局
         * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
         */
        setLayout(layout) {
            this.options.layout = layout

            switch (layout) {
                case 1: this.setPuzzle()
                // case 2: this.setWaterFall()
                // case 3: this.setBarrel()
            }
        }

        /**
         * 获取相册的布局
         * @return {number} 布局枚举类型的值
         */
        getLayout() {
            return this.options.layout
        }

        /**
         * 设置拼图布局
         */
        setPuzzle() {
            const images = this.getImageDomElements()
            const boxHeight = this.options.puzzleHeight
            const boxWidth = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('width'))

            images.forEach(img => img.className = 'puzzleBox')
            this.addClass(this.galleryBox, `count${images.length}`)

            switch (images.length) {
                case 5:
                    const sizeL = Math.ceil(boxWidth / 3)
                    images[1].style.height = sizeL + 'px'
                    images[2].style.height = (boxHeight - sizeL) + 'px'
                    break;
            }
        }

        /**
         * 设置图片之间的间距
         * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
         * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
         * @param {number}  x  图片之间的横向间距
         * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
         */
        setGutter(x, y) {

        }

        /**
         * 允许点击图片时全屏浏览图片
         */
        enableFullscreen() {

        }

        /**
         * 禁止点击图片时全屏浏览图片
         */
        disableFullscreen() {

        }

        /**
         * 获取点击图片时全屏浏览图片是否被允许
         * @return {boolean} 是否允许全屏浏览
         */
        isFullscreenEnabled() {

        }

        /**
         * 设置木桶模式每行图片数的上下限
         * @param {number} min 最少图片数（含）
         * @param {number} max 最多图片数（含）
         */
        setBarrelBin(min, max) {

            if (min === undefined || max === undefined || min > max) {
                console.error('...');
                return;
            }

        }

        /**
         * 获取木桶模式每行图片数的上限
         * @return {number} 最多图片数（含）
         */
        getBarrelBinMax() {

        }

        /**
         * 获取木桶模式每行图片数的下限
         * @return {number} 最少图片数（含）
         */
        getBarrelBinMin() {

        }

        /**
         * 设置木桶模式每行高度的上下限，单位像素
         * @param {number} min 最小高度
         * @param {number} max 最大高度
         */
        setBarrelHeight(min, max) {

        }

        /**
         * 获取木桶模式每行高度的上限
         * @return {number} 最多图片数（含）
         */
        getBarrelHeightMax() {

        }

        /**
         * 获取木桶模式每行高度的下限
         * @return {number} 最少图片数（含）
         */
        getBarrelHeightMin() {

        }
        
        addClass(target, classN) {
            target.classList.add(classN)
        }
    }

    return Gallery

})