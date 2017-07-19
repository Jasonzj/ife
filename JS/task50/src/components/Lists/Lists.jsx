import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Item from 'components/Item'

// action
import { AtoggleChecked, AremoveQuestion } from 'action/questionnaires'

const stateTexts = ['未发布', '发布中', '已结束']

const Lists = ({
    items,
    toggleChecked,
    removeQuestion
}) => (
    <tbody className="lists__table__body">
        {
            items.map(item => (
                <Item
                    key={item.id}
                    stateText={stateTexts[item.state]}
                    stateClassName={item.state === 1 ? 'color--success' : ''}
                    toggleChecked={toggleChecked}
                    removeQuestion={removeQuestion}
                    {...item}
                />
            ))
        }
    </tbody>
)

Lists.propTypes = {
    items: PropTypes.array,
    toggleChecked: PropTypes.func,
    removeQuestion: PropTypes.func
}

// connect
const vList = connect(
    state => ({ items: state }),
    dispatch => ({
        toggleChecked(id) {
            dispatch(AtoggleChecked(id))
        },
        removeQuestion(id) {
            dispatch(AremoveQuestion(id))
        }
    })
)(Lists)

export default vList