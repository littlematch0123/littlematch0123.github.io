let ajax = ({ method, data, url, callback, isXML }) => {
    method = method || 'get'
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            callback && callback.call(null, isXML ? xhr.responseXML : xhr.response)
        }
    }
    //创建数据字符串，用来保存要提交的数据
    let strData = '';
    if (method === 'post') {
        for (let key in data) {
            strData += '&' + key + "=" + data[key];
        }
        //去掉多余的'&'
        strData = strData.substring(1);
        xhr.open('post', url);
        //设置请求头
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //发送请求
        xhr.send(strData);
    } else {
        //如果是get方式，则对字符进行编码
        for (let key in data) {
            strData += '&' + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }
        //去掉多余的'&'，并增加随机数，防止缓存
        strData = strData.substring(1) + '&' + Number(new Date());
        xhr.open('get', url + '?' + strData);
        //发送请求
        xhr.send();
    }
}

getCSS.onclick = () => {
    ajax({
        url: '/style.css',
        callback(data) {
            const styleNode = document.getElementsByTagName('style')[0];
            styleNode.innerHTML += data
        }
    })
}
getJS.onclick = () => {
    ajax({
        url: '/js.js',
        callback(data) {
            const scriptNode = document.createElement('script')
            scriptNode.innerHTML = data
            document.body.appendChild(scriptNode)
        }
    })
}
getHTML.onclick = () => {
    ajax({
        url: '/html.html',
        callback(data) {
            const divNode = document.createElement('div')
            divNode.innerHTML = data
            document.body.appendChild(divNode)
        }
    })
}
getXML.onclick = () => {
    ajax({
        url: '/xml.xml',
        isXML: true,
        callback(node) {
            const data = node.getElementsByTagName('warning')[0].innerHTML.trim();
            const divNode = document.createElement('div')
            divNode.innerHTML = data
            document.body.appendChild(divNode)
        }
    })
}
getJSON.onclick = () => {
    ajax({
        url: '/json.json',
        callback(data) {
            const { name, age } = JSON.parse(data);
            const divNode = document.createElement('div')
            divNode.innerHTML = `名字: ${name}, 年龄: ${age}`
            document.body.appendChild(divNode)
        }
    })
}