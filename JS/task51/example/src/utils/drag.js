export default class Drag {
    constructor(selector) {
        this.elem = document.querySelector(`.${selector}`)
        this.startX = 0
        this.startY = 0
        this.sourceX = 0
        this.sourceY = 0

        this.init()
    }

    init() {
        this.setDrag()
    }

    getStyle(property) {
        return document.defaultView.getComputedStyle
            ? document.defaultView.getComputedStyle(this.elem, false)[property]
            : this.elem.currentStyle[property]
    }

    getPosition() {
        const transformValue = this.getStyle('transform')
        let pos = { x: 0, y: 0 }

        if (transformValue === 'none') {
            this.elem.style['transform'] = 'translate(0, 0)'
        } else {
            const temp = transformValue.match(/-?\d+/g)
            pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim())
            }
        }

        return pos
    }

    setPosition(pos) {
        this.elem.style['transform'] = `translate(${pos.x}px, ${pos.y}px)`
    }

    start = (e) => {
        this.startX = e.pageX
        this.startY = e.pageY

        const pos = this.getPosition()

        this.sourceX = pos.x
        this.sourceY = pos.y

        document.addEventListener('mousemove', this.move)
        document.addEventListener('mouseup', this.end)
    }

    move = (e) => {
        const currentX = e.pageX
        const currentY = e.pageY

        const distanceX = currentX - this.startX
        const distanceY = currentY - this.startY

        this.setPosition({
            x: (this.sourceX + distanceX).toFixed(),
            y: (this.sourceY + distanceY).toFixed()
        })
    }

    end = (e) => {
        document.removeEventListener('mousemove', this.move)
        document.removeEventListener('mouseup', this.end)
    }

    setDrag() {
        this.elem.addEventListener('mousedown', this.start)
    }
}