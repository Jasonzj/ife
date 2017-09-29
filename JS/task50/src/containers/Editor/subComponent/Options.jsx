import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shallowCompare from 'utils/shallowCompare'

// component
import EditorTitle from 'components/EditorTitle'

class Options extends Component {
    shouldComponentUpdate(nextProps) {
        return shallowCompare(nextProps, this.props)
    }

    render() {
        const {
            type,
            check,
            message,
            disabled,
            chooseId,
            optionId,
            noTextarea,
            removeOption,
            setOptionTitle,
            setOptionChecked
        } = this.props

        return (
            <div className="options">
                <input
                    type={type}
                    defaultValue=""
                    disabled={disabled}
                    name={`${type}${chooseId}`}
                    onChange={e => setOptionChecked(chooseId, optionId, e.target)}
                />
                {
                    noTextarea &&
                    <EditorTitle
                        message={message}
                        disabled={!!check}
                        className="option__title"
                        setTitle={[setOptionTitle, chooseId, optionId]}
                    />
                }
                {
                    !check &&
                    <span
                        className="option__close"
                        onClick={() => removeOption(chooseId, optionId)}
                    >
                        X
                    </span>
                }
            </div>
        )
    }
}

Options.propTypes = {
    check: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    message: PropTypes.string,
    chooseId: PropTypes.number,
    optionId: PropTypes.number,
    noTextarea: PropTypes.bool,
    removeOption: PropTypes.func,
    setOptionTitle: PropTypes.func,
    setOptionChecked: PropTypes.func,
}

export default Options

// const Options = ({
//     type,
//     check,
//     message,
//     disabled,
//     chooseId,
//     optionId,
//     noTextarea,
//     removeOption,
//     setOptionTitle,
//     setOptionChecked
// }) => (
//     <div className="options">
//         <input
//             type={type}
//             defaultValue=""
//             disabled={disabled}
//             name={`${type}${chooseId}`}
//             onChange={e => setOptionChecked(chooseId, optionId, e.target)}
//         />
//         {
//             noTextarea &&
//             <EditorTitle
//                 message={message}
//                 disabled={!!check}
//                 className="option__title"
//                 setTitle={[setOptionTitle, chooseId, optionId]}
//             />
//         }
//         {
//             !check &&
//             <span
//                 className="option__close"
//                 onClick={() => removeOption(chooseId, optionId)}
//             >
//                 X
//             </span>
//         }
//     </div>
// )