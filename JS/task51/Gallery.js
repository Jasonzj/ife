/**
 * Gallery
 * Version: v1.1.7
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
})(window, () => {

    'use strict'

    class Gallery {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector)
            this.galleryBox = null
            this.options = {
                layout: 2,                  // 布局类型
                waterfallColumn: 4,         // 瀑布流布局列数
                fullScreen: false,           // 是否全屏
                puzzleHeight: 600,          // 拼图高度
                barrelMinHeight: 200,       // 木桶布局最小行高     
                gutter: { x: 10, y: 10 },   // 木桶布局间距
                images: [],                 // 图片数组
            }
            this.columns = []           // 瀑布流列数组
            this.nPhotos = []           // 木桶布局未加入行数组
            this.nPhotosWrap = null     // 木桶布局未加入行容器
            this.resizeTimer = null     // 木桶布局自适应timer
            this.onresize = false       // 监听容器宽度
            this.imgIndex = 0           // 图片索引
            this.cacheWidth = this.container.clientWidth  // 图片宽度缓存
            
            this.init()
        }

        init() {
            // 监听屏幕
            window.onresize = () => {
                if (this.onresize) {
                    this.resizeUpdate(200)
                }
            }
            this.bindClickHandle()
            this.setView()
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
            
            // 初始化配置
            for (const key in this.options) {
                this.options[key] = option[key] || this.options[key]
            }
            
            // 初始化图片容器
            const galleryBox = this.galleryBox = document.createElement('div')
            galleryBox.className = 'galleryBox'
            this.container.appendChild(galleryBox)

            // 初始布局和图片
            this.addImage(image)
            this.setLayout(option.layout, true)
        }

        /**
         * 获取相册所有图像对应的 DOM 元素
         * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
         */
        getImageDomElements() {
            return this.options.images
        }

        /**
         * 添加图片
         * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
         * @param {Boolean} bool 是否把图片直接添加到容器
         */
        addImage(image, bool = false) {
            if (typeof image === 'string') {
                image = [image]
            }

            image.forEach(imgUrl => {
                this.createImage(imgUrl, bool)
            })
        }

        /**
         * 创建图片
         * @param {String} url 图片链接
         */
        createImage(url, bool) {
            const wrap = document.createElement('div')
            const img = new Image()
            img.src = url
            wrap.appendChild(img)
            
            if (!bool) {
                this.options.images.push(wrap)
                return false
            }

            img.onload = () => {
                this.options.images.push(wrap)
                this.addBox(wrap, img.width, img.height)
            }
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

            let imageArr = this.options.images

            image.forEach(ele => {
                let index = imageArr.indexOf(ele)
                if (index > 0) {
                    imageArr.splice(index, 1)
                }
            })

            this.updateLayout()
        }

        /**
         * 设置相册的布局
         * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
         */
        setLayout(layout = 2, init) {
            this.options.layout = layout
            this.clearLayout()

            switch (layout) {
                case 1: 
                    this.onresize = false
                    this.setPuzzle() 
                    break
                case 2: 
                    this.onresize = false
                    if (init) {
                        window.onload = () => {
                            this.setWaterFall()
                        }
                        return false
                    }
                    this.setWaterFall()
                    break
                case 3:
                    this.onresize = true
                    if (init) {
                        window.onload = () => {
                            this.setBarrel()
                        }
                        return false
                    }
                    this.setBarrel()
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
         * 清除相册布局
         */
        clearLayout() {
            const node = this.galleryBox
            node.style.height = ''
            this.imgIndex = 0

            if (node) {
                while (node.firstChild) {
                    node.firstChild.remove()
                }
            }

            this.options.images.forEach(img => {
                img.style.width = ''
                img.style.margin = ''
                img.style.border = ''
            })
        }

        /**
         * 设置拼图布局
         */
        setPuzzle() {
            const galleryBox = this.galleryBox
            const images = this.getImageDomElements().slice(0, 6)
            const boxHeight = this.options.puzzleHeight
            const boxWidth = parseInt(window.getComputedStyle(this.container, null).getPropertyValue('width'))
            galleryBox.style.height = boxHeight + 'px'

            images.forEach((img, i) => {
                img.className = 'puzzleBox'
                img.style.height = ''
                img.firstChild.setAttribute('index', i)
                galleryBox.appendChild(img)
            })

            galleryBox.className = `galleryBox count${images.length}`

            if (images.length === 5) {
                const sizeL = Math.ceil(boxWidth / 3)
                images[1].style.height = sizeL + 'px'
                images[2].style.height = (boxHeight - sizeL) + 'px'
            }
        }

        /**
         * 设置瀑布流布局
         */
        setWaterFall() {
            const col = this.options.waterfallColumn
            this.columns = []

            for (let i = 0, l = col; i < l; i++) {
                const column = document.createElement('div')
                column.className = 'waterfallColumn'
                column.style.width = `${(100 / col)}%`
                this.columns.push(column)
                this.galleryBox.appendChild(column)
            }

            const images = this.getImageDomElements()

            images.forEach(img => this.addBox(img))
        }

        /**
         * 设置木桶布局
         */
        setBarrel() {
            this.minRatio = this.galleryBox.clientWidth / this.options.barrelMinHeight
            this.nPhotos = []           
            this.nPhotosWrap = null     
            const images = this.getImageDomElements()
            images.forEach(img => this.addBox(img, img.firstChild.width, img.firstChild.height))
        }

        /**
         * 获取瀑布流最小列
         * @returns {HTMLElement} 最小列dom
         */
        getMinWaterfallColumn() {
            return this.columns.sort((a, b) => a.clientHeight - b.clientHeight)[0]
        }

        /**
         * 木桶布局追加图片
         * @param {String} url 图片链接
         * @param {Number} ratio 图片比例
         * @param {HTMLElement} dom 图片dom
         */
        appendBarrel(url, ratio, dom, wid, hei) {
            let nPhotos = this.nPhotos
            const gutterX = this.options.gutter.x
            const nPhotosWrap = this.nPhotosWrap
            const nPhotosDoms = nPhotosWrap.querySelectorAll('.barrelBox')

            nPhotos.push({
                url,
                ratio
            })

            dom.className = 'barrelBox'
            dom.style.marginRight = gutterX + 'px'
            nPhotosWrap.appendChild(dom)

            const total = nPhotos.reduce((a, b) => a + b.ratio, 0)

            // 超过当前比例
            if (total > this.minRatio) {
                const lastPhoto = nPhotos.pop()
                const conHeight = this.galleryBox.clientWidth - ((nPhotos.length - 1) * gutterX)
                const rowHeight = conHeight / (total - lastPhoto.ratio)
                nPhotosWrap.style.height = rowHeight + 'px'

                Array.from(nPhotosDoms)
                    .forEach((wrap, i, self) => {
                        if (i === self.length - 1) return false
                        wrap.style.width = nPhotos[i].ratio * rowHeight + 'px'
                    })

                dom.remove()
                this.nPhotos = []
                this.addBox(dom, wid, hei, true)         
            }
        }

        /**
         * 根据layout添加图片到容器中
         * @param {HTMLElement} box 需要添加容器的dom
         * @param {Number} wid 图片的宽度
         * @param {Number} hei 图片的高度
         * @param {Boolean} bool 
         */
        addBox(...args) {
            const box = args[0]
            const bool = args[3]
            box.style.height = ''
            
            if (!bool) {
                box.firstChild.setAttribute('index', this.imgIndex++)
            }

            const funcNameArr = ['setPuzzle', 'addWaterFall', 'addBarrel']
            const funcName = funcNameArr[this.options.layout - 1]
            const func = this[funcName]
            func && func.apply(this, args)
        }

        /**
         * 添加瀑布流图片
         * @param {HTMLElement} box 需要添加容器的dom
         */
        addWaterFall(box) {
            const min = this.getMinWaterfallColumn()
            const gutter = this.options.gutter
            box.className = 'waterfallBox'
            box.style.borderBottom = gutter.y + 'px solid transparent'
            box.style.borderRight = gutter.x + 'px solid transparent'
            min.appendChild(box)
        }

        /**
         * 添加木桶图片
         * @param {HTMLElement} box 需要添加容器的dom
         * @param {Number} wid 图片的宽度
         * @param {Number} hei 图片的高度
         */
        addBarrel(box, wid, hei) {
            if (!this.nPhotos.length) {
                const options = this.options
                const nPhotosWrap = this.nPhotosWrap = document.createElement('div')
                nPhotosWrap.className = 'barrelRow'
                nPhotosWrap.style.marginBottom = options.gutter.y + 'px'
                nPhotosWrap.style.height = options.barrelMinHeight + 'px'
                this.galleryBox.appendChild(nPhotosWrap)
            }
            const ratio = wid / hei
            this.appendBarrel(box.firstChild.src, ratio, box, wid, hei)
        }

        /**
         * 更新布局
         */
        updateLayout() {
            this.setLayout(this.options.layout)
        }

        /**
         * 设置拼图布局容器高度
         * @param {number} [height=500] 
         * @returns {Boolean}
         */
        setPuzzleHeight(height = 500) {
            if (!Number.isInteger(height) || height < 0) {
                console.error('拼图布局高度必须是正整数')
                return false
            }
            this.options.puzzleHeight = height
            this.updateLayout()
            return true
        }

        /**
         * 设置图片之间的间距
         * @param {number}  x  图片之间的横向间距
         * @param {number}  y  图片之间的纵向间距，如果是 undefined 则等同于 x
         * @return {Boolean} 
         */
        setGutter(x = 10, y = 10) {
            if (x < 0 || y < 0) {
                console.error('图片间距必须大于等于0')
                return false
            }
            this.options.gutter = {x, y}
            this.updateLayout()
            return true
        }

        /**
         * 设置瀑布流列数
         * @param {Number} column 瀑布流列数
         * @return {Boolean} 
         */
        setWaterfallColumn(column = 4) {
            if (!Number.isInteger(column) || column < 0) {
                console.error('瀑布流列数必须为正整数')
                return false
            }
            this.options.waterfallColumn = column
            this.updateLayout()
            return true
        }

        /**
         * 允许点击图片时全屏浏览图片
         */
        enableFullscreen() {
            this.options.fullScreen = true
        }

        /**
         * 禁止点击图片时全屏浏览图片
         */
        disableFullscreen() {
            this.options.fullScreen = false
        }

        /**
         * 获取点击图片时全屏浏览图片是否被允许
         * @return {boolean} 是否允许全屏浏览
         */
        isFullscreenEnabled() {
            return this.options.fullScreen
        }

        /**
         * 设置木桶模式每行高度的上下限，单位像素
         * @param {number} min 最小高度
         * @param {number} max 最大高度
         */
        setBarrelHeight(min = 200) {
            if (!Number.isInteger(min) || min < 0) {
                console.error('木桶布局最小高度必须为正整数')
                return false
            }
            this.options.barrelMinHeight = min
            this.updateLayout()
        }

        /**
         * 获取木桶模式每行高度的下限
         * @return {number} 最少图片数（含）
         */
        getBarrelHeightMin() {
            return this.options.barrelMinHeight
        }

        /**
         * 节流更新布局
         * @param {Number} wait 更新周期时间
         */
        resizeUpdate(wait) {
            let resizeTime = this.resizeTimer
            if (!resizeTime) {
                const clientWidth = this.container.clientWidth
                if (this.cacheWidth !== clientWidth) {   // 如果宽度变化才执行更新
                    resizeTime = setTimeout(() => {
                        resizeTime = null
                        this.updateLayout()
                        this.cacheWidth = clientWidth
                    }, wait)
                }
            }
        }

        /**
         * 初始化查看图片结构
         * @memberof Gallery
         */
        setView() {
            const view = `
                <div class="gallery-view">
                    <span class="gallery-view-close">X</span>
                    <div class="gallery-view-img">
                        <img class="gallery-viewImg" src="http://placehold.it/1105x645/449F93/fff" />
                    </div>
                    <div class="gallery-view-list"></div>
                </div>
            `
            this.container.innerHTML += view
            this.viewImg = document.querySelector('.gallery-viewImg')
            this.view = document.querySelector('.gallery-view')
        }

        /**
         * 设置缩略图
         * @param {Number} index 当前点击图片索引
         */
        setThumbnail(index) {
            const wrap = document.querySelector('.gallery-view-list')
            const imgs = this.getImageDomElements()
            let wrapImgs =  Array.from(wrap.querySelectorAll('img'))
            let len = imgs.length

            // 最多显示5张缩略图
            if (len > 5) {
                len = 5
            }

            // 如果列表图片数量不等于len就创建len个img
            if (wrapImgs.length !== len) {
                for (let i = 0; i < len; i++) {
                    const image = document.createElement('img')
                    wrap.appendChild(image)
                }
                wrapImgs = Array.from(wrap.querySelectorAll('img'))
            }

            let imageIndex = index

            if (index > 1 && index < (imgs.length - 2)) {
                imageIndex -= 2
            } else if (index <= 1) {
                imageIndex = 0
            } else if (index >= (imgs.length - 2)) {
                imageIndex = imgs.length - len
            }
            
            // 刷新缩略图列表图片
            for (let i = 0; i < len; i++, imageIndex++) {
                const currentImg = wrapImgs[i]
                currentImg.className = ''
                currentImg.src = imgs[imageIndex].firstChild.src
                currentImg.setAttribute('index', imageIndex)

                // 高亮当前缩略图
                if (imageIndex === index) {
                    currentImg.classList.add('gallery-view--current')
                }
            }
        }

        /**
         * 点击事件绑定
         */
        bindClickHandle() {
            this.container.addEventListener('click', (e) => {
                if (e.target.nodeName === 'IMG' 
                    && e.target.className !== 'gallery-viewImg'
                    && this.options.fullScreen
                ) {
                    const index = parseInt(e.target.getAttribute('index'))
                    this.viewImg.src = e.target.src
                    this.view.style.display = 'block'
                    this.setThumbnail(index)
                }
                if (e.target.className === 'gallery-view-close') {
                    this.view.style.display = 'none'
                }
            })
        }
    }

    return Gallery

})