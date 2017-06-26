/*
 * @Author: Jason 
 * @Date: 2017-06-26 17:21:21 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-26 19:07:10
 */

export class PathFinder {
    constructor(count, wallMap) {
        this.count = count
        this.wallMap = wallMap
        this.virtuaMap = []
    }

    createVirtualMap() {
        for (let i = 1; i < this.count + 1; i++) {
            this.virtuaMap[i] = []
            for (let j = 1; j < this.count + 1; j++) {
                this.virtuaMap[i][j] = 0
            }
        }
    }

    setMapWall() {
        for (const position in this.wallMap) {
            const pos = position.split(',')
            this.virtuaMap[pos[1]][pos[0]] = 1
        }
        console.table(this.virtuaMap)
    }

    search(current, target) {
        console.log(current);
        console.log(target);
    }
}