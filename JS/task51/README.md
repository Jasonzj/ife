# Gallery

一个使用JS编写的图片库

[查看Demo](http://www.jasonzj.me/gallery/index.html)

## 使用方法
1. 在HTML中引入gallery.min.js和gallery.min.css(压缩文件已使用babel编译成es5语法)
```html
<link rel="stylesheet" href="./gallery.min.css">
<script src="./gallery.min.js">
```
或者
```shell
npm install j-gallery --save-dev
```
ES5
```javascript
var Gallery = require('j-gallery').Gallery
```
ES6
```javascript
import { Gallery, css } = 'j-gallery'
```

2. 定义一个根图片容器，并指定类名、宽度(宽度支持百分比)
```html
<div class="gallery"></div>
```
```css
.gallery {
    width: 80%
}
```

3. 新建一个Gallery的实例，并传入容器的类名
```javascript
const gallery = Gallery('.gallery')
```

4. 初始化类库，并传入初始化配置
```javascript
gallery.setImage([
    "http://placehold.it/1300x1600/E97452/fff",
    "http://placehold.it/1300x1300/4C6EB4/fff",
    "http://placehold.it/1300x1250/449F93/fff",
    "http://placehold.it/800x400/936FBC/fff",
    "http://placehold.it/1000x500/D25064/fff"
],{
    layout: 2,
    fullScreen: true
})
```
* 第一个参数为一个图片地址字符串或者图片地址字符串数组，可以传入一个或多个图片
* 第二个参数为对象，用于初始化配置

|配置项|说明|可选项|含义|默认值|
|:---:|:---:|:---:|:---:|:---:|
|layout|布局类型|1<br />2<br />3<br />|拼图布局<br />瀑布布局<br />木桶布局|2|
|fullScreen|图片点击预览|true<br />false<br />|打开<br />关闭<br />|false|
|gutter|图片间距|{x: number, y: number}|x：横向间距<br />y：纵向间距|{x: 10, y: 10}|
|waterfallColumn|瀑布布局列数|正整数|瀑布布局列数|4|
|barrelHeight|木桶布局最小高度|正整数|最小高度|200|

## API
```javascript
/**
 * 添加图片
 * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
 * @param {Boolean} bool 是否把图片直接添加到容器(必选)
 */
gallery.addImage([...image], true)

/**
 * 移除相册中的图片
 * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
 * @return {boolean} 是否全部移除成功
 */
gallery.removeImage(image||[...image])


/**
 * 设置相册的布局
 * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
 */
gallery.setLayout()

/**
 * 获取相册的布局
 * @return {number} 布局枚举类型的值
 */
gallery.getLayout()

/**
 * 获取相册所有图像对应的 DOM 元素
 * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
 */
gallery.getImageDomElements()

/**
 * 设置拼图布局容器高度
 * @param {number} [height=500] 
 * @returns {Boolean}
 */
gallery.setPuzzleHeight()

/**
 * 设置图片之间的间距
 * @param {number}  [x=10]  图片之间的横向间距
 * @param {number}  [y=10]  图片之间的纵向间距，如果是 undefined 则等同于 x
 * @return {Boolean} 
 */
gallery.setGutter()

/**
 * 设置瀑布流列数
 * @param {Number} [column=4] 瀑布流列数
 * @return {Boolean} 
 */
gallery.setWaterfallColumn()

/**
 * 允许点击图片时全屏浏览图片
 */
gallery.enableFullscreen()

/**
 * 禁止点击图片时全屏浏览图片
 */
gallery.disableFullscreen()

/**
 * 获取点击图片时全屏浏览图片是否被允许
 * @return {boolean} 是否允许全屏浏览
 */
gallery.isFullscreenEnabled()

/**
 * 设置木桶模式每行高度的上下限，单位像素
 * @param {number} [min=200] 最小高度
 */
gallery.setBarrelHeight()

/**
 * 获取木桶模式每行高度的下限
 * @return {number} 最少图片数（含）
 */
gallery.getBarrelHeightMin()
```
