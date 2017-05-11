/**
 * 
 * @authors Jason (jason925645402@gmail.com)
 * @date    2017-05-10 23:20:25
 */


 (function () {

 	//简化查询
 	function $ (id) {
 		return document.getElementById(id);
 	}

 	var subLike = $('subLike');
 	var textArea = $('textArea');
 	var tagInp  = $('tagInp');
 	var output = $('output');
 	var tagBox = $('tagBox');

 	var arr = [];
 	var tagArr = [];

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

 	//给数组添加去重方法
 	Array.prototype.unique = function () {
 		var res = [];
 		// var json = {};
 		// for(var i = 0; i < this.length; i++) {
 		// 	if(!json[this[i]]){
 		// 		res.push(this[i]);
 		// 		json[this[i]] = 1;
 		// 	}
 		// }
 		this.forEach((item,i) => {
 			res.indexOf(item) === -1 ? res.push(item) : ''
 		})
 		return res;
 	}

 	//数组队列函数
 	function setData (arr2, num, boxId) {
 		// arr.shift();
 		arr2.splice(0, num);
 		console.log(arr2);
 		render(arr2, boxId);
 	}

 	//渲染函数
 	function render (arr2, boxId) {
 		// var box = $(boxId);
 		var num = 0;
 		boxId.innerHTML = '';
 		for (var i = 0; i < arr2.length; i++) {
 			if(i > 9){	//如果大于10就执行setData()去掉数组第一项
 				num++;		//数组10以后的项数
 				if(i === arr2.length - 1) {
 					console.log(num);
 					// state = 0;
 					setData(arr2, num, boxId);
 				}
 			} else {
 				boxId.innerHTML += "<span class='smallbox' index="+ i +">"+ arr2[i] +"</span>";
 			}
 		} 
 		num = 0;
 		/*data.map(function (v, i, a) {
 			if(i >= 10){
 				setData(data);
 			}else {
 				return "<div>"+ v +"</div>";
 			}
 		}).join('');*/
 	}

 	//添加Tag
 	function addTag (e) {
 		if(/[,\s\n]+/.test(e.target.value) || e.keyCode == 13){		//判断按键逗号，回车和空格
 			var str = e.target.value.trim();
 			str = str.replace(',', '');	//过滤逗号
 			tagArr.push(str);		//推入数组
 			tagArr = tagArr.filter( (index) => index );   //过滤空值
 			tagArr = tagArr.unique();		//数组去重
 			e.target.value = '';
 			render(tagArr, tagBox);
 		}
 	}

 	//添加爱好
 	function addHobby () {
 		var str = textArea.value.trim();
 		
 		var data = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter( (e) => e.length !== 0 );

 		Array.prototype.push.apply(arr, data); //合并数组

 		// arr = [...new Set(arr)];  //数组去重ES6

 		arr = arr.unique();	//数组去重

 		console.log(arr);

 		render(arr, output);
 	}

 	//删除当前的Tag
 	function delSpan (ev) {
 		tagBox.removeChild(ev);
 		var index = ev.getAttribute('index');
 		console.log(tagArr);
 		tagArr.splice(index, 1);
 		console.log(tagArr);
 		console.log(index);
 	}

 	//添加删除文本
 	function addTagText (e) {
 		if (e.target && e.target.nodeName === "SPAN") {	 	
	 			e.target.textContent = '删除:' + e.target.textContent; 				
 		}
 	}

 	//去除删除文本
 	function delTagText (e) {
 		if (e.target && e.target.nodeName === "SPAN") {	
			e.target.textContent = e.target.textContent.replace('删除:','');
 		}
 	}


 	//绑定事件
 	function init() {
 		 	addEvent(tagBox, 'mouseover', addTagText);
 		 	addEvent(tagBox, 'mouseout', delTagText);
 		 	addEvent(tagBox, 'click', function (e) {
 		 		if (e.target && e.target.nodeName === "SPAN") {	 			
 		 			delSpan(e.target);
 		 		}
 		 	});


 		 	//tagInp事件
 		 	addEvent(tagInp, 'keyup', addTag);


 		 	//textager事件
 		 	addEvent(subLike, 'click', addHobby);
 	}
 	
  init();
}());




