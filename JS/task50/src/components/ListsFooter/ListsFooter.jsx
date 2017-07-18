import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

const ListsFooter = ({
    dispatch
}) => (
    <tfoot className="lists__table__footer">
        <tr>
            <td>
                <input
                    type="checkbox"
                    onChange={e => {
                        dispatch({
                            type: 'TOGGLE_ALL_CHECKED',
                            isChecked: e.target.checked
                        })
                    }}
                />
            </td>
            <td colSpan="5">
                全选
                <Button className={1}>删除</Button>
            </td>
        </tr>
    </tfoot>
)

ListsFooter.propTypes = {
    dispatch: PropTypes.func
}

const vListsFooter = connect()(ListsFooter)

export default vListsFooter