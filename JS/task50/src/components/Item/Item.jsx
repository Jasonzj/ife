import React from 'react'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

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
            <Button className={1}>编辑</Button>
            <Button className={1}>删除</Button>
            <Button className={1}>查看问卷</Button>
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