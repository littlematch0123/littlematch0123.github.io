// 读取 localStorage
const navData = localStorage.getItem('navData')
const navObj = JSON.parse(navData)
let dataArr = navObj || [
    'cnblogs.com',
    'github.com',
    'segmentfault.com',
    'wangdoc.com',
    'xiaohuochai.cc'
]
window.onbeforeunload = () => {
    localStorage.setItem('navData', JSON.stringify(dataArr))
}
// 储存 localStorage
const navBar = document.getElementsByClassName('main-nav')[0];
const moduleNode = document.getElementsByClassName('module')[0];
const urlInput = moduleNode.getElementsByClassName('module-input')[0];

// 标志位(-1表示当前没有被操作的导航项，可以新增导航)
let selectedIndex = -1

// 根据 dataArr 来渲染页面

const render = () => {
    // 清空元素
    navBar.innerHTML = '';
    let html = '';
    // 生成元素
    dataArr.forEach((item, index) => {
        html += `
            <dl class="fl" data-index=${index}>
            <dt>${item[0]}</dt>
            <dd>${item}</dd>
            <dd>
                <svg class="main-nav-more" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    />
                </svg>
            </dd>
            </dl>
        `
    })
    navBar.innerHTML = html;
    // 绑定事件
    // 导航面板点击
    navBar.onclick = function (e) {
        let { target } = e;
        // 点击相应导航项，打开对应网址
        while (target !== navBar) {
            if (target.nodeName === 'DL') {
                location = `https://${dataArr[target.dataset.index]}`
                break;
            }
            target = target.parentNode;
        }
        // 点击
    }
    // 导航项的“更多”点击
    const navMores = document.getElementsByClassName('main-nav-more');
    Array.from(navMores).forEach((item, index) => {
        item.onclick = (e) => {
            // 显示编辑窗口
            moduleNode.style.display = 'block';
            // 设置标志位为当前索引值
            selectedIndex = index;
            // input 中显示网址
            urlInput.value = dataArr[index];
            // 阻止冒泡
            e.stopPropagation()
        }
    })
}
render();

// 编辑窗口的三个按钮点击
const delBtn = moduleNode.getElementsByClassName('btn_delete')[0];
const addBtn = document.getElementsByClassName('main-add')[0];
moduleNode.onclick = (e) => {
    const { target } = e;
    const { classList } = target;
    if (target.nodeName !== 'BUTTON') {
        return;
    }
    if (classList.contains('btn_delete')) {
        // 删除当前项
        dataArr.splice(selectedIndex, 1)
        // 重新渲染
        render();
    } else if (classList.contains('btn_cancel')) {
        // 取消
    } else if (classList.contains('btn_done')) {
        const { value } = urlInput;
        // 如果输入的网址不符合规范，则直接返回
        if (!testUrl(value)) {
            return;
        }
        // 如果标志位为 -1，则新增，否则修改
        if (selectedIndex === -1) {
            // 处理url，并添加到 dataArr 中
            dataArr.push(simplifyUrl(value));
        } else {
            // 修改处理后的url
            dataArr[selectedIndex] = simplifyUrl(urlInput.value)
        }
        // 重新渲染
        render();
    }
    initModule(e);
}
// 右下角的'+'按钮点击
addBtn.onclick = () => {
    // 隐藏删除按钮
    delBtn.style.display = 'none';
    // 将标志位设置为 —1，表示可以新增
    selectedIndex = -1;
    // 显示编辑窗口
    moduleNode.style.display = 'block';
}

function initModule(e) {
    // 隐藏编辑窗口
    e.currentTarget.style.display = 'none';
    // 清空 input 里面的值
    urlInput.value = '';
    // 显示删除按钮
    delBtn.style.display = 'inline-block';
}

function testUrl(url) {
    if (/(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.test(url)) {
        return true
    }
}

// 简化 url https://www.baidu.com/dfdfd/fdfdf/ -> baidu.com
function simplifyUrl(url) {
    return /(https?:)?(\/\/)?(www.)?([^\/]+)(\/.*)?/.exec(url)[4]
}
