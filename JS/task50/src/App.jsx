import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

// renducers
import lists from 'reducers/item'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'
import Create from 'containers/Create'
import Editor from 'containers/Editor'

// scss
import './app.scss'

const store = createStore(
    lists,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Route exact path="/" component={ShowLists} />
                <Route path="/create" component={Create} />
                <Route path="/editor" component={Editor} />
            </HomeContainer>
        </Router>
    </Provider>
)

export default App