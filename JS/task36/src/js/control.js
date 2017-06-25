/*
 * @Author: Jason 
 * @Date: 2017-06-25 15:05:05 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-25 19:24:51
 */

import { Robot } from './robot'
import { Editor } from './editor'
import { addEvent } from './function'

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
            if (str && this.editor.parse(str) === false) {
                parseError = true
                this.editor.setTag(i, 'error')
            }
        })

        if (!parseError) {
            const self = this
            let prev = 0
            codes.forEach((code, i) => {
                this.editor.exec(this, code).then(() => {
                    if (i % 37 == 0) {
                        self.editor.scrollTo(i)
                    }
                    self.editor.clearTag(prev)
                    self.editor.setTag(i, 'light')
                    prev = i
                })
            })
        }
        
    }

    random() {
        this.robot.randomWall()
    }

    /**
     * [runQueue 运行命令队列]
     * @param {Function} func 要运行的函数
     * @param {Array} params 要运行的函数的参数数组
     * @memberof Control
     */
    runQueue(func, params) {
        const promise = new Promise((function (resolve, reject) {
            this.queue.push({
                func: func, 
                params: params, 
                callback: function (exception) {
                    if (exception) {
                        reject(exception)
                    } else {
                        resolve()
                    }
                }
            })
        }).bind(this))

        if (!this.queueState) {
            this.taskLoop()
        }

        return promise
    }

    /**
     * [taskLoop 任务循环执行]
     * @memberof Control
     */
    taskLoop() {
        this.queueState = true
        const task = this.queue.shift()
        if (task) {
            task.func.apply(this.robot, task.params)
            task.callback()
            setTimeout(this.taskLoop.bind(this), this.duration)
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
            const eventFn = {'run': this.run, 'random': this.random}[target.className]
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