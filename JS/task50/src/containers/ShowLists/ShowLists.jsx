import React from 'react'
import PropTypes from 'prop-types'

// components
import Lists from 'components/Lists'
import ListsHeader from 'components/ListsHeader'
import ListsFooter from 'components/ListsFooter'

// scss
import './ShowLists.scss'

const ShowLists = ({
    history
}) => (
    <div className="lists">
        <table className="lists__table">
            <ListsHeader />
            <Lists history={history} />
            <ListsFooter />
        </table>
    </div>
)

ShowLists.propTypes = {
    history: PropTypes.any
}

export default ShowLists