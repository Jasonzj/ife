import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import shallowCompare from 'utils/shallowCompare'

// component
import Calendar from 'components/Calendar'
import Button from 'components/Button'

class EditorFooter extends Component {
    shouldComponentUpdate(nextProps) {
        return shallowCompare(nextProps, this.props)
    }

    render() {
        const {
            endTime,
            setDialog,
            setEndTime,
            showCalendar,
            saveQuestion,
            releaseQuestion,
            toggleCalendarHandle
        } = this.props

        return (
            <div className="editor__footer">
                <div>
                    <span>问卷截止日期: </span>
                    <input
                        type="text"
                        value={endTime}
                        onChange={() => {}}
                        onClick={toggleCalendarHandle}
                    />
                    <ReactCSSTransitionGroup
                        transitionName="calendar"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >
                        {
                            showCalendar &&
                            <Calendar
                                date={endTime}
                                setTime={setEndTime}
                                hide={toggleCalendarHandle}
                                noToday
                            />
                        }
                    </ReactCSSTransitionGroup>
                </div>
                <div>
                    <Button
                        className={1}
                        onClick={() => setDialog(true, saveQuestion, '是否保存问卷?')}
                    >
                        保存问卷
                    </Button>
                    <Button
                        className={1}
                        onClick={() => setDialog(true, releaseQuestion, `是否发布问卷?(此问卷截止日期为${endTime})`)}
                    >
                        发布问卷
                    </Button>
                </div>
            </div>
        )
    }
}

EditorFooter.propTypes = {
    endTime: PropTypes.string,
    setDialog: PropTypes.func,
    setEndTime: PropTypes.func,
    showCalendar: PropTypes.bool,
    saveQuestion: PropTypes.func,
    releaseQuestion: PropTypes.func,
    toggleCalendarHandle: PropTypes.func,
}

export default EditorFooter