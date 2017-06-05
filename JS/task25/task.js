/*
 * @Author: Jason 
 * @Date: 2017-05-31 21:04:43 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-05 13:11:52
 */

/**
 * Tree(节点树)
 * @param {String} root (类名)需要遍历的DOM树跟节点
 * @param {String} btnBox (类名)按钮盒子
 * @param {String} searchInp (类名)搜索输入框
 * @param {String} treeBox (类名)渲染树的盒子
 * @param {String} addInp （类名)添加节点输入框, directory为ture则不选
 * @param {Object} data (变量名)渲染树的数据
 * @param {Boolean} directory (可选)true为树形目录,默认为节点树
 * 
 * DirTree(目录树)
 * @memberof Tree
 */

;
(window => {

    class Tree {
        
        //构造函数
        constructor(json) {
            this.treeBox = document.querySelector(json["treeBox"]);
            this.btnBox = document.querySelector(json["btnBox"]);
            this.searchInpt = document.querySelector(json["searchInp"]);
            this.addInp = document.querySelector(json["addInp"]);
            this.data = json["data"];   

            this.nodeState = false;  //记录当前节点选中状态
            this.current = null;     //记录当前点击的节点
            this.timer = null;       //动画定时器
            this.BFindex = 0;        //记录广度优先计数
            this.arr = [];           //遍历后存放的数组

            //初始化
            this.init(json["root"], json["directory"]);
        }
        
        /**
         * 初始化方法
         * @param {String} root (类名)需要遍历的DOM🌲跟节点
         * @param {Boolean} directory (可选)true为树形目录,默认为节点树
         */

        init (root, directory) {    
            //初始化DOM🌲渲染
            this.initTree(root, directory);

            //初始化事件绑定
            this.bindEvent(directory);
        }

        /**
         * 初始化DOM🌲方法
         * @param {String} root (类名)需要遍历的DOM🌲跟节点
         * @param {Boolean} directory (可选)true为树形目录,默认为节点树
         */

        initTree (root, directory) {
            var self = this;
            var fragment = document.createDocumentFragment();

            //根据directory判断渲染目录树还是节点树
            directory ?  self.renderDirectoryTree(self.data, fragment) : self.renderTree(self.data, fragment);

            self.treeBox.appendChild(fragment);
            self.root = document.querySelector(root);
        }

        /**
         * 目录DOM🌲渲染方法
         * @param {Object} data (变量名)渲染🌲的数据
         * @param {Element} parentElement 渲染🌲根节点
         */

        renderDirectoryTree (data, parentElement) {
            var key, i = 0,
                label,
                treeView;

            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    treeView = document.createElement('div');
                    treeView.className = "tree-body";
                    label = document.createElement('label');
                    label.innerHTML = `
                    <span> ${key} </span>
                    <span class='state' name='0'> [+] </span> 
                    <div class="operation">
                        <a class="add">添加</a>
                        <a class="remove">删除</a>
                        <a class="rename">重命名</a>
                    </div>`;
                    
                    label.className = "tree-header";

                    //判断如果是空对象表示没有子节点
                    if (isEmptyObject(data[key])) {
                        label.innerHTML = `
                        <span> ${key} </span>
                        <div class="operation">
                            <a class="add">添加</a>
                            <a class="remove">删除</a>
                            <a class="rename">重命名</a>
                        </div>`;
                    }
                    
                    treeView.appendChild(label);
                    parentElement.appendChild(treeView);
                    this.renderDirectoryTree(data[key], treeView);
                }
            }
        }

        /**
         * 节点DOM🌲渲染方法
         * @param {Object} data (变量名)渲染🌲的数据
         * @param {Element} parentElement 渲染🌲根节点
         */

        renderTree (data, parentElement) {
            var key,
                treeView;
                
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    treeView = document.createElement('div');
                    treeView.className = key;
                    treeView.innerHTML = key;
                    parentElement.appendChild(treeView);
                    this.renderTree(data[key], treeView);
                }
            }
        }

        /**
         * 非递归广度优先遍历方法
         * @param {Element} node 需要遍历的根节点
         */

        traverseBF2 (node) {
            var self = this;
            var queue = [];

            while (node != null) {
                self.arr.push(node);
                if (node.children.length != 0) {
                    for (var i = 0; i < node.children.length; i++) {
                        queue.push(node.children[i]);
                    }
                }
                node = queue.shift();
            }
        }

        /**
         * 非递归深度优先遍历方法
         * @param {Element} node 需要遍历的根节点
         */

        traverseDF2 (node) {
            var self = this;
            var queue = [];

            while (node != null) {
                self.arr.push(node);
                if (node.children.length != 0) {
                    for (var i = node.children.length - 1; i >= 0; i--) {
                        queue.push(node.children[i]);
                    }
                }
                node = queue.pop();
            }
        }

        /**
         * 深度优先遍历方法
         * @param {Element} node 需要遍历的根节点
         */

        traverseDF (node) {
            var i, len,
                self = this,
                child = node.children.length;

            if (node) {
                self.arr.push(node);
                for (i = 0, len = child; i < len; i++) {
                    self.traverseDF(node.children[i]);
                }
            }
        }

        /**
         * 广度优先遍历方法
         * @param {Element} node 需要遍历的根节点
         */

        traverseBF (node) {
            var self = this;
            
            if (node) {
                self.arr.push(node);
                self.traverseBF(node.nextElementSibling);
                node = self.arr[self.BFindex++];
                self.traverseBF(node.firstElementChild);
            }
        }

        /**
         * 遍历动画方法
         * @param {Number} index 查询到的元素在数组中的下标 i 
         * @param {Boolean} search 用来判断查询和遍历
         */
        
        setAnimate (index, search) {
            var i = 0, 
                self = this,
                lists = self.arr,
                len = lists.length;

            lists[i].addClass("active");
            self.timer = setInterval(function() {
                i++;
                if (i < len) {
                    lists[i - 1].removeClass("active");
					lists[i].addClass("active");
                } else {
                    clearInterval(self.timer);
                    lists[lists.length - 1].removeClass("active");
                }

                if (!search) {
                    if (i === index) {
                        self.setReset();
                        lists[i].className = "current";
                        setTimeout(function() {
                            alert("查询到了");
                        }, 100);
                    } else if (i !== index && i === lists.length) {
                        alert("没查询到");
                    }
                } 
            }, 500);
            
        }

        /**
         * 搜索方法
         * @param {String} text 需要查询的字符串(搜索框的值)
         * @returns 返回查询到的元素在数组中的下标 i 
         */
        
        setSearch (text) {
            var i, len, index,
                self = this,
                arr = self.arr;
            
            for (i = 0, len = arr.length; i < len; i++) {
                if (arr[i].childNodes[0].nodeValue) {
                    if (arr[i].childNodes[0].nodeValue.trim() === text) {
                        index = i;
                    }
                }
                
            }

            return index;
        }

        /**
         * 重置动画方法
         */

        setReset () {
            var self = this;

            self.nodeState = false;    //设置当前节点选中状态

            var divs = self.treeBox.getElementsByTagName('div');
            divs = [].slice.call(divs);
            console.log(divs);
            divs.forEach(function(item) {
                item.removeClass("active");
                item.removeClass("current");
                if (item.firstElementChild) {
                    item.firstElementChild.removeClass("current");
                }
            });

            self.arr = [];
            clearInterval(self.timer);
        }

        /**
         * 处理点击事件方法
         * @param {String} text 当前搜索框的值
         * @param {String} arithmetic 要执行的遍历方法
         * @param {Boolean} search 判断是否为查询按钮
         */

        clickHandle (text, arithmetic, search) {
            var self = this,
                index = 0;

            self.setReset();
            self[arithmetic](self.root);
            
            if (search) {
                index = self.setSearch(text);
                self.setAnimate(index);
            } else {
                self.setAnimate(null ,true);
            }
        }

        /**
         * 设置点击事件方法
         * @param {Event} e 当前Event
         */
        
        setClick (e) {
            var self = this,
                text = self.searchInpt.value;

            if(e.target.nodeName !== "BUTTON") return;

            switch (e.target.name) {
                case "DFS":
                    self.clickHandle(text, "traverseDF", false);
                    break;
                case "BFS":
                    self.clickHandle(text, "traverseBF", false);
                    break;
                case "addNode":
                    self.setNode(e.target.name);
                    break;
                case "removeNode":
                    self.setNode(e.target.name);
                    break;
                case "DFSsearch":
                    if (text === "") {
                        alert("输入框不能为空");
                        return
                    }
                    self.clickHandle(text, "traverseDF2", true);
                    break;
                case "BFSsearch":
                    if (text === "") {
                        alert("输入框不能为空");
                        return
                    }
                    self.clickHandle(text, "traverseBF2", true);
                    break;
            }
        }

        /**
         * 渲染新添加节点方法
         * @param {Array} data 需要渲染到当前节点的数组
         * @param {Boolean} add (可选)true为添加，默认为删除
         */

        nodeRender (data, add, classN) {
            var self = this,
                current = self.current;

            if (add) {
                if (data instanceof Array) {
                    current.innerHTML += data.map(function(e) {
                        // return "<div>" + e + "</div>";
                        return `<div class='${classN}'> ${e} </div>`;
                    }).join('');
                } else {
                    var div = document.createElement("div");
                    div.className = classN;
                    div.innerHTML = `
                    <label class="tree-header">
                        <span> ${data} </span>
                        <div class="operation">
                            <a class="add">添加</a>
                            <a class="remove">删除</a>
                            <a class="rename">重命名</a>
                        </div>
                    </label>`;
                    current.appendChild(div);
                }
                
            } else {
                var parent = current.parentNode;
                parent.removeChild(current);
            }
        }

        /**
         * 添加删除节点处理方法
         * @param {String} btnName 当前点击按钮的类名
         */
        
        setNode (btnName) {
            var self = this,
                str = self.addInp.value.trim();
                data = str.split(Regular);
            
            if (!self.nodeState) {
                alert("未选中节点");
                return;
            }

            if (btnName.indexOf("add") > -1) {
                if (str === "") {
                    alert("插入节点值不能为空");
                    return
                }
                data = data.unique();
                self.nodeRender(data, true, "");
            } else if (btnName.indexOf("remove") > -1) {
                self.nodeRender();
            }
        }

        /**
         * 点击节点处理方法(点击节点选中)
         * @param {Event} e  
         */
        
        setShow (e) {
            var self = this,
                target = e.target;
            
            switch (e.type) {
                case "click":
                    self.setReset();
                    self.current = target;    //设置当前点击的节点
                    target.addClass("active");
                    self.nodeState = true;    //设置当前节点选中状态
                    break;
            
                case "dblclick":
                    target.removeClass("active");
                    self.nodeState = false;    //设置当前节点选中状态
                    break;
            }
        }

        /**
         * 绑定事件方法
         */

        bindEvent (directory) {
            var self = this;

            addEvent(self.btnBox, 'click', self.setClick.bind(self));
            
            if (!directory) {
                addEvent(self.treeBox, 'click', self.setSelect.bind(self));
                addEvent(self.treeBox, 'dblclick', self.setSelect.bind(self));
            }
            
        }
    }
    
    /**
     * 目录树
     * @class DirTree
     * @extends {Tree}
     */

    class DirTree extends Tree {
        constructor(json) {
            super(json);

            this.dirInit();
        }

        /**
         * 初始化
         */
        
        dirInit() {
            this.setDirTreeEvent();
        }
        
        setShow (e) {
            var self = this,
                parent = e.target.parentNode.parentNode,
                lists = Array.prototype.slice.call(parent.children),
                iconState = e.target,
                state = parseInt(iconState.getAttribute("name"));
            
            if (e.target.className == "state") {
                if (state) {
                    self.hidden(iconState, lists);
                } else {
                    self.show(iconState, lists);
                }
            }

            // 执行处理操作点击方法
            self.setOperation(e);
        }

        show (iconState, lists) {
            var self = this;
            
            if (iconState) {
                iconState.innerHTML = " [-] ";
                iconState.setAttribute("name", 1);
            }
            self.setClass(lists, "addClass");
        }

        hidden (iconState, lists) {
            var self = this;
            
            iconState.innerHTML = " [+] ";
            iconState.setAttribute("name", 0);
            self.setClass(lists, "removeClass");   
        }

        setClass (lists, operation) {
            lists.forEach(function(item) {
                if (item.className != "tree-header") {
                    item[operation]("show");
                }
            }) 
        }

        getText (text, reText) {
            return prompt(text, reText).trim();
        }

        setOperation (e) {
            var self = this,
                text = "",  //存储当前添加文本值
                lists = [], //点击显示地内容
                renameText = "", //存储需要重命名对应的文本值
                iconState = null,  //存储当前操作节点对应的加减符号所在的element
                parent = e.target.parentNode.parentNode;  //存储当前点击的父级

            self.current = parent.parentNode;   //用于添加节点

            switch (e.target.className) {   
                case "add":
                    text = self.getText("请输入添加节点的名称");
                    self.nodeRender(text, true, "tree-body");
                    iconState = parent.querySelector('.state');
                    if (!iconState) {
                        parent.innerHTML += "<span class='state' name='1'> [-] </span> "
                    } 
                    lists = Array.prototype.slice.call(self.current.children); 
                    self.show(iconState, lists);  
                    break;

                case "remove":
                    self.nodeRender();
                    break;

                case "rename":
                    renameText = parent.children[0].innerHTML.trim();
                    var result = self.getText("请输入修改节点的名称", renameText)
                    parent.children[0].innerHTML = result;
                    break;
            }
        }

        dirReset(span) {
            var self = this,
                box = self.treeBox.getElementsByTagName("span");
            
            box = [].slice.call(box);
            box.forEach(item => {
                item.removeClass("current");
            })
        }

        dirSearch (e) {
            var self = this,
                i = 0;
            if (e.target.name === "DirSearch") {
                var text = self.searchInpt.value.trim();

                if (text == "") {
                    alert("不能输入空值");
                    return;
                }

                self.traverseDF2(self.root);
                var index = self.setSearch(text);
                if (index) {
                    self.dirReset();
                    self.arr[index].addClass("current");
                } else {
                    alert("没查询到");
                    return;
                }
                

                function listShow (node) {
                    var lists = [],
                        iconState,
                        parents = node.parentNode.parentNode;

                    if(parents.className.indexOf("tree-body") > -1) {
                        lists = siblings(parents);

                        if (i !== 0) iconState = parents.querySelector(".state");
                        
                        i++;
                        
                        self.show(iconState, lists); 
                        listShow(node.parentNode);
                    } else {
                        return node;
                    }

                }
                listShow(self.arr[index]);
            }
        }

        /**
         * 绑定事件方法
         */
        
        setDirTreeEvent () {
            var self = this;
            addEvent(self.treeBox, 'click', self.setShow.bind(self));
            addEvent(self.btnBox, 'click', self.dirSearch.bind(self));
        }


    }

    //私有属性
    var Regular = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;

    //外部接口
    window.Tree = Tree;
    window.DirTree = DirTree;

})(window);

