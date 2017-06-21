/*
 * @Author: Jason 
 * @Date: 2017-06-21 15:38:17 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-21 21:26:17
 */

;(() => {
    
    /**
     * [strategies 验证策略对象]
     */
    const strategies = {
        isNowEmpty(value, errorMsg, trueMsg) {
            if (value === '') return { msg: errorMsg, correct: false }
        },
        lengthBetween(value, length, length2, errorMsg, trueMsg) {
            const len = getValueLen(value)
            if (!(len >= length && len <= length2)) return { msg: errorMsg, correct: false }
            else return { msg: trueMsg, correct: true }
        },
        isSame(value, value2, errorMsg, trueMsg) {
            if (value !== value2) return { msg: errorMsg, correct: false }
            else return { msg: trueMsg, correct: true }
        },
        isMail(value, errorMsg, trueMsg) {
            if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) return { msg: errorMsg, correct: false }
            else return { msg: trueMsg, correct: true }
        },
        isMobile(value, errorMsg, trueMsg) {
            if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return { msg: errorMsg, correct: false }
            else return { msg: trueMsg, correct: true }
        }
    }

    /**
     * [Validator 验证类创建验证对象]
     * @class Validator
     */
    class Validator {
        constructor() {
            this.cache = []
        }

        /**
         * [add 添加并解析验证规则]
         * @param {Element||Array} dom 要验证的文本框
         * @param {Array} rules 要添加的验证规则
         * @memberof Validator
         */
        add(dom, rules) {
            const self = this
            for (let i = 0, rule; rule = rules[i++];) {                
                const strategyAry = rule.strategy.split(':'),   // 拆分验证条件
                    errorMsg = rule.errorMsg,   // 错误的文本
                    trueMsg = rule.trueMsg      // 正确的文本
                                
                self.cache.push(function(ele) {         // 将验证函数添加到缓存数组中           
                    const strategy = strategyAry.shift()    // 截取验证策略
                    
                    if (dom.length > 1 && strategy === 'isSame') {  
                        for (let i = 0, ele; ele = dom[i++];) {
                            strategyAry.unshift(ele.value);
                        }
                    } else {
                        strategyAry.unshift(dom[0].value);
                    }    

                    strategyAry.push(errorMsg)
                    strategyAry.push(trueMsg)
                    
                    return strategies[strategy].apply(dom, strategyAry)
                })
            }

        }

        start(ele) {
            for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
                const msg = validatorFunc(ele);
                if (msg) {
                    return msg 
                }
            }
        }
    }

    /**
     * [validatorFunc 添加验证函数]
     * @return {Object} add,start 
     */
    const validatorFunc = (() => {
        const fnQueue = [],
              rulesVals = []
        
        // 添加规则
        const add = (obj) => {
            fnQueue.push(() => {
                const validator = new Validator()
                validator.add([obj.inputName, obj.inputName2], [{
                    strategy: obj.strategy,
                    errorMsg: obj.errorMsg,
                    trueMsg: obj.trueMsg
                }, {
                    strategy: obj.strategy2,
                    errorMsg: obj.errorMsg2,
                    trueMsg: obj.trueMsg
                }])
                const msg = validator.start()
                return msg
            })
            setRule(obj)
        }

        // 添加规则说明
        const setRule = obj => {
            let rulsValue = '必填,';

            if (obj.strategy2.indexOf('lengthBetween') > -1) {
                const arr = obj.strategy2.split(':')
                rulsValue += `长度为${arr[1]}~${arr[2]}个字符`    
            }

            switch (obj.strategy2) {
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

            rulesVals.push(rulsValue);
        }

        // 开始验证规则
        const start = i => {
            return fnQueue[i]()
        }

        // 获取规则说明数组
        const getrulesVals = () => rulesVals

        return {
            add,
            start,
            getrulesVals
        }
    })();

    /************ 调用  **************/
    const registerForm = document.getElementById('registerForm'),
        inputs = document.getElementsByClassName('input_text'),
        prompts = document.getElementsByClassName('prompt'),
        btn = document.querySelector('.btn')

    // 添加验证规则   
    validatorFunc.add({
            inputName: registerForm.username,
            strategy: 'isNowEmpty',
            strategy2: 'lengthBetween:4:16',
            errorMsg: '名称不能为空',
            errorMsg2: '名称格式有误',
            trueMsg: '名称格式正确'
    })
    validatorFunc.add({
            inputName: registerForm.password,
            strategy: 'isNowEmpty',
            strategy2: 'lengthBetween:4:16',
            errorMsg: '密码不能为空',
            errorMsg2: '密码格式有误',
            trueMsg: '密码可用'
    })
    validatorFunc.add({
            inputName: registerForm.passwordMore,
            inputName2: registerForm.password,
            strategy: 'isNowEmpty',
            strategy2: 'isSame',
            errorMsg: '不能为空',
            errorMsg2: '两次密码不一致',
            trueMsg: '两次密码一致'
    })
    validatorFunc.add({
            inputName: registerForm.mail,
            strategy: 'isNowEmpty',
            strategy2: 'isMail',
            errorMsg: '邮箱不能为空',
            errorMsg2: '邮箱格式有误',
            trueMsg: '邮箱格式正确'
    })
    validatorFunc.add({
            inputName: registerForm.phone,
            strategy: 'isNowEmpty',
            strategy2: 'isMobile',
            errorMsg: '手机号码不能为空',
            errorMsg2: '手机格式有误',
            trueMsg: '手机格式正确'
    })

    /**
     * [blurHandel 失去焦点处理函数]
     * @param {Number} i inputs下标
     * @param {Element} item input本身
     */
    const blurHandel = (i, item) => {
        const msg = validatorFunc.start(i)
        if (!msg.correct) {
            prompts[i].innerHTML = msg.msg
            prompts[i].parentNode.className = "error"
            item.setAttribute('data-validation', 'false') 
            return false
        }
        prompts[i].innerHTML = msg.msg
        prompts[i].parentNode.className = "correct"
        item.setAttribute('data-validation', 'true') 
    }
    
    /**
     * [focusHandel 获得焦点处理函数]
     * @param {Number} i inputs下标
     */
    const focusHandel = i => {
        const ruleValue = validatorFunc.getrulesVals()[i]
        prompts[i].parentNode.className = ""
        prompts[i].innerHTML = ruleValue
    }

    /**
     * [clickHandel 点击处理函数]
     * @param {Event} e 
     */
    const clickHandel = e => {
        e.preventDefault()

        const state = [].every.call(inputs, item => {
            let state = false,
                data = item.getAttribute('data-validation')

            if (data === "true") {
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

    // 事件绑定
    ;[].forEach.call(inputs, function(item, i) {
        addEvent(item, 'focus', focusHandel.bind(null, i))
        addEvent(item, 'blur', blurHandel.bind(null, i, item))
    })

    addEvent(btn, 'click', clickHandel)

})();


// 根据中英文判断字符串长度
const getValueLen = str => {
    let i,
        len = 0
    for (i = str.length - 1; i >= 0; i--) {
        const strJudge = str[i].charCodeAt()
        if (strJudge > 255) len += 2
        if (strJudge >= 0 && strJudge <= 128) len += 1
    }
    return len
}

//跨浏览器事件绑定
function addEvent(element, event, hanlder) {
    if (element.addEventListener) {
        addEvent = function(element, event, hanlder) {
            element.addEventListener(event, hanlder, false)
        }
    } else if (element.attachEvent) {
        addEvent = function(element, event, hanlder) {
            element.attachEvent('on' + event, hanlder)
        }
    } else {
        addEvent = function(element, event, hanlder) {
            element['on' + event] = hanlder
        }
    }

    addEvent(element, event, hanlder)
}