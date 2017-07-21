import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Item from 'components/Item'
import Dialog from 'components/Dialog'

// action
import { AtoggleChecked, AremoveQuestion, AsetDialog } from 'action/questionnaires'

const stateTexts = ['未发布', '发布中', '已结束']

const Lists = ({
    lists,
    dialog,
    toggleChecked,
    removeQuestion,
    setDialog,
    dialogFunc,
    message
}) => (
    <tbody className="lists__table__body">
        {
            lists.map(item => (
                <Item
                    key={item.id}
                    stateText={stateTexts[item.state]}
                    stateClassName={item.state === 1 ? 'color--success' : ''}
                    toggleChecked={toggleChecked}
                    setDialog={setDialog}
                    btnStateT={item.state ? 0 : 1}
                    btnStateF={item.state ? 1 : 0}
                    removeQuestion={removeQuestion}
                    {...item}
                />
            ))
        }
        {
            dialog &&
            <Dialog
                message={message}
                close={() => setDialog(false, null)}
                onClick={dialogFunc}
            />
        }
    </tbody>
)

Lists.propTypes = {
    lists: PropTypes.array,
    dialog: PropTypes.bool,
    toggleChecked: PropTypes.func,
    removeQuestion: PropTypes.func,
    setDialog: PropTypes.func,
    dialogFunc: PropTypes.func,
    message: PropTypes.string
}

// connect
const getState = state => ({
    lists: state.lists,
    dialog: state.dialog.bool,
    dialogFunc: state.dialog.func,
    message: state.dialog.message
})

const getDispatch = dispatch => ({
    toggleChecked(id) {
        dispatch(AtoggleChecked(id))
    },
    removeQuestion(id) {
        dispatch(AremoveQuestion(id))
    },
    setDialog(bool, func, message) {
        dispatch(AsetDialog(bool, func, message))
    }
})

export default connect(
    getState,
    getDispatch
)(Lists)