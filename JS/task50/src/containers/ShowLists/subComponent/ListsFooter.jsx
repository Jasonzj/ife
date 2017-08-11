import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

// action
import { AtoggleAllChecked, AsetDialog, AremoveAllQuestion } from 'action/questionnaires'

const ListsFooter = ({
    isChecked,
    setDialog,
    isAllchecked,
    toogleAllChecked,
    removeAllQuestion
}) => (
    <tfoot className="lists__table__footer">
        <tr>
            <td>
                <input
                    type="checkbox"
                    onChange={e => toogleAllChecked(e.target.checked)}
                    checked={isAllchecked}
                />
            </td>
            <td colSpan="5">
                全选
                <Button
                    className={1}
                    onClick={() => {
                        if (isChecked) {
                            alert('您还没选择要删除的文卷')
                            return
                        }
                        setDialog(true, removeAllQuestion, '确定删除所有选择的问卷')
                    }}
                >
                    删除
                </Button>
            </td>
        </tr>
    </tfoot>
)

ListsFooter.propTypes = {
    setDialog: PropTypes.func,
    isChecked: PropTypes.bool,
    isAllchecked: PropTypes.bool,
    toogleAllChecked: PropTypes.func,
    removeAllQuestion: PropTypes.func
}

const getState = state => ({
    isAllchecked: state.lists.filter(t => !t.state).every(t => t.isChecked),
    isChecked: state.lists.every(t => !t.isChecked)
})

const getDispatch = dispatch => ({
    toogleAllChecked(checked) {
        dispatch(AtoggleAllChecked(checked))
    },
    removeAllQuestion() {
        dispatch(AremoveAllQuestion())
    },
    setDialog(bool, func, message) {
        dispatch(AsetDialog(bool, func, message))
    }
})

export default connect(
   getState,
   getDispatch
)(ListsFooter)