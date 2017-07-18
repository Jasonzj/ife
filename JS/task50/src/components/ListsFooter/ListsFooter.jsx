import React from 'react'

const ListsFooter = () => (
    <tfoot className="lists__table__footer">
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            <td colSpan="5">
                全选
                <button className="lists__table__body__btn">删除</button>
            </td>
        </tr>
    </tfoot>
)

export default ListsFooter