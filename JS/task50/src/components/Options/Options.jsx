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
    setOptionChecked,
    noTextarea
}) => (
    <div className="options">
        <input
            name={`${type}${chooseId}`}
            type={type}
            disabled={disabled}
            defaultValue=""
            onChange={e => setOptionChecked(chooseId, optionId, e.target.checked)}
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
    setOptionChecked: PropTypes.func,
    removeOption: PropTypes.func,
    noTextarea: PropTypes.bool,
    check: PropTypes.bool,
    checked: PropTypes.array
}

export default Options