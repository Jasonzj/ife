import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Button.scss'

const Button = ({
    children,
    className,
    onClick
}) => (
    <button
        className={className ? 'btn--info' : 'btn--active'}
        onClick={onClick}
    >
        {children}
    </button>
)

Button.propTypes = {
    children: PropTypes.string,
    className: PropTypes.number,
    onClick: PropTypes.func
}

export default Button