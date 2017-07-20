// import React from 'react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// scss
import './Options.scss'

class Options extends Component {
    constructor() {
        super()

        this.state = {
            edit: false
        }
    }

    editHandle = (target) => {
        if (target.value === '') {
            alert('选项不能为空')
            return
        }
        this.setState({ edit: !this.state.edit })
    }

    editTextHandle = (target) => {
        const { chooseId, optionId, setOption } = this.props
        const msg = target.value
        setOption(chooseId, optionId, msg)
    }

    editInputFocus(node) {
        new Promise((rej) => {
            rej(node)
        }).then((input) => {
            input && input.focus()
        })
    }

    render() {
        const { type, message, disabled, removeOption, chooseId, optionId } = this.props
        const { edit } = this.state

        return (
            <div className="options">
                <input
                    type={type}
                    disabled={disabled}
                />
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
                        className="options__edit"
                        type="text"
                        onBlur={e => this.editHandle(e.target)}
                        defaultValue={message}
                        onChange={e => this.editTextHandle(e.target)}
                        ref={node => this.editInputFocus(node)}
                    />
                }
                <span
                    className="option__close"
                    onClick={() => removeOption(chooseId, optionId)}
                >
                    X
                </span>
            </div>
        )
    }
}

Options.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.number,
    chooseId: PropTypes.number,
    optionId: PropTypes.number,
    setOption: PropTypes.func,
    removeOption: PropTypes.func
}

export default Options