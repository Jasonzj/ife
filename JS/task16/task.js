(function(){

	//简化查询
	function $ (id) {
		return document.getElementById(id);
	}

	//存取localStorage中的数据
	var store = {
		save (key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		fetch (key) {
			return JSON.parse(localStorage.getItem(key)) || [];
		}
	}

	//查询
	var city = $('aqi-city-input');
	var air = $('aqi-value-input');
	var addBtn = $('add-btn');
	var table = $('aqi-table');
	var citySpan = $('city-span');

	//表单验证
	function inputTra (event) {
		var index = event.target;
		var span = index.nextElementSibling;
	
		if (index.id === "aqi-city-input") {

			if (index.value === '') {
				span.innerHTML = '城市名不能为空';
			} else if (!index.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
				span.innerHTML = '城市名只能包含中英文，不能包含数字';
			} else {
				span.innerHTML = '';
			}

		} else if (index.id === "aqi-value-input") {

			if (!index.value.match(/^\d+$/)) {
				span.innerHTML = '空气质量指数必须为整数';
			} else {
				span.innerHTML = '';
			}

		}
		
	}

	function inputClickTra () {
		if (city.value === '') {
			alert('城市名不能为空');
			return
		} else if (!city.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
			alert('城市名只能包含中英文，不能包含数字');
			return
		} else if (!air.value.match(/^\d+$/)) {
			alert('空气质量指数必须为整数');
			return
		}
	}

	//表单查询事件
	city.oninput = function () {
		inputTra(event);
	}
	air.oninput = function () {
		inputTra(event);
	}



	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	 // var aqiData = {};
	var aqiData = store.fetch("aqiData");
	console.log(aqiData);
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {

		if (city.value === '') {
			alert('城市名不能为空');
			return;
		} 
		if (!city.value.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
			alert('城市名只能包含中英文，不能包含数字');
			return;
		} 
		if (!air.value.match(/^\d+$/)) {
			alert('空气质量指数必须为整数');
			return;
		}

		aqiData[city.value.trim()] = air.value.trim();
		console.log(window.localStorage);
		store.save('aqiData', aqiData);
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		table.innerHTML = '';
		if (table.children.length === 0) {
			table.innerHTML = '<tr class="theader"><td>城市</td><td>空气质量</td><td>操作</td></tr>';
		}
		for (var strCity in aqiData) {
			table.innerHTML += '<tr><td>' + strCity + '</td><td>' + aqiData[strCity] + '</td><td><button>删除</button></td></tr>'
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  	addAqiData();
	  	renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(item) {
	  // do sth.
	  var tr = item.parentElement.parentElement;
	  var strCity = tr.children[0].innerHTML;
	  delete aqiData[strCity];
	  store.save('aqiData', aqiData);	
	  renderAqiList();
	}

	function init() {


	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  addBtn.addEventListener('click', addBtnHandle);
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  table.addEventListener('click', function (e) {
	  	if (e.target && e.target.nodeName === "BUTTON") {
	  		delBtnHandle(e.target);
	  	}
	  });
	}

	init();
	renderAqiList();
}());

