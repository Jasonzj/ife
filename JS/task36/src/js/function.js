//跨浏览器事件绑定
export let addEvent = (element, event, hanlder) => {
    if (element.addEventListener) {
        addEvent = (element, event, hanlder) => {
            element.addEventListener(event, hanlder, false)
        }
    } else if (element.attachEvent) {
        addEvent = (element, event, hanlder) => {
            element.attachEvent('on' + event, hanlder)
        }
    } else {
        addEvent = (element, event, hanlder) => {
            element['on' + event] = hanlder
        }
    }

    addEvent(element, event, hanlder)
}

// 解析命令策略
export const commands = [
    {
        pattern: /^go(\s+)?(\d+)?$/i,
        handler() {
            return this.runQueue(this.robot.go, [arguments[1] || 1])
        }
    },
    {
        pattern: /^tun\s+(lef|rig|bac)$/i,
        handler(direction) {
            return this.runQueue(this.robot.rotate, [
                { lef: -90, rig: 90, bac: 180 }[direction.toLowerCase()],
                direction
            ])
        }
    },
    {
        pattern: /^tra\s+(bot|lef|rig|top)(\s+)?(\w+)?$/i,
        handler(direction) {
            return this.runQueue(this.robot.move, [
                this.directionMap[direction],
                arguments[2] || 1
            ])
        }
    },
    {
        pattern: /^mov\s+(bot|lef|rig|top)(\s+)?(\w+)?$/i,
        handler(direction) {
            return this.runQueue(this.robot.turnMove, [
                this.directionMap[direction],
                arguments[2] || 1
            ])
        }
    },
    {
        pattern: /^build$/i,
        handler() {
            return this.runQueue(this.robot.buildWall)
        }
    },
    {
        pattern: /^bru\s+(.*)$/i,
        handler(color) {
            return this.runQueue(this.robot.paintWall, [color])
        }
    },
    {
        pattern: /^mov\s+to\s+(\d+)[,\s+](\d+)(\s+)?$/i,
        handler(x, y) {
            return this.runQueue(this.search, [[x, y]])
        }
    }
]