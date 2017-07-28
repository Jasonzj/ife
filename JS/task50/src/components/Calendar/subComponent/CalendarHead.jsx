import React from 'react'
import PropTypes from 'prop-types'

const CalendarHead = ({
    title,
    setUpMonth,
    setDownMonth
}) => (
    <div>
        <p className="title">
            <strong className="calendar-title">
                {title}
            </strong>
            <strong className="calendar_prev" onClick={setUpMonth}>
                《
            </strong>
            <strong className="calendar_next" onClick={setDownMonth}>
                》
            </strong>
        </p>
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
    </div>
)

CalendarHead.propTypes = {
    title: PropTypes.string,
    setUpMonth: PropTypes.func,
    setDownMonth: PropTypes.func
}

export default CalendarHead