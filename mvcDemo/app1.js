const app1 = document.getElementById('app1')
const showNumber = document.getElementById('showNumber')
const actions = app1.getElementsByClassName('actions')[0]

const num = localStorage.getItem('num')
showNumber.innerHTML = num == null ? 100 : num
actions.onclick = (e) => {
    const { target } = e
    if (target.nodeName === 'BUTTON') {
        const leftVal = target.innerHTML
        const numVal = +showNumber.innerHTML
        let newNumVal = 0
        if (leftVal === '+1') {
            newNumVal = numVal + 1
        } else if (leftVal === '-1') {
            newNumVal = numVal - 1
        } else if (leftVal === '*2') {
            newNumVal = numVal * 2
        } else if (leftVal === '/2') {
            newNumVal = numVal / 2
        }
        localStorage.setItem('num', newNumVal)
        showNumber.innerHTML = newNumVal
    }
}
