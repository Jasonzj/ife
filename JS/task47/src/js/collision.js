/*
 * @Author: Jason 
 * @Date: 2017-07-04 20:36:57 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-04 22:49:59
 */

export const collection = {}

export const heroGuardCollision = () => {  // 检测特工于守卫视野碰撞
    if (collection.guards) {
        const hero = collection.hero,
            guards = collection.guards,
            bullet = collection.bullet

        guards.guardsQueue.forEach((guards, i) => {
            const dx = hero.x - guards.x,
                dy = hero.y - guards.y,
                dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < hero.radius + guards.radius) {
                bullet.create(guards, hero)
            }
        })
    }
}

export const bulletBlockCollision = () => {  // 检测子弹与障碍物碰撞
    if (collection.guards) {
        const bullet = collection.bullet,
            wallMap = collection.wallMap,
            xMax = collection.xMax,
            yMax = collection.yMax

        bullet.bullets.forEach((item, i) => {
            const x = parseInt(item.x),
                y = parseInt(item.y)

            if (wallMap[[x, y]] || x > xMax || y > yMax || x < 0 || y < 0) {
                bullet.delete(i)
            }
        })
    }
}