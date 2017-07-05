/*
 * @Author: Jason 
 * @Date: 2017-07-03 20:04:37 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-05 14:44:36
 */

export function addEvent(element, event, hanlder) {
    if (element.addEventListener) {
        addEvent = function(element, event, hanlder) {
            element.addEventListener(event, hanlder, false);
        }
    } else if (element.attachEvent) {
        addEvent = function(element, event, hanlder) {
            element.attachEvent("on" + event, hanlder);
        }
    } else {
        addEvent = function(element, event, hanlder) {
            element["on" + event] = hanlder;
        }
    }

    addEvent(element, event, hanlder);
}

/**
 * get to random coordinater
 * 
 * @param {Number} xMin minimum x axis coord
 * @param {Number} yMin minimum y axis coord
 * @returns coord location array
 */
export const getRandomPosition = (wallMap, xMax, yMax, xMin, yMin) => {
    return new Promise((reject) => {
        const timer = setInterval(() => {
            const randomX = Math.floor(Math.random() * (xMax - xMin + 1) + xMin)
            const randomY = Math.floor(Math.random() * (yMax - yMin + 1) + yMin)
            
            if (wallMap[[randomX, randomY]] !== 1) {
                clearInterval(timer)
                reject([randomX, randomY])
            }
        }, 0)
    })
}