//跨浏览器绑定
function addEvent(element, event, hanlder) {
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


;
(function (window) {

  class Air {
    constructor(change, select, wrap, data) {
      this.change = document.getElementById(change);
      this.select = document.getElementById(select);
			this.wrap = document.getElementById(wrap);
      this.chartData = {};
			this.data = data;
      this.pageState = {
        nowSelectCity: -1,
        noweGraTime: 'day'
      }

      this.init();
    }

    init() {
			var self = this;
      this.initData();  	//初始化图标需要数据格式
			this.initCitySelector();
      this.bindEvent();						//初始化绑定事件
			 if(self.pageState['nowSelectCity'] == -1) {
				self.pageState['nowSelectCity'] = '北京';
				// console.log(self.pageState['noweGraTime']);
				self.renderChart();
			}
    }
		
		
		initCitySelector() {
			const self = this;
			let html = '';
			for (const city in self.data) {
				html += `<option>${city}</option>`
			}
			self.select.innerHTML = html;
		}

		initData() {
			var self = this;
			var day = {};
			var week = {};
			var weekNum = 1;
			var weekTotal = 0;
			var month = {};
			var monthDays = 0;
			var monthNum = 1; 
			var monthTotal = 0;
			var dayindex = 0;

			for (const city in self.data) {
				// 获取城市
				day[city] = {};
				week[city] = {};
				month[city] = {};

				for (const data in self.data[city]) {
					const aqiData = self.data[city][data];  //获取每天的数据

					//获取天数据
					day[city] = self.data[city];
					
					//获取周数据
					weekTotal += aqiData;  	//获取每周的空气质量总数
					dayindex++;		
					if (new Date(data).getDay() === 6) {   //判断是否为周日
						var weekData = (weekTotal / 7).toFixed(2);
						var key = weekNum;
						week[city][key] = weekData;

						dayindex = 0;
						weekTotal = 0;
						weekNum ++;
					} else if (dayindex !== 0) {   		//最后一周不满7天
						var weekData = (weekTotal / 7).toFixed(2);
						var key = weekNum;
						week[city][key] = weekData;
					}

					//获取月数据
					monthTotal += aqiData;	//获取每月的空气质量总数
					if (monthDays === 30) {
						var monthData = (monthTotal / 31).toFixed(2);
						var key = monthNum;
						month[city][key] = monthData;

						monthDays = 0;
						monthTotal = 0;
						monthNum++;
					}
					monthDays++;

				} //内层for (日期)

				//初始化
				weekNum = 1;
				monthNum = 1;

			}  //外层for (城市)

			self.chartData.day = day;
			self.chartData.week = week;
			self.chartData.month = month;
			
		}

		renderChart() {
			var self = this;
			var tarCity = self.pageState['nowSelectCity'];
			var tarTime = self.pageState['noweGraTime'];
			var tarData = self.chartData[tarTime][tarCity];
			var fragment = document.createDocumentFragment();
			var num = 0;

			self.wrap.innerHTML = '';

			for (const item in tarData) {
				num++;
				var smallBox = document.createElement("div");
				smallBox.title = 'time: ' + item + '空气质量: ' + tarData[item];
				smallBox.className = "small-box";		
				smallBox.style.height = tarData[item] * 0.8 + 'px';
				smallBox.style.backgroundColor = "hsl(" + Math.floor(tarData[item] * 2.5) + ",70%,80%)";
				// smallBox.innerText = tarData[item];
				fragment.appendChild(smallBox);				
			}
			
			self.wrap.appendChild(fragment);

			var box = document.getElementsByClassName('small-box');
			for(var i = 0; i < box.length; i++) {
				box[i].style.width = 1000 / num + 'px';		
			}
			num = 0;

		}

		graTimeChange(e) {
			var self = this;
			if (e.target.value === self.pageState['noweGraTime']) {
				return false;
			}
			//设置对应数据
			self.pageState['noweGraTime'] = e.target.value;
			//调用图标渲染函数
			self.renderChart();
		}

		citySelectChange(e) {
			var self = this;
			//确定选项是否发生了变化
			if (e.target.value === self.pageState['nowSelectCity']) {
				return false;
			}
			//设置对应数据
			self.pageState['nowSelectCity'] = e.target.value;
			//调用图标渲染函数
			self.renderChart();
		}

    bindEvent() {
      const self = this;
      
			addEvent(self.select, 'change', self.citySelectChange.bind(self));
			addEvent(self.change, 'change', self.graTimeChange.bind(self));
    }

  }

  window.Air = Air;

})(window);

new Air('form-gra-time', 'city-select', 'chart-wrap', aqiSourceData);



