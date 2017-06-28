/*
 * @Author: Jason 
 * @Date: 2017-06-25 15:05:05 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-28 13:14:35
 */

import { Robot } from './robot'
import { Editor } from './editor'
import { addEvent } from './function'
import { Promise } from './promise';
import { PathFinder } from './pathfinding';
import { ImageReader } from './imageReader';

export class Control {
    /**
     * Creates an instance of Control.
     * @param {String} robotEle robot类名
     * @param {String} editorEle 编辑器类名
     * @param {Number} count 格子数字
     * @param {String} btnBox 按钮盒子类名
     * @memberof Control
     */
    constructor(JSON) {
        this.robot = new Robot(JSON.robotEle, JSON.count)            // 初始化机器人
        this.editor = new Editor(JSON.editorEle)                     // 初始化命令编辑器
        this.finder = new PathFinder(JSON.count)                     // 初始化搜索类
        this.imageReader = new ImageReader(JSON.count)
        this.btnBox = document.querySelector(JSON.btnBox)            // 按钮盒子
        this.speedSelect = document.querySelector(JSON.selectBox)    // 速度选择Select
        this.selectImg = document.querySelector(JSON.selectImg)      // 图片选择select
        this.directionMap = { bot: 0, lef: 1, top: 2, rig: 3 }       // 方向对应地图
        this.queue = []             // 任务队列
        this.queueState = false     // 任务队列状态
        this.duration = 250         // 任务队列执行速度
        
        this.setEvent()             // 初始化绑定事件
    }

    /**
     * [run 运行命令]
     * @memberof Control
     */
    run() {
        let codes = this.editor.getCodes(),
            parseError = false
        
        codes.forEach((str, i) => {
            if (str && this.editor.parse(str) === false) {   // 如果命令解析有误则高亮错误行
                parseError = true
                this.editor.setTag(i, 'error')
            }
        })

        if (!parseError) {  // 无错误
            let prev = 0
            codes.forEach((code, i) => {
                if (code)
                    this.editor.exec(this, code)    // 执行完拿到promise
                    .then(() => {   // 正确执行命令处理
                        if (i % 37 === 0) {     // 大于当页最大行更新滚动条到当前执行命令行
                            this.editor.scrollTo(i)
                        }
                        this.editor.clearTag(prev)
                        this.editor.setTag(i, 'light')
                        prev = i
                    })
                    .catch(()=> {   // 错误执行命令处理
                        this.editor.clearTag()
                        this.editor.setTag(i, 'warning')
                    })
            })
        }
        
    }

    /**
     * [random 随机修墙]
     * @memberof Control
     */
    randomWall() {
        this.robot.randomWall()
    }

    /**
     * [reset 重置]
     * @memberof Control
     */
    reset() {
        this.robot.goto([1, 1])
        this.robot.deg = 0
        this.robot.direction = 0
        this.robot.changeDeg()
        this.robot.clearWall()
    }

    /**
     * [setSpeed 设置robot运动速度]
     * @param {Event} e 
     * @memberof Control
     */
    setSpeed(target) {
        this.duration = target.value
        this.robot.ele.style.transitionDuration = target.value + 'ms'
    }

    /**
     * [runQueue 运行命令队列]
     * @param {Function} func 要运行的函数
     * @param {Array} params 要运行的函数的参数数组
     * @return {Promise} 每行命令的promise
     * @memberof Control
     */
    runQueue(func, params) {
        const promise = new Promise((resolve, reject) => {
            this.queue.push({
                func: func, 
                params: params, 
                callback(exception) {
                    if (exception) {
                        reject(exception)
                    } else {
                        resolve()
                    }
                }
            })
        })

        if (!this.queueState) this.taskLoop()   // 如果没有正在执行的命令
        return promise
    }

    /**
     * [taskLoop 任务循环执行]
     * @memberof Control
     */
    taskLoop() {
        this.queueState = true
        const task = this.queue.shift()     // 模拟队列取出第一个任务
        if (task) {
            try {
                task.func.name === 'search' 
                    ? task.func.apply(this, task.params)
                    : task.func.apply(this.robot, task.params)
                    
                task.callback()
                setTimeout(this.taskLoop.bind(this), this.duration)
            } catch (e) {   
                this.queueState = false
                this.queue = []
                task.callback(e)
            }
            return false
        }
        this.queueState = false
    }

    /**
     * [search 自动寻路方法]
     * @param {Array} target 目标坐标数组
     * @memberof Control
     */
    search(target) {
        const path = this.finder.search(
            [this.robot.x, this.robot.y],   // 起点坐标数组
            target,                         // 终点坐标数组
            this.robot.wallMap              // 墙对应坐标集合对象
        )

        path.forEach(item => {  // 循环path路径依次运行
            this.runQueue(this.robot.goto, [[item.x, item.y], true])
        })
    }

    /**
     * [setImage 选择图片画图片]
     * @param {any} target 
     * @memberof Control
     */
    setImage(target) {
        this.imageReader.readImage(this.selectImg.files[0])
        .then(data => {
            let commands = 'tun bac\ntra bot\n'
            for (let x = 1; x <= data.length; x++) {
                if (x == data.length) {     // 如果等于data.length代表最后一行
                    commands += 'tun rig\ntra lef\n'
                } else if (x != 1) {        // 第一行不用tra bot
                    commands += 'tra bot\n'
                }
                for (let y = 1; y <= data.length; y++) {
                    let direction = 'lef'

                    if (x == data.length && y == data.length) { // 如果相等则结束
                        break
                    }    
                    if (x % 2) {    // 偶数行 为rig
                        direction = 'rig'
                    }
                    if (y != 1) {   
                        commands += `tra ${direction}\n`
                    }

                    commands += `build\nbru ${data[x - 1][y - 1]}\n`
                }
            }
            this.editor.setCodes(commands)
        })
    }

    /**
     * [clickHandle 点击事件处理]
     * @param {any} e 
     * @memberof Control
     */
    clickHandle(e) {
        const target = e.target

        if (target.nodeName === "BUTTON") {
            const eventFn = {
                'run': this.run, 
                'random': this.randomWall, 
                'reset': this.reset, 
                'duration': this.setSpeed 
            }[target.className]
            
            if (eventFn) eventFn.call(this)
        }
        
    }

    /**
     * [changeHandle change事件处理]
     * @param {Event} e 
     * @memberof Control
     */
    changeHandle(e) {
        const target = e.target

        if (target.nodeName === 'SELECT' || target.nodeName === 'INPUT') {
            const eventFn = { 
                'duration': this.setSpeed, 
                'image': this.setImage 
            }[target.className]

            if (eventFn) eventFn.call(this, target)
        }
    }

    /**
     * [setEvent 事件绑定]
     * @memberof Control
     */
    setEvent() {
        const self = this       
        addEvent(self.btnBox, 'click', self.clickHandle.bind(self))
        addEvent(self.btnBox, 'change', self.changeHandle.bind(self))
    }
}