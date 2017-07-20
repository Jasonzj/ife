import React from 'react'
import PropTypes from 'prop-types'

// component
import EditorTitle from 'components/EditorTitle'

// scss
import './Options.scss'

const Options = ({
    type,
    disabled,
    chooseId,
    optionId,
    removeOption,
    message,
    setOptionTitle
}) => (
    <div className="options">
        <input
            type={type}
            disabled={disabled}
        />
        <EditorTitle
            className="option__title"
            message={message}
            setTitle={[setOptionTitle, chooseId, optionId]}
        />
        <span
            className="option__close"
            onClick={() => removeOption(chooseId, optionId)}
        >
            X
        </span>
    </div>
)

Options.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.number,
    chooseId: PropTypes.number,
    optionId: PropTypes.number,
    setOptionTitle: PropTypes.func,
    removeOption: PropTypes.func
}

export default Options