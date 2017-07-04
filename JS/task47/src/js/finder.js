/*
 * @Author: Jason 
 * @Date: 2017-07-03 20:12:13 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-07-03 21:39:09
 */

export class PathFinder {
    constructor(JSON) {
        this.count = JSON.count
        this.wallMap = JSON.wallMap
        this.xMax = JSON.xMax
        this.yMax = JSON.yMax
    }

    /**
     * check whether the ultra boundary 
     * 
     * @param {Object} point coordinates of the object
     * @returns Boolean
     * @memberof PathFinder
     */
    checkBorder(point) {
        if (point.x < 0
            || point.y < 0
            || point.x > this.xMax
            || point.y > this.yMax
        ) {
            return true
        }
        return false
    }
    
    /**
     * check whether there is a wall
     * 
     * @param {Object} point coordinates of the object
     * @returns 
     * @memberof PathFinder
     */
    checkWall(point) {
        if (this.wallMap[[point.x, point.y]]) {
            return true
        }
        return false
    }

    /**
     * get point around point
     * 
     * @param {Object} point coordinates of the object
     * @returns around point object
     * @memberof PathFinder
     */
    getAround(point) {
        const x = point.x,
            y = point.y
        
        return [
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
            { x: x - 1, y: y },
            { x: x + 1, y: y }
        ]
    }

    /**
     * check list contains the coordinates
     * 
     * @param {Object} point coordinates of the object
     * @param {Array} list array list
     * @returns 
     * @memberof PathFinder
     */
    inList(point, list) {
        for (const i in list) {
            if (point.x === list[i].x && point.y === list[i].y) {
                return true
            }
        }
        return false
    }

    /**
     * using A* algorithm
     * 
     * @param {Array} start start point coordinates array
     * @param {Array} target target point coordinates array
     * @returns the shortest path array 
     * @memberof PathFinder
     */
    search(start, target) {
        let openList = [],     // openlist
            closeList = [],    // closelist
            cur = null         // pointer to the current
        
        // init target point
        target = {
            x: parseInt(target[0]),
            y: parseInt(target[1])
        }

        // init start point
        start = {
            F: 0,
            G: 0,
            H: 0,
            x: parseInt(start[0]),
            y: parseInt(start[1])
        }

        closeList.push(start)   // start point pressure into closeList array
        cur = start     // set start location to the current

        // compute the path
        while(cur) {
            if (!this.inList(cur, closeList)) closeList.push(cur)

            const items = this.getAround(cur)

            for (let i = 0, item; item = items[i++];) {
                if (this.checkBorder(item)
                    || this.inList(item, openList)
                    || this.inList(item, closeList)
                    || this.checkWall(item)
                ) {
                    continue
                } else {
                    item.G = cur.G + 1
                    item.H = Math.abs(parseInt(target.x) - parseInt(item.x)) + Math.abs(parseInt(target.y) - parseInt(item.y))
                    item.F = item.G + item.H
                    item.P = cur
                    openList.push(item)
                }
            }

            if (!openList.length) {
                cur = null
                openList = []
                closeList = []
                break
            }

            openList.sort((a, b) => a.F - b.F)

            let oMinF = openList[0],
                aMinF = []
            
            openList.forEach(item => {
                if (item.F === oMinF.F) aMinF.push(item)
            })

            if (aMinF.length > 1) {
                aMinF.forEach(item => item.D = Math.abs(parseInt(item.x) - parseInt(cur.x)) + Math.abs(parseInt(item.y) - parseInt(cur.y)))
                aMinF.sort((a, b) => a.D - b.D)
                oMinF = aMinF[0]
            }

            cur = oMinF

            if (!this.inList(cur, closeList)) closeList.push(cur)

            openList.forEach((item, i) => {
                if (item == cur) {
                    openList.splice(i, 1)
                }
            })

            if (cur.H == 0) {
                closeList.push(cur)
                cur = null
            }
        }

        if (closeList.length) {
            let lastPos = closeList[closeList.length - 1],
                path = []
            
            while (lastPos) {
                path.unshift(lastPos)
                lastPos = lastPos.P
                if (!lastPos.P) {
                    lastPos = null
                }
            }

            return path
        } else {
            alert('无路可走')
            return false
        }
    }

}