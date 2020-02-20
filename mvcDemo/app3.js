import './app3.css'
const square = document.getElementById('app3').getElementsByClassName('square')[0]
square.onclick = e => {
    e.currentTarget.classList.toggle('active')
}