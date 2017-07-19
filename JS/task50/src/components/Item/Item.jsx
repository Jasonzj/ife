import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// component
import Button from 'components/Button'

const Item = ({
    id,
    title,
    endTime,
    stateText,
    stateClassName,
    isChecked,
    toggleChecked,
    removeQuestion
}) => (
    <tr>
        <td>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleChecked(id)}
            />
        </td>
        <td>{title}</td>
        <td>{endTime}</td>
        <td className={stateClassName}>
            {stateText}
        </td>
        <td colSpan="2">
            <Link to="/editor">
                <Button className={1}>编辑</Button>
            </Link>
            <Button
                className={1}
                onClick={() => removeQuestion(id)}
            >
                删除
            </Button>
            <Button className={1}>查看问卷</Button>
        </td>
    </tr>
)

Item.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    stateClassName: PropTypes.string,
    endTime: PropTypes.string,
    stateText: PropTypes.string,
    isChecked: PropTypes.bool,
    toggleChecked: PropTypes.func,
    removeQuestion: PropTypes.func
}

export default Item