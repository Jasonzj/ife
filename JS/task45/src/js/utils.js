export const request = url => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()

        xhr.addEventListener('load', function() {
            try {
                resolve(JSON.parse(xhr.responseText))
            } catch(e) {
                reject(e)
            }
        })
    })
}

export const getPhotos = page => {
    page = page || 0
    return request(`http://www.jasonzj.me:4000/?&page=${page}`)
}


