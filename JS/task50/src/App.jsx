import React from 'react'

// container
import HomeContainer from 'containers/HomeContainer'
import Lists from 'containers/Lists'

// scss
import './app.scss'

const App = () => (
    <div>
        <HomeContainer>
            <Lists />
        </HomeContainer>
    </div>
)

export default App