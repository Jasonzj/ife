import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Button.scss'

const Button = ({
    children,
    className,
    onClick,
    disabled,
}) => (
    <button
        className={['btn--disbled', 'btn--info', 'btn--active'][className]}
        onClick={onClick}
        disabled={disabled !== undefined && !disabled}
    >
        {children}
    </button>
)

Button.propTypes = {
    children: PropTypes.string,
    className: PropTypes.any,
    onClick: PropTypes.func,
    disabled: PropTypes.number
}

export default Button