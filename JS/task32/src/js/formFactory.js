/*
 * @Author: Jason 
 * @Date: 2017-06-22 21:30:35 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-11 17:47:49
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
     *         id: 'username',     // input的ID
     *         label: '姓名',       // label的文本 
     *         type: 'text',       // input类型, 可选['text', 'mail...', 'button']
     *         validators: ['isNowEmpty', 'lengthBetween:4:16'],    // 验证规则可选多个
     *         fail: ['名称不能为空', '名称格式有误'],   // 验证错误文本对应验证规则数组
     *         success: '密码可用',     // 验证正确文本
     *         compare: 'password',     // 可选，比较的input元素ID，validators规则需要加入isSame规则
     *         noMust: true             // 可选，默认为必须，选了则不必须
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
        const self = this,
            config = self.config

        for (const key in config) {
            if (config[key].type === "button") {    // 如果是button则创建button跳过本次循环
                this.createBtn(config[key])
                continue
            }

            // createElement
            const div = document.createElement('div'),
                label = document.createElement('label'),
                input = document.createElement('input'),
                p = document.createElement('p')
        
            // label
            label.innerHTML = config[key].label
            label.htmlFor = config[key].id

            // input
            input.className = 'input_text'
            input.type = config[key].type
            input.id = config[key].id
            config[key].noMust  // 如果有noMust(不是必填)属性则设置验证属性为true
                ? input.setAttribute('data-validation', 'true') 
                : input.setAttribute('data-validation', 'false')

            // p
            p.className = 'prompt'

            // appendChild
            div.appendChild(label)
            div.appendChild(input)
            div.appendChild(p)
            self.form.appendChild(div)

            // 为input添加规则
            new ValControl(input, config[key], p)
            
            if (config[key].compare) {  // 如果有compare(比较属性)则给fn赋值并在创建好表单后执行
                this.fn.push(() => {
                    const compareInp = document.querySelector('#' + config[key].compare)
                    new ValControl([input, compareInp], config[key], p)
                })
            }
        }

        self.box.appendChild(self.form)
        
        if (this.fn.length) {
            this.fn.forEach(func => {
                func && func()
            })
        }
    }

    /**
     * [creaetBtn 创建按钮]
     * @param {any} config button的配置
     * @memberof FormFactory
     */
    createBtn(config) {
        const btn = document.createElement('button'),
            self = this

        btn.className = 'btn'
        btn.innerHTML = config.value

        self.form.appendChild(btn)

        new ValControl([btn, this.form], config)
    }

}