const api = require('./gallery.js')
const expect = require('chai').expect

describe('setGutter', () => {
    it('图片间距必须大于0', () => {
        expect(api.setGutter(-1, 1)).to.be.equal(false)
    })
})

describe('setPuzzleHeight', () => {
    it('拼图布局高度必须大于0', () => {
        expect(api.setPuzzleHeight(-1)).to.be.equal(false)
    })
    it('拼图布局高度必须是整数', () => {
        expect(api.setPuzzleHeight(0.1)).to.be.equal(false)
    })
})

describe('setWaterfallColumn', () => {
    it('瀑布流列数必须大于0', () => {
        expect(api.setWaterfallColumn(-1)).to.be.equal(false)
    })
    it('瀑布流列数必须是整数', () => {
        expect(api.setWaterfallColumn(0.1)).to.be.equal(false)
    })
})

describe('setBarrelHeight', () => {
    it('木桶布局最小高度必须大于0', () => {
        expect(api.setBarrelHeight(-1)).to.be.equal(false)
    })
    it('木桶布局最小高度必须是整数', () => {
        expect(api.setBarrelHeight(0.1)).to.be.equal(false)
    })
})


