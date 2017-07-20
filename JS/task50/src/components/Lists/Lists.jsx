import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Item from 'components/Item'
import Dialog from 'components/Dialog'

// action
import { AtoggleChecked, AremoveQuestion, AremoveAllQuestion, AsetDialog } from 'action/questionnaires'

const stateTexts = ['未发布', '发布中', '已结束']

const Lists = ({
    lists,
    dialog,
    toggleChecked,
    removeQuestion,
    setDialog,
    removeId,
    removeTitle
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
                    {...item}
                />
            ))
        }
        {
            dialog &&
            <Dialog
                removeMessage={removeTitle}
                close={() => setDialog(false, null)}
                onClick={() => removeQuestion(removeId)}
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
    removeId: PropTypes.any,
    removeTitle: PropTypes.string
}

// connect
const getState = state => ({
    lists: state.lists,
    dialog: state.dialog.bool,
    removeId: state.dialog.removeId,
    removeTitle: state.dialog.removeTitle
})

const getDispatch = dispatch => ({
    toggleChecked(id) {
        dispatch(AtoggleChecked(id))
    },
    removeQuestion(id) {
        if (id === 'all') {
            dispatch(AremoveAllQuestion())
            return
        }
        dispatch(AremoveQuestion(id))
    },
    setDialog(bool, id, title) {
        dispatch(AsetDialog(bool, id, title))
    }
})

export default connect(
    getState,
    getDispatch
)(Lists)