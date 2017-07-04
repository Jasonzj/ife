/*
 * @Author: Jason 
 * @Date: 2017-07-03 19:22:34 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-04 22:22:24
 */

import { Animate } from './animate'
import { Hero } from './hero'
import { PathFinder } from './finder'
import { addEvent } from './common'
import { Guards } from './guards'
import { Bullet } from './bullet'
import { collection } from './collision'

export class GameControl {
    /**
     * Creates an instance of GameControl.
     * @param {String} selector the container
     * @memberof GameControl
     */
    constructor(selector) {
        
        this.hero = new Hero()
        this.animate = new Animate(selector, this.hero)
        this.bullet = new Bullet(this.animate, this.hero)
        this.guards = new Guards({
            radius: 4,
            xMax: this.animate.xMax,
            yMax: this.animate.yMax,
            wallMap: this.animate.wallMap,
            animate: this.animate
        })
        this.finder = new PathFinder({
            count: 20,
            xMax: this.animate.xMax,
            yMax: this.animate.yMax,
            wallMap: this.animate.wallMap
        })
        this.timer = null
        this.state = false

        this.init()
    }

    /**
     * init
     * 
     * @memberof GameControl
     */
    init() {
        this.guards.create(2)               // 创建特工
        this.animate.hero = this.hero       // 给animate设置英雄类
        this.animate.bullet = this.bullet   // 给animate设置子弹类
        this.animate.guards = this.guards   // 给animate设置守卫类
        this.animate.animateLoop()          // 开始动画主循环
        this.setEvent()                     // 事件绑定
        collection.hero = this.hero
        collection.guards = this.guards
        collection.bullet = this.bullet
        collection.wallMap = this.animate.wallMap
        collection.xMax = this.animate.xMax
        collection.yMax = this.animate.yMax
    }

    /**
     * game reset
     * 
     * @memberof GameControl
     */
    reset() {
        this.animate.reset()
        this.hero.reset()
        this.finder.wallMap = this.animate.wallMap
    }

    /**
     * pathfinding algorithm selection
     * 
     * @param {Array} target target coordinates of the array
     * @memberof GameControl
     */
    search(target) {
        let path = this.finder.search([this.hero.x, this.hero.y], target)
        
        if (path) {
            let i = 0

            if (this.state) {
                clearInterval(this.timer)
            }

            this.state = true
            this.timer = setInterval(() => {

                this.hero.move(path[i])

                if (path[i].x == this.animate.target[0] && path[i].y == this.animate.target[1]) {
                    this.reset()
                }
                
                i++

                if (i >= path.length) {
                    path = []
                    clearInterval(this.timer)
                    this.state = false
                }

            }, 25)
        }
    }

    /**
     * click canvas handle
     * 
     * @param {Event} e 
     * @memberof GameControl
     */
    clickCanvas(e) {
        const x = Math.floor(e.clientX / this.animate.count),
            y = Math.floor(e.clientY / this.animate.count)
        
        this.search([x, y])
    }

    /**
     * event 
     * 
     * @memberof GameControl
     */
    setEvent() {
        addEvent(this.animate.heroCanvas, 'click', this.clickCanvas.bind(this))
    }
}