/**
* 判断空对象
*/

function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
} 

/**
* 获取所有兄弟节点(包括自身)
*/

function siblings (ele) {
    var i, len,
        arr = [],
        children = ele.parentNode.children;
    for (i = 0, len = children.length; i < len; i++) {
        arr.push(children[i]);
    }

    return arr;
}

/**
* 跨浏览器事件绑定
*/

function addEvent(element, event, hanlder) {
    if (element.addEventListener) {
        element.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        element["on" + event] = hanlder;
    }
};

/**
 *  数组去重
 */

Array.prototype.unique = function() {
    var i, len, item,
        key = null,
		_arr = [],
		hash = {};

    for (i = 0, len = this.length; i < len; i++) {
        item = this[i];
        key = typeof(item) + item;

        if (hash[key] !== 1) {
            _arr.push(item);
            hash[key] = 1;
        }
        
    }
    
    return _arr;
}

/**
* 给Element对象添加操作class的方法
*/

Element.prototype.hasClass = function (str) {
	return this.className.match(new RegExp('(\\s|^)' + str + '(\\s|$)')); 
}

Element.prototype.addClass = function (str) {
	if (!this.hasClass(str)) this.className += " " + str;
}

Element.prototype.removeClass = function (str) {
	if (this.hasClass(str)) {
		var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
		this.className = this.className.replace(reg, '');
	}
}

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
};

