import React, { Component } from 'react'
import PropTypes from 'prop-types'

// const EditorTitle = ({
//     onClick,
//     onBlur,
//     className,
//     message
// }) => (
//     <div className={`${className}__head`}>
//         <h1
//             className={`${className}__title`}
//             onClick={onClick}
//             ref={node => title = node}
//         >
//             {message}
//         </h1>
//         <input
//             type="text"
//             onBlur={onBlur}
//             ref={node => input = node}
//         />
//     </div>
// )

class EditorTitle extends Component {
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
        const { setTitle } = this.props
        const msg = target.value
        const func = setTitle.shift()
        func(...setTitle, msg)
    }

    editInputFocus(node) {
        new Promise((rej) => {
            rej(node)
        }).then((input) => {
            input && input.focus()
        })
    }

    render() {
        const { className, message } = this.props
        const { edit } = this.state

        return (
            <div className={className}>
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
                        onBlur={e => this.editHandle(e.target)}
                        defaultValue={message}
                        onChange={(e => this.editTextHandle(e.target))}
                        ref={node => this.editInputFocus(node)}
                    />
                }
            </div>
        )
    }

}

EditorTitle.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    setTitle: PropTypes.array
}

export default EditorTitle