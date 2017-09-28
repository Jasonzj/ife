/*
 * @Author: Jason 
 * @Date: 2017-06-22 21:30:35 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-14 22:31:22
 */

import { ValControl } from './valControl'

/**
 * [FormFactory 表单生成工厂]
 * @export 
 * @class FormFactory
 */
export class FormFactory {

    /**
     * Creates an instance of FormFactory.
     * @param {Object} config 表单配置
     * {    
     *     {
     *         id: 'username',                                        // input的ID
     *         label: '姓名',                                         // label的文本 
     *         type: 'text',                                         // input类型, 可选['text', 'mail...', 'button']
     *         validators: ['isNowEmpty', 'lengthBetween:4:16'],     // 验证规则可选多个
     *         fail: ['名称不能为空', '名称格式有误'],                 // 验证错误文本对应验证规则数组
     *         success: '密码可用',                                  // 验证正确文本
     *         compare: 'password',                                 // 可选，比较的input元素ID，validators规则需要加入isSame规则
     *         noMust: true,                                        // 可选，默认为必填，true则不必填
     *         linkage: 'passwordMore2'                             // 可选，联动验证比如密码和密码确认，值为需要联动的input key名
     *     },
     *     {...}
     * }
     * @param {Element} box 表单要插入的Element
     * @memberof FormFactory
     */
    constructor(config, box) {
        this.form = document.createElement('form')
        this.box = document.querySelector(box) 
        this.config = config    // 表单配置
        this.fn = []  // 用于存放需要比较的文本框实例
        this.validationQueue = {}

        this.init()
    }

    /**
     * [init 初始化]
     * @memberof FormFactory
     */
    init() { 
        this.createInput()
    }

    /**
     * [createInput 创建input方法]
     * @memberof FormFactory
     */
    createInput() {
        const config = this.config
        const form = this.form
        const keys = Object.keys(config)

        keys.forEach(key => {
            const value = config[key]
            const type = value.type
            const id = value.id

            if (type === "button") {    // 如果是button则创建button跳过本次循环
                this.createBtn(value)
                return
            }

            if (key === "id" 
                || key === "class" 
                || key === "action"
            ) {
                return
            }

            const { input, p } = this.createElement(value, type, id)
            this.createValControl(input, value, p, id)
        })

        form.id = config.id || ''
        form.class = config.class || ''
        form.action = config.action || ''
        this.box.appendChild(this.form)
        this.fn.length && this.fn.forEach(func => func && func())
    }

    createElement(value, type, id) {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const input = document.createElement('input')
        const p = document.createElement('p')

        // label
        label.innerHTML = value.label
        label.htmlFor = id

        // input
        input.className = 'input_text'
        input.type = type
        input.id = id
        value.noMust  // 如果有noMust(不是必填)属性则设置验证属性为true
            ? input.setAttribute('data-validation', 'true') 
            : input.setAttribute('data-validation', 'false')

        // p
        p.className = 'prompt'

        // appendChild
        div.appendChild(label)
        div.appendChild(input)
        div.appendChild(p)
        this.form.appendChild(div)

        return {
            input,
            p
        }
    }

    createValControl(input, value, p, id) {
        this.validationQueue[id] = new ValControl(input, value, p, this.validationQueue)  // 为input添加规则
        
        if (value.compare) {  // 如果有compare(比较属性)则给fn赋值并在创建好表单后执行
            this.fn.push(() => {
                const compareInp = document.querySelector('#' + value.compare)
                this.validationQueue[id] = new ValControl([input, compareInp], value, p, this.validationQueue)
            })
        }
    }

    /**
     * [creaetBtn 创建按钮]
     * @param {any} config button的配置
     * @memberof FormFactory
     */
    createBtn(config) {
        const btn = document.createElement('button')

        btn.className = 'btn'
        btn.innerHTML = config.value
        btn.type = 'sumbit'

        this.form.appendChild(btn)

        new ValControl([btn, this.form], config, null, this.validationQueue)
    }

}