const data = {
    bool: false,
    removeId: null,
    removeTitle: ''
}

const dialog = (state = data, action) => {
    switch (action.type) {
        case 'SET_DIALOG':
            return {
                ...action,
                bool: action.dialog,
                removeId: action.id,
                removeTitle: action.title
            }

        default: 
            return state
    }
}

export default dialog