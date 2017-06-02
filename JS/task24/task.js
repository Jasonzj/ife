/*
 * @Author: Jason 
 * @Date: 2017-05-31 21:04:43 
 * @Last Modified by: Jason
 * @Last Modified time: 2017-06-02 13:02:47
 */

/**
 * Creates an instance of Tree.
 * @param {String} root (类名)需要遍历的DOM树跟节点
 * @param {String} btnBox (类名)按钮盒子
 * @param {String} searchInp (类名)搜索输入框
 * @param {String} treeBox (类名)渲染树的盒子
 * @param {Object} data (变量名)渲染树的数据
 * 
 * @memberof Tree
 */

;
(window => {

    class Tree {

        //构造函数
        constructor(root, treeBox, btnBox, searchInp, data) {
            this.treeBox = document.querySelector(treeBox);
            this.btnBox = document.querySelector(btnBox);
            this.inp = document.querySelector(searchInp);
            this.data = data;
            this.timer = null;
            this.BFindex = 0;
            this.arr = [];

            //初始化
            this.init(root);
        }
        
        /**
         * 初始化方法
         * @param {String} root (类名)需要遍历的DOM🌲跟节点
         */

        init (root) {
            //初始化DOM🌲渲染
            this.initTree(root);

            //初始化事件绑定
            this.bindEvent();
        }

        /**
         * 初始化DOM🌲方法
         * @param {String} root (类名)需要遍历的DOM🌲跟节点
         */

        initTree (root) {
            var self = this;
            var fragment = document.createDocumentFragment();
            self.RenderTree(self.data, fragment);
            self.treeBox.appendChild(fragment);
            self.root = document.querySelector(root);
        }

        /**
         * DOM🌲渲染方法
         * @param {Object} data (变量名)渲染🌲的数据
         * @param {Element} parentElement 渲染🌲根节点
         */

        RenderTree (data, parentElement) {
            var key,
                treeView;

            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key != 'view') {
                        treeView = document.createElement('div');
                        treeView.className = key;
                        treeView.innerHTML = key;
                        parentElement.appendChild(treeView);
                        this.RenderTree(data[key], treeView);
                    }
                }
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
                if (arr[i].childNodes[0].nodeValue.trim() === text) {
                    index = i;
                }
            }

            return index;
        }

        /**
         * 重置动画方法
         */

        setReset () {
            var self = this;

            var divs = self.treeBox.getElementsByTagName('div');
            divs = [].slice.call(divs);

            divs.forEach(function(item) {
                item.removeClass("active");
                item.removeClass("current");
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
                text = self.inp.value;

            switch (e.target.name) {
                case "DFSsearch":
                    if (text === "") {
                        alert("输入框不能为空");
                        return
                    }
                    self.clickHandle(text, "traverseDF", true);
                    break;
                case "BFSsearch":
                    if (text === "") {
                        alert("输入框不能为空");
                        return
                    }
                    self.clickHandle(text, "traverseBF", true);
                    break;
                case "DFS":
                    self.clickHandle(text, "traverseDF", false);
                    break;
                case "BFS":
                    self.clickHandle(text, "traverseBF", false);
                    break;
            }
        }

        setSelect (e) {
            var self = this,
                target = e.target;
            
            self.setReset();
            target.addClass("active");

        }

        /**
         * 绑定事件方法
         */

        bindEvent () {
            var self = this;

            addEvent(self.btnBox, 'click', self.setClick.bind(self));
            addEvent(self.treeBox, 'click', self.setSelect.bind(self));
        }
    }

    //外部接口
    window.Tree = Tree;

})(window);

/* 
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

/* 
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
    'root': {
        'Cor': {
            'Jason': {
                'Apple': {},
                'coc': {}
            },
            'boot': {
                'abc': {
                    'bgirl': {}
                },
                'teach': {},
                'abcd': {}
            }
        },
        'dsadas' : {
            'bba': {
                'kill': {}
            },
            'das': {
                'ssl': {},
                'qian': {}
            }
        },
        'Bboy': {

        }
    }
};