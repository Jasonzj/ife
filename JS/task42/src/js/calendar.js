/*
 * @Author: Jason 
 * @Date: 2017-06-29 14:49:51 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-20 01:06:11
 */

import { 
    addEvent, 
    setPush, 
    setArrClassName, 
    setClassName, 
    clearCurrent,
    arrSort
} from './common'

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
        this.ele = document.querySelector(JSON.append)
        this.input = JSON.input
        this.multi = JSON.multi
        this.min = JSON.min || 3
        this.max = JSON.max || 50
        this.multiDates = []
        this.cacheDate = new Date()
        this.date = new Date() 
        this.dayArr = []
        this.state = false

        this.callBack = JSON.callBack
        this.multiCallBack = JSON.multiCallBack || function() { alert('时间跨度不在范围内') }

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
            <b class="calendar-title"></b>
            <strong class="calendar-prev"><</strong>
            <strong class="calendar-next">></strong>
        `
        this.title = title
        box.appendChild(title)

        // week
        this.weeks.forEach(item => {
            const span = document.createElement('span')
            span.innerHTML = `${item}`
            span.className = 'calendar-week'
            box.appendChild(span)
        })

        for(let i = 0; i < 42; i++) {
            const span = document.createElement('span')
            span.innerHTML = 0
            box.appendChild(span)
            this.dayArr.push(span)
        }

        // input
        const input = document.createElement('input')
        input.type = 'text'
        input.className = `${this.input} calendar-input`
        input.disabled = 'disabled'
        this.input = input
        
        // button
        if (this.multi) {
            const btnBox = document.createElement('div')
            btnBox.className = 'calendar-btnBox'
            const btnT = document.createElement('button')
            const btnF = document.createElement('button')
            btnT.className = 'calendar-btnT'
            btnF.className = 'calendar-btnF'
            btnT.innerHTML = '确定'
            btnF.innerHTML = '取消'
            btnBox.appendChild(btnT)
            btnBox.appendChild(btnF)
            box.appendChild(btnBox)
        }

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
        if (this.multi) {
            arrSort(this.multiDates)
            return `${this.multiDates[0].getFullYear()}-${this.multiDates[0].getMonth() + 1}-${this.multiDates[0].getDate()} 至 ${this.multiDates[1].getFullYear()}-${this.multiDates[1].getMonth() + 1}-${this.multiDates[1].getDate()}`
        }
        return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
    }

    /**
     * 日历数据渲染
     * 
     * @param {Date} date 日期Date对象
     * @memberof Calendar
     */
    renderDate(date) {
        this.title.querySelector('.calendar-title').innerHTML = ` ${date.getFullYear()} 年 ${date.getMonth() + 1} 月`

        const dat = new Date(date)
        dat.setDate(dat.getDate() - date.getDate() + 1)     // 设置日期到第一天 
        dat.setDate(dat.getDate() - dat.getDay())           // 用第一天减去第一天的周数获得上月的的后(第一天周数)天
        clearCurrent(this.dayArr, 'current')
        clearCurrent(this.dayArr, 'multi')
        
        this.dayArr.forEach((item, i) => {
            const datDate = dat.getDate()
            const datDay = dat.getDay()
            const datMonth = dat.getMonth()
            item.innerHTML = datDate

            if (datMonth !== date.getMonth()) {        // 不是当月变暗
                item.className = 'calendar-white'
            } 

            else if (
                datDate === date.getDate()                     // 高亮当前天数
                && this.cacheDate.getMonth() === this.date.getMonth()     // 判断月
            ) {
                if (!this.multi) item.className = 'current'
            } 
            
            else if (
                datDay === 0 
                || datDay === 6) {          // 判断周末
                item.className = 'light'
            } 
            
            else {      // 以上都不满足
                item.className = ''
            }

            const multiDateFirst = this.multiDates[0]
            const multiDateLast = this.multiDates[1]

            // 判断时间跨度
            if (
                multiDateFirst                               // 如果存在
                && multiDateFirst.getDate() === datDate      // 天数相同
                && multiDateFirst.getMonth() === datMonth    // 月数相同
                || multiDateLast                             // 如果存在
                && multiDateLast.getDate() === datDate       // 天数相同
                && multiDateLast.getMonth() === datMonth     // 月数相同
            ) {
                setClassName(item, 'current')
            }

            if (
                multiDateFirst > dat        // 判断在0，1之间还是1，0之间
                && multiDateLast < dat 
                || multiDateLast > dat 
                && multiDateFirst < dat
            ) {
                setClassName(item, 'multi')
            }

            dat.setDate(datDate + 1)  
        })

    }

    /**
     * 设置日期月份
     * 
     * @param {Boolean} conditions true为下个月，false为上个月
     * @memberof Calendar
     */
    setDateMonth(conditions) {
        this.cacheDate.setMonth(this.cacheDate.getMonth() + (conditions ? 1 : -1))
        this.renderDate(this.cacheDate)
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
        this.input.value = this.getDate()                   // input赋值
        this.setToggle()    // 隐藏日历
        this.callBack()     // 调用回调
        clearCurrent(this.dayArr ,'current')    // 清除高亮
        setClassName(target, 'current')         // 设置高亮
    }

    /**
     * 时间跨度处理
     * 
     * @memberof Calendar
     */
    setMulti(target) {
        let current = null

        this.dayArr.forEach((item, i) => {
            if (item === target) {
                current = i
            }
        })

        const date = new Date(this.cacheDate)
        date.setDate(date.getDate() - this.cacheDate.getDate() + 1)     // 设置日期到第一天 
        date.setDate(date.getDate() - date.getDay())                    // 用第一天减去第一天的周数获得上月的的后(第一天周数)天
        date.setDate(date.getDate() + current)
        
        const preDate = this.multiDates[this.multiDates.length - 1]         // 获取第一个日期
        const interval = Math.abs(date - preDate) / 1000 / 60 / 60 / 24     // 用当前日期减去第一个日期获取跨度

        if (interval < this.min || interval > this.max) {
            this.multiCallBack()
            return false
        } 
        
        setPush(this.multiDates, date)
        setClassName(target, 'current')

        if (this.multiDates.length > 2) {
            this.multiDates.shift()
        }
        if (this.multiDates.length == 2) {
            this.renderDate(this.cacheDate)
        }

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
     * 按钮事件处理
     * 
     * @param {Boolean} btn true为确定按钮，false为取消
     * @memberof Calendar
     */
    btnHandle(btn) {
        if (btn) {
            if (this.multiDates.length !== 2) {
                alert('请选择时间')
                return false
            }
            this.input.value = this.getDate()
            this.setToggle()
            this.callBack()     // 调用回调
            return false
        }
        this.multiDates = []
        this.renderDate(this.cacheDate)
        this.setToggle()
    }

    /**
     * 点击事件处理
     * 
     * @param {Event} e 
     * @memberof Calendar
     */
    clickHandle(e) {
        const target = e.target
        const nodeName = target.nodeName
        const className = target.className

        // 如果是月份按钮
        if (nodeName === 'STRONG') {
            const conditions = className === 'calendar-next' ? true : false
            this.setDateMonth(conditions)
        } 
            
        // 如果是日历input框
        if (nodeName === 'INPUT') this.setToggle()

        // 如果不是时间跨度日历组件
        if (!this.multi) {
            if (nodeName === 'SPAN' 
                && className !== 'calendar-white'
                && className !== 'calendar-week'
            ) { 
                this.setCurrent(target)
            }
            return false
        } 

        // 时间跨度处理
        if (nodeName === 'SPAN') this.setMulti(target)

        // 如果是按钮
        if (nodeName === 'BUTTON') {
            const btn = className === 'calendar-btnT' ? true : false
            this.btnHandle(btn)
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
