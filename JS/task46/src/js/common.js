/*
 * @Author: Jason 
 * @Date: 2017-07-03 20:04:37 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-03 20:05:02
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