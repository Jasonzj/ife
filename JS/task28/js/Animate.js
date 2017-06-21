/*
 * @Author: Jason 
 * @Date: 2017-06-20 19:57:56 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-21 15:10:54
 */

;(window => {
    /**
     * [Animate 动画工具，canvas绘制]
     */
    const Animate = (() => {
        const ship = document.getElementById('ship'),
            shipCtx = ship.getContext('2d'),
            planet = document.getElementById('planet'),
            planet_ctx = planet.getContext('2d'),
            cacheCanvas = document.createElement('canvas'),
            cacheCtx = cacheCanvas.getContext('2d') //生成缓存画布

        ship.width = SCREEN_WIDTH
        ship.height = SCREEN_HEIGHT
        planet.width = SCREEN_WIDTH
        planet.height = SCREEN_HEIGHT
        cacheCanvas.width = SCREEN_WIDTH
        cacheCanvas.height = SCREEN_HEIGHT

        /**
         * [drawPlanet 绘制行星]
         * @param {Canvas} _ctx 目标画布
         */
        const drawPlanet = _ctx => {
            const circle = (color, x, y, w) => {
                _ctx.fillStyle = color
                _ctx.beginPath()
                _ctx.arc(x, y, w, 0, Math.PI * 2, true)
                _ctx.closePath()
                _ctx.fill()
            }
            circle(
                PLANET_MCOLOR,
                SCREEN_CENTER_X,
                SCREEN_CENTER_Y,
                PLANET_RADIUS
            ) // 创建行星
            circle(PLANET_COLOR, 380, 440, 40)
            circle(PLANET_COLOR, 320, 320, 25)
            circle(PLANET_COLOR, 280, 250, 15)
        }

        /**
         * [drawOrbit 绘制轨道]
         * @param {Canvas} _ctx 目标画布
         */
        const drawOrbit = _ctx => {
            for (var i = 1; i < ORBIT_COUNT + 1; i++) {
                _ctx.strokeStyle = '#3e4059'
                _ctx.lineWidth = 3
                _ctx.beginPath()
                _ctx.arc(
                    SCREEN_CENTER_X,
                    SCREEN_CENTER_Y,
                    150 + 45 * i,
                    0,
                    2 * Math.PI,
                    false
                )
                _ctx.closePath()
                _ctx.stroke()
            }
        }

        /**
         * [drawSpaceship 绘制飞船]
         * @param {Canvas} _ctx 	  目标画布(cache画布)
         * @param {Object} spaceship  飞船实例
         * @return {Boolean}          绘画成功返回true，失败返回false
         */
        const drawSpaceship = spaceship => {
            const spaceshipImg = new Image(),
                _ctx = cacheCtx

            spaceshipImg.src = 'img/min-iconfont-rocket-active.png'
            spaceshipImg.onload = function() {
                try {
                    _ctx.save() // 保存画布原有状态
                    _ctx.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y) // 更改画布坐标系，将画布原点移到画布中心
                    _ctx.rotate(-spaceship.deg * Math.PI / 180) // 飞船角度

                    //画电量条，根据电量状态改变颜色
                    _ctx.beginPath()
                    if (spaceship.power > 60) {
                        _ctx.strokeStyle = POWERBAR_COLOR_GOOD
                    } else if (spaceship.power <= 60 && spaceship.power >= 20) {
                        _ctx.strokeStyle = POWERBAR_COLOR_MEDIUM
                    } else {
                        _ctx.strokeStyle = POWERBAR_COLOR_BAD
                    }
                    _ctx.lineWidth = POWERBAR_WIDTH
                    _ctx.moveTo(
                        spaceship.orbit - SPACE_SIZE / 2,
                        -POWERBAR_POS_OFFSET
                    )
                    _ctx.lineTo(
                        spaceship.orbit +
                            SPACE_SIZE * (spaceship.power / 100) -
                            SPACE_SIZE / 2,
                        -POWERBAR_POS_OFFSET
                    )
                    _ctx.stroke()

                    //画飞船图片
                    _ctx.drawImage(
                        spaceshipImg,
                        spaceship.orbit - SPACE_SIZE / 2,
                        0,
                        SPACE_SIZE,
                        SPACE_SIZE
                    )
                    _ctx.restore() // 恢复画布到原有状态

                    shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT) // 清空飞船画布
                    shipCtx.drawImage(
                        cacheCanvas,
                        0,
                        0,
                        SCREEN_WIDTH,
                        SCREEN_HEIGHT
                    ) // 将缓存画布载入到飞船画布
                    return true
                } catch (error) {
                    return false
                }
            }
        }

        /**
         * [refreshShip 刷新飞船队列画布]
         * @param {Array} spaceships 飞船队列
         */
        const refreshShip = (spaceships = undefined) => {
            if (spaceships !== undefined) {
                cacheCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT) // 清空缓存画布
                for (var i = 0; i < spaceships.length; i++) {
                    if (spaceships[i] !== undefined) {
                        // 如果飞船存在
                        drawSpaceship(spaceships[i])
                    } else if (spaceships.every(item => item === undefined)) {
                        // 如果队列所有都为undefined
                        shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT) // 清空飞船画布
                    }
                }
            } else {
                shipCtx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT) // 清空飞船画布
            }
        }

        /**
         * [animateLoop canvas绘制循环]
         */
        const animateLoop = () => {
            requestAnimationFrame(animateLoop)
            const spaceshipQueue = SpaceshipGlobal.getQueue()
            refreshShip(spaceshipQueue)
        }

        /**
         * [init 初始化canvas背景]
         */
        const init = () => {
            drawPlanet(planet_ctx)
            drawOrbit(planet_ctx)
            animateLoop()
        }

        return {
            animateLoop,
            refreshShip,
            drawSpaceship,
            init
        }
    })()

    window.Animate = Animate
})(window)
