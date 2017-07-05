/*
 * @Author: Jason 
 * @Date: 2017-07-04 17:39:01 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 18:07:58
 */

export class Bullet {
    constructor(animate, hero) {
        this.bullets = []
        this.radius = 0.2
        this.speed = 0.3
        this.color = 'red'
        this.animate = animate
        this.hero = hero
    }

    /**
     * creat bullet
     * 
     * @param {Object} start starting from the object
     * @param {Object} target the target object
     * @param {String} color bullet color
     * @memberof Bullet
     */
    create(start, target, color) {
        const dis = Math.sqrt(Math.pow((target.x - start.x), 2) + Math.pow((target.y - start.y), 2))
        const angleX = (target.x - start.x) / dis
        const angleY = (target.y - start.y) / dis
        let x = start.x
        let y = start.y
        let state = true

        this.bullets.push({
            x: start.x,
            y: start.y,
            radius: this.radius,
            color: color,
            angleX,
            angleY
        })

    }

    /**
     * update self position
     * 
     * @memberof Bullet
     */
    update() {
        this.bullets.forEach((self) => {
            if (self) {
                self.x += this.speed * self.angleX
                self.y += this.speed * self.angleY
            }
        })
    }

    /**
     * reset
     * 
     * @memberof Bullet
     */
    reset() {
        this.bullets = []
    }

    /**
     * delete bullet
     * 
     * @param {Number} index the subscript
     * @memberof Bullet
     */
    delete(index) {
        delete this.bullets[index]
    }
    
}