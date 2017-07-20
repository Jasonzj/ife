import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Choose.scss'

// component
import Options from 'components/Options'
import EditorTitle from 'components/EditorTitle'

const Choose = ({
    setChooseTitle,
    setOptionTitle,
    removeOption,
    addOption,
    disabled,
    options,
    title,
    type,
    id
}) => (
    <div className="choose">
        <EditorTitle
            className="choose__title"
            message={title}
            setTitle={[setChooseTitle, id]}
        />
        {
            options.map((o, i) => (
                <Options
                    key={i}
                    message={o}
                    type={type}
                    disabled={disabled}
                    setOptionTitle={setOptionTitle}
                    removeOption={removeOption}
                    chooseId={id}
                    optionId={i}
                />
            ))
        }
        <button onClick={() => addOption(id)}>+</button>
    </div>
)

Choose.propTypes = {
    options: PropTypes.array,
    type: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.number,
    id: PropTypes.number,
    setOptionTitle: PropTypes.func,
    removeOption: PropTypes.func,
    setChooseTitle: PropTypes.func,
    addOption: PropTypes.func
}

export default Choose