import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Item from 'components/Item'

const stateTexts = ['未发布', '发布中', '已结束']

const Lists = ({
    items,
    toggleCheckedAction
}) => (
    <tbody className="lists__table__body">
        {
            items.map(item => (
                <Item
                    key={item.id}
                    stateText={stateTexts[item.state]}
                    stateClassName={item.state === 1 ? 'color--success' : ''}
                    toggleCheckedAction={toggleCheckedAction}
                    {...item}
                />
            ))
        }
    </tbody>
)

Lists.propTypes = {
    items: PropTypes.array,
    toggleCheckedAction: PropTypes.any
}

// connect
const ListConnect = connect(
    state => ({ items: state }),
    dispatch => ({
        toggleCheckedAction(id) {
            dispatch({
                id,
                type: 'TOGGLE_CHECKED'
            })
        }
    })
)(Lists)

export default ListConnect