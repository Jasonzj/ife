/*
 * @Author: Jason 
 * @Date: 2017-06-29 14:49:51 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-29 19:47:49
 */

import { addEvent } from './common';

export class Calendar {
    constructor(ele) {
        this.ele = document.querySelector(ele)
        this.date = new Date() 
        this.cacheDate = new Date()
        this.weeks = ['日', '一', '二', '三', '四', '五', '六']
        this.dayArr = []

        this.init()
    }


    init() {
        this.render()
        this.renderDate(this.cacheDate)
        this.setEvent()
    }

    render() {
        // box
        const box = document.createElement('div')
        box.className = 'calendar'
        this.box = box

        // title
        const title = document.createElement('p')
        title.className = 'title'
        title.innerHTML = `
            <strong class="title-s"></strong>
            <strong class="calendar_prev" style="float:left; cursor: pointer;"><</strong>
            <strong class="calendar_next" style="float:right; cursor: pointer;">></strong>
        `

        box.appendChild(title)

        // week
        this.weeks.forEach(item => {
            const span = document.createElement('span')
            span.innerHTML = `${item}`
            box.appendChild(span)
        })

        for(let i = 0; i < 42; i++) {
            const span = document.createElement('span')
            span.innerHTML = 0
            span.style.cursor = 'pointer'
            box.appendChild(span)
            this.dayArr.push(span)
        }
        
        this.ele.appendChild(box)
    }

    renderDate(date) {
        document.querySelector('.title-s').innerHTML = ` ${date.getFullYear()} 年 ${date.getMonth() + 1} 月`

        const dat = new Date(date);
        dat.setDate(dat.getDate() - date.getDate() + 1)     // 设置日期到第一天 
        dat.setDate(dat.getDate() - dat.getDay())           // 用第一天减去第一天的周数获得上月的的后(第一天周数)天

        this.dayArr.forEach((item, i) => {
            item.innerHTML = dat.getDate()

            if (dat.getMonth() !== date.getMonth()) {       // 如果不是同月
                item.className = 'white'
            } 

            else if (dat.getDate() === date.getDate()           // 高亮当前天数
                && this.cacheDate.getMonth() === this.date.getMonth()     // 判断月
            ) {
                item.className = 'current'
            } 
            
            else if (dat.getDay() === 0 || dat.getDay() === 6) {   // 判断周末
                item.className = 'light'
            } 
            

            else {      // 以上都不满足
                item.className = ''
            }

            dat.setDate(dat.getDate() + 1)  // 每次循环加1
        })

    }

    setDate(conditions) { 
        conditions 
            ? this.cacheDate.setMonth(this.cacheDate.getMonth() + 1) 
            : this.cacheDate.setMonth(this.cacheDate.getMonth() - 1)

        this.renderDate(this.cacheDate)
    }

    clickHandle(e) {
        e.stopPropagation()

        const target = e.target

        if (target.nodeName === 'STRONG' 
            || target.nodeName === 'SPAN' 
            && target.className === 'white'
        ) {
            const conditions = { calendar_next: true, calendar_prev: false }[target.className],   // 根据className取值
                conditions2 = parseInt(target.innerHTML) < 15     // 根据文本值取值
            
            conditions ? this.setDate(conditions) : this.setDate(conditions2)
        } 
            
        if (target.nodeName === "SPAN" && target.className === '') {
            this.cacheDate.setDate(parseInt(target.innerHTML))
            this.date = new Date(this.cacheDate)
            this.dayArr.filter(item => item.className === 'current')[0].className = ''
            target.className = 'current'
        }
    }

    setEvent() {
        addEvent(this.box, 'click', this.clickHandle.bind(this))
    }
    
}
