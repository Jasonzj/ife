import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

// renducers
import rootReducer from 'reducers'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'
import Create from 'containers/Create'
import Editor from 'containers/Editor'

// scss
import './app.scss'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    console.log(store.getState())
})

const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Route exact path="/" component={ShowLists} />
                <Route path="/create" component={Create} />
                <Route path="/newQuestion" component={Editor} />
                <Route path="/editor/:id" component={Editor} />
            </HomeContainer>
        </Router>
    </Provider>
)

export default App