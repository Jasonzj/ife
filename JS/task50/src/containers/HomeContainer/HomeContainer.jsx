import React from 'react'
import PropTypes from 'prop-types'

// component
import Header from 'components/Header'

// scss
import './HomeContainer.scss'

const Home = ({ children }) => (
    <div>
        <Header />
        <main className="main">
            {children}
        </main>
    </div>
)

Home.propTypes = {
    children: PropTypes.element.isRequired
}

export default Home