# blog system

`2017.07.23`
* 加入了webpack， 支持了 *react* ，用来编辑侧边栏
* 更新了侧边栏的导航栏目，用的webpack-dev-server，暂时做不了node后台的ajax请求

`2017.07.25`
* 加入了`webpack-dev-middleware` 和 `webpack-hot-middleware` 做热更新
* react渲染用babel的`react-hmre`
* **【bug】** 开发时候默认到跟路径，要根据请求路径参数访问ajax还未解决 只能开发用假参数

`2017.07.28`
* 加入了 *mysql*, 目录系统，目前是把标题内容存入mysql字段中，加载页面时候获取标题内容，展示 *catalog*
* 加入了 *socket*, 进入单个文章后，回根据文章id创建对应的room，加入者可以在里面聊天。 **【bug】** 用了房间后 之前写的聊天室暂时失效了，问题在 `connection` 字段上第二个事件回调函数没有默认参数。
* **【bug】** 目录系统中，写调标签名称转码后,前端解析有问题错误。

### v1.0.2

`2017.07.29`
* 修改了webpack,区分生产环境和正式环境，正式环境分离出 *react* 和 *react-dom* ,用`cnd` 引入是、bundle.js减少了0.4M 大小

`2017.07.30`
* 同样用`cdn` 引入了 *antd* 的 css 和 js,发现主要文件大小都集中在css编译后的文件上了。文件减少了 0.8M 大小,对于我1M宽带对`ecs`是质的飞跃。

---
