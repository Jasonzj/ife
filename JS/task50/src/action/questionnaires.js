export const AtoggleChecked = id => ({
    type: 'TOGGLE_CHECKED',
    id
})

export const AtoggleAllChecked = isChecked => ({
    type: 'TOGGLE_ALL_CHECKED',
    isChecked
})

export const AremoveQuestion = id => ({
    type: 'REMOVE_QUESTION',
    id
})

export const AremoveAllQuestion = () => ({
    type: 'REMOVE_ALL_QUESTION'
})

export const AsetDialog = (dialog, func, message) => ({
    type: 'SET_DIALOG',
    dialog,
    func,
    message
})

export const AaddQuestion = (title, chooses, endTime, state) => ({
    type: 'ADD_QUESTION',
    title,
    chooses,
    endTime,
    state
})

export const AsetQuestion = (title, chooses, endTime, state, id) => ({
    type: 'SET_QUESTION',
    id,
    title,
    chooses,
    endTime,
    state
})