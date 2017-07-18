import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// component
import Button from 'components/Button'

let btnBox

const EditorAdd = ({
    onClick
}) => (
    <div className="editor__add">
        <div
            className="editor__add__box"
            ref={node => btnBox = node}
        >
            <Button className={1}>单选</Button>
            <Button className={1}>多选</Button>
            <Button className={1}>文本框</Button>
        </div>
        <div
            className="editor__add__btn"
            onClick={onClick}
        >
            +添加问题
        </div>
    </div>
)

EditorAdd.propTypes = {
    onClick: PropTypes.func
}

const vEditorAdd = connect(
    () => ({
        onClick() {
            btnBox.style.display = 'block'
        }
    })
)(EditorAdd)

export default vEditorAdd