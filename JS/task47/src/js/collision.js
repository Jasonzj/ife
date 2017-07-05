/*
 * @Author: Jason 
 * @Date: 2017-07-04 20:36:57 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 18:04:05
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
                bullet.create(guards, hero, 'red')
            }
        })
    }
}

// 检测子弹碰撞
export const bulletCollision = () => {  
    if (collection.guards) {
        const { bullet, wallMap, xMax, yMax, hero, guards, control } = collection
        
        bullet.bullets.forEach((item, i) => {
            // 检测守卫子弹碰撞
            if (item.color === 'red') {
                const dx = hero.x - item.x
                const dy = hero.y - item.y
                const dist = Math.sqrt(dx * dx + dy * dy)

                // 判断子弹与特工碰撞
                if (dist < hero.radius + item.radius) {
                    bullet.delete(i)
                    alert('游戏结束')
                    control.reset.call(control)
                }
            }

            // 检测特工子弹碰撞
            if (item.color === '#1abc9c') {
                guards.guardsQueue.forEach((guard, i) => {
                    const dx = guard.x - item.x
                    const dy = guard.y - item.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < item.radius) {
                        guards.delete(i)
                        bullet.delete(i)
                    }
                })
            }

            const x = parseInt(item.x)
            const y = parseInt(item.y)
            
            // 判断子弹与障碍物或边界
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

export const check = (() => {

    let checkHeroGuard

    // 开启视野检测，每隔400ms检测视野是否碰撞
    const openCheckHeroGuardCollision = () => {
        checkHeroGuard = setInterval(() => {  
            heroGuardCollision()
        }, 400)
    }

    // 关闭视野检测
    const clearCheckHeroGuardCollision = () => {
        clearInterval(checkHeroGuard)
    }

    return {
        openCheckHeroGuardCollision,
        clearCheckHeroGuardCollision
    }

})()