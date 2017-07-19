import { combineReducers } from 'redux'
import lists from './questionnaires'
import dialog from './dialog'

const rootReducer = combineReducers({
    lists,
    dialog
})

export default rootReducer