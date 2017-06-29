/*
 * @Author: Jason 
 * @Date: 2017-06-29 14:49:51 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-29 21:10:09
 */

import { addEvent } from './common';

/**
 * 日历组件
 * 
 * @export
 * @class Calendar
 */
export class Calendar {
    /**
     * Creates an instance of Calendar.
     * @param {String} ele 日历外部盒子
     * @memberof Calendar
     */
    constructor(JSON) {
        this.weeks = ['日', '一', '二', '三', '四', '五', '六']
        this.ele = document.querySelector(JSON.ele)
        this.callBack = JSON.callBack
        this.input = JSON.input
        this.cacheDate = new Date()
        this.date = new Date() 
        this.dayArr = []
        this.state = false

        this.init()
    }

    /**
     * 初始化
     * 
     * @memberof Calendar
     */
    init() {
        this.render()
        this.renderDate(this.cacheDate)
        this.setEvent()
    }

    /**
     * 初始化渲染
     * 
     * @memberof Calendar
     */
    render() {
        //container
        const container = document.createElement('div')
        container.className = 'calendar-con'
        this.container = container

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

        // input
        const input = document.createElement('input')
        input.type = 'text'
        input.className = `${this.input} calendar-input`
        input.disabled = 'disabled'
        this.input = input

        container.appendChild(input)
        container.appendChild(box)
        this.ele.appendChild(container)
    }

    /**
     * 获取日期
     * 
     * @returns 日期
     * @memberof Calendar
     */
    getDate() {
        return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
    }

    /**
     * 日历数据渲染
     * 
     * @param {Date} date 日期Date对象
     * @memberof Calendar
     */
    renderDate(date) {
        document.querySelector('.title-s').innerHTML = ` ${date.getFullYear()} 年 ${date.getMonth() + 1} 月`

        const dat = new Date(date);
        dat.setDate(dat.getDate() - date.getDate() + 1)     // 设置日期到第一天 
        dat.setDate(dat.getDate() - dat.getDay())           // 用第一天减去第一天的周数获得上月的的后(第一天周数)天

        this.dayArr.forEach((item, i) => {
            item.innerHTML = dat.getDate()

            if (dat.getMonth() !== date.getMonth()) {        // 不是当月变暗
                item.className = 'white'
            } 

            else if (dat.getDate() === date.getDate()                     // 高亮当前天数
                && this.cacheDate.getMonth() === this.date.getMonth()     // 判断月
            ) {
                item.className = 'current'
            } 
            
            else if (dat.getDay() === 0 || dat.getDay() === 6) {          // 判断周末
                item.className = 'light'
            } 
            
            else {      // 以上都不满足
                item.className = ''
            }

            dat.setDate(dat.getDate() + 1)  
        })

    }

    /**
     * 设置日期月份
     * 
     * @param {Boolean} conditions true为下个月，false为上个月
     * @memberof Calendar
     */
    setDateMonth(conditions) { 
        conditions 
            ? this.cacheDate.setMonth(this.cacheDate.getMonth() + 1) 
            : this.cacheDate.setMonth(this.cacheDate.getMonth() - 1)

        this.renderDate(this.cacheDate)
    }

    /**
     * 清空所有current高亮day
     * 
     * @memberof Calendar
     */
    clearCurrent() {
        this.dayArr.filter(item => item.className === 'current').forEach(item => item.className = '')
    }

    /**
     * 设置高亮并返回日期给input
     * 
     * @param {Element} target 当前点击目标
     * @memberof Calendar
     */
    setCurrent(target) {
        this.cacheDate.setDate(parseInt(target.innerHTML))  // 给缓存日期设置天数
        this.date = new Date(this.cacheDate)                // 赋值缓存日期给this.date
        this.clearCurrent()                 // 清除高亮
        target.className = 'current'
        this.input.value = this.getDate()   // input赋值
        this.setToggle()    // 隐藏日历
        this.callBack()     // 调用回调
    }

    /**
     * 设置日历显示隐藏
     * 
     * @memberof Calendar
     */
    setToggle() {
        if (this.state) {
            this.box.classList.remove('show')
            this.state = false
            return false
        }
        this.box.classList.add('show')
        this.state = true
    }

    /**
     * 点击事件处理
     * 
     * @param {Event} e 
     * @memberof Calendar
     */
    clickHandle(e) {
        e.stopPropagation()

        const target = e.target

        if (target.nodeName === 'STRONG' 
            || target.nodeName === 'SPAN' 
            && target.className === 'white'
        ) {
            const conditions = { calendar_next: true, calendar_prev: false }[target.className],   // 根据className取值
                conditions2 = parseInt(target.innerHTML) < 15     // 根据文本值取值
            
            conditions 
                ? this.setDateMonth(conditions) 
                : this.setDateMonth(conditions2)
        } 
            
        if (target.nodeName === 'SPAN' && target.className !== 'white') {
            this.setCurrent(target)
        }

        if (target.nodeName === 'INPUT') {
            this.setToggle()
        }
    }

    /**
     * 事件绑定
     * 
     * @memberof Calendar
     */
    setEvent() {
        addEvent(this.container, 'click', this.clickHandle.bind(this))
    }
    
}
