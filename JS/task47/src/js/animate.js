/*
 * @Author: Jason 
 * @Date: 2017-07-03 17:44:06 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 18:04:24
 */

import { getRandomPosition } from './common'
import { bulletCollision } from './collision'

export class Animate {
    constructor(selector) {
        this.container = document.querySelector(selector)   // canvas box
        this.wallCount = 10     // wall is the largest number 
        this.count = 20         // grid wide high
        this.width = 400        // canvas width
        this.height = 660       // canvas height
        this.wallMap = {}       // the corresponding map wall
        this.xMax = (this.width / this.count) - 1     // biggest x axis coord
        this.yMax = (this.height / this.count) - 1    // biggest y axis coord
        this.oneHalfCount = this.count / 2
        this.target = []    // the target location array
        
        this.init()
    }

    /**
     * init
     * 
     * @memberof Animate
     */
    init() {
        this.createCanvas()       
        this.drawBackground()
        this.drawWall()
        this.drawTarget()
    }

    /**
     * new create Canvas append (this.container)
     * 
     * @memberof Animate
     */
    createCanvas() {
        const canvas = document.createElement('canvas')
        const heroCanvas = document.createElement('canvas')
        
        heroCanvas.width = this.width
        heroCanvas.height = this.height
        canvas.width = this.width
        canvas.height = this.height
        this.cxt = canvas.getContext('2d')
        this.heroCxt = heroCanvas.getContext('2d')
        this.container.appendChild(canvas) 
        this.container.appendChild(heroCanvas)
        this.heroCanvas = heroCanvas        
    }

    /**
     * createWallMap
     * 
     * @param {Number} w    wall width
     * @param {Number} h    wall height
     * @param {Number} x    wall x axis
     * @param {Number} y    wall y axis
     * @memberof Animate
     */
    createWallMap(w, h, x, y) {
        for (let j = 0, l = w; j < l; j++) {

            this.wallMap[[x + j, y]] = 1

            for (let m = 0, l = h; m < l; m++) {

                this.wallMap[[x + j, y + m]] = 1
                
            }
            
        } 
    }

    /**
     * draw background
     * the default color for #FFE5CE
     * 
     * @memberof Animate
     */
    drawBackground() {
        this.cxt.fillStyle = '#FFE5CE'
        this.cxt.fillRect(0, 0, this.width, this.height)
    }

    /**
     * draw the wall for canvas
     * the default color for #2E1E1E
     * 
     * @memberof Animate
     */
    drawWall() {
        this.cxt.fillStyle = '#2E1E1E'
        for (let i = 0, l = this.wallCount; i < l; i++) {

            const position = this.getRandomWall()
            let _positionX = 0

            if (position.x) {   // judge left of right
                _positionX = position.x - position.w + 1
            }

            this.createWallMap(position.w, position.h, _positionX, position.y)
             
            this.cxt.fillRect(_positionX * this.count, position.y * this.count, this.count * position.w, this.count * position.h)

        }
    }

    /**
     * draw the hero for canvas
     * the default color for #1ABC9C
     * 
     * @param {Object} hero hero location object
     * @memberof Animate
     */
    drawHero(hero) {        
        this.heroCxt.clearRect(0, 0, this.width, this.height)
        this.heroCxt.fillStyle = '#1ABC9C'
        this.heroCxt.beginPath()
        this.heroCxt.arc(hero.x * this.count + this.oneHalfCount, hero.y * this.count + this.oneHalfCount, hero.radius * this.count, 0, 2 * Math.PI, false)
        this.heroCxt.closePath()
        this.heroCxt.fill()
        for (let i = 0, guards = null; guards = this.guards.guardsQueue[i++];) {
            this.heroCxt.strokeStyle = '#F05F48'
            this.heroCxt.beginPath()
            this.heroCxt.moveTo(hero.x * this.count + this.oneHalfCount, hero.y * this.count + this.oneHalfCount)
            this.heroCxt.lineTo(guards.x * this.count + this.oneHalfCount, guards.y * this.count + this.oneHalfCount)
            this.heroCxt.stroke()
            this.heroCxt.closePath()
        }
    }

    /**
     * drawGuards
     * 
     * @param {Array} guardsQueue guards array
     * @memberof Animate
     */
    drawGuards(guardsQueue) {
        guardsQueue.forEach((guards) => {
            if (guards) {
                this.heroCxt.fillStyle = '#F05F48'
                this.heroCxt.strokeStyle = '#F05F48'
                this.heroCxt.beginPath()
                this.heroCxt.arc(guards.x * this.count + this.oneHalfCount, guards.y * this.count + this.oneHalfCount, this.count / 2, 0, 2 * Math.PI, false)
                this.heroCxt.closePath()
                this.heroCxt.fill()
                this.heroCxt.beginPath()
                this.heroCxt.arc(guards.x * this.count + this.oneHalfCount, guards.y * this.count + this.oneHalfCount, guards.radius * this.count, 0, 2 * Math.PI, false)
                this.heroCxt.closePath()
                this.heroCxt.stroke()
            }
        })
    }

    drawBullet(bullets) {
        bullets.forEach((bullet) => {
            if (bullet) {
                this.heroCxt.beginPath()
                this.heroCxt.arc(bullet.x * this.count + this.oneHalfCount, bullet.y * this.count + this.oneHalfCount, bullet.radius * this.count, 0, Math.PI * 2, true)
                this.heroCxt.closePath()
                this.heroCxt.fillStyle = bullet.color
                this.heroCxt.fill()
            }
        })
    }

    /**
     * draw target for canvas
     * the default color for red
     * 
     * @memberof Animate
     */
    drawTarget() {
        getRandomPosition(this.wallMap, this.xMax, this.yMax, 0, this.yMax / 2)
            .then(position => {
                const [ x, y ] = position

                this.cxt.fillStyle = '#FDAA3D'
                this.cxt.fillRect(x * this.count, y * this.count, this.count, this.count)
                this.target = position
            })
    }

    /**
     * get random wall information
     * 
     * @returns wall object
     * @memberof Animate
     */
    getRandomWall() {
        const randomDirection = Math.floor(Math.random() * (1 - 0 + 1) + 0)
        const randomY = Math.floor(Math.random() * this.yMax + 1)
        const randomW = Math.floor(Math.random() * 7 + 3)
        const randomH = Math.floor(Math.random() * 3 + 1)
        let randomX = 0

        if (randomDirection) {
            randomX = this.xMax
        }

        return {
            x: randomX,
            y: randomY,
            w: randomW,
            h: randomH
        }
    }

    /**
     * reset canvas
     * 
     * @memberof Animate
     */
    reset() {
        this.wallMap = {}
        this.cxt.clearRect(0, 0, this.width, this.width)
        this.drawBackground()
        this.drawWall()
        this.drawTarget()
    }

    /**
     * The animation loop
     * 
     * @memberof Animate
     */
    animateLoop() {
        this.drawHero(this.hero)                    // 画特工
        this.drawBullet(this.bullet.bullets)        // 画子弹
        this.drawGuards(this.guards.guardsQueue)    // 画守卫
        bulletCollision()                           // 检测碰撞
        this.bullet.update()                        // 更新子弹位置

        requestAnimationFrame(this.animateLoop.bind(this))
    }
}