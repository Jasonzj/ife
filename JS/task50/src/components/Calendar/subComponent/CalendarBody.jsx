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
                    onClick={setCurrent}
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