import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

let input
let title

const EditorTitle = ({
    onClick,
    onBlur
}) => (
    <div className="editor__head">
        <h1
            className="editor__title"
            onClick={onClick}
            ref={node => title = node}
        >
            请在此输入标题
        </h1>
        <input
            type="text"
            onBlur={onBlur}
            ref={node => input = node}
        />
    </div>
)

EditorTitle.propTypes = {
    onClick: PropTypes.func,
    onBlur: PropTypes.func
}

const vEditorTitle = connect(
    (state, props) => ({
        onClick() {
            input.value = title.innerHTML
            input.parentNode.classList.add('editor__head--input')
            input.focus()
        },
        onBlur() {
            if (input.value === '') {
                alert('标题不能为空')
                return
            }
            title.innerHTML = input.value
            input.parentNode.classList.remove('editor__head--input')
            props.setTitle(title.innerHTML)
        }
    })
)(EditorTitle)

export default vEditorTitle