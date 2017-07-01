export function request(url) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()

    xhr.addEventListener('load', function () {
      resolve(JSON.parse(xhr.responseText))
    })
  })
}

export function getPhotos(page) {
  page = page || 0
  return request(`http://localhost:4000?&page=${page}`)
}