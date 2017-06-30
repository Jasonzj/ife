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


export const setPush = (arr, target) => {
    arr.push(target)
}

export const setClassName = (target, classN) => {
    target.classList.add(classN)
}

export const setArrClassName = (arr, classN) => {
    arr.forEach(item => setClassName(item, classN))
}

export const clearCurrent = (arr, classN) => {
    arr.filter(item => item.className.indexOf(classN) > -1).forEach(item => item.classList.remove(classN))
}

export const arrSort = arr => {
    arr.sort((a, b) => a - b)
}