import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// component
import Button from 'components/Button'

const Item = ({
    id,
    title,
    endTime,
    chooses,
    checkData,
    setDialog,
    btnStateT,
    btnStateF,
    isChecked,
    stateText,
    toggleChecked,
    stateClassName,
    removeQuestion
}) => (
    <tr>
        <td>
            <input
                type="checkbox"
                checked={isChecked}
                disabled={btnStateF}
                onChange={() => toggleChecked(id)}
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
            <Link
                to={`/data/${id}`}
                onClick={e => checkData(chooses, e)}
            >
                <Button
                    disabled={btnStateF}
                    className={btnStateF}
                >
                    查看数据
                </Button>
            </Link>
        </td>
    </tr>
)

Item.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    chooses: PropTypes.array,
    setDialog: PropTypes.func,
    endTime: PropTypes.string,
    checkData: PropTypes.func,
    isChecked: PropTypes.bool,
    stateText: PropTypes.string,
    btnStateT: PropTypes.number,
    btnStateF: PropTypes.number,
    toggleChecked: PropTypes.func,
    removeQuestion: PropTypes.func,
    stateClassName: PropTypes.string,
}

export default Item