var JTree = (function () {
    function JTree(config) {
        this.config = config;
        this.root = document.querySelector(this.config.root);
        this.data = this.config.data;
        this.init();
    }
    JTree.prototype.init = function () {
        this.initTree(this.data, this.root);
    };
    JTree.prototype.initTree = function (data, dom) {
        for (var name_1 in data) {
            var wrap = document.createElement('div');
            var title = document.createElement('div');
            title.innerHTML = "" + name_1;
            title.className = 'tree_title';
            wrap.appendChild(title);
            dom.appendChild(wrap);
            this.initTree(data[name_1], wrap);
        }
    };
    return JTree;
}());
var data = {
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
        'CSS': {
            '选择器': {
                '各类': {}
            },
            '伪类': {
                '没啥': {},
                '没啥哦': {}
            }
        },
        'HTML': {}
    }
};
new JTree({
    root: '.box',
    data: data
});
//# sourceMappingURL=tree.js.map