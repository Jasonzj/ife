import React from 'react'
import PropTypes from 'prop-types'

const CalendarBody = ({
    dayArr,
    setCurrent
}) => (
    <div>
        {
            dayArr.map(day => (
                <span
                    key={day.id}
                    className={day.className}
                    onClick={e => setCurrent(e.target)}
                >
                    {day.text}
                </span>
            ))
        }
    </div>
)

CalendarBody.propTypes = {
    dayArr: PropTypes.array,
    setCurrent: PropTypes.func
}

export default CalendarBody