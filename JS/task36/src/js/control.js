/*
 * @Author: Jason 
 * @Date: 2017-06-25 15:05:05 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-26 16:51:56
 */

import { Robot } from './robot'
import { Editor } from './editor'
import { addEvent } from './function'
import { Promise } from './promise';
export class Control {
    /**
     * Creates an instance of Control.
     * @param {String} robotEle robot类名
     * @param {String} editorEle 编辑器类名
     * @param {Number} count 格子数字
     * @param {String} btnBox 按钮盒子类名
     * @memberof Control
     */
    constructor(robotEle, editorEle, count, btnBox) {
        this.robot = new Robot(robotEle, count)
        this.editor = new Editor(editorEle)
        this.btnBox = document.querySelector(btnBox)
        this.directionMap = { bot: 0, lef: 1, top: 2, rig: 3 }
        this.queue = []
        this.queueState = false
        this.duration = 250
        
        this.setEvent()
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
                this.editor.exec(this, code)
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
     * [runQueue 运行命令队列]
     * @param {Function} func 要运行的函数
     * @param {Array} params 要运行的函数的参数数组
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
                task.func.apply(this.robot, task.params)
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
     * [clickHandle 点击事件处理]
     * @param {any} e 
     * @memberof Control
     */
    clickHandle(e) {
        const target = e.target

        if (target.nodeName === "BUTTON") {
            const eventFn = {'run': this.run, 'random': this.randomWall, 'reset': this.reset }[target.className]
            if (eventFn) eventFn.call(this)
        }
        
    }

    /**
     * [setEvent 事件绑定]
     * @memberof Control
     */
    setEvent() {
        const self = this       
        addEvent(self.btnBox, 'click', self.clickHandle.bind(self))
    }
}