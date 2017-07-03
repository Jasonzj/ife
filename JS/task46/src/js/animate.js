/*
 * @Author: Jason 
 * @Date: 2017-07-03 17:44:06 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-03 21:31:12
 */

export class Animate {
    constructor(selector) {
        this.container = document.querySelector(selector)   // canvas box
        this.wallCount = 50     // wall is the largest number 
        this.count = 20         // grid wide high
        this.width = 400        // canvas width
        this.height = 660       // canvas height
        this.wallMap = {}       // the corresponding map wall
        this.xMax = (this.width / this.count) - 1     // biggest x axis coord
        this.yMax = (this.height / this.count) - 1    // biggest y axis coord
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
        const canvas = document.createElement('canvas'),
            heroCanvas = document.createElement('canvas')
        
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
            const position = this.getRandomPosition(0, 0)
            this.cxt.fillRect(position[0] * this.count, position[1] * this.count, this.count, this.count)
            this.wallMap[position] = 1
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
        this.heroCxt.fillRect(hero.x * this.count, hero.y * this.count, this.count, this.count)
    }

    /**
     * draw target for canvas
     * the default color for red
     * 
     * @memberof Animate
     */
    drawTarget() {
        let position = null
        const timer = setInterval(() => {
            position = this.getRandomPosition(0, this.yMax / 2)
            if (this.wallMap[position] !== 1) {
                this.cxt.fillStyle = 'red'
                this.cxt.fillRect(position[0] * this.count, position[1] * this.count, this.count, this.count)
                this.target = position
                clearInterval(timer)
            }
        })
        
    }

    /**
     * get to random coordinater
     * 
     * @param {Number} xMin minimum x axis coord
     * @param {Number} yMin minimum y axis coord
     * @returns coord location array
     * @memberof Animate
     */
    getRandomPosition(xMin, yMin) {
        const randomX = Math.floor(Math.random() * (this.xMax - xMin + 1) + xMin),
            randomY = Math.floor(Math.random() * (this.yMax - yMin + 1) + yMin)
        
        return [randomX, randomY]
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
        const position = this.hero.getPosition()
        this.drawHero(position)

        requestAnimationFrame(this.animateLoop.bind(this))
    }
}