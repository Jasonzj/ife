/*
 * @Author: Jason 
 * @Date: 2017-06-23 14:59:41 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-20 23:00:51
 */

export class Map {
    /**
     * Creates an instance of Map.
     * @param {Object} config 
     * {
     *     count: 20,     // 生成格子数 20*20
     *     canvas: mapCanvas,   // canvas盒子
     *     canvasWH: 780    // canvas宽高
     * }
     * @memberof Map
     */
    constructor(config) {
        this.count = config.count   // 格子数量
        this.width = Math.ceil(config.canvasWH / config.count - (config.count == 20 ? 2 : 1))   // 格子宽度
        this.maxWidth = this.width * this.count     // 总宽度
        this.ctx = config.canvas.getContext('2d')   

        this.init(config)
    }

    /**
     * [init 初始化]
     * @param {Object} config 
     * @memberof Map
     */
    init(config) {
        config.canvas.width = config.canvasWH
        config.canvas.height = config.canvasWH
        this.drawMap('#bdc3c7')
        this.drawCount()
    }

    /**
     * [drawMap 画地图]
     * @param {String} color 地图线的颜色
     * @memberof Map
     */
    drawMap(color) {
        const ctx = this.ctx
        const width = this.width
        const maxWidth = this.maxWidth + (width * 2)

        ctx.strokeStyle = color
        ctx.lineWidth = 0.5

        for (var i = width + 0.5; i < maxWidth; i += width) {
            ctx.beginPath()
            ctx.moveTo(i, width)
            ctx.lineTo(i, maxWidth - width)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(width, i)
            ctx.lineTo(maxWidth - width, i)
            ctx.stroke()
        }
    }

    /**
     * [drawCount 画数字]
     * @memberof Map
     */
    drawCount() {
        let x = this.width / 2
        let y = x + 5
        let num = 1

        while (y < this.maxWidth) {
            y = y + this.width;      
            this.ctx.fillText(num, x, y);    //纵坐标的数字
            this.ctx.fillText(num, y - 10, x + 5);  //横坐标的数字  
            num += 1;  
        }
    }
}