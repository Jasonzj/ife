//跨浏览器事件绑定
export let addEvent = (element, event, hanlder) => {
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