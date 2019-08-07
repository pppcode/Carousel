import './index.css'

const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)

$('.carousel .dots').onclick = function(e) {
  // if(e.target.tagName !== 'SAPN') return 
  let index = Array.from($$('.carousel .dots span')).indexOf(e.target)

  // 切换小圆点
  $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
  $$('.carousel .dots span')[index].classList.add('active')

  // 切换对应的面板
  $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
  $$('.carousel .panels a')[index].style.zIndex = 10

}

$('.pre').onclick = function(e) {
  let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))
  // 计算选中的上一个，+ $$('.carousel .dots span').length 避免得到负数
  index = (index - 1 + $$('.carousel .dots span').length) % $$('.carousel .dots span').length
  console.log(index)

  $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
  $$('.carousel .dots span')[index].classList.add('active')

  $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
  $$('.carousel .panels a')[index].style.zIndex = 10
}

$('.next').onclick = function(e) {
  let index = Array.from($$('.carousel .dots span')).indexOf($('.carousel .dots .active'))
  index = (index + 1) % $$('.carousel .dots span').length
  console.log(index)

  $$('.carousel .dots span').forEach(dot => dot.classList.remove('active'))
  $$('.carousel .dots span')[index].classList.add('active')

  $$('.carousel .panels a').forEach(panel => panel.style.zIndex = 1)
  $$('.carousel .panels a')[index].style.zIndex = 10
}


