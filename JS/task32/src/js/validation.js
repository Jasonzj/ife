/*
 * @Author: Jason 
 * @Date: 2017-06-21 15:38:17 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-21 15:29:39
 */

import { getValueLen } from './function'

/**
 * [strategies 验证策略对象]
 */
const strategies = {
    isNowEmpty(errorMsg, successMsg) {
        const value = this.ele.value
        if (value === '') return { msg: errorMsg, correct: false }
    },
    isEmpty(errorMsg, successMsg) {
        return { msg: successMsg, correct: true }
    },
    lengthBetween(length, length2, errorMsg, successMsg) {
        const value = this.ele.value
        const len = getValueLen(value)
        if (!(len >= length && len <= length2)) return { msg: errorMsg, correct: false }
        else return { msg: successMsg, correct: true }
    },
    isSame(errorMsg, successMsg) {
        const value = this.ele.value
        const value2 = this.ele2.value
        if (value !== value2) return { msg: errorMsg, correct: false }
        else return { msg: successMsg, correct: true }
    },
    isMail(errorMsg, successMsg) {
        const value = this.ele.value
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) return { msg: errorMsg, correct: false }
        else return { msg: successMsg, correct: true }
    },
    isMobile(errorMsg, successMsg) {
        const value = this.ele.value
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return { msg: errorMsg, correct: false }
        else return { msg: successMsg, correct: true }
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
    add() {
        const rules = this.getValidators()
        rules.forEach(rule => {
            const strategyAry = rule.strategy.split(':')   // 拆分验证条件
            const strategy = strategyAry.shift()           // 截取验证策略
            const errorMsg = rule.errorMsg                 // 错误的文本
            const successMsg = rule.successMsg             // 正确的文本
            strategyAry.push(errorMsg, successMsg)

            this.cache.push(() => {                        // 将验证函数添加到缓存数组中
                return strategies[strategy].apply(this, strategyAry)
            })
        })   
    }

    /**
     * [start 开始验证]
     * @returns {Object} 验证结果对象
     * {
     *     msg: '验证成功xxx',
     *     correct: true
     * }
     * @memberof Validator
     */
    start() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            const msg = validatorFunc && validatorFunc()
            if (msg) return msg
        }
    }
}

export default Validator