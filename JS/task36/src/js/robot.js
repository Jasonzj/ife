/*
 * @Author: Jason 
 * @Date: 2017-06-23 22:56:18 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-20 23:35:36
 */

import { addEvent } from './function';
import robotImage from '../img/bot.png';

export class Robot {
    /**
     * Creates an instance of Robot.
     * @param {String} selector robot对应类名
     * @param {String} count 格子数量
     * @memberof Robot
     */
    constructor(selector, count) {
        this.width = Math.ceil(780 / count - (count === 20 ? 2 : 1))    // robot宽度
        this.height = this.width                                        // robot高度
        this.ele = document.querySelector(selector)                     // robot Element
        this.parentNode = this.ele.parentNode
        this.mapCount = count   // 地图格子
        this.deg = 0            // 角度
        this.x = 1              // X坐标
        this.y = 1              // Y坐标
        this.direction = 0      // 方向，0：bottom，1：left，2：top，3：right
        this.wallMap = {}

        // 初始化robot宽高
        this.ele.style.width = this.width + 'px'
        this.ele.style.height = this.width + 'px'
        this.ele.style.backgroundSize = this.width + 'px'

        this.init()
    }

    /**
     * [init 初始化]
     * @memberof Robot
     */
    init() {
        this.goto([this.x, this.y])     // 初始化坐标
        this.changeDeg()                // 初始化角度
        this.setEvent()
    }

    /**
     * [turn 旋转自身角度]
     * @param {Number} direction 旋转的方向
     * @memberof Robot
     */
    turn(direction) {
        const ROTATE_MAP = {    // 旋转对应表
            0: {0: 0, 1: 90, 2: 180, 3: -90},  
            1: {1: 0, 2: 90, 3: 180, 0: -90},
            2: {2: 0, 3: 90, 0: 180, 1: -90},
            3: {3: 0, 0: 90, 1: 180, 2: -90}
        }
        
        this.deg += ROTATE_MAP[this.direction][direction]   // 设置旋转角度
        this.direction = direction                          // 设置方向
        this.changeDeg()                                    // 改变旋转角度
    }

    /**
     * [rotate 自身旋转]
     * @param {Number} deg 角度
     * @memberof Robot
     */
    rotate(deg, direction) {
        this.deg += deg
        this.changeDeg()
        this.setDirection()
    }

    /**
     * [setDirection 根据角度设置方向]
     * @memberof Robot
     */
    setDirection() {
        let angle = this.deg % 360
        angle = angle >= 0 ? angle : angle + 360
        this.direction = { 0: 0, 90: 1, 180: 2, 270: 3}[angle]
    }

    /**
     * [getOfficePosition 获取指定方向偏移的位置]
     * @param {Number} step 移动步数
     * @returns 偏移的[x,y]坐标值
     * @memberof Robot
     */
    getOfficePosition(direction, step) {
        const position = { 0: [0, 1], 1: [-1, 0], 2: [0, -1], 3: [1, 0] }[direction]    
        return [position[0] * step, position[1] * step]   
    }

    /**
     * [getPosition 获取移动step步后的值]
     * @param {Number} step 移动步数
     * @returns 移动后的[x,y]坐标值
     * @memberof Robot
     */
    getPosition(direction, step) {
        if (direction == null) {
            direction = this.direction
        }
        step = step || 0
        const offsetPosition = this.getOfficePosition(direction, step)
        return [this.x + offsetPosition[0], this.y + offsetPosition[1]]
    }

    /**
     * [goto 改变到position指定位置]
     * @param {Array} position 坐标数组 
     * @memberof Robot
     */
    goto(position, turn) {
        if (turn) {
            const pos = [position[0] - this.x, position[1] - this.y]
            if (pos[0] > 0) {           // 右
                this.turn(3)
            } else if (pos[0] < 0) {    // 左
                this.turn(1)
            } else if (pos[1] > 0) {    // 下
                this.turn(0)
            } else if (pos[1] < 0) {    // 上
                this.turn(2)
            }
        }
        this.checkPosition(position, '无法移动到')
        this.ele.style.left = position[0] * this.width + 'px'
        this.ele.style.top = position[1] * this.height + 'px'
        this.x = position[0]
        this.y = position[1]
    }

    /**
     * [move 按方向移动指定步数]
     * @param {Number} step 步数
     * @memberof Robot
     */
    move(direction, step) {
        this.checkPath(direction, step)
        this.goto(this.getPosition(direction, step))
    }

    /**
     * [go 基于当前位置移动指定部署]
     * @param {any} step 
     * @memberof Robot
     */
    go(step) {
        this.checkPath(this.direction, step)
        this.goto(this.getPosition(this.direction, step))
    }

    /**
     * [turnMove 旋转指定方向并移动]
     * @param {Number} direction 移动方向
     * @param {Number} step 移动步数
     * @memberof Robot
     */
    turnMove(direction, step) {
        this.turn(direction)
        this.move(direction, step)
    }

    /**
     * [changeDeg 改变旋转角度]
     * @memberof Robot
     */
    changeDeg() {
        this.ele.style.transform = `rotate(${this.deg}deg)`
    }

