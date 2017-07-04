/*
 * @Author: Jason 
 * @Date: 2017-07-04 17:39:01 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-04 22:54:47
 */

export class Bullet {
    constructor(animate, hero) {
        this.bullets = []
        this.radius = 4
        this.speed = 0.4
        this.color = 'red'
        this.animate = animate
        this.hero = hero
    }

    create(start, target, index) {
        const dis = Math.sqrt(Math.pow((target.x - start.x), 2) + Math.pow((target.y - start.y), 2)),
            angleX = (target.x - start.x) / dis,
            angleY = (target.y - start.y) / dis

        this.bullets.push({
            x: start.x,
            y: start.y,
            radius: this.radius,
            color: this.color,
            angleX,
            angleY
        })

    }

    update() {
        this.bullets.forEach(self => {
            if (self) {
                self.x += this.speed * self.angleX
                self.y += this.speed * self.angleY
            }
        })
    }

    delete(index) {
        delete this.bullets[index]
    }
    
}