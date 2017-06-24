/*
 * @Author: Jason 
 * @Date: 2017-06-23 22:56:18 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-24 18:22:30
 */

import robotImage from '../img/bot.png';
import { addEvent } from './function';

export class Robot {
    constructor(selector, count) {
        this.ele = document.querySelector(selector)
        this.parentNode = this.ele.parentNode
        this.mapCount = 20  // 地图格子
        this.deg = 0    // 角度
        this.x = 1      // X坐标
        this.y = 1      // Y坐标
        this.direction = 0  // 方向，0：bottom，1：left，2：top，3：right
        this.width = this.ele.clientWidth
        this.height = this.ele.clientHeight
        this.wallMap = {}

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
     * [getOfficePosition 获取指定方向偏移的位置]
     * @param {Number} step 移动步数
     * @returns 偏移的[x,y]坐标值
     * @memberof Robot
     */
    getOfficePosition(step) {
        const position = { 0: [0, 1], 1: [-1, 0], 2: [0, -1], 3: [1, 0] }[this.direction]    
        return [position[0] * step, position[1] * step]   
    }

    /**
     * [getPosition 获取移动step步后的值]
     * @param {Number} step 移动步数
     * @returns 移动后的[x,y]坐标值
     * @memberof Robot
     */
    getPosition(step) {
        step = step || 0
        const offsetPosition = this.getOfficePosition(step)
        return [this.x + offsetPosition[0], this.y + offsetPosition[1]]
    }

    /**
     * [goto 改变到position指定位置]
     * @param {Array} position 坐标数组 
     * @memberof Robot
     */
    goto(position) {
        this.checkPosition(position)
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
    move(step) {
        this.goto(this.getPosition(step))
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
     * @param {any} position 
     * @memberof Robot
     */
    checkPosition(position, string = '无法移动到') {
        if (
            position[0] < 1 
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
     * [checkPaint 检测粉刷非法]
     * @param {any} position 
     * @memberof Robot
     */
    checkPaint(position) {
        if (!this.getWallMap(position)) throw `前方无墙不能粉刷[${position}]`
    }

    /**
     * [getWallMap 判断指定位置是否有墙]
     * @param {Array} position 指定坐标数组
     * @returns 有墙返回 false 无则true
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
        this.checkPosition(position, '超过建墙范围')

        const wall = document.createElement('div')
        wall.className = 'wall'
        wall.style.left = position[0] * this.width + 'px'
        wall.style.top = position[1] * this.height + 'px'
        wall.style.width = this.width + 'px'
        wall.style.height = this.height + 'px'

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
        this.checkPaint(position)
        this.wallMap[position].style.background = color
    }

    /**
     * [buildWall 基于当前位置前方建造墙]
     * @memberof Robot
     */
    buildWall() {
        this.setWall(this.getPosition(1))
    }

    /**
     * [splitWall 基于当前位置前方拆墙]
     * @memberof Robot
     */
    splitWall() {
        this.parentNode.removeChild(this.wallMap[this.getPosition(1)])
        delete this.wallMap[this.getPosition(1)]
    }

    /**
     * [paintWall 基于当前位置前方粉刷]
     * @memberof Robot
     */
    paintWall(color) {
        this.setWallColor(this.getPosition(1), color)
    }

    /**
     * [keyMove 键盘操作移动处理]
     * @param {string} [direction='undefined'] 
     * @memberof Robot
     */
    keyMove(direction = 'undefined') {
        if (typeof direction != 'undefined') {
            event.preventDefault()
            if (this.direction === direction) {
                this.move(1)
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
        const direction = {37: 1, 38: 2, 39: 3, 40: 0}[e.keyCode],
            eventFunc = {32: this.buildWall, 18: this.paintWall, 17: this.splitWall}[e.keyCode]

        eventFunc ? eventFunc.call(this, '#1abc9c') : this.keyMove(direction)
    }

    /**
     * [setEvent 绑定事件]
     * @memberof Robot
     */
    setEvent() {
        const self = this

        addEvent(document, 'keydown', self.keyHandel.bind(self))
    }

}