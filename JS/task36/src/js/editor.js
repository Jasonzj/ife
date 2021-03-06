/*
 * @Author: Jason 
 * @Date: 2017-06-24 17:34:47 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-20 23:17:59
 */

import { addEvent, commands } from './function'

export class Editor {
    /**
     * Creates an instance of Editor.
     * @param {String} selector 编辑器对应类名
     * @memberof Editor
     */
    constructor(selector) {
        this.ele = document.querySelector(selector)
        this.lines = this.ele.querySelector('.console-lines')
        this.textarea = this.ele.querySelector('.console-editor')

        this.init()
    }

    /**
     * [init 初始化]
     * @memberof Editor
     */
    init() {
        this.setEvent()
        this.update()
    }

    /**
     * [scroll 代码行数同步滚动]
     * @param {any} e 
     * @memberof Editor
     */
    scroll(e) {
        this.lines.style.top = -e.target.scrollTop + 'px'
    }

    /**
     * [update 根据换行更新行数]
     * @memberof Editor
     */
    update() {
        let texts = this.textarea.value
        let lines = texts.match(/\n/g)

        lines ? lines.push(1) : (lines = [1])

        this.lines.innerHTML = lines
            .map((item, i) => `<span>${i + 1}</span>`)
            .join('')
    }

    /**
     * [getLines 获取所有行]
     * @returns 
     * @memberof Editor
     */
    getLines() {
        return this.ele.getElementsByTagName('span')
    }

    /**
     * [scrollTo 滚动到指定行]
     * @param {Number} lines 指定行
     * @memberof Editor
     */
    scrollTo(line) {
        this.textarea.scrollTop = line * 20
    }

    /**
     * [setTag 设置行高亮]
     * @param {Number} line 行数+1
     * @param {String} classStr 类名
     * @memberof Editor
     */
    setTag(line, classStr) {
        this.getLines()[line].classList.add(classStr)
    }

    /**
     * [clearTag 清除高亮]
     * @param {Number} line 行数+1
     * @memberof Editor
     */
    clearTag(line) {
        const lines = this.getLines()
        if (line) {
            lines[line].className = ''
        } else {
            ;[].forEach.call(lines, item => (item.className = ''))
        }
    }

    /**
     * [getCodes 获取命令数组]
     * @returns 
     * @memberof Editor
     */
    getCodes() {
        return this.textarea.value.split('\n').map(code => code.trim())
    }

    /**
     * [setCodes 设置编辑器命令]
     * @param {String} codes 命令字符串
     * @memberof Editor
     */
    setCodes(codes) {
        this.textarea.value = codes
        this.update()
    }

    /**
     * [parse 解析命令]
     * @param {String} string 命令字符串
     * @returns 
     * @memberof Editor
     */
    parse(string) {
        for (let i = 0, command; (command = commands[i++]); ) {
            const match = string.match(command.pattern)
            if (match) {
                match.shift()
                return {
                    handler: command.handler,
                    params: match
                }
            }
        }
        return false
    }

    /**
     * [exec 运行命令]
     * @param {Sring} string 命令字符串
     * @returns 
     * @memberof Editor
     */
    exec(context, string) {
        const command = this.parse(string)
        if (command) {
            return command.handler.apply(context, command.params)
        }
        return false
    }

    /**
     * [设置事件绑定]
     * @memberof Editor
     */
    setEvent() {
        addEvent(this.textarea, 'input', this.update.bind(this))
        addEvent(this.textarea, 'scroll', this.scroll.bind(this))
    }
}


