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
    titleClassName: string
    wrapClassName: string
    iconClassName: string
    
    constructor(public config: ITree) {
        this.root = document.querySelector(this.config.root)
        this.data = this.config.data
        this.titleClassName = this.config.titleClass || 'tree_title'
        this.wrapClassName = this.config.wrapClass || 'tree_wrap'
        this.iconClassName = this.config.iconClass || 'tree_icon'

        this.init()
    }

    init() {
        this.initTree(this.data, this.root)
        this.bindEvent()
    }

    initTree(data: any, dom: Element) {
        for (const titleName in data) {
            const wrap: Element = document.createElement('div')
            const title: Element = document.createElement('h2')
            const icon: Element = document.createElement('span')
            wrap.className = this.wrapClassName
            icon.className = this.iconClassName
            icon.setAttribute('state', 'false')
            title.className = this.titleClassName
            title.innerHTML = `${titleName}`
            
            if (JTree.isEmptyObject(data[titleName])) {
                icon.classList.add('hide')
            }
            
            title.appendChild(icon)
            wrap.appendChild(title)
            dom.appendChild(wrap)
            this.initTree(data[titleName], wrap)
        }
    }

    clickEvent = (e) => {
        const target: any = e.target
        const className: any = target.className

        if (className.includes(this.config.iconClass)) {
            const state: string = target.getAttribute('state')
            const bool: boolean = state === 'true' ? false : true
            const parent: Element = target.parentNode.parentNode
            const children: Element[] = Array.from(parent.children)
            
            this.toggleTree(children, target, bool)
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
