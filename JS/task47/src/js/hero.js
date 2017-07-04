/*
 * @Author: Jason 
 * @Date: 2017-07-03 19:19:33 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-04 21:18:52
 */

export class Hero {
    constructor() {
        this.x = 0
        this.y = 0
        this.radius = 0.5
    }

    /**
     * move hero coordinates
     * 
     * @param {Object} point coordinates of the object
     * @memberof Hero
     */
    move(point) {
        this.x = point.x
        this.y = point.y
    }

    /**
     * reset hero coordinates
     * 
     * @memberof Hero
     */
    reset() {
        this.x = 0
        this.y = 0
    }
}