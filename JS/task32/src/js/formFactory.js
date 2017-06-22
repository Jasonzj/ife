/*
 * @Author: Jason 
 * @Date: 2017-06-22 21:30:35 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-22 23:32:44
 */

import { ValidatorFunc } from './validatorFunc'

export class FormFactory {
    constructor(config, box) {
        this.form = document.createElement('form')
        this.box = document.querySelector(box)
        this.config = config
        this.fn = null

        this.init()
    }

    init() { 
        this.createInput()
    }

    createInput() {
        const self = this,
            config = self.config

        for (const key in config) {
            if (config[key].type === "button") {
                this.createBtn(config[key])
                continue
            }

            const div = document.createElement('div'),
                label = document.createElement('label'),
                input = document.createElement('input'),
                p = document.createElement('p')
        
            label.innerHTML = config[key].label
            label.htmlFor = config[key].id

            input.className = 'input_text'
            input.setAttribute('data-validation', 'false')
            input.type = config[key].type
            input.id = config[key].id

            p.className = 'prompt'

            div.appendChild(label)
            div.appendChild(input)
            div.appendChild(p)
            self.form.appendChild(div)


            new ValidatorFunc(input, config[key], p)
            
            if (config[key].compare) {
                this.fn = () => {
                    const compareInp = document.querySelector('#' + config[key].compare)
                    new ValidatorFunc([input, compareInp], config[key], p)
                }
            }
        }

        self.box.appendChild(self.form)
        
        if (self.fn) {
            self.fn()
        }
    }

    createBtn(config) {
        const btn = document.createElement('button'),
            self = this

        btn.className = 'btn'
        btn.innerHTML = config.value

        self.form.appendChild(btn)

        new ValidatorFunc([btn, this.form])
    }

}