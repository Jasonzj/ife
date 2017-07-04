/*
 * @Author: Jason 
 * @Date: 2017-07-04 16:07:52 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-04 18:25:31
 */

import { getRandomPosition } from './common';

export class Guards {
    constructor(JSON) {
        this.radius = JSON.radius
        this.xMax = JSON.xMax
        this.yMax = JSON.yMax
        this.wallMap = JSON.wallMap
        this.animate = JSON.animate
        this.guardsQueue = []
    }

    create(num) {
        for (let i = 0, l = num; i < l; i++) {
            getRandomPosition(this.wallMap, this.xMax, this.yMax, 0, this.yMax / 2)
            .then(position => {
                this.guardsQueue.push({
                    x: position[0],
                    y: position[1],
                    radius: this.radius
                })
                this.animate.drawGuards(this.guardsQueue)
            })
        }
    }    
    
}