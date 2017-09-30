import React from 'react'
import { Provider } from 'react-redux'
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
import asyncComponent from './AsyncComponent'

const Create = asyncComponent(() => import(/* webpackChunkName: "Create" */ './containers/Create/index'))
const Editor = asyncComponent(() => import(/* webpackChunkName: "Editor" */ './containers/Editor/index'))

// scss
import './app.scss'

// app
const App = () => (
    <Provider store={store}>
        <Router>
            <HomeContainer>
                <Switch>
                    <Route exact path="/" component={ShowLists} />
                    <Route path="/create" component={Create} />
                    <Route path="/newQuestion" component={Editor} />
                    <Route path="/editor/:id" component={Editor} />
                    <Route path="/check/:id" component={Editor} />
                    <Route path="/data/:id" component={Editor} />
                    <Route component={NotFound} />
                </Switch>
            </HomeContainer>
        </Router>
    </Provider>
)

export default App