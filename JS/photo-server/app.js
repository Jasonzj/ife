const app = require('express')()
const caches = {}

app.get('/', (req, res) => {
    const cache = caches[req.url]
    const callback = req.query.callback

    if (cache && Date.now() - cache.time < 3600000) {
        response(cache.data)
    } else {
        const source = new(require('./500px'))()
        source.get(req.query.page || 0).then(data => {
            caches[req.url] = {
                time: Date.now(),
                data: data
            }
            response(data)
        })
    }

    function response(data) {
        res.set('Access-Control-Allow-Origin', '*')
        // jsonp 回调
        if (callback === '__onGetDate__') {
            const str = `${callback} && ${callback}(${JSON.stringify(data)})`
            res.send(str)
        }
        res.send(data)
    }
})

app.listen(process.env.VCAP_APP_PORT || 4000)