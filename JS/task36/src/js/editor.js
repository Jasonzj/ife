/*
 * @Author: Jason 
 * @Date: 2017-06-24 17:34:47 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-24 18:02:15
 */

import { addEvent } from './function'

export class Editor {
    constructor(selector) {
        this.ele = document.querySelector(selector)
        this.lines = this.ele.querySelector('.console-lines')
        this.textarea = this.ele.querySelector('.console-editor')
        
        this.init()
    }

    init() {
        this.setEvent()
        this.update()
    }

    scroll(e) {
        this.lines.style.top = - e.target.scrollTop + 'px'
    }

    update() {
        const texts = this.textarea.value,
            lines = texts.match(/\n/g)
        
        lines.push('1')
        this.lines.innerHTML = lines.map((item, i) => `<span>${i + 1}</span>`).join('')
    }

    setEvent() {
        const self = this

        addEvent(self.textarea, 'input', self.update.bind(self))
        addEvent(self.textarea, 'scroll', self.scroll.bind(self))
    }
}