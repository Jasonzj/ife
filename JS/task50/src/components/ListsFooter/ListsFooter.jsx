import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

// action
import { AtoggleAllChecked, AsetDialog } from 'action/questionnaires'

const ListsFooter = ({
    toogleAllChecked,
    setDialog,
    isAllchecked
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
                        if (!isAllchecked) {
                            alert('您还没选择要删除的文卷')
                            return
                        }
                        setDialog(true, 'all', '所有选择的问卷')
                    }}
                >
                    删除
                </Button>
            </td>
        </tr>
    </tfoot>
)

ListsFooter.propTypes = {
    toogleAllChecked: PropTypes.func,
    setDialog: PropTypes.func,
    isAllchecked: PropTypes.bool
}

const vListsFooter = connect(
    state => ({
        isAllchecked: state.lists.filter(t => !t.state).every(t => t.isChecked)
    }),
    dispatch => ({
        toogleAllChecked(checked) {
            dispatch(AtoggleAllChecked(checked))
        },
        setDialog(bool, id, title) {
            dispatch(AsetDialog(bool, id, title))
        }
    })
)(ListsFooter)

export default vListsFooter