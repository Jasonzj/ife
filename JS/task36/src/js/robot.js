/*
 * @Author: Jason 
 * @Date: 2017-06-23 22:56:18 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-23 23:56:23
 */

import robotImage from '../img/bot.png';

export class Robot {
    constructor(selector) {
        this.ele = document.querySelector(selector)
        this.deg = 0    // 角度
        this.x = 1      // X坐标
        this.y = 1      // Y坐标
        this.direction = 0  // 方向，0：bottom，1：left，2：top，3：right
        this.width = this.ele.clientWidth
        this.height = this.ele.clientHeight

        this.init()
    }

    /**
     * [init 初始化]
     * @memberof Robot
     */
    init() {
        this.goto([this.x, this.y])     // 初始化坐标
        this.changeDeg()                // 初始化角度
    }

    /**
     * [turn 旋转自身角度]
     * @param {Number} direction 旋转的方向
     * @memberof Robot
     */
    turn(direction) {
        const ROTATE_MAP = {
                0: {0: 0, 1: 90, 2: 180, 3: -90},  
                1: {1: 0, 2: 90, 3: 180, 0: -90},
                2: {2: 0, 3: 90, 0: 180, 1: -90},
                3: {3: 0, 0: 90, 1: 180, 2: -90}
            },
            DIRECTION_MAP = { 0: 0, 1: 1, 2: 2, 3: 3 }
        
        this.deg += ROTATE_MAP[this.direction][direction]   // 设置旋转角度
        this.direction = DIRECTION_MAP[direction]           // 设置方向
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
        this.checkPosition(position);
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
     * [checkPosition 检测下次移动位置如果超过边缘抛出错误]
     * @param {any} position 
     * @memberof Robot
     */
    checkPosition(position) {
        if (
            position[0] < 1 
            || position[1] < 1
            || position[0] > 20
            || position[1] > 20
        ) {
            throw '无法移动到 [' + position[0] + ',' + position[1] + ']'
        }
    }

}