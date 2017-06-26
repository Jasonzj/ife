/*
 * @Author: Jason 
 * @Date: 2017-06-26 17:21:21 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-26 21:38:43
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

    checkWall(point) {
        if (this.virtuaMap[point.y][point.x] === 1) {
            return true
        }
        return false
    }

    getAround(current) {
        const x = current[0],
            y = current[1]

        return [
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
            { x: x - 1, y: y },
            { x: x + 1, y: y }
        ]
    }

    inList(point, list) {
        for (const i in list) {
            if (point[0] === list[i].x && point[1] === list[i].y) {
                return true
            }
        }
        return false
    } 

    search(start, target) {
        let openList = [],      // 开启列表
            closeList = [],     // 关闭列表
            result = [],        // 结果列表
            cur = null          // 当前指针
        
        start.F = 0
        start.G = 0
        start.H = 0

        openList.push({ 
            x: start[0],
            y: start[1],
            F: start.F,
            G: start.G,
            H: start.H
        })

        cur = start

        // 计算路径
        // while (cur && inList(start, openList)) {
            const items = this.getAround(cur)
            // items.forEach((item, i) => {
            for (let i = 0, item; item = items[i++];) {
                if (item.x === 0    // 超过地图边界不考虑
                    || item.y === 0 
                    || this.inList(item, openList)  // 如果开启节点存在当前节点
                    || this.checkWall(item)         // 如果当前节点是墙
                ) {
                    closeList.push({    // push进关闭节点
                        x: item.x,
                        y: item.y
                    })
                    continue
                }
                if (this.virtuaMap[item.y][item.x] === 0) {
                    item.G = cur.G + 1  
                    item.H = (target[0] - item.x) + (target[1] - item.y)
                    item.F = item.G + item.H
                    item.P = cur
                    console.log(item);
                }
            }
            // })
        // }
    }
}