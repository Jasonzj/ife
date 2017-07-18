import React from 'react'

import Button from 'components/Button'

const ListsFooter = () => (
    <tfoot className="lists__table__footer">
        <tr>
            <td>
                <input type="checkbox" />
            </td>
            <td colSpan="5">
                全选
                <Button className={1}>删除</Button>
            </td>
        </tr>
    </tfoot>
)

export default ListsFooter