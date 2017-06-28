/*
 * @Author: Jason 
 * @Date: 2017-06-28 14:28:34 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-28 18:50:20
 */

;(global => {

    class Table {
        constructor(JSON) {
            this.thData = JSON.data.thead
            this.tbData = JSON.data.tbody
            this.isSort = JSON.isSort
            this.isFrozen = JSON.isFrozen
            this.ele = document.querySelector(JSON.append)
            this.table = document.createElement('table')
            this.tbody = document.createElement('tbody')
            this.thead = document.createElement('thead')
            this.sum = null

            this.init()
        }

        /**
         * [初始化]
         * @memberof Table
         */
        init() {
            this.thRender()
            this.thRender(true)
            if (this.sum) {
                this.setSum(this.sum)
            }
            this.sortData(0, true)            
            this.setEvent()
        }

        /**
         * [表头渲染]
         * @memberof Table
         */
        thRender(copy) {
            if (!copy) {
                const theadTr = document.createElement('tr')
                theadTr.innerHTML = this.thData.map((item, i) => {
                    const tdArr = item.split(':'),
                        html = tdArr.shift(),
                        tdStr = tdArr.toString()
                    
                    // 如果有noSort则关闭排序按钮,或者this.isSort为false全部关闭排序                    
                    if (tdStr.indexOf('sum') > -1) this.sum = i
                    if (tdStr.indexOf('noSort') > -1 || !this.isSort) return `<th>${html}</th>`

                    return `<th>${html}<i class="up"></i><i class="down"></i></th>`
                }).join('')

                this.thead.appendChild(theadTr)
                this.table.appendChild(this.thead)
                this.ele.appendChild(this.table)
            } else {
                this.thead2 = document.createElement('thead')
                this.thead2.style.height = global.getComputedStyle(this.thead, null).height
                this.thead2.style.display = 'none'
                this.table.appendChild(this.thead2)
            }
        }

        /**
         * [tbody 渲染]
         * @param {Array} data 数据数组
         * @memberof Table
         */
        tbRender(data) {
            this.tbody.innerHTML = ''
            for (const line in data) {
                const tr = document.createElement('tr')
                tr.innerHTML = data[line].map(item => `<td>${item}</td>`).join('')
                this.tbody.appendChild(tr)
            }
      
            this.table.appendChild(this.tbody)
            this.ele.appendChild(this.table)
        }

        /**
         * [表格排序]
         * @param {Number} index 第几列
         * @param {Boolean} order true为降序， false为升序
         * @memberof Table
         */
        sortData(index, order) {
            const data = []
            this.tbData.forEach((item, i) => {
                data[i] = item
            })

            if (order) {
                data.sort((a, b) => a[index] - b[index])
            } else {
                data.sort((a, b) => b[index] - a[index])                
            }

            this.tbRender(data)
        }

        /**
         * [单列求和 指定一列求该列每行的合]
         * @param {Number} column 指定一列
         * @memberof Table
         */
        setSum(column) {
            this.tbData.forEach((item, i) => {
                let sum = 0
                item.forEach((a, index) => {
                    if (typeof a === 'number') sum = sum + a
                })
                item[column] = sum
            })
        }

        setFrozen() {
            const width = global.getComputedStyle(this.table, null).width

            if (this.table.offsetTop < document.body.scrollTop) {
				this.thead.className = 'frozen' 
                this.thead.style.width = width
                this.thead2.style.display = 'block'
			} 
            if ((this.table.offsetTop + this.table.clientHeight) < document.body.scrollTop
                || this.table.offsetTop > document.body.scrollTop
            ) {
                this.thead.className = ''
                this.ele.style.paddingTop = 0
                this.thead.style.width = 0
                this.thead2.style.display = 'none'
            }
        }

        /**
         * [click处理]
         * @param {any} e 
         * @memberof Table
         */
        clickHandle(e) {
            if (e.target.nodeName === 'I') {
                let index = 0

                this.thData.forEach((item, i) => {
                    if (e.target.parentNode.innerHTML.indexOf(item) > -1) {
                        index = i
                    }
                })

                const order = { up: true, down: false }[e.target.className]

                this.sortData(index, order)
            }
        }

        /**
         * [事件绑定]
         * @memberof Table
         */
        setEvent() {
            this.thead.addEventListener('click', this.clickHandle.bind(this))
            global.addEventListener('scroll', this.setFrozen.bind(this))
        }
    }

    global.Table = Table
    
})(window)