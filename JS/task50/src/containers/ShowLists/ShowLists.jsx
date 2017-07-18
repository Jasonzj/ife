import React from 'react'

// components
import Lists from 'components/Lists'
import ListsHeader from 'components/ListsHeader'
import ListsFooter from 'components/ListsFooter'

// scss
import './ShowLists.scss'

const ShowLists = () => (
    <div className="lists">
        <table className="lists__table">
            <ListsHeader />
            <Lists />
            <ListsFooter />
        </table>
    </div>
)

export default ShowLists