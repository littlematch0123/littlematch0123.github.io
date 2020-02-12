const http = require('http')
const fs = require('fs')
const url = require('url')
// 默认端口号为 8888
const port = process.argv[2] || 8888

const server = http.createServer((request, response) => {
    const pathWithQuery = request.url
    const path = url.parse(request.url, true).pathname

    console.log('路径（带查询参数）为：' + pathWithQuery)

    response.statusCode = 200
    // 默认首页
    const filePath = path === '/' ? '/index.html' : path
    // 后缀
    const suffix = filePath.substring(filePath.lastIndexOf('.'))
    const fileTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".ico": "image/x-icon",
        ".mp3": "audio/mpeg",
        ".mp4": "video/mp4",
        ".svg": "image/svg+xml"
    }
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
        content = fs.readFileSync(`./public${filePath}`)
    } catch (error) {
        content = '文件不存在'
        response.statusCode = 404
    }
    response.write(content)
    response.end()

})
server.listen(port)
console.log('监听 ' + port + ' 成功\n打开 http://localhost:' + port)
