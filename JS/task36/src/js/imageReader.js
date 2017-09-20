/*
 * @Author: Jason 
 * @Date: 2017-06-27 17:54:24 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-09-20 23:15:53
 */

import { addEvent } from './function';
import { Promise  } from './promise';

export class ImageReader {
    constructor(count) {
        this.reader = new FileReader()
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = count
        this.canvas.height = count
        this.count = count
    }

    /**
     * [readImage 图片信息加载]
     * @param {any} file 
     * @returns promise
     * @memberof ImageReader
     */
    readImage(file) {
        return new Promise(resolve => {
            this.reader.readAsDataURL(file)
            this.resolve = resolve
            addEvent(this.reader, 'load', this.imageLoad.bind(this))
        })
    }

    /**
     * [imageLoad 处理图片信息并返回]
     * @memberof ImageReader
     */
    imageLoad() {
        const image = new Image()

        image.src = this.reader.result
        addEvent(image, 'load', () => {
            const data = []
            this.ctx.drawImage(image, 0, 0, this.count, this.count)
            for (let x = 0; x < this.count; x++) {
                data[x] = []
                for (let y = 0; y < this.count; y++) {
                    data[x][y] = this.toRGBA(this.ctx.getImageData(y, x, 1, 1).data)
                }
            }
            this.resolve(data)
        })
    }

    /**
     * [toRGBA 转成rgba]
     * @param {Array} pixel 颜色像素数组
     * @returns rgba
     * @memberof ImageReader
     */
    toRGBA(pixel) {
        return `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]})`
    }
}