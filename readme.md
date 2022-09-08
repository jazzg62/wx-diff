# wx-diff

小程序数据路径生成

## 安装

```bash
npm install wx-diff
```

## 如何使用

```javascript
const diff = require("wx-diff");

// 在需要修改数据的地方，使用diff包裹住原来的setData参数
this.setData(diff(before, after));
```

## 为什么要生成数据路径

小程序中单次设置的数据大小不能超过 1024KB。

小程序中的 key 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 array[2].message，a.b.c.d。

data 中的值在设置为 undefined 后，这一项将不被设置并可能遗留一些潜在问题。

[微信小程序官方文档参考](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#Page-prototype-setData-Object-data-Function-callback)

> 使用 wx-diff 可有效的解决上述问题，过滤无效参数，生成数据路径。有效提升页面数据更新效率。

## 问题反馈与建议

[提交 ISSUE](https://github.com/jazzg62/wx-diff/issues/new)
