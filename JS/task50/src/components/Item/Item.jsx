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
    setDialog,
    btnStateT,
    btnStateF,
    removeQuestion
}) => (
    <tr>
        <td>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleChecked(id)}
                disabled={btnStateF}
            />
        </td>
        <td>{title}</td>
        <td>{endTime}</td>
        <td className={stateClassName}>
            {stateText}
        </td>
        <td colSpan="2">
            <Link to={`/editor/${id}`}>
                <Button
                    className={btnStateT}
                    disabled={btnStateT}
                >
                    编辑
                </Button>
            </Link>
            <Button
                className={btnStateT}
                disabled={btnStateT}
                onClick={() => setDialog(true, () => removeQuestion(id), '确定删除此问卷')}
            >
                删除
            </Button>
            <Link to={`/check/${id}`}>
                <Button className={1}>查看问卷</Button>
            </Link>
            <Button
                className={btnStateF}
                disabled={btnStateF}
            >
                查看数据
            </Button>
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
    setDialog: PropTypes.func,
    btnStateT: PropTypes.number,
    btnStateF: PropTypes.number,
    removeQuestion: PropTypes.func,
}

export default Item