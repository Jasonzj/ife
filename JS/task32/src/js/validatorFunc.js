/*
 * @Author: Jason 
 * @Date: 2017-06-22 22:01:00 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-22 23:35:11
 */

import { Validator } from './validation'
import { addEvent } from './function';

/**
 * [validatorFunc 添加验证函数]
 * @return {Object} add,start 
 */
export class ValidatorFunc extends Validator{
    constructor(ele, config, prompt) {
        super()
        this.ele = ele
        this.ele2 = null
        this.prompt = prompt
        this.config = config
        this.rulesVals = ''

        if (this.ele instanceof Array) {
            this.ele = ele[0]
            this.ele2 = ele[1]
        }

        this.config ? this.init() : this.init(true)
    }

    init(btn) {
        if (btn) {
            this.setBtn()
            return false
        }
        this.setEvent()
        this.setRule(this.config)
    }

    setRule(config) {
        const self = this
        let rulsValue = ''

        config.validators[0] === 'isNowEmpty' ? rulsValue = '必填,' : rulsValue = '选填,'

        if (config.validators[1] && config.validators[1].indexOf('lengthBetween') > -1) {
            const arr = config.validators[1].split(':')
            rulsValue += `长度为${arr[1]}~${arr[2]}个字符`    
        }

        switch (config.validators[1]) {
            case 'isSame':
                rulsValue += '再次输入相同的密码'
                break;
            case 'isMail':
                rulsValue += '填写正确的邮箱格式'
                break;
            case 'isMobile':
                rulsValue += '填写正确的手机格式'
                break;
        }

        self.rulesVals = rulsValue;
    }

    getValidators(data, config) {
        const arr = []

        for (let i = 0, l = data.length; i < l; i++) {
            const validator = data[i],
                fail = config.fail[i]
                
            arr.push({
                strategy: validator,
                errorMsg: fail,
                trueMsg: config.success
            })
        }

        return arr
    }

    setValidator(config) {
        const self = this,
            eles = null,
            validator = config.validators[0],
            validator2 = config.validators[1]

        self.cache = []

        const data = self.getValidators(config.validators, config)

        self.add([self.ele, self.ele2], data)

        return self.start(self.ele)
    }

    blurHandel() {
        const self = this,
            msg = self.setValidator(self.config)
        
        if (!msg.correct) {
            self.prompt.innerHTML = msg.msg
            self.prompt.parentNode.className = "error"
            self.ele.setAttribute('data-validation', 'false') 
            return false
        }
        self.prompt.innerHTML = msg.msg
        self.prompt.parentNode.className = "correct"
        self.ele.setAttribute('data-validation', 'true') 
        
    }

    focusHandel() {
        const self = this
        self.prompt.parentNode.className = ''
        self.prompt.innerHTML = self.rulesVals
    }

    clickHandel(e) {
        e.preventDefault()

        const self = this,
            inputs = self.ele2.getElementsByTagName('input')

        const state = [].every.call(inputs, item => {
            let state = false,
                data = item.getAttribute('data-validation')
            
            if (data === 'true') {
                state = true
            }
            return state
        })

        if (!state) {
            alert('提交失败，请检查输入')
            return false
        }
        alert('提交成功')
    }

    setEvent() {
        const self = this

        addEvent(self.ele, 'focus', self.focusHandel.bind(self))
        addEvent(self.ele, 'blur', self.blurHandel.bind(self))
    }

    setBtn() {
        const self = this

        addEvent(self.ele, 'click', self.clickHandel.bind(self))
    }


}