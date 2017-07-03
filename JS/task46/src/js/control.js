/*
 * @Author: Jason 
 * @Date: 2017-07-03 19:22:34 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-03 22:02:53
 */

import { Animate } from './animate'
import { Hero } from './hero'
import { PathFinder } from './finder'
import { addEvent } from './common'

export class GameControl {
    /**
     * Creates an instance of GameControl.
     * @param {String} selector the container
     * @memberof GameControl
     */
    constructor(selector) {
        this.hero = new Hero()
        this.animate = new Animate(selector, this.hero)
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
        this.animate.hero = this.hero
        this.animate.animateLoop()
        this.setEvent()
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
        
        let path = this.finder.search([this.hero.x, this.hero.y], [x, y])
        
        if (path) {
            let i = 0
            if (this.state) {
                clearInterval(this.timer)
            }
            this.state = true
            this.timer = setInterval(() => {
                this.hero.move(path[i])
                if (path[i].x == this.animate.target[0] && path[i].y == this.animate.target[1]) {
                    this.hero.reset()
                    this.animate.reset()
                    this.finder.wallMap = this.animate.wallMap
                }
                i++
                if (i >= path.length) {
                    path = []
                    clearInterval(this.timer)
                    this.state = false
                }
            }, 40)
        }

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