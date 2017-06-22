/*
 * @Author: Jason 
 * @Date: 2017-06-22 22:14:20 
 * @Last Modified by:   Jason 
 * @Last Modified time: 2017-06-22 22:14:20 
 */

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
let addEvent = (element, event, hanlder) => {
    if (element.addEventListener) {
        addEvent = (element, event, hanlder) => {
            element.addEventListener(event, hanlder, false)
        }
    } else if (element.attachEvent) {
        addEvent = (element, event, hanlder) => {
            element.attachEvent('on' + event, hanlder)
        }
    } else {
        addEvent = (element, event, hanlder) => {
            element['on' + event] = hanlder
        }
    }

    addEvent(element, event, hanlder)
}

export {
    getValueLen,
    addEvent
}