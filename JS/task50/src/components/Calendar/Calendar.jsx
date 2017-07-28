import React, { Component } from 'react'
import PropTypes from 'prop-types'

// scss
import './Calendar.scss'

// component
import CalendarHead from './subComponent/CalendarHead'
import CalendarBody from './subComponent/CalendarBody'

class Calendar extends Component {
    constructor({ date }) {
        super()

        this.currDate = new Date()
        this.state = {
            date: new Date(date),
            cacheDate: new Date(date),
            dayArr: [],
            title: ''
        }
    }

    componentDidMount() {
        this.initDate(this.state.cacheDate)
    }

    initDate(date) {
        this.setState({ title: `${date.getFullYear()} 年 ${date.getMonth() + 1} 月` })

        const dayArr = []
        const dat = new Date(date)
        dat.setDate((dat.getDate() - dat.getDate()) + 1)
        dat.setDate(dat.getDate() - dat.getDay())

        for (let i = 0; i < 42; i++) {
            const data = {
                id: i,
                text: dat.getDate()
            }

            if (dat.getMonth() !== date.getMonth()) {
                data.className = 'white'
            } else if (
                dat.getDate() === date.getDate()
                && this.state.cacheDate.getMonth() === this.state.date.getMonth()
            ) {
                data.className = 'current'
            } else if (
                dat.getDay() === 0
                || dat.getDay() === 6
            ) {
                data.className = 'light'
            } else {
                data.className = ''
            }

            dayArr.push(data)

            dat.setDate(dat.getDate() + 1)
        }

        this.setState({ dayArr })
    }

    getDay(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    setMonth = (conditions) => {
        conditions
            ? this.state.cacheDate.setMonth(this.state.cacheDate.getMonth() + 1)
            : this.state.cacheDate.setMonth(this.state.cacheDate.getMonth() - 1)

        this.initDate(this.state.cacheDate)
    }

    setCurrent = (target) => {
        const { setTime, hide, noToday } = this.props
        const _cacheDate = this.state.cacheDate.setDate((target.innerHTML))
        const cacheDate = new Date(_cacheDate)
        const date = new Date(_cacheDate)

        if (
            noToday
            && date < this.currDate
        ) {
            alert('选择日期早于当前日期，请重新选择')
            return
        }

        this.setState(() => ({
            date,
            cacheDate
        }))
        this.initDate(date)

        setTime(this.getDay(date))
        hide()
    }

    render() {
        return (
            <div className="calendar">
                <CalendarHead
                    title={this.state.title}
                    setUpMonth={() => this.setMonth(false)}
                    setDownMonth={() => this.setMonth(true)}
                />
                <CalendarBody
                    dayArr={this.state.dayArr}
                    setCurrent={this.setCurrent}
                />
            </div>
        )
    }
}

Calendar.propTypes = {
    date: PropTypes.string,
    setTime: PropTypes.func,
    hide: PropTypes.func,
    noToday: PropTypes.bool
}

export default Calendar