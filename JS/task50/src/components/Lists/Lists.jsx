// import React from 'react'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Item from 'components/Item'

const Lists = ({
    items
}) => (
    <tbody>
        {
            items.map(item => (
                <Item
                    key={item.id}
                    {...item}
                />
            ))
        }
    </tbody>
)

Lists.propTypes = {
    items: PropTypes.array
}

// connect
const vLists = connect(
    state => ({ items: state })
)(Lists)

export default vLists