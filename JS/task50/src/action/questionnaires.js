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
    id: id - 1
})

export const AremoveAllQuestion = () => ({
    type: 'REMOVE_ALL_QUESTION'
})