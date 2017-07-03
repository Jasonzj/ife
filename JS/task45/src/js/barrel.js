/*
 * @Author: Jason 
 * @Date: 2017-07-03 14:42:38 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-03 16:35:10
 */

export class Barrel {
    constructor(selector, minHeight = 300) {
        this.container = document.querySelector(selector)
        this.ratio = this.container.clientWidth / minHeight
        this.photos = []
        this.padding = 8
    }

    appendRow(photos) {
        const rows = this.getRow(photos)
        rows.forEach(row => {
            const div = document.createElement('div'),
                rowHeight = this.container.clientWidth - (row.photos.length - 1) * this.padding
            
            div.className = 'barrel-row'
            div.style.height = parseInt(rowHeight / row.ratio) + 'px'
            div.innerHTML = row.photos.map(photo => {
                return `<div class='barrel-item-wrap'><img src="${photo.image.small}"></div>`
            }).join('')

            this.container.appendChild(div)
        })
    }

    getRow(photos) {
        photos = photos.concat(this.photos)

        let _ratio = 0,
            _photos = [],
            _rows = []
        
        photos.forEach(item => {
            _photos.push(item)
            _ratio += item.width / item.height

            if (_ratio > this.ratio) {
                _rows.push({
                    ratio: _ratio,
                    photos: _photos
                })
                _photos = []
                _ratio = 0
            }
        })

        this.photos = _photos
        return _rows
    }
    
}