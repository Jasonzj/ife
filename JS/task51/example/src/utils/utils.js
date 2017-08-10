export const getRandomColor = () => `${('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6)}`

export const getRandomResize = () => ({
    x: Math.round(330 * Math.random()) + 470,
    y: Math.round(330 * Math.random()) + 270
})