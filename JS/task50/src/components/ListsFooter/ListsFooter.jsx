import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

// action
import { AtoggleAllChecked, AremoveAllQuestion } from 'action/questionnaires'

const ListsFooter = ({
    dispatch
}) => (
    <tfoot className="lists__table__footer">
        <tr>
            <td>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        dispatch(AtoggleAllChecked(e.target.checked))
                    }}
                />
            </td>
            <td colSpan="5">
                全选
                <Button
                    className={1}
                    onClick={() => {
                        dispatch(AremoveAllQuestion())
                    }}
                >
                    删除
                </Button>
            </td>
        </tr>
    </tfoot>
)

ListsFooter.propTypes = {
    dispatch: PropTypes.func
}

const vListsFooter = connect()(ListsFooter)

export default vListsFooter