export class Waterfall {
    constructor(selection, col) {
        this.container = document.querySelector(selection)
        this.col = col || 4
        
        this.init()
    }

    init() {
        this.setColumn()        
    }

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

    setImgsBox(date) {
        const wrap = document.createElement('div')
        wrap.className = 'waterfall'
        wrap.innerHTML = `<img src=${date.image.small} data-src=${date.image.large}>`

        this.addBox(wrap)
    }

    getMinIndex() {
        this.columns.sort((a, b) => a.clientHeight - b.clientHeight)
        let min = this.columns[0]

        return min
    }
    
    addBox(box) {
        const min = this.getMinIndex()
        min.appendChild(box)
    }
}