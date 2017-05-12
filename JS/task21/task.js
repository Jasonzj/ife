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

	//构造函数
	function Queue (input, output, button) {
		//公有属性
		this.input = document.getElementById(input);
		this.output = document.getElementsByClassName(output)[0];
		this.button = document.getElementById(button);
		this.Regular = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
		this.Regular2 = /[&\|\\\*^%'".+_=,;}{?><~`$#@\s/-]/ig;
		this.Regular3 = /[,\s\n]+/;
		this.arr = [];

		//初始化
		this.button ? this.init('buttonEvent') : this.init('keyEvent');
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
 			var self = this;
			self.setQueue(type);
 		},

 		/** 
 		* 删除数组模拟队列，通过num判断大于10的项一次性推出num项并重新渲染，每次插入只会渲染一次
 		* @param {Array} - arr 渲染数组
 		* @param {Number} - num 大于10的项的长度, 用来删除数组前面的项
 		*/

 		setArr: function (arr, num) {
 			arr.splice(0, num);
 			console.log(arr);
 			this.setRender(arr);
 		},

 		/** 
 		* 渲染函数
 		* @param {Array} - arr 渲染数组
 		* @param {Element} - output 输出框的id
 		*/

 		setRender: function (arr) {
 			var self = this;
 			var num = 0;
 			self.output.innerHTML = '';
 			for (var i = 0; i < arr.length; i++) {
 				if(i > 9){	
 					num++;		
 					if(i === arr.length - 1) {
 						console.log(num);
 						self.setArr(arr, num);
 					}
 				} else {
 					self.output.innerHTML += "<span class='smallbox' index="+ i +">"+ arr[i] +"</span>";
 				}
 			} 
 			num = 0;
 		},

 		//添加删除文本
 		setText: function (e) {
	 		if (e.target && e.target.nodeName === "SPAN") {	 	
		 			e.target.textContent = '删除:' + e.target.textContent; 				
	 		}
 		},

 		//去除删除文本
 		delText: function (e) {
	 		if (e.target && e.target.nodeName === "SPAN") {	
				e.target.textContent = e.target.textContent.replace('删除:','');
	 		}
 		},

 		/** 
 		* 点击删除自身
 		* @param {event} - event
 		* @param {Element} - output 输出框的id
 		* @param {Array} - data 删除数组
 		*/

 		delSelf: function (ev, arr) {
 			var self = this;
 			self.output.removeChild(ev);
 			var index = ev.getAttribute('index');
 			console.log(arr);
 			arr.splice(index, 1);
 			self.setRender(self.arr);
 			console.log(arr);
 		},

 		/** 
 		* 添加tag,如果type是keyEvent,执行addTag
 		*/

 		addTag: function (e) {
 			var self = this;
 			if(self.Regular3.test(e.target.value) || e.keyCode == 13){		//判断按键逗号，回车和空格
 				var str = e.target.value.replace(self.Regular2,'');
 				self.arr.push(str);		
 				self.arr = self.arr.filter( (index) => index );   
 				self.arr = self.arr.unique();		
 				e.target.value = '';
 				self.setRender(self.arr);
 			}
 		},

 		/** 
 		* 添加爱好,如果type是buttonEvent,执行addTag
 		*/

 		addHobby: function () {
 			var self = this;
 			var str = textArea.value.trim();
 			textArea.value = '';
 			var data = str.split(self.Regular).filter( (e) => e.length !== 0 );
 			Array.prototype.push.apply(self.arr, data); 
 			self.arr = self.arr.unique();	
 			self.setRender(self.arr);
 		},

 		/** 
 		* 绑定事件方法
 		* @param {String} - type 判断按钮的类型选择不同的初始化方式
 		*/

 		setQueue: function (type) {
 			var self = this;
 			addEvent(self.output, 'mouseover', self.setText);
 			addEvent(self.output, 'mouseout', self.delText);
 		 	addEvent(self.output, 'click', function (e) {
 		 		if (e.target && e.target.nodeName === "SPAN") {	 			
 		 			self.delSelf(e.target, self.arr);
 		 		}
 		 	});
 		 	
 		 	if(type === 'buttonEvent') {
 		 		// addEvent(self.button, 'click', self.addHobby);
 		 		self.button.onclick = function() {
 		 			self.addHobby();
 		 		}
 		 	} else if (type === 'keyEvent') {
 		 		// addEvent(self.button, 'keyup', self.addTag);
 		 		self.input.onkeyup = function() {
 		 			self.addTag(event);
 		 		}
 		 	}
 		}

 	}

 	/** 
 	* 私有方法
 	*/

 	//数组去重
	Array.prototype.unique = function () {
 		var res = [];
 		this.forEach( (item, i) => res.indexOf(item) === -1 ? res.push(item) : '' )
 		return res;
 	}

 	//跨浏览器事件绑定
 	function addEvent (element, event, hanlder) {
 		if (element.addEventListener) {
 			element.addEventListener(event, hanlder, false);
 		} else if (ele.attachEvent) {
 			ele.attachEvent("on" + event, hanlder);
 		} else {
 			element["on" + event] = hanlder;
 		}
 	}

 	//外部接口
 	window.Queue = Queue;
})();

//创建新实例
new Queue('textArea', 'output', 'subLike');
new Queue('tagInp', 'tagBox');

