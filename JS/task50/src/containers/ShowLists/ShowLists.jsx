import React from 'react'

// components
import Lists from 'components/Lists'
import ListsHeader from 'components/ListsHeader'

// scss
import './ShowLists.scss'

const ShowLists = () => (
    <div className="lists">
        <table className="lists__table">
            <ListsHeader />
            <Lists />
        </table>
    </div>
)

export default ShowLists