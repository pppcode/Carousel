# 轮播组件

## 项目介绍
使用原生 JS 实现轮播组件，最终效果一行代码直接调用，并且可切换动画效果，实现了代码的拓展性和复用性。

## 第一步，实现基本功能

**思路**
- 动态改变选中元素的 class 实现小圆点切换的功能。
- 渐变效果（大多数）：图片重叠到一起，绝对定位，相互覆盖，改变对应的图片的 z-index 的值实现覆盖，从而实现显示与隐藏。 
- ~~左右滚动：图片水平排列成一排，滚动时整体做滚动。~~

**问题**

设置小圆点和面板切换功能的代码大量重复

**优化**

封装成函数


## 第二步，考虑代码的封装性和复用性

**问题**

页面上有多个轮播时，没办法复用。意大利式面条

**优化**

封装成组件，使用 ES6 语法，面向对象的组件化的方式


## 第三步，考虑代码的扩展性

**问题**

没有切换效果，切换时去加效果，若用到此轮播换种特效的话就会不能用，效果入侵到了代码中了

**优化**

组件和动画效果分离，

加渐变特效
```
new Carousel(document.querySelector('.carousel'), fade)

  ...

setPanels(toIndex, fromIndex) {
  // 动画执行完后，执行回调函数，到最终的状态
  this.animation(this.panels[fromIndex], this.panels[toIndex], () => {
    this.panels.forEach(panel => panel.style.zIndex = 1)
    this.panels[toIndex].style.zIndex = 10
  })

}
  ...

// 定义动画
function fade(fromNode, toNode, callback) {
  console.log(fromNode, toNode)
  callback()
}
```




