export class Waterfall {
    constructor(selection, col) {
        this.container = document.querySelector(selection)
        this.col = col || 4
        
        this.init()
    }

    /**
     * 初始化
     * 
     * @memberof Waterfall
     */
    init() {
        this.setColumn()        
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
            column.className = 'pixColumn'
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
        wrap.innerHTML = `<img src=${date.image.small} data-src=${date.image.large}>`

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
}