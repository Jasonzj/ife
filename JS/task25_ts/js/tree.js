var JTree = (function () {
    function JTree(config) {
        var _this = this;
        this.config = config;
        this.clickEvent = function (e) {
            var target = e.target;
            var className = target.className;
            if (className.includes(_this.config.iconClass)) {
                // const icon = target.querySelector(`.${this.iconClassName}`)
                var state = target.getAttribute('state');
                var bool = state === 'true' ? false : true;
                var parent_1 = target.parentNode.parentNode;
                var children = Array.from(parent_1.children);
                _this.toggleTree(children, target, bool);
            }
        };
        this.root = document.querySelector(this.config.root);
        this.data = this.config.data;
        this.titleClassName = this.config.titleClass || 'tree_title';
        this.wrapClassName = this.config.wrapClass || 'tree_wrap';
        this.iconClassName = this.config.iconClass || 'tree_icon';
        this.init();
    }
    JTree.prototype.init = function () {
        this.initTree(this.data, this.root);
        this.bindEvent();
    };
    JTree.prototype.initTree = function (data, dom) {
        for (var titleName in data) {
            var wrap = document.createElement('div');
            var title = document.createElement('h2');
            var icon = document.createElement('span');
            wrap.className = this.wrapClassName;
            icon.className = this.iconClassName;
            icon.setAttribute('state', 'false');
            title.className = this.titleClassName;
            title.innerHTML = "" + titleName;
            if (JTree.isEmptyObject(data[titleName])) {
                icon.classList.add('hide');
            }
            title.appendChild(icon);
            wrap.appendChild(title);
            dom.appendChild(wrap);
            this.initTree(data[titleName], wrap);
        }
    };
    JTree.prototype.toggleTree = function (children, icon, bool) {
        var _this = this;
        var name = bool ? 'add' : 'remove';
        icon.setAttribute('state', "" + bool);
        icon.classList[name]('show');
        children.forEach(function (item) {
            if (item.className !== _this.config.titleClass) {
                item.classList[name]('show');
            }
        });
    };
    JTree.prototype.bindEvent = function () {
        this.root.addEventListener('click', this.clickEvent);
    };
    return JTree;
}());
/**
 * 判断空对象
 * @static
 * @return {Boolean} 是空对象返回ture，否则false
 */
JTree.isEmptyObject = function (obj) {
    for (var key in obj) {
        return false;
    }
    return true;
};
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
    wrapClass: 'tree-body',
    titleClass: 'tree-title',
    iconClass: 'tree-icon',
    data: data
});
//# sourceMappingURL=tree.js.map