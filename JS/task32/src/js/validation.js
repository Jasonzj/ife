/*
 * @Author: Jason 
 * @Date: 2017-06-21 15:38:17 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-14 21:49:13
 */

import { getValueLen } from './function';

const Validator = (() => {
    
    /**
     * [strategies 验证策略对象]
     */
    const strategies = {
        isNowEmpty(value, errorMsg, trueMsg) {
            if (value === '') return { msg: errorMsg, correct: false }
        },
        isEmpty(value, errorMsg, trueMsg) {
            return { msg: trueMsg, correct: true }
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
            for (let i = 0, rule; rule = rules[i++];) {                
                const strategyAry = rule.strategy.split(':'),   // 拆分验证条件
                    errorMsg = rule.errorMsg,   // 错误的文本
                    trueMsg = rule.trueMsg      // 正确的文本
    
                this.cache.push(function() {         // 将验证函数添加到缓存数组中           
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

        /**
         * [start 开始验证]
         * @param {any} ele 
         * @returns 
         * @memberof Validator
         */
        start() {
            for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
                const msg = validatorFunc && validatorFunc();
                if (msg) {
                    return msg 
                }
            }
        }
    }

    return Validator

})()

export {
    Validator
}






