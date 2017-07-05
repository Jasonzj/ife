/*
 * @Author: Jason 
 * @Date: 2017-07-04 20:36:57 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 15:27:41
 */

export const collection = {}

// 检测特工于守卫视野碰撞
const heroGuardCollision = () => {  
    if (collection.guards) {
        const { hero, guards, bullet } = collection
        
        guards.guardsQueue.forEach((guards, i) => {
            const dx = hero.x - guards.x
            const dy = hero.y - guards.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            if (dist < hero.radius + guards.radius) {
                bullet.create(guards, hero)
            }
        })
    }
}

// 检测子弹与障碍物碰撞
const bulletBlockCollision = () => {  
    if (collection.guards) {
        const { bullet, wallMap, xMax, yMax } = collection

        bullet.bullets.forEach((item, i) => {
            const x = parseInt(item.x)
            const y = parseInt(item.y)
                
            if (
                wallMap[[x, y]] 
                || x > xMax 
                || y > yMax 
                || x < 0 
                || y < 0
            ) {
                bullet.delete(i)
            }
        })
    }
}

export const collectionInit = () => {
    heroGuardCollision()
    bulletBlockCollision()
}