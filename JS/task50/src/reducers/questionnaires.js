import data from 'mock/data.json'

const questionnaires = (state, action) => {
    let list = null
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':
            if (state.state) {
                return state
            }
            return {
                ...state,
                isChecked: action.isChecked
            }

        case 'TOGGLE_CHECKED':
            if (state.id !== action.id) {
                return state
            }

            return {
                ...state,
                isChecked: !state.isChecked
            }
        
        case 'REMOVE_ALL_QUESTION':
            return !state.isChecked

        case 'REMOVE_QUESTION':
            list = [...state]
            list.splice(action.id, 1)
            return list
        
        default:
            return state
    }
}

const lists = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':
        case 'TOGGLE_CHECKED':
            return state.map(t => questionnaires(t, action))

        case 'REMOVE_ALL_QUESTION':
            return state.filter(t => questionnaires(t, action))

        case 'REMOVE_QUESTION':
            return questionnaires(state, action)

        default:
            return state
    }
}

export default lists