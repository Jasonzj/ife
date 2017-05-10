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
 	var arr = [];

 	//数组队列函数
 	function setData () {
 		arr.shift();
 		console.log(arr);
 		render(arr);
 	}

 	//渲染函数
 	function render () {
 		$('output').innerHTML = '';
 		for (var i = 0; i < arr.length; i++) {
 			if(i > 9){
 				setData();
 			} else {
 				$('output').innerHTML += "<div>"+ arr[i] +"</div>";
 			}
 		} 
 		/*data.map(function (v, i, a) {
 			if(i >= 10){
 				setData(data);
 			}else {
 				return "<div>"+ v +"</div>";
 			}
 		}).join('');*/
 	}

 	subLike.onclick = function () {
 		var str = textArea.value.trim();
 		
 		var data = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (e) {
 			return e.length !== 0;
 		});

 		Array.prototype.push.apply(arr, data); //合并数组

 		arr = [...new Set(arr)];  //数组去重

 		console.log(arr);

 		render();
 	}

 }());




