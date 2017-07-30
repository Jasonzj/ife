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
            this.LAYOUT = {
                PUZZLE: 1,
                WATERFALL: 2,
                BARREL: 3
            }
        }

        /**
         * 初始化并设置相册
         * 当相册原本包含图片时，该方法会替换原有图片
         * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
         * @param {object} option 配置项
         */
        setImage(image, option) {
            this.addImage(image)
        }

        /**
         * 获取相册所有图像对应的 DOM 元素
         * 可以不是 ，而是更外层的元素
         * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
         */
        getImageDomElements() {
            
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
            
            image.forEach(img => {
                const wrap = document.createElement('div')
                wrap.className = 'galleryBox'
                wrap.innerHTML = `<img src=${img}>`
                this.container.appendChild(wrap)
            })
        }

        /**
         * 移除相册中的图片
         * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
         * @return {boolean} 是否全部移除成功
         */
        removeImage(image) {

        }

        /**
         * 设置相册的布局
         * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
         */
        setLayout(layout) {

        }

        /**
         * 获取相册的布局
         * @return {number} 布局枚举类型的值
         */
        getLayout() {

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
        
    }

    return Gallery

})