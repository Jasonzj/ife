var JTree = (function () {
    function JTree(config) {
        var _this = this;
        this.config = config;
        this.clickEvent = function (e) {
            var target = e.target;
            var className = target.className;
            var targetName = target.name;
            var parent = target.parentElement.parentElement;
            var children = Array.from(parent.children);
            var root = parent.parentElement;
            if (className.includes(_this.config.iconClass)) {
                var state = target.getAttribute('state');
                var bool = state === 'true' ? false : true;
                _this.toggleTree(children, target, bool);
            }
            switch (targetName) {
                case 'add':
                    _this.addNode(root);
                    break;
                case 'remove':
                    _this.removeNode(root);
                    break;
                case 'rename':
                    var resText = parent.innerText;
                    var result = _this.setPrompt('请输入修改节点的名称', resText).trim();
                    parent.innerText = result;
            }
        };
        this.root = document.querySelector(this.config.root);
        this.data = this.config.data;
        this.titleClassName = this.config.titleClass || 'tree_title';
        this.wrapClassName = this.config.wrapClass || 'tree_wrap';
        this.iconClassName = this.config.iconClass || 'tree_icon';
        this.treeArr = [];
        this.init();
    }
    JTree.prototype.init = function () {
        this.initTree(this.data, this.root);
        this.bindEvent();
    };
    JTree.prototype.initTree = function (data, dom) {
        for (var titleName in data) {
            var bool = JTree.isEmptyObject(data[titleName]);
            var wrap = this.createNode(titleName, bool);
            dom.appendChild(wrap);
            this.initTree(data[titleName], wrap);
        }
    };
    JTree.prototype.createNode = function (text, bool) {
        var wrap = document.createElement('div');
        var title = document.createElement('h2');
        var icon = document.createElement('span');
        wrap.className = this.wrapClassName;
        icon.className = this.iconClassName;
        icon.setAttribute('state', 'false');
        title.className = this.titleClassName;
        title.innerHTML = "" + text;
        if (bool) {
            icon.classList.add('hide');
        }
        var operation = "\n            <div class=\"operation\">\n                <a name=\"add\">\u6DFB\u52A0</a>\n                <a name=\"remove\">\u5220\u9664</a>\n                <a name=\"rename\">\u91CD\u547D\u540D</a>\n            </div>";
        title.innerHTML += operation;
        title.appendChild(icon);
        wrap.appendChild(title);
        return wrap;
    };
    JTree.prototype.setPrompt = function (text, resText) {
        return prompt(text, resText).trim();
    };
    JTree.prototype.addNode = function (dom) {
        var text = this.setPrompt('请输入添加节点的名称');
        var node = this.createNode(text, true);
        var children = Array.from(dom.children);
        var icon = dom.querySelector("." + this.iconClassName);
        node.classList.add('show');
        dom.appendChild(node);
        this.toggleTree(children, icon, true);
    };
    JTree.prototype.removeNode = function (dom) {
        var parent = dom.parentElement;
        var children = parent.children;
        var icon = parent.querySelector("." + this.iconClassName);
        dom.remove();
        if (children.length === 1) {
            icon.className = this.iconClassName + " hide";
        }
    };
    JTree.prototype.toggleTree = function (children, icon, bool) {
        var _this = this;
        var name = bool ? 'add' : 'remove';
        var iconClassName = icon.className;
        icon.setAttribute('state', "" + bool);
        icon.classList[name]('show');
        if (iconClassName.includes('hide')) {
            icon.classList.remove('hide');
        }
        children.forEach(function (item) {
            if (item.className !== _this.config.titleClass) {
                item.classList[name]('show');
            }
        });
    };
    JTree.prototype.traverseDF = function (node) {
        var stack = [];
        while (node !== null) {
            this.treeArr.push(node);
            if (node.children.length !== 0) {
                for (var i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i]);
                }
            }
            node = stack.pop();
        }
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