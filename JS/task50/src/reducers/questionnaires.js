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

        case 'SET_QUESTION':
            if (state.id !== parseInt(action.id)) {
                return state
            }

            return {
                ...state,
                title: action.title,
                endTime: action.endTime,
                chooses: action.chooses,
                state: action.state
            }
        
        case 'REMOVE_ALL_QUESTION':
            return !state.isChecked

        case 'REMOVE_QUESTION':
            list = [...state]
            list.splice(action.id, 1)
            return list
        
        case 'ADD_QUESTION':
            return {
                id: state.length,
                title: action.title,
                state: action.state,
                endTime: action.endTime,
                chooses: action.chooses,
                isChecked: false
            }
        
        case 'ADD_QUESTION':
            return 

        default:
            return state
    }
}

const lists = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':
        case 'TOGGLE_CHECKED':
        case 'SET_QUESTION':
            return state.map(t => questionnaires(t, action))

        case 'REMOVE_ALL_QUESTION':
            return state.filter(t => questionnaires(t, action))

        case 'REMOVE_QUESTION':
            return questionnaires(state, action)

        case 'ADD_QUESTION':
            return [
                ...state,
                questionnaires(state, action)
            ]

        default:
            return state
    }
}

export default lists