import data from 'mock/data.json'

const questionnaires = (state, action) => {
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
            if (state.id !== parseInt(action.id, 10)) {
                return state
            }

            return {
                ...state,
                isChecked: !state.isChecked
            }

        case 'SET_QUESTION':
            if (state.id !== parseInt(action.id, 10)) {
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
            return state.id !== action.id

        case 'ADD_QUESTION':
            return {
                id: state.length,
                title: action.title,
                state: action.state,
                endTime: action.endTime,
                chooses: action.chooses,
                isChecked: false
            }

        case 'ADD_OPTION_CHECKED':
            if (state.id !== parseInt(action.id, 10)) {
                return state
            }

            return {
                ...state,
                chooses: action.chooses.map((choose) => {
                    const checkeds = choose.checkeds
                    checkeds.push(choose.cacheChecked)

                    return {
                        ...choose,
                        checkeds,
                        cacheChecked: [...choose.cacheChecked].fill(false)
                    }
                })
            }

        case 'CHANGE_STATE':
            if (state.id !== parseInt(action.id, 10)) {
                return state
            }

            return {
                ...state,
                state: action.state
            }

        default:
            return state
    }
}

const lists = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE_ALL_CHECKED':
        case 'TOGGLE_CHECKED':
        case 'SET_QUESTION':
        case 'ADD_OPTION_CHECKED':
        case 'CHANGE_STATE':
            return state.map(t => questionnaires(t, action))

        case 'REMOVE_ALL_QUESTION':
        case 'REMOVE_QUESTION':
            return state.filter(t => questionnaires(t, action)).map((t, i) => ({
                ...t,
                id: i
            }))

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