import React from 'react'
import PropTypes from 'prop-types'

// component
import EditorTitle from 'components/EditorTitle'

const Options = ({
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
}) => (
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