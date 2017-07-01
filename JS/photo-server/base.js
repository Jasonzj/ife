var request = require('request')
var Promise = require('q').Promise

function DataSourceBase() {}

DataSourceBase.prototype.get = function (page) {
  var self = this
  return Promise(function (resolve) {
    request.get(self.getUrl(page),
      function (error, response) {
        if (self.listField) {
          resolve(JSON.parse(response.body)[self.listField].map(self.fieldsMap))
        } else {
          resolve(JSON.parse(response.body).map(self.fieldsMap))
        }
      }
    )
  })
}

DataSourceBase.prototype.listField = ''

DataSourceBase.prototype.getUrl = function (page) {}

DataSourceBase.prototype.fieldsMap = function (item) {}

module.exports = DataSourceBase