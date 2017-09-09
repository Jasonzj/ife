import React from 'react'
import { Provider } from 'react-redux'
import Bundle from './bundle'
import store from './store'
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'
import NotFound from 'containers/404'

// lazyContainer
import Create from 'bundle-loader?lazy&name=create-[name]!containers/Create/index'
import Editor from 'bundle-loader?lazy&name=editor-[name]!containers/Editor/index'

// scss
import './app.scss'

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
                <Switch>
                    <Route exact path="/" component={ShowLists} />
                    <Route path="/create" component={createComponent(Create)} />
                    <Route path="/newQuestion" component={createComponent(Editor)} />
                    <Route path="/editor/:id" component={createComponent(Editor)} />
                    <Route path="/check/:id" component={createComponent(Editor)} />
                    <Route path="/data/:id" component={createComponent(Editor)} />
                    <Route component={NotFound} />
                </Switch>
            </HomeContainer>
        </Router>
    </Provider>
)

export default App