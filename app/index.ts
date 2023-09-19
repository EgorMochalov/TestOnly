// import Swiper JS
import Swiper from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import "./style.scss";

import { Navigation } from 'swiper/modules';
// import Swiper styles
let items = document.querySelectorAll('.item-content')
items.forEach((el, index) => {
    el.addEventListener('click', function () {
        nextSlide(index)
    })
})

//Swiper
const swiper = new Swiper('.swiper', {
    loop: false,
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 25,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        900: {
            slidesPerView: 3,
            spaceBetween: 80,
        }
    }
});

let next = document.querySelector('.next')
let back = document.querySelector('.back')
let current = document.querySelector('.current')


next.addEventListener('click', function () {
    if (Number(window.localStorage.getItem('current')) <= items.length-2) {
        nextSlide(Number(window.localStorage.getItem('current')) + 1)
    }
    else if (!window.localStorage.getItem('current')) {
        nextSlide(1)
    }
})

back.addEventListener('click', function () {
    if (Number(window.localStorage.getItem('current')) >= 1) {
        nextSlide(Number(window.localStorage.getItem('current')) - 1)
    }
})


function nextSlide(id: number) {
    nextPug(id)
    outNum(Number(massYears[id][0]), 'year-left', Number(document.querySelector('.year-left').innerHTML));
    outNum(Number(massYears[id][1]), 'year-right', Number(document.querySelector('.year-right').innerHTML));
    window.localStorage.setItem('current', id+ '');
    current.innerHTML = '0' + (id+1) 

    document.querySelectorAll('.swiper-slide').forEach(el => {
        if (Number(el.getAttribute('data-number')) == id) {
            el.classList.add('active')
        }
        else {
            el.classList.remove('active')
        }
    })
    swiper.update()
    items.forEach((el, index) => {
        let elDeg = (el as any).getAttribute('data-deg') as any
        (el as any).style.transform = 'rotate(' + (Number(elDeg) + 60 * id) + 'deg)';
        (el.nextSibling as any).style.transform = 'rotate(' + (Number(elDeg) + 60 * id) + 'deg)';
        if (index == id) {
            el.classList.add('active')
        }
        else {
            el.classList.remove('active')
        }
    })
    let circle = (document.querySelector('.circle') as any)
    let circleDeg = circle.getAttribute('data-deg')
    circle.style.transform = 'rotate(' + (-60 * id) + 'deg)'
    circle.setAttribute('data-deg', Number(circleDeg) - 60 * id)
}

// Набор текста

let massYears = [['1978', '1980'], ['1980', '1990'], ['1990', '2000'], ['2005', '2010'], ['2015', '2020'], ['2021', '2023']]

const time = 100000;
const step = 1;

function outNum(num: number, el: string, startN: number) {
    let l = document.querySelector('.' + el)
    let n = startN;
    let t = Math.round(time / (num / step))
    let interval = setInterval(() => {
        if (n < num) {
            n = n + step
        }
        else if (n == num) {
            clearInterval(interval)
        }
        else {
            n = n - step
        }
        l.innerHTML = n + '';
    }, t);
}

function nextPug(id: number) {
    let liList = document.querySelectorAll('.pagination-item').forEach((el, number) => {
        if (number == id) {
            el.classList.add('active')
        }
        else {
            el.classList.remove('active')
        }
    })
}

if (window.localStorage.getItem('current')) {
    nextSlide(Number(window.localStorage.getItem('current')))
}

let ul = document.createElement('ul')
ul.classList.add('pagination')
for (let i = 0; i < items.length; i++) {
    let li = document.createElement('li')
    li.classList.add('pagination-item')
    li.addEventListener('click', function () {
        nextSlide(i)

    })
    if (window.localStorage.getItem('current') && i == Number(window.localStorage.getItem('current'))) {
        li.classList.add('active')
    }
    else if (!window.localStorage.getItem('current') && i == 0) {
        li.classList.add('active')
    }
    ul.append(li)
}
document.querySelector('.years-controls').append(ul)
