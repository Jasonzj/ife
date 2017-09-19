import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class EditorTitle extends PureComponent {
    constructor() {
        super()
        this.node = null
        this.state = {
            edit: false
        }
    }

    editHandle = (target) => {
        const { disabled } = this.props
        if (disabled) {
            return
        }
        if (target.value === '') {
            alert('选项不能为空')
            return
        }

        const edit = !this.state.edit
        this.setState({ edit })
        this.editInputFocus(edit)
    }

    editTextHandle = (target) => {
        const { setTitle } = this.props
        const msg = target.value
        const func = setTitle.shift()
        func(...setTitle, msg)
    }

    editInputFocus(bool) {
        if (bool) {
            setTimeout(() => {
                this.node.focus()
                this.node.setSelectionRange(0, -1)
            }, 0)
        }
    }

    render() {
        const { className, message, msg } = this.props
        const { edit } = this.state

        return (
            <div className={className}>
                {
                    msg &&
                    <span>
                        {msg}
                    </span>
                }
                {
                    !edit &&
                    <span
                        onClick={this.editHandle}
                    >
                        {message}
                    </span>
                }
                {
                    edit &&
                    <input
                        type="text"
                        defaultValue={message}
                        ref={node => this.node = node}
                        onBlur={e => this.editHandle(e.target)}
                        onChange={(e => this.editTextHandle(e.target))}
                    />
                }
            </div>
        )
    }

}

EditorTitle.propTypes = {
    msg: PropTypes.string,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    setTitle: PropTypes.array,
    className: PropTypes.string,
}

export default EditorTitle