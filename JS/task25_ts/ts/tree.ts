interface ITree{
    root: string,
    data: any
}

class JTree {
    data: any
    root: Element
    
    constructor(public config: ITree) {
        this.root = document.querySelector(this.config.root)
        this.data = this.config.data

        this.init()
    }

    private init() {
        this.initTree(this.data, this.root)
    }

    private initTree(data: any, dom: Element) {
        for (const name in data) {
            const wrap = document.createElement('div')
            const title = document.createElement('div')
            title.innerHTML = `${name}`
            title.className = 'tree_title'

            wrap.appendChild(title)
            dom.appendChild(wrap)
            this.initTree(data[name], wrap)
        }
    }

}

const data = {
    '目录': {
        'Javascript': {
            '数组': {
                '方法': {},
                '技巧': {}
            },
            '对象': {
                '工厂模式': {
                    '缺点': {}
                },
                '原型模式': {},
                '构造函数模式': {}
            }
        },
        'CSS' : {
            '选择器': {
                '各类': {}
            },
            '伪类': {
                '没啥': {},
                '没啥哦': {}
            }
        },
        'HTML': {

        }
    }
}

new JTree({
    root: '.box',
    data
})
