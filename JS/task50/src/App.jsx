import React from 'react'
import { createStore, compose } from 'redux'
import persistState from 'redux-localstorage'
import { Provider } from 'react-redux'
import Bundle from './bundle.js'
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'

// renducers
import rootReducer from 'reducers'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'
import NotFound from 'containers/404.jsx'

// lazyContainer
import Create from 'bundle-loader?lazy&name=create-[name]!containers/Create/index.js'
import Editor from 'bundle-loader?lazy&name=editor-[name]!containers/Editor/index.js'

// scss
import './app.scss'

// store
const enhancer = compose(
    persistState()
)

const store = createStore(
    rootReducer,
    enhancer
)

// router
const createComponent = component => () => (
    <Bundle load={component}>
        { Component => <Component /> }
    </Bundle>
)

// app
const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Route exact path="/" component={ShowLists} />
                <Route path="/create" component={createComponent(Create)} />
                <Route path="/newQuestion" component={createComponent(Editor)} />
                <Route path="/editor/:id" component={createComponent(Editor)} />
                <Route path="/check/:id" component={createComponent(Editor)} />
                <Route path="/data/:id" component={createComponent(Editor)} />
                <Route path="*" component={NotFound} />
            </HomeContainer>
        </Router>
    </Provider>
)

export default App