/*
 * @Author: Jason 
 * @Date: 2017-07-04 17:39:01 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-11 13:54:11
 */

export class Bullet {
    constructor(animate, hero) {
        this.bullets = []
        this.objPool = []
        this.radius = 0.2
        this.speed = 0.3
        this.color = 'red'
        this.animate = animate
        this.hero = hero
    }

    /**
     * objectPoolCreate
     * 
     * @returns 
     * @memberof Bullet
     */
    objectPoolCreate() {
        if (this.objPool.length === 0) {
            return this.create.apply(this, arguments)
        } else {
            const bullet = this.objPool.shift()
            const position = this.getPosition.apply(this, arguments)
            bullet.x = position.x
            bullet.y = position.y
            bullet.angleX = position.angleX
            bullet.angleY = position.angleY
            bullet.color = position.color
            this.bullets.push(bullet)
            return bullet
        }        
    }

    /**
     * objectPoolRecover
     * 
     * @param {any} obj 
     * @memberof Bullet
     */
    objectPoolRecover(obj) {
        this.objPool.push(obj)
    }

    /**
     * creat bullet
     * 
     * @memberof Bullet
     */
    create() {
        const position = this.getPosition.apply(this, arguments)
        const obj = {
            x: position.x,
            y: position.y,
            radius: this.radius,
            color: position.color,
            angleX: position.angleX,
            angleY: position.angleY,
        }
        this.bullets.push(obj)
        this.objPool.push(obj)
    }

    /**
     * getPosition
     * 
     * @param {Object} start starting from the object
     * @param {Object} target the target object
     * @param {String} color bullet color 
     * @returns 
     * @memberof Bullet
     */
    getPosition(start, target, color) {
        const dis = Math.sqrt(Math.pow((target.x - start.x), 2) + Math.pow((target.y - start.y), 2))
        const angleX = (target.x - start.x) / dis
        const angleY = (target.y - start.y) / dis
        let x = start.x
        let y = start.y
        let state = true

        return {
            x,
            y,
            angleX,
            angleY,
            color
        }
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