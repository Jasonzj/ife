interface ITree{
    root: string,
    data: any,
    wrapClass?: string,
    titleClass?: string,
    iconClass?: string
}

interface ArrayConstructor {
    from(arrayLike: any, mapFn?, thisArg?): Array<any>
}

class JTree {
    data: any
    root: Element
    treeArr: Element[]
    titleClassName: string
    wrapClassName: string
    iconClassName: string
    
    constructor(public config: ITree) {
        this.root = document.querySelector(this.config.root)
        this.data = this.config.data
        this.titleClassName = this.config.titleClass || 'tree_title'
        this.wrapClassName = this.config.wrapClass || 'tree_wrap'
        this.iconClassName = this.config.iconClass || 'tree_icon'
        this.treeArr = []

        this.init()
    }

    init() {
        this.initTree(this.data, this.root)
        this.bindEvent()
    }

    initTree(data: any, dom: Element) {
        for (const titleName in data) {
            const bool = JTree.isEmptyObject(data[titleName])
            const wrap = this.createNode(titleName, bool)

            dom.appendChild(wrap)
            this.initTree(data[titleName], wrap)
        }
    }

    createNode(text, bool) {
        const wrap: Element = document.createElement('div')
        const title: Element = document.createElement('h2')
        const icon: Element = document.createElement('span')

        wrap.className = this.wrapClassName
        icon.className = this.iconClassName
        icon.setAttribute('state', 'false')
        title.className = this.titleClassName
        title.innerHTML = `${text}`

        if (bool) {
            icon.classList.add('hide')
        }

        const operation = `
            <div class="operation">
                <a name="add">添加</a>
                <a name="remove">删除</a>
                <a name="rename">重命名</a>
            </div>`
        
        title.innerHTML += operation
        title.appendChild(icon)
        wrap.appendChild(title)

        return wrap
    }

    setPrompt(text: string, resText?: string) {
        return prompt(text, resText).trim()
    }

    clickEvent = (e) => {
        const target: any = e.target
        const className: any = target.className
        const targetName: string = target.name
        const parent: Element = target.parentNode.parentNode
        const children: Element[] = Array.from(parent.children)

        if (className.includes(this.config.iconClass)) {
            const state: string = target.getAttribute('state')
            const bool: boolean = state === 'true' ? false : true
            this.toggleTree(children, target, bool)
        }

        switch (targetName) {
            case 'add': 
                const text = this.setPrompt('请输入添加节点的名称')
                const node = this.createNode(text, true)
                node.classList.add('show')
                parent.parentNode.appendChild(node)
                break
            case 'remove':
        }
    }

    toggleTree(
        children: Element[],
        icon: Element,
        bool: boolean
    ) {
        const name: string = bool ? 'add' : 'remove'
        icon.setAttribute('state', `${bool}`)
        icon.classList[name]('show')

        children.forEach(item => {
            if (item.className !== this.config.titleClass) {
                item.classList[name]('show')
            }
        })
    }

    traverseDF(node) {
        const stack = []

        while (node !== null) {
            this.treeArr.push(node)
            if (node.children.length !== 0) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i])
                }
            }
            node = stack.pop()
        }
    }

    bindEvent() {
        this.root.addEventListener('click', this.clickEvent)
    }

    /**
     * 判断空对象
     * @static
     * @return {Boolean} 是空对象返回ture，否则false
     */
    static isEmptyObject = (obj) => {
        for (const key in obj) {
            return false
        }
        return true
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
    wrapClass: 'tree-body',
    titleClass: 'tree-title',
    iconClass: 'tree-icon',
    data
})