    /**
     * [checkPosition 检测移动位置是否非法]
     * @param {Array} position 坐标数组
     * @memberof Robot
     */
    checkPosition(position, string) {
        if (position[0] < 1 
            || position[1] < 1
            || position[0] > this.mapCount
            || position[1] > this.mapCount
        ) {
            throw `${string}[${position}]`  
        }

        if (this.getWallMap(position)) {
            throw `前方有墙不能移动[${position}]`
        }
    }

    /**
     * [checkPath 检测移动路上是否有墙]
     * @param {Number} direction 方向数字
     * @param {Number} step 移动步数
     * @memberof Robot
     */
    checkPath(direction, step) {
        const offsetPosition = this.getOfficePosition(direction, 1)

        for (let i = 1; i <= step; i++) {
            const x = this.x + offsetPosition[0] * i
            const y = this.y + offsetPosition[1] * i

            if (this.getWallMap([x, y])) {
                throw `路上有墙移动不了[${x}, ${y}]`
            }
        }
    }

    /**
     * [checkWall 检查基于自身前方无墙则抛出错误]
     * @param {Array} position 坐标数组
     * @memberof Robot
     */
    checkWall(position, string) {
        if (!this.getWallMap(position)) throw `前方无墙不能${string}[${position}]`
    }

    /**
     * [getWallMap 判断指定位置是否有墙]
     * @param {Array} position 指定坐标数组
     * @returns 有墙返回 true 无则false
     * @memberof Robot
     */
    getWallMap(position) {
        return this.wallMap[position] ? true : false
    }

    /**
     * [setWall 设置墙位置]
     * @param {Array} position 建造位置的坐标数组
     * @memberof Robot
     */
    setWall(position) {
        this.checkPosition(position, '超过建墙范围')  // 判断是否超过范围

        const width = this.width
        const height = this.height
        const wall = document.createElement('div')
        wall.className = 'wall'
        wall.style.left = position[0] * height + 'px'
        wall.style.top = position[1] * height + 'px'
        wall.style.width = height + 'px'
        wall.style.height = height + 'px'

        this.parentNode.appendChild(wall)
        this.wallMap[position] = wall   // 存进wallMap
    }

    /**
     * [setWallColor 设置墙颜色]
     * @param {Array} position 墙的坐标
     * @param {String} color 墙的颜色
     * @memberof Robot
     */
    setWallColor(position, color) {
        this.checkWall(position, '粉刷')  // 判断前方有无墙无墙则抛出错误
        this.wallMap[position].style.background = color
    }

    /**
     * [buildWall 基于当前位置前方建造墙]
     * @memberof Robot
     */
    buildWall() {
        this.setWall(this.getPosition(this.direction, 1))
    }

    /**
     * [splitWall 基于当前位置前方拆墙]
     * @memberof Robot
     */
    splitWall() {
        const direction = this.direction
        const getPosition = this.getPosition
        
        this.checkWall(getPosition(direction, 1), '拆墙')   // 判断前方有无墙无墙则抛出错误
        this.parentNode.removeChild(this.wallMap[getPosition(direction, 1)])
        delete this.wallMap[getPosition(direction, 1)]
    }

    /**
     * [clearWall 清空所有墙]
     * @memberof Robot
     */
    clearWall() {
        for (const position in this.wallMap) {
            this.parentNode.removeChild(this.wallMap[position])
        }
        this.wallMap = {}
    }

    /**
     * [paintWall 基于当前位置前方粉刷]
     * @memberof Robot
     */
    paintWall(color) {
        this.setWallColor(this.getPosition(this.direction, 1), color)
    }

    /**
     * [randomWall 随机修墙]
     * @memberof Robot
     */
    randomWall() {       
        this.clearWall() 
        for (let i = 0; i < 30; i++) {
            const pos = [Math.floor(Math.random() * 20 + 1), Math.floor(Math.random() * 20 + 1)]
            if (!this.getWallMap(pos) 
                && pos.toString() != [this.x, this.y].toString()
            ) {
                this.setWall(pos)
            }
        }
    }

    /**
     * [keyMove 键盘操作移动处理]
     * @param {string} [direction='undefined'] 
     * @memberof Robot
     */
    keyMove(direction) {
        if (typeof direction !== 'undefined') {
            event.preventDefault()
            if (this.direction === direction) {
                this.go(1)
                return false
            } 
            this.turn(direction)
        }
    }

    /**
     * [keyHandel 键盘事件处理]
     * @param {Event} e 
     * @memberof Robot
     */
    keyHandel(e) {
        if (e.target.tagName === 'BODY') {
            const direction = { 37: 1, 38: 2, 39: 3, 40: 0 }[e.keyCode]                                  // 对应方向
            const eventFunc = { 32: this.buildWall, 18: this.paintWall, 17: this.splitWall }[e.keyCode]  // 对应方法

            eventFunc ? eventFunc.call(this, '#1abc9c') : this.keyMove(direction) 
        }
    }

    /**
     * [setEvent 绑定事件]
     * @memberof Robot
     */
    setEvent() {
        addEvent(document, 'keydown', this.keyHandel.bind(this))
    }

}