import persistState from 'redux-localstorage'
import { createStore, compose } from 'redux'
import rootReducer from 'reducers'

const enhancer = compose(
    persistState()
)

const store = createStore(
    rootReducer,
    enhancer
)

export default store