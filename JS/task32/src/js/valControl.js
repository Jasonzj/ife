/*
 * @Author: Jason 
 * @Date: 2017-06-22 22:01:00 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-11 17:59:03
 */

import { Validator } from './validation'
import { addEvent } from './function';

/**
 * [ValControl 验证器控制]
 * @export 
 * @class ValControl
 * @extends {Validator}
 */
export class ValControl extends Validator{

    /**
     * Creates an instance of ValControl.
     * @param {Element||Array} ele 需要验证的input，为数组时则第一个为input，第二个为需要比较的input
     * @param {Object} config input配置
     * @param {Element} prompt input的提示盒子
     * @memberof ValControl
     */
    constructor(ele, config, prompt) {
        super()
        this.ele = ele      // 需要验证的input
        this.ele2 = null    // 需要比较的input
        this.prompt = prompt    // input提示盒子
        this.config = config    // input配置
        this.rulesVals = ''     // 生成的规则提示
        this.validators = config.validators  // 验证规则数组
        this.success = config.success   // 正确返回的文本
        this.fails = config.fail        // 错误返回的文本
        this.linkage = config.linkage

        // 根据button判断
        this.config.type === 'button' ? this.init(ele, true) : this.init(ele)
    }

    /**
     * 【init 初始化]
     * @param {Element||Array} ele 
     * @param {Boolean} btn  // button存在为true
     * @memberof ValControl
     */
    init(ele, btn) {
        if (this.ele instanceof Array) {    // 如果ele是数组则拆分成两个
            this.ele = ele.shift()
            this.ele2 = ele.shift()
        }

        this.setEvent(btn)
        if (!btn) this.setRule()
        
    }

    /**
     * [setRule 根据验证规则生成提示规则]
     * @memberof ValControl
     */
    setRule() {
        const self = this,
            validator1 = self.validators[0],
            validator2 = self.validators[1]

        let rulsValue = ''

        validator1 === 'isNowEmpty' 
            ? rulsValue = '必填,' 
            : rulsValue = '选填'

        if (validator2 && validator2.indexOf('lengthBetween') > -1) {
            const arr = validator2.split(':')
            rulsValue += `长度为${arr[1]}~${arr[2]}个字符`    
        }

        switch (validator2) {
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

    /**
     * [getValidators 获取验证规则对象(根据规则数生成对等的数组)]
     * @param {Array} data 验证规则数组
     * @returns 返回格式如下如验证规则数组
     * [
     *     {
     *       strategy: validator,
     *       errorMsg: fail,
     *       trueMsg: self.success
     *     },
     *     {
     *      ...
     *     }
     * ]
     * @memberof ValControl
     */
    getValidators(data) {
        const arr = [],
            self = this

        for (let i = 0, l = data.length; i < l; i++) {
            const validator = data[i],
                fail = self.fails[i]
                
            arr.push({
                strategy: validator,
                errorMsg: fail,
                trueMsg: self.success
            })
        }

        return arr
    }

    /**
     * [setValidator 设置验证规则]
     * @returns {Object} 验证结果对象
     * {
     *     msg: '验证成功xxx',
     *     correct: true
     * }
     * @memberof ValControl
     */
    setValidator() {
        const self = this,
            eles = null

        self.cache = []     // 清空规则缓存队列

        const data = self.getValidators(self.validators)

        self.add([self.ele, self.ele2], data)   // 添加规则

        return self.start()  // 验证规则并返回结果
    }

    /**
     * [blurHandel 失去焦点处理]
     * @memberof ValControl
     */
    blurHandel() {
        const self = this,
            msg = self.setValidator()

        if (self.linkage) {     // 如果linkage存在着联动对应的input
            const dom = document.querySelector(`#${self.linkage}`)
            dom.blur()
            dom.focus()
        }

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

    /**
     * [focusHandel 获得焦点处理]
     * @memberof ValControl
     */
    focusHandel() {
        const self = this
        self.prompt.parentNode.className = ''
        self.prompt.innerHTML = self.rulesVals
    }

    /**
     * [clickHandel 点击处理]
     * @param {Event} e 
     * @memberof ValControl
     */
    clickHandel(e) {
        e.preventDefault()

        const self = this,
            inputs = self.ele2.getElementsByTagName('input'),
            // 根据inputs筛选input属性data-validation是否为全部true
            state = [].every.call(inputs, item => item.getAttribute('data-validation') === 'true')    
        
        if (!state) {
            alert(self.fails)
            return false
        }
        alert(self.success)
    }

    /**
     * [setEvent 事件绑定]
     * @memberof ValControl
     */
    setEvent(btn) {
        const self = this

        if (btn) {  // 跟剧btn选择事件绑定
            addEvent(self.ele, 'click', self.clickHandel.bind(self))
            return false
        }

        addEvent(self.ele, 'focus', self.focusHandel.bind(self))
        addEvent(self.ele, 'blur', self.blurHandel.bind(self))
    }

}