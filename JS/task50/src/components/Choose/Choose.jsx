import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Choose.scss'

// component
import Options from 'components/Options'

const Choose = ({
    removeOption,
    setOption,
    disabled,
    options,
    title,
    type,
    id
}) => (
    <div className="choose">
        <h1 className="choose__title">Q{id + 1} {title}</h1>
        {
            options.map((o, i) => (
                <Options
                    key={i}
                    message={o}
                    type={type}
                    disabled={disabled}
                    setOption={setOption}
                    removeOption={removeOption}
                    chooseId={id}
                    optionId={i}
                />
            ))
        }
    </div>
)

Choose.propTypes = {
    options: PropTypes.array,
    type: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.number,
    id: PropTypes.number,
    setOption: PropTypes.func,
    removeOption: PropTypes.func
}

export default Choose