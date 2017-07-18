import data from 'mock/data.json'

const item = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':
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
        
        default:
            return state
    }
}

const lists = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':    
        case 'TOGGLE_CHECKED':
            return state.map(t => item(t, action))

        default:
            return state
    }
}

export default lists