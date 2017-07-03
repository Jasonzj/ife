import loadingGif from '../img/loading.gif'

export class Waterfall {
    /**
     * Creates an instance of Waterfall.
     * @param {String} selection 类名
     * @param {Number} col 列数
     * @param {Number} spaceing 列间距像素
     * @memberof Waterfall
     */
    constructor(selection, col, spacing) {
        this.container = document.querySelector(selection)
        this.maskState = false
        this.col = col || 4
        this.spacing = spacing
        
        this.init()
    }

    /**
     * 初始化
     * 
     * @memberof Waterfall
     */
    init() {
        this.setMask()
        this.setColumn()      
        this.setEvent()  
    }

    /**
     * 初始遮罩
     * 
     * @memberof Waterfall
     */
    setMask() {
        const mask = document.createElement('div'),
            img = document.createElement('img')
        
        this.mask = mask
        this.maskImg = img
        mask.className = 'waterfall-mask'
        mask.appendChild(img)
        document.body.appendChild(mask)
    }

    /**
     * 根据col设置列数
     * 
     * @memberof Waterfall
     */
    setColumn() {
        this.columns = []
        for (let i = 0; i < this.col; i++) {
            const column = document.createElement('div')
            column.className = 'waterfallColumn'
            column.style.width = `${100 / this.col}%`
            this.columns.push(column)
            this.container.appendChild(column)
        }
    }

    /**
     * 创建图片box并调用addBox追加到最小高度列
     * 
     * @param {Object} date 图片数据对象
     * @memberof Waterfall
     */
    setImgsBox(date) {
        const wrap = document.createElement('div')
        wrap.className = 'waterfall'
        wrap.style.padding = `0 ${this.spacing / 2}px`
        wrap.style.marginTop = this.spacing / 2 + 'px'
        wrap.innerHTML = `<img src=${date.image.small} large-src=${date.image.large}>`

        this.addBox(wrap)
    }

    /**
     * 获取最小高度列
     * 
     * @returns 
     * @memberof Waterfall
     */
    getMinIndex() {
        this.columns.sort((a, b) => a.clientHeight - b.clientHeight)
        let min = this.columns[0]

        return min
    }
    
    /**
     * append box到最小高度列
     * 
     * @param {Element} box 需要append的盒子
     * @memberof Waterfall
     */
    addBox(box) {
        const min = this.getMinIndex()
        min.appendChild(box)
    }

    /**
     * 遮罩显示隐藏
     * 
     * @param {String} largeUrl 图片地址
     * @returns 
     * @memberof Waterfall
     */
    maskToggle(largeUrl) {
        if (!this.taskState) {
            const img = new Image()
            this.maskImg.src = loadingGif
            img.src = largeUrl
            img.onload = () => {
                this.maskImg.src = largeUrl
            }
            this.mask.classList.add('waterfall-flex')
            this.taskState = true
            return false
        }
        this.maskImg.src = ''
        this.mask.classList.remove('waterfall-flex')
        this.taskState = false
    }

    /**
     * 点击事件处理
     * 
     * @param {Event} e 
     * @memberof Waterfall
     */
    clickHandle(e) {
        const target = e.target,
            largeUrl = target.getAttribute('large-src')

        if (target.nodeName === 'IMG' 
            && largeUrl
            || target.className.indexOf('waterfall-flex') > -1
        ) {
            this.maskToggle(largeUrl)
        }
    }

    /**
     * 事件绑定
     * 
     * @memberof Waterfall
     */
    setEvent() {
        this.container.addEventListener('click', this.clickHandle.bind(this))
        this.mask.addEventListener('click', this.clickHandle.bind(this))
    }
}
