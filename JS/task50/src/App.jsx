import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

// renducers
import test from 'reducers/test'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'
import Create from 'containers/Create'

// scss
import './app.scss'

const store = createStore(test)

const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Route exact path="/" component={ShowLists} />
                <Route path="/create" component={Create} />
            </HomeContainer>
        </Router>
    </Provider>
)

export default App