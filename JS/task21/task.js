/**
 *
 * @authors Jason (jason925645402@gmail.com)
 * @date    2017-05-10 23:20:25
 * 创建可复用的对象
 * @param {String} - input 输入框的id
 * @param {String} - output 输出框的id
 * @param {String} - button 按钮的id, 可选， 如果不选默认触发键盘事件
 */

(function() {

	//私有属性
	var Regular = /[^0-9a-zA-Z\u4e00-\u9fa5]+/
	var Regular2 = /[&\|\\\*^%'".+_=,;}{?><~`$#@\s/-]/ig
	var Regular3 = /[,\s\n]+/

	//构造函数
	function Queue (input, output, button) {
		//公有属性
		this.input = document.getElementById(input)
		this.output = document.getElementById(output)
		this.button = document.getElementById(button)
		this.arr = []

		//初始化
		this.button ? this.init('buttonEvent') : this.init('keyEvent')
	}

 	/**
 	* 原型方法
 	*/

 	Queue.prototype = {
 		constructor: Queue,

 		/**
 		* 初始化
 		* @param {String} - type 判断按钮的类型选择不同的初始化方式
 		*/

 		init: function (type) {
 			var self = this
			self.setQueue(type)
 		},

 		/**
 		* 删除数组模拟队列，通过num判断大于10的项一次性推出num项并重新渲染，每次插入只会渲染一次
 		* @param {Array} - arr 渲染数组
 		* @param {Number} - num 大于10的项的长度, 用来删除数组前面的项
 		*/

 		setArr: function (arr, num) {
 			arr.splice(0, num)
 			this.setRender(arr)
 		},

 		/**
 		* 渲染函数
 		* @param {Array} - arr 渲染数组
 		* @param {Element} - output 输出框的id
 		*/

 		setRender: function (arr) {
 			var self = this
 			var num = 0
 			self.output.innerHTML = ''
 			for (var i = 0, l = arr.length; i < l; i++) {
				if (l > 10) {
					self.setArr(arr, l - 10)
					return
				} else {
 					self.output.innerHTML += "<span class='smallbox' index="+ i +">"+ arr[i] +"</span>"
 				}
 			}
 			num = 0
 		},

 		/**
 		* 判断鼠标事件类型，处理盒子的删除。
 		* @param {event} - e
 		*/

 		setText: function (e) {
	 		if (e.target && e.target.nodeName === "SPAN") {
		 		switch (e.type) {
		 			case "mouseover":
					 	e.target.textContent = '删除:' + e.target.textContent
		 				break
		 			case "mouseout":
		 				e.target.textContent = e.target.textContent.replace('删除:','')
		 				break
		 			case "click":
		 				var self = this
		 				self.output.removeChild(e.target)
		 				var index = e.target.getAttribute('index')
		 				self.arr.splice(index, 1)
		 				self.setRender(self.arr)
		 				break
		 		}
		 	}
 		},

 		/**
 		* 添加tag,如果type是keyEvent,执行addTag
 		*/

 		addTag: function (e) {
 			var self = this
 			if (Regular3.test(e.target.value) || e.keyCode == 13) {		//判断按键逗号，回车和空格
 				var str = e.target.value.replace(Regular2,'')
 				self.arr.push(str)
 				self.arr = self.arr.unique()
 				e.target.value = ''
 				self.setRender(self.arr)
 			}
 		},

 		/**
 		* 添加爱好,如果type是buttonEvent,执行addHobby
 		*/

 		addHobby: function () {
 			var self = this
 			var str = self.input.value.trim()
 			self.input.value = ''
 			var data = str.split(Regular).filter( (e) => e.length !== 0 )
 			Array.prototype.push.apply(self.arr, data)
 			self.arr = self.arr.unique()
 			self.setRender(self.arr)
 		},

 		/**
 		* 绑定事件方法
 		* @param {String} - type 判断按钮的类型选择不同的初始化方式
 		*/

 		setQueue: function (type) {
 			var self = this
 			addEvent(self.output, 'mouseover', self.setText)
 			addEvent(self.output, 'mouseout', self.setText)
 		 	addEvent(self.output, 'click', self.setText.bind(this))

 		 	if (type === 'buttonEvent') {
 		 		addEvent(self.button, 'click', self.addHobby.bind(this))
 		 	} else if (type === 'keyEvent') {
 		 		addEvent(self.input, 'keyup', self.addTag.bind(this))
 		 	}
 		}

 	}

 	/**
 	* 私有方法
 	*/

 	//数组去重
	Array.prototype.unique = function () {
 		var res = []
 		this.forEach( (item, i) => res.indexOf(item) === -1 ? res.push(item) : '' )
 		return res
 	}

 	//跨浏览器事件绑定
 	function addEvent (element, event, hanlder) {
 		if (element.addEventListener) {
 			element.addEventListener(event, hanlder, false)
 		} else if (ele.attachEvent) {
 			ele.attachEvent("on" + event, hanlder)
 		} else {
 			element["on" + event] = hanlder
 		}
 	}

 	//外部接口
 	window.Queue = Queue

})()

//创建新实例
new Queue("textArea", "output", "subLike")
new Queue("textArea2", "output2", "subLike2")
new Queue("textArea3", "output3", "subLike3")
new Queue("tagInp", "tagBox")
new Queue("tagInp2", "tagBox2")
