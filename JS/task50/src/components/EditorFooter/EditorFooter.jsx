import React from 'react'
import PropTypes from 'prop-types'

// component
import Calendar from 'components/Calendar'

const EditorFooter = ({
    endTime,
    setEndTime,
    showCalendar,
    toggleCalendarHandle
}) => (
    <div className="editor__footer">
        <input
            type="text"
            value={endTime}
            onChange={() => {}}
            onClick={toggleCalendarHandle}
        />
        {
            showCalendar &&
            <Calendar
                date={endTime}
                setTime={setEndTime}
                hide={toggleCalendarHandle}
                noToday
            />
        }
    </div>
)

EditorFooter.propTypes = {
    endTime: PropTypes.string,
    showCalendar: PropTypes.bool,
    setEndTime: PropTypes.func,
    toggleCalendarHandle: PropTypes.func
}

export default EditorFooter