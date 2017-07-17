import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import test from 'reducers/test'

// container
import HomeContainer from 'containers/HomeContainer'
import ShowLists from 'containers/ShowLists'

// scss
import './app.scss'

const store = createStore(test)

const App = () => (
    <Provider store={store}>
        <HomeContainer>
            <ShowLists />
        </HomeContainer>
    </Provider>
)

export default App