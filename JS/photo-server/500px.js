var util = require('util')
var Base = require('./base')

function DataSource() {
}

util.inherits(DataSource, Base)

DataSource.prototype.getUrl = function (page) {
  return 'http://www.500px.me/community/discover/rating?type=json&size=30&page=' + (page + 1)
}

DataSource.prototype.fieldsMap = function (item) {
  return {
    name: item.title,
    description: '作者：' + item.uploaderInfo.nickName,
    width: item.width,
    height: item.height,
    image: {
      small: item.url.p1,
      large: item.url.p4
    }
  }
}

module.exports = DataSource