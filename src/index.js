import './index.css'

class Carousel {
  constructor(root, animation) {
    this.animation = animation || ((fromNode, toNode, callback) => callback())
    this.root = root
    this.dotsCt = root.querySelector('.dots')
    this.dots = Array.from(root.querySelectorAll('.dots > span'))
    this.panels = Array.from(root.querySelectorAll('.panels > a'))
    this.pre = root.querySelector('.action .pre')
    this.next = root.querySelector('.action .next')

    this.bind()
  }

  get index() {
    return this.dots.indexOf(this.root.querySelector('.dots .active'))
  }

  get preIndex() {
    return (this.index - 1 + this.dots.length) % this.dots.length
  }

  get nextIndex() {
    return (this.index + 1) % this.dots.length
  }

  bind() {
    this.dotsCt.onclick = e => {
      if(e.target.tagName !== 'SPAN') return 
      let index = this.dots.indexOf(e.target)

      this.setDots(index)
      this.setPanels(index, this.index)
    }

    this.pre.onclick = e => {
      this.setPanels(this.preIndex, this.index)
      this.setDots(this.preIndex)
    }

    this.next.onclick = e => {
      this.setPanels(this.nextIndex, this.index)
      this.setDots(this.nextIndex)
    }  
  }

  setDots(index) {
    this.dots.forEach(dot => dot.classList.remove('active'))
    this.dots[index].classList.add('active')
  }

  setPanels(toIndex, fromIndex) {
    // 动画执行完后，执行回调函数，到最终的状态
    this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
      this.panels.forEach(panel => panel.style.zIndex = 1)
      this.panels[toIndex].style.zIndex = 10
    })

  }

}

// 定义动画
function fade(fromNode, toNode, callback) {
  console.log(fromNode, toNode)
  callback()
}

const c = new Carousel(document.querySelector('.carousel'), fade)

//document.querySelectorAll('.carousel').forEach(carousel => new Carousel(carousel), fade)