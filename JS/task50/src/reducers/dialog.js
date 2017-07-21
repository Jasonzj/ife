const data = {
    bool: false,
    func: null,
    message: ''
}

const dialog = (state = data, action) => {
    switch (action.type) {
        case 'SET_DIALOG':
            return {
                ...action,
                bool: action.dialog,
                func: action.func,
                message: action.message
            }

        default: 
            return state
    }
}

export default dialog