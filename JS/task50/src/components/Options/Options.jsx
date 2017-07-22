import React from 'react'
import PropTypes from 'prop-types'

// component
import EditorTitle from 'components/EditorTitle'

// scss
import './Options.scss'

const Options = ({
    type,
    check,
    disabled,
    chooseId,
    optionId,
    removeOption,
    message,
    setOptionTitle,
    noTextarea
}) => (
    <div className="options">
        <input
            name={`${type}${chooseId}`}
            type={type}
            disabled={disabled}
            defaultValue=""
        />
        {
            noTextarea &&
            <EditorTitle
                disabled={!!check}
                className="option__title"
                message={message}
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

Options.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    chooseId: PropTypes.number,
    optionId: PropTypes.number,
    setOptionTitle: PropTypes.func,
    removeOption: PropTypes.func,
    noTextarea: PropTypes.bool,
    check: PropTypes.bool
}

export default Options