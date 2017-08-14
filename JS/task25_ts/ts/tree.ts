interface ITree{
    root: string,
    data: any
}

export default class JTree {
    data: any
    root: Element
    
    constructor(public config: ITree) {
        this.root = document.querySelector(this.config.root)
        this.data = this.config.data
        console.log('object');
        this.init()
    }

    private init() {
        console.log('object')
    }

}
