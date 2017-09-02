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
            var funcName = { 'add': 'addNode', 'remove': 'removeNode' }[targetName];
            if (funcName)
                _this[funcName](root);
            if (e.target.nodeName === 'BUTTON') {
                if (_this[targetName])
                    _this[targetName]();
            }
        };
        this.data = config.data;
        this.root = document.querySelector(config.root);
        this.btnBox = document.querySelector(config.buttonBoxClass);
        this.searchInp = document.querySelector(config.searchInputClass);
        this.titleClassName = config.titleClass || 'tree_title';
        this.wrapClassName = config.wrapClass || 'tree_wrap';
        this.iconClassName = config.iconClass || 'tree_icon';
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
        var domCreateElement = document.createElement.bind(document);
        var wrap = domCreateElement('div');
        var title = domCreateElement('h2');
        var icon = domCreateElement('span');
        var span = domCreateElement('span');
        wrap.className = this.wrapClassName;
        icon.className = this.iconClassName;
        icon.setAttribute('state', 'false');
        title.className = this.titleClassName;
        span.innerHTML = "" + text;
        if (bool) {
            icon.classList.add('hide');
        }
        var operation = "\n            <div class=\"operation\">\n                <a name=\"add\">\u6DFB\u52A0</a>\n                <a name=\"remove\">\u5220\u9664</a>\n                <a name=\"rename\">\u91CD\u547D\u540D</a>\n            </div>";
        title.appendChild(span);
        title.appendChild(icon);
        title.innerHTML += operation;
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
    JTree.prototype.dirSearch = function () {
        var _this = this;
        var text = this.searchInp.value.trim();
        var result = this.traverseDF(this.root, this.titleClassName, text);
        var alertText = { '0': '没查询到', '1': '查询到了' }[result.length];
        if (alertText)
            alert(alertText);
        else if (result.length > 1)
            alert("\u627E\u5230" + result.length + "\u4E2A\u540C\u540D\u6587\u4EF6");
        result.forEach(function (item) {
            item.classList.add('current');
            _this.treeShow(item.parentElement.parentElement);
        });
        this.treeArr = result;
    };
    JTree.prototype.cleanSearch = function () {
        this.treeArr.forEach(function (item) { return item.classList.remove('current'); });
    };
    JTree.prototype.traverseDF = function (node, classN, text) {
        var stack = [];
        var result = [];
        while (node) {
            if (node.className.includes(classN)) {
                var dom = node.firstElementChild;
                var searchText = dom.innerHTML.trim();
                if (searchText === text) {
                    result.push(dom);
                }
            }
            if (node.children) {
                for (var i = node.children.length - 1; i >= 0; i--) {
                    stack.push(node.children[i]);
                }
            }
            node = stack.pop();
        }
        return result;
    };
    JTree.prototype.treeShow = function (node) {
        var parent = node.parentElement;
        var className = parent.className;
        if (className.includes(this.wrapClassName)) {
            var children = Array.from(parent.children);
            var icon = parent.querySelector("." + this.iconClassName);
            this.toggleTree(children, icon, true);
            this.treeShow(parent);
        }
    };
    JTree.prototype.bindEvent = function () {
        this.root.addEventListener('click', this.clickEvent);
        this.btnBox.addEventListener('click', this.clickEvent);
    };
    return JTree;
}());
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
    searchInputClass: '.inp',
    buttonBoxClass: '.buttonBox',
    data: data
});
//# sourceMappingURL=tree.js.map