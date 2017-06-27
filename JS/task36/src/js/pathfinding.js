/*
 * @Author: Jason 
 * @Date: 2017-06-26 17:21:21 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-27 20:44:29
 */

export class PathFinder {
    constructor(count) {
        this.count = count
    }

    /**
     * [checkBorder 检查点坐标超过边界]
     * @param {Object} point 点坐标对象
     * @returns 超过返回true，否则false
     * @memberof PathFinder
     */
    checkBorder(point) {
        if (point.x < 1
            || point.y < 1
            || point.x > this.count
            || point.y > this.count
        ) {
            return true
        }
        return false
    }

    /**
     * [checkWall 检查坐标点是否有墙]
     * @param {Object} point 
     * @returns 有墙返回true，否则false
     * @memberof PathFinder
     */
    checkWall(point) {
        if (this.wallMap[[point.x, point.y]]) {
            return true
        }
        return false
    }

    /**
     * [getAround 获取周围坐标点(上下左右)]
     * @param {Object} current 当前坐标点对象
     * @returns {Object} 上下左右坐标点
     * @memberof PathFinder
     */
    getAround(current) {
        const x = current.x,
            y = current.y

        return [
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
            { x: x - 1, y: y },
            { x: x + 1, y: y }
        ]
    }

    /**
     * [inList 检查坐标点是否在数组中]
     * @param {Object} point 坐标点对象
     * @param {Array} list 数组
     * @returns 存在则返回true，否则false
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
     * [search 自动寻路采用A*算法]
     * @param {Array} start 起点坐标数组
     * @param {Array} target 终点坐标数组
     * @returns {Array} path最终路径数组
     * @memberof PathFinder
     */
    search(start, target, wallMap) {
        this.wallMap = wallMap  // 初始化墙坐标对象

        let openList = [],      // 开启列表
            closeList = [],     // 关闭列表
            cur = null          // 当前指针
        
        // 初始化终点
        target = {
            x: parseInt(target[0]),
            y: parseInt(target[1])
        }

        // 初始化起点
        start = {   
            F: 0,
            G: 0,
            H: 0,
            x: parseInt(start[0]),
            y: parseInt(start[1])
        }

        closeList.push(start)   // 将起点压进closeList数组
        cur = start     // 设置当前坐标为起点
        
        // 计算路径
        while (cur) {
            
            if (!this.inList(cur, closeList))  closeList.push(cur) // 如果cur不在closeList列表则将cur压入closeList数组

            const items = this.getAround(cur)   // 获取周围上下左右坐标

            for (let i = 0, item; item = items[i++];) {
                if (this.checkBorder(item)
                    || this.inList(item, openList)  // 如果开启节点存在当前节点
                    || this.inList(item, closeList) // 如果开启节点存在当前节点
                    || this.checkWall(item)         // 如果当前节点是墙
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

            // 如果四周都获取不了则没路走
            if (!openList.length) {     
                curr = null
                openList = []
                closeList = []
                break
            }

            openList.sort((a, b) => a.F - b.F)  // 按F值从小到大对open数组排序

            let oMinF = openList[0],    // 存放open数组F值最小
                aMinF = []              // 存放open数组F值最小并相同的集合
            
            // 查找open列表F值与cur的F值相同的节点，并压入aMinF数组
            openList.forEach(item => {  
                if (item.F === oMinF.F) aMinF.push(item)
            })

            // 如果最小F值有多个相同
            if (aMinF.length > 1) {
                aMinF.forEach( item => item.D = Math.abs(parseInt(item.x) - parseInt(cur.x)) + Math.abs(parseInt(item.y) - parseInt(cur.y)) )
                aMinF.sort((a, b) => a.D - b.D)  // 根据D值进行排序
                oMinF = aMinF[0]
            }

            cur = oMinF // 给当前坐标设置最小F值的坐标
            
            if (!this.inList(cur, closeList)) closeList.push(cur)   // 如果cur不在closeList列表则将cur压入closeList数组

            // 将cur从openList中删除
            openList.forEach((item, i) => {
                if (item == cur) {
                    openList.splice(i, 1)
                }
            })

            // 如果cur.H = 0找到终点，则停止循环
            if (cur.H == 0) {
                closeList.push(cur)
                cur = null
            }
        }

        // 如果closeList存在将closeList数组转换成路径
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
            console.log('无路可走')
            return false
        }
    }
}