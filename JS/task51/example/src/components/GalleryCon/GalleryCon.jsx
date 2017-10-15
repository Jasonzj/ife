import React, { Component } from 'react'
import { Gallery, css } from 'j-gallery'
import { getRandomColor, getRandomResize } from 'utils/utils'
import Drag from 'utils/drag.js'

class GalleryCon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: [
                'http://placehold.it/1300x1600/E97452/fff',
                'http://placehold.it/1300x1300/4C6EB4/fff',
                'http://placehold.it/1300x1250/449F93/fff',
                'http://placehold.it/800x400/936FBC/fff',
                'http://placehold.it/1000x500/D25064/fff',
                'http://placehold.it/1300x1200/D25064/fff',
                'http://placehold.it/749x1327/D25064/fff'
            ],
            resize: { x: 520, y: 200 },
            layout: 2,
            fullScreen: false,
            gutter: { x: 0, y: 0 },
            waterfallColumn: 5,
            barrelMinHeight: 200,
            puzzleHeight: 600
        }
    }

    componentDidMount() {
        new Drag('control')
        this.gallery = new Gallery('.gallery')
        this.gallery.setImage(this.state.urls, {
            ...this.state
        })
    }

    addPhoto = (random) => {
        let url = `http://placehold.it/${this.state.resize.x}x${this.state.resize.y}/${getRandomColor()}/fff`
        if (random) {
            const resize = getRandomResize()
            url = `http://placehold.it/${resize.x}x${resize.y}/${getRandomColor()}/fff`
            this.setState({ resize })
        }
        this.gallery.addImage(url, true)
    }

    changeResize(num, change) {
        const resize = this.state.resize
        resize[change] = num
        this.setState({ resize })
    }

    changeLayout = (layout) => {
        this.setState({ layout })
        this.gallery.setLayout(layout)
    }

    changeFullScreen = (fullScreen) => {
        this.setState({ fullScreen })
        const func = fullScreen ? 'enableFullscreen' : 'disableFullscreen'
        this.gallery[func]()
    }

    changeGutter = (num, change) => {
        if (num < 0) {
            return false
        }
        const gutter = this.state.gutter
        gutter[change] = num
        this.setState({ gutter })
        this.gallery.setGutter(gutter.x, gutter.y)
    }

    changeDefault = (num, name) => {
        const func = {
            'puzzleHeight': 'setPuzzleHeight',
            'barrelMinHeight': 'setBarrelHeight',
            'waterfallColumn': 'setWaterfallColumn'
        }[name]
        let key = parseInt(num)
        this.setState({ [name]: key })
        this.gallery[func](key)
    }

    render() {
        const { resize, layout, fullScreen, gutter, waterfallColumn, barrelMinHeight, puzzleHeight } = this.state

        return (
            <div>
                <div className="gallery" />
                <div className="control">
                    <h1>控制台</h1>
                    <p>
                        <input
                            type="text"
                            value={resize.x}
                            onChange={e => this.changeResize(e.target.value, 'x')}
                        />
                        <input
                            type="text"
                            value={resize.y}
                            onChange={e => this.changeResize(e.target.value, 'y')}
                        />
                        <button onClick={() => this.addPhoto(false)}>添加图片</button>
                        <button onClick={this.addPhoto}>添加随机大小图片</button>
                    </p>
                    <p>
                        <input
                            type="radio"
                            id="PUZZLE"
                            name="type"
                            checked={layout === 1}
                            onChange={() => this.changeLayout(1)}
                        />
                        <label htmlFor="PUZZLE">拼图布局</label>
                        <input
                            type="radio"
                            id="WATERFALL"
                            name="type"
                            checked={layout === 2}
                            onChange={() => this.changeLayout(2)}
                        />
                        <label htmlFor="WATERFALL">瀑布布局</label>
                        <input
                            type="radio"
                            id="BARREL"
                            name="type"
                            checked={layout === 3}
                            onChange={() => this.changeLayout(3)}
                        />
                        <label htmlFor="BARREL">木桶布局</label>
                    </p>
                    {
                        layout === 1 &&
                        <p>
                            <span>容器高度: </span>
                            <input
                                type="number"
                                value={puzzleHeight}
                                onChange={e => this.changeDefault(e.target.value, 'puzzleHeight')}
                            />
                        </p>
                    }
                    {
                        layout !== 1 &&
                        <p>
                            <span>设置间隔: </span>
                            <input
                                type="number"
                                value={gutter.x}
                                onChange={e => this.changeGutter(e.target.value, 'x')}
                            />
                            <input
                                type="number"
                                value={gutter.y}
                                onChange={e => this.changeGutter(e.target.value, 'y')}
                            />
                        </p>
                    }
                    {
                        layout === 2 &&
                        <p>
                            <span>列数</span>
                            <input
                                type="number"
                                value={waterfallColumn}
                                onChange={e => this.changeDefault(e.target.value, 'waterfallColumn')}
                            />
                        </p>
                    }
                    {
                        layout === 3 &&
                        <p>
                            <span>最小高度</span>
                            <input
                                type="number"
                                value={barrelMinHeight}
                                onChange={e => this.changeDefault(e.target.value, 'barrelMinHeight')}
                            />
                        </p>
                    }
                    <p>
                        <span>点击图片放大: </span>
                        <input
                            type="radio"
                            id="CLOSE"
                            checked={!fullScreen}
                            onChange={() => this.changeFullScreen(false)}
                        />
                        <label htmlFor="CLOSE">关闭</label>
                        <input
                            type="radio"
                            id="OPEN"
                            checked={fullScreen}
                            onChange={() => this.changeFullScreen(true)}
                        />
                        <label htmlFor="OPEN">开启</label>
                    </p>
                </div>
            </div>
        )
    }
}

export default GalleryCon