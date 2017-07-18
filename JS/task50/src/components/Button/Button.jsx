import React from 'react'
import PropTypes from 'prop-types'

// scss
import './Button.scss'

const Button = ({
    children,
    className
}) => (
    <button className={className ? 'btn--info' : 'btn--active'}>{children}</button>
)

Button.propTypes = {
    children: PropTypes.string,
    className: PropTypes.number
}

export default Button