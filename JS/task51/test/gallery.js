const setGutter = (x = 10, y = 10) => {
    if (x < 0 || y < 0) {
        return false
    }
    this.options.gutter = {x, y}
    this.updateLayout()
    return true
}

const setPuzzleHeight = (height = 500) =>{
    if (!Number.isInteger(height) || height < 0) {
        return false
    }
    this.options.puzzleHeight = height
    this.updateLayout()
    return true
}

const setWaterfallColumn = (column = 4) => {
    if (!Number.isInteger(column) || column < 0) {
        return false
    }
    this.options.waterfallColumn = column
    this.updateLayout()
    return true
}

const setBarrelHeight = (min = 200) => {
    if (!Number.isInteger(min) || min < 0) {
        return false
    }
    this.options.barrelMinHeight = min
    this.updateLayout()
}

module.exports = {
    setGutter,
    setPuzzleHeight,
    setWaterfallColumn,
    setBarrelHeight
}