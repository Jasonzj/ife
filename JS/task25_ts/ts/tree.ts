interface ITree{
    root: string,
    data: any,
    wrapClass?: string,
    titleClass?: string,
    iconClass?: string,
    searchInputClass: string,
    buttonBoxClass: string
}

class JTree {
    data: any
    root: Element
    btnBox: Element
    searchInp: Element
    treeArr: Element[]
    titleClassName: string
    wrapClassName: string
    iconClassName: string
    
    constructor(public config: ITree) {
        this.data = config.data
        this.root = document.querySelector(config.root)
        this.btnBox = document.querySelector(config.buttonBoxClass)
        this.searchInp = document.querySelector(config.searchInputClass)
        this.titleClassName = config.titleClass || 'tree_title'
        this.wrapClassName = config.wrapClass || 'tree_wrap'
        this.iconClassName = config.iconClass || 'tree_icon'
        this.treeArr = []

        this.init()
    }

    private init() {
        this.initTree(this.data, this.root)
        this.bindEvent()
    }

    private initTree(data: any, dom: Element) {
        for (const titleName in data) {
            const bool = JTree.isEmptyObject(data[titleName])
            const wrap = this.createNode(titleName, bool)

            dom.appendChild(wrap)
            this.initTree(data[titleName], wrap)
        }
    }

    private createNode(text, bool) {
        const domCreateElement = document.createElement.bind(document)
        const wrap: Element = domCreateElement('div')
        const title: Element = domCreateElement('h2')
        const icon: Element = domCreateElement('span')
        const span: Element = domCreateElement('span')

        wrap.className = this.wrapClassName
        icon.className = this.iconClassName
        icon.setAttribute('state', 'false')
        title.className = this.titleClassName
        span.innerHTML = `${text}`
        
        if (bool) {
            icon.classList.add('hide')
        }

        const operation = `
            <div class="operation">
                <a name="add">添加</a>
                <a name="remove">删除</a>
                <a name="rename">重命名</a>
            </div>`

        title.appendChild(span)
        title.appendChild(icon)
        title.innerHTML += operation
        wrap.appendChild(title)
        return wrap
    }

    private setPrompt(text: string, resText?: string) {
        return prompt(text, resText).trim()
    }

    private clickEvent = (e) => {
        const target: any = e.target
        const className: string = target.className
        const targetName: string = target.name
        const parent: Element = target.parentElement.parentElement
        const children: Element[] = Array.from(parent.children)
        const root = parent.parentElement

        if (className.includes(this.config.iconClass)) {
            const state: string = target.getAttribute('state')
            const bool: boolean = state === 'true' ? false : true
            this.toggleTree(children, target, bool)
        }

        const funcName = { 'add': 'addNode', 'remove': 'removeNode' }[targetName]
        if (funcName) this[funcName](root)

        if (e.target.nodeName === 'BUTTON') {
            if (this[targetName]) this[targetName]()
        }
    }

    private addNode(dom: Element) {
        const text = this.setPrompt('请输入添加节点的名称')
        const node = this.createNode(text, true)
        const children = Array.from(dom.children)
        const icon = dom.querySelector(`.${this.iconClassName}`)

        node.classList.add('show')
        dom.appendChild(node)
        this.toggleTree(children, icon, true)
    }

    private removeNode(dom: Element) {
        const parent = dom.parentElement
        const children = parent.children
        const icon = parent.querySelector(`.${this.iconClassName}`)
        dom.remove()

        if (children.length === 1) {
            icon.className = `${this.iconClassName} hide`
        }
    }

    private toggleTree(
        children: Element[],
        icon: Element,
        bool: boolean
    ) {
        const name: string = bool ? 'add' : 'remove'
        const iconClassName: string = icon.className
        icon.setAttribute('state', `${bool}`)
        icon.classList[name]('show')

        if (iconClassName.includes('hide')) {
            icon.classList.remove('hide')
        }

        children.forEach(item => {
            if (item.className !== this.config.titleClass) {
                item.classList[name]('show')
            }
        })
    }

    private dirSearch() {
        const text = this.searchInp.value.trim()
        const result = this.traverseDF(this.root, this.titleClassName, text)
        const alertText = { '0': '没查询到', '1': '查询到了' }[result.length]
        if (alertText) alert(alertText)
        else if (result.length > 1) alert(`找到${result.length}个同名文件`)

        result.forEach(item => {
            item.classList.add('current')
            this.treeShow(item.parentElement.parentElement)
        })

        this.treeArr = result
    }

    private cleanSearch() {
        this.treeArr.forEach(item => item.classList.remove('current'))
    }

    private traverseDF(
        node: Element,
        classN: string,
        text: string
    ) {
        const stack = []
        const result = []

        while (node) {
            if (node.className.includes(classN)) {
                const dom: Element = node.firstElementChild
                const searchText: string = dom.innerHTML.trim() 
                if (searchText === text) {
                    result.push(dom)
                }
            }
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i])
                }
            }
            node = stack.pop()
        }

        return result
    }

    private treeShow(node: Element) {
        const parent: Element = node.parentElement
        const className: string = parent.className

        if (className.includes(this.wrapClassName)) {
            const children = Array.from(parent.children)
            const icon = parent.querySelector(`.${this.iconClassName}`)
            this.toggleTree(children, icon, true)
            this.treeShow(parent)
        }
    }

    private bindEvent() {
        this.root.addEventListener('click', this.clickEvent)
        this.btnBox.addEventListener('click', this.clickEvent)
    }

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
    searchInputClass: '.inp',
    buttonBoxClass: '.buttonBox',
    data
})
