import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Button.scss'

const Button = ({
    onClick,
    children,
    disabled,
    className,
}) => (
    <button
        onClick={onClick}
        disabled={disabled !== undefined && !disabled}
        className={['btn--disbled', 'btn--info', 'btn--active'][className]}
    >
        {children}
    </button>
)

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.any,
    children: PropTypes.string,
    disabled: PropTypes.number,
}

export default Button