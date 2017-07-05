/*
 * @Author: Jason 
 * @Date: 2017-07-04 16:07:52 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 18:08:51
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

    /**
     * create guards
     * 
     * @param {Number} num the number of guards
     * @memberof Guards
     */
    create(num) {
        for (let i = 0, l = num; i < l; i++) {
            getRandomPosition(this.wallMap, this.xMax, this.yMax, 0, this.yMax / 2)
            .then(position => {
                const [ x, y ] = position
                this.guardsQueue.push({
                    x,
                    y,
                    radius: this.radius
                })
            })
        }
    }    

    /**
     * reset
     * 
     * @memberof Guards
     */
    reset() {
        this.guardsQueue = []
    }

    /**
     * delete guards
     * 
     * @param {Number} index the subscript
     * @memberof Guards
     */
    delete(index) {
        delete this.guardsQueue[index]
    }
    
}