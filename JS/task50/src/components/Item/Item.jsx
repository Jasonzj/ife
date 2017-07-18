import React from 'react'
import PropTypes from 'prop-types'

const Item = ({
    title,
    endTime,
    stateText,
    stateClassName
}) => (
    <tr>
        <td>
            <input type="checkbox" />
        </td>
        <td>{title}</td>
        <td>{endTime}</td>
        <td className={stateClassName}>
            {stateText}
        </td>
        <td colSpan="2">
            <button className="lists__table__body__btn">编辑</button>
            <button className="lists__table__body__btn">删除</button>
            <button className="lists__table__body__btn">查看问卷</button>
        </td>
    </tr>
)

Item.propTypes = {
    title: PropTypes.string,
    stateClassName: PropTypes.string,
    endTime: PropTypes.string,
    stateText: PropTypes.string
}

export default Item