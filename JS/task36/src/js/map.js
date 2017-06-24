/*
 * @Author: Jason 
 * @Date: 2017-06-23 14:59:41 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-23 23:34:38
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
        this.count = config.count
        this.width = Math.ceil(config.canvasWH / config.count - 2)
        this.maxWidth = this.width * this.count
        this.ctx = config.canvas.getContext('2d')
        this.config = config

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
        const self = this,
            maxWidth = self.maxWidth + (self.width * 2)
        
        self.ctx.strokeStyle = color
        self.ctx.lineWidth = 0.5

        for (var i = self.width + 0.5; i < maxWidth; i += self.width) {
            self.ctx.beginPath()
            self.ctx.moveTo(i, self.width)
            self.ctx.lineTo(i, maxWidth - self.width)
            self.ctx.stroke()

            self.ctx.beginPath()
            self.ctx.moveTo(self.width, i)
            self.ctx.lineTo(maxWidth - self.width, i)
            self.ctx.stroke()
        }
    }

    /**
     * [drawCount 画线]
     * @memberof Map
     */
    drawCount() {
        let self = this, 
            x = self.width / 2,
            y = x + 5,
            num = 1

        while (y < self.maxWidth) {
            y = y + self.width;      
            self.ctx.fillText(num, x, y);    //纵坐标的数字
            self.ctx.fillText(num, y - 10, x + 5);  //横坐标的数字  
            num += 1;  
        }
    }
}


