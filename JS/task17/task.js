/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

//跨浏览器绑定
function addEvent (element, event, hanlder) {
	if (element.addEventListener) {
		element.addEventListener(event, hanlder, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, hanlder);
	} else {
		element["on" + event] = hanlder;
	}
}


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var chartWrap = document.getElementById('chart-wrap');
	var tarCity = pageState['nowSelectCity'];
	var tarTime = pageState['nowGraTime'];
	var num = 0;
	var tarData = chartData[tarTime][tarCity];

	chartWrap.innerHTML = '';

	for (item in tarData) {
		num++;
		var smallBox = document.createElement("div");
		smallBox.title = 'time: ' + item + '空气质量: ' + tarData[item];
		smallBox.className = "small-box";		
		smallBox.style.height = tarData[item] * 0.8 + 'px';
		smallBox.style.backgroundColor = "hsl(" + Math.floor(tarData[item] * 2.5) + ",70%,80%)";
		// smallBox.innerText = tarData[item];
		chartWrap.appendChild(smallBox);
	}
	var box = document.getElementsByClassName('small-box');
	for(var i = 0; i < box.length; i++) {
		box[i].style.width = 1000 / num + 'px';		
	}
	num = 0;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化 
  if (e.target.value == pageState['nowGraTime']) {
  	return false;
  }
  // 设置对应数据
  pageState['nowGraTime'] = e.target.value;
  console.log(e.target.value);
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
  // 确定是否选项发生了变化 
  if (e.target.value == pageState['nowSelectCity']) {
  	return false;
  }
  // 设置对应数据
  pageState['nowSelectCity'] = e.target.value;
  console.log(e.target.value);
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radioBox = document.getElementById('form-gra-time');

	addEvent(radioBox, "change", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
  var html = '';
  for (e in aqiSourceData) {
    html += '<option>' + e + '</option>';
  }
  citySelect.innerHTML = html;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEvent(citySelect, "change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中

  //设置基础数据
	var day = {};
	var week = {};
	// var weekDays = 0;
	var weekNum = 1;
	var weekTotal = 0;
	var month = {}; 
	var monthDays = 0;
	var monthNum = 1; 
	var monthTotal = 0;
	var dayindex = 0;

	for (city in aqiSourceData) {
		//获取城市
		day[city] = {};
		week[city] = {};
		month[city] = {};

		for(date in aqiSourceData[city]){

			var aqiData = aqiSourceData[city][date];

			//获取天的数据
			day[city] = aqiSourceData[city];

			//获取周的数据
			weekTotal += aqiData;
			dayindex ++;
			if(new Date(date).getDay() == 6) {	//判断是否为周日

				var weekData = (weekTotal / 7).toFixed(2);
				var key = weekNum;
				week[city][key] = weekData;

				weekDays = 0;
				weekTotal = 0;
				dayindex = 0;
				weekNum ++;
			}


			//获取月的数据
			monthTotal += aqiData;
			if(monthDays === 30) {
				var monthData = (monthTotal / 31).toFixed(2);
				var key = monthNum;
				month[city][key] = monthData;

				monthDays = 0;
				monthTotal = 0;
				monthNum ++;
			}
			monthDays++;

		}//内层for 日期

		if (dayindex != 0) {//最后一周不满7天
			weekNum ++;
			var weekData = (weekTotal / 7).toFixed(2);
			console.log(dayindex);
		}

		//初始化
		weekNum = 1;
		monthNum = 1;

	}//外层for  城市

	chartData.day = day;
	chartData.week = week;
	chartData.month = month;
	console.log(aqiSourceData);
	console.log(chartData);

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  if(pageState['nowSelectCity'] == -1) {
  	pageState['nowSelectCity'] = '北京';
  	console.log(pageState['nowSelectCity']);
  	renderChart();
  }
}

init();
