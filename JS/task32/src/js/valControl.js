/*
 * @Author: Jason 
 * @Date: 2017-06-22 22:01:00 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-21 15:30:30
 */

import Validator from './validation'
import { addEvent } from './function'

/**
 * [ValControl 验证器控制]
 * @export 
 * @class ValControl
 * @extends {Validator}
 */
export default class ValControl extends Validator{

    /**
     * Creates an instance of ValControl.
     * @param {Element||Array} ele 需要验证的input，为数组时则第一个为input，第二个为需要比较的input
     * @param {Object} config input配置
     * @param {Element} prompt input的提示盒子
     * @memberof ValControl
     */
    constructor(ele, config, prompt, validationQueue) {
        super()
        this.ele = ele      // 需要验证的input
        this.ele2 = null    // 需要比较的input
        this.prompt = prompt    // input提示盒子
        this.config = config    // input配置
        this.rulesVals = ''     // 生成的规则提示
        this.validators = config.validators  // 验证规则数组
        this.success = config.success   // 正确返回的文本
        this.fails = config.fail        // 错误返回的文本
        this.linkage = config.linkage   // 联动input
        this.validationQueue = validationQueue || {}

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
        if (!btn) {
            this.setRule()
            this.add()      // 初始化验证规则
        }
    }

    /**
     * [setRule 根据验证规则生成提示规则]
     * @memberof ValControl
     */
    setRule() {
        const validator1 = this.validators[0]
        const validator2 = this.validators[1]

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

        this.rulesVals = rulsValue
    }

    /**
     * [getValidators 获取验证规则对象(根据规则数生成对等的数组)]
     * @param {Array} data 验证规则数组
     * @returns 返回格式如下如验证规则数组
     * [
     *     {
     *       strategy: validator,
     *       errorMsg: fail,
     *       successMsg: this.success
     *     },
     *     {
     *      ...
     *     }
     * ]
     * @memberof ValControl
     */
    getValidators() {
        const arr = []
        const data = this.validators

        data.forEach((strategy, i) => {
            const fail = this.fails[i]

            arr.push({
                strategy,
                errorMsg: fail,
                successMsg: this.success
            })
        })
            
        return arr
    }

    /**
     * [blurHandel 失去焦点处理]
     * @memberof ValControl
     */
    blurHandel() {
        const msg = this.start()  // 验证规则并返回结果
        const prompt = this.prompt

        if (this.linkage) {     // 如果linkage存在着联动对应的input
            this.validationQueue[this.linkage].blurHandel()
        }

        if (!msg.correct) {
            prompt.innerHTML = msg.msg
            prompt.parentNode.className = "error"
            this.ele.setAttribute('data-validation', 'false') 
            return false
        }
        prompt.innerHTML = msg.msg
        prompt.parentNode.className = "correct"
        this.ele.setAttribute('data-validation', 'true') 
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
        const inputs = this.ele2.getElementsByTagName('input')

        // 执行所有验证函数
        const validationQueue = this.validationQueue
        const keys = Object.keys(validationQueue)
        keys.forEach(key => validationQueue[key].blurHandel())

        // 根据inputs筛选input属性data-validation是否为全部true
        const state = [].every.call(inputs, item => item.getAttribute('data-validation') === 'true')    

        if (!state) {
            alert(this.fails)
            e.preventDefault()
            return
        }
        alert(this.success)
    }

    /**
     * [setEvent 事件绑定]
     * @memberof ValControl
     */
    setEvent(btn) {
        if (btn) {  // 跟剧btn选择事件绑定
            addEvent(this.ele, 'click', this.clickHandel.bind(this))
            return false
        }

        addEvent(this.ele, 'focus', this.focusHandel.bind(this))
        addEvent(this.ele, 'blur', this.blurHandel.bind(this))
    }

}