import React from 'react'
import PropTypes from 'prop-types'

const Item = ({
    title,
    endTime,
    status
}) => (
    <tr>
        <td />
        <td>{title}</td>
        <td>{endTime}</td>
        <td>{status}</td>
        <td />
        <td />
    </tr>
)

Item.propTypes = {
    title: PropTypes.string,
    endTime: PropTypes.string,
    status: PropTypes.string
}

export default Item