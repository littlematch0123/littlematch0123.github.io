import "./app2.css"

const app2 = document.getElementById('app2')
const navTitle = app2.getElementsByClassName('nav-tit')[0]
const navTxt = app2.getElementsByClassName('nav-txt')[0]

Array.from(navTitle.children).forEach((item, index) => {
    item.relatedTextItem = navTxt.children[index]
})
navTitle.onclick = (e) => {
    const { target, currentTarget } = e
    if (target.nodeName === 'DIV') {
        Array.from(currentTarget.children).forEach(item => item.classList.remove('nav-titI_active'))
        target.classList.add('nav-titI_active')
        Array.from(target.relatedTextItem.parentNode.children).forEach(item => item.classList.remove('nav-txtI_active'))
        target.relatedTextItem.classList.add('nav-txtI_active')
    }
}
navTitle.children[0].click()

