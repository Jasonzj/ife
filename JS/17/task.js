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
  var garCity = pageState['nowSelectCity'];
  var garTime = pageState['nowGraTime'];
  var garDate = chartData[garTime][garCity];
  var num = 0;
  var showBox = document.getElementById('aqi-chart-wrap');
  showBox.innerHTML = '';
  for( e in garDate ) {
    num++;
    var smallbox = document.createElement('div');
    smallbox.className = 'smallbox';
    smallbox.style.height = garDate[e] * 0.8 + 'px';
    smallbox.style.backgroundColor = "hsl(" + Math.floor(garDate[e] * 2.5)+ ",70%, 80%)";
    smallbox.title = 'time: ' + e + '   空气质量' + garDate[e];
    showBox.appendChild(smallbox);
  }
  var box = document.getElementsByClassName('smallbox');
  for(var i = 0; i < box.length; i ++){
    box[i].style.width = 700 / num + 'px';
  }
  num = 0;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(ev) {
  // 确定是否选项发生了变化
  if(ev.target.value == pageState['nowGraTime']) {
    return false;
  }
  // 设置对应数据
  pageState['nowGraTime'] = ev.target.value;
  console.log(pageState['nowGraTime']);
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(ev) {
  // 确定是否选项发生了变化 
  if(ev.target.value == pageState['nowSelectCity']) {
    return false;
  }
  // 设置对应数据
  pageState['nowSelectCity'] = ev.target.value;
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var timeBox = document.getElementById('form-gra-time');
  timeBox.addEventListener('change', graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById('city-select');
  for( city in aqiSourceData ) {
    citySelect.innerHTML += '<option>' + city + '</option>'
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var day = {},
      week = {},
      month = {},
      weekNum = 1,
      weekTotal = 0,
      monthTotal = 0,
      monthDay = 1;
      monthNum = 1;

  for ( city in aqiSourceData ) {
    day[city] = {};
    week[city] = {};
    month[city] = {};

    //day
    day[city] = aqiSourceData[city];

    
    for ( date in aqiSourceData[city] ) {

      //week
      weekTotal += aqiSourceData[city][date]; //周总和

      if ( new Date(date).getDay() == 6 ) {   //判断是否为周日
        week[city][weekNum] = (weekTotal / 7).toFixed(2);

        weekTotal = 0;
        weekNum++;
      } else {
        week[city][weekNum] = (weekTotal / 7).toFixed(2);
      }


      //month
      monthDay++;
      monthTotal += aqiSourceData[city][date]; //月总和
      if ( monthDay === 30 ) {
        month[city]['第' + monthNum + '月'] = (monthTotal / 30).toFixed(2);

        monthDay = 1;
        monthNum ++;
      }

    }

    chartData.day = day;
    chartData.week = week;
    chartData.month = month;
    //初始化
    weekNum = 1;
    monthNum = 1;

  }
  console.log(weekTotal);
  console.log(month);
  console.log(aqiSourceData);

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();

  if ( pageState['nowSelectCity'] == -1 ) {
    pageState['nowSelectCity'] = '北京';
    renderChart();
  }
}

init();
