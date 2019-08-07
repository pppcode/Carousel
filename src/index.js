import './index.css'

class Carousel {
  constructor(root, animation) {
    this.animation = animation || ((to, from, onFinish) => onFinish())
    this.root = root
    this.panels = Array.from(root.querySelectorAll('.panels a'))
    this.dotCt = root.querySelector('.dots')
    this.dots = Array.from(root.querySelectorAll('.dots span'))
    this.pre = root.querySelector('.pre')
    this.next = root.querySelector('.next')

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
    this.dotCt.onclick = e => {
      if (e.target.tagName !== 'SPAN') return

      let lastIndex = this.index
      let index = this.dots.indexOf(e.target)
      this.setDot(index)
      this.showPage(index, lastIndex)
    }

    this.pre.onclick = e => {
      let index = this.preIndex
      this.setDot(index)
      this.showPage(index, this.nextIndex)
    }

    this.next.onclick = e => {
      let index = this.nextIndex
      this.setDot(index)
      this.showPage(index, this.preIndex)
    }
  }

  setDot(index) {
    this.dots.forEach(dot => dot.classList.remove('active'))
    this.dots[index].classList.add('active')
  }

  showPage(toIndex, fromIndex) {
    // 执行动画，执行完成后最终结果
    // 如果没传递动画，直接执行结果
    this.animation(this.panels[toIndex], this.panels[fromIndex], () => {
      this.panels.forEach(panel => panel.style.zIndex = 0)
      this.panels[toIndex].style.zIndex = 10
    })
  }

  setAnimation(animation) {
    this.animation = animation
  }

}

const Animation = (function(){
  const css = (node, styles) => Object.entries(styles)
  .forEach(([key, value]) => node.style[key] = value)
  const reset = node => node.style = ''
  
  return {
    fade(during = 400) {
      return function(to, from, onFinish) {
        console.log(during)
        css(from, {
          opacity: 1,
          zIndex: 10
        })
        css(to, {
          opacity: 0,
          zIndex: 9
        })

        setTimeout(() => {
          css(from, {
            opacity: 0,
            transition: `all ${during/1000}s`,
          })
          css(to, {
            opacity: 1,
            transition: `all ${during/1000}s`,
          })              
        }, 100)


        setTimeout(() => {
          reset(from)
          reset(to)
          onFinish && onFinish()
        }, during)

      }
    },

    zoom(scale = 5, during = 1000) {
      return function(to, from, onFinish) {
        css(from, {
          opacity: 1,
          transform: `scale(1)`,
          transition: `all ${during/1000}s`,
          zIndex: 10
        })
        css(to, {
          zIndex: 9
        })

        setTimeout(() => {
          css(from, {
            opacity: 0,
            transform: `scale(${scale})`
          })             
        }, 100)

        setTimeout(() => {
          reset(from)
          reset(to)
          onFinish && onFinish()
        }, during)

      }
    }
  }
})()

const carousel = new Carousel(document.querySelector('.carousel'), Animation.fade(300))

document.querySelector('select').onchange = function(e) {
  carousel.setAnimation(Animation[this.value]())
}