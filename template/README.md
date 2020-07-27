# 项目简介
xxxxx

# install
```javascript
yarn || npm i
```

# 启动
```javascript
npm run  dev
```
# 构建
```javascript
npm run  build:test
```

# icon使用
- icon是使用的阿里的[iconfont](https://www.iconfont.cn/)
- 新项目请找卫康创建


## 代码结构
* code-generator - API代码生成工具
* src/ - electron代码目录
* src/main/ - 主进程代码
* src/renderer/ - 渲染进程代码

## 渲染进程代码结构 src/renderer/
* assets       - 静态资源
* components   - 组件库
* components/ui-share            - UI共享组件(下拉框、toast提示等)
* components/spark-share      - 业务共享组件(视频播放器、题目展示组件等)
* js           - 其他(未分类的杂项: API、util、第三方库)
* js/api            - api调用自动生成的代码
* js/util           - 工具方法
* router       - 路由
* store        - 数据
* view         - 页面

# view页面组件规范
- 第一级文件夹-->一级路由
  - component: 一级页面所有用到的组件(非必须)
  - XXX: 对应每一个页面

# element UI
* (官网)[https://element.eleme.cn/#/zh-CN/component/quickstart]
* `src/renderer/main.js` 按需引入的文件位置 
* `src/renderer/assets/ElementUI/element-variables.scss` 样式变量重写 
* `src/renderer/assets/ElementUI/element-override.scss` 样式class覆盖 
* `select` 组件的想要满足UI的要求,需要对返回的数据进行一次字数截取,已和产品和UI沟通确定


# Commit message 提交规范
- [Commit message 提交规范](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- webstorm插件，搜索(git commit template) 

# 代码风格
- 此项目使用`standard`的规范
- 在开发中强制执行此规范,虽然会一定程度上影响开发效率，但是在质量和效率中,我认为我们应该更关注质量
- 遇到规范报错问题,请先执行 `npm run lint:fix`,大部分的问题都能被自动修复

# 客户端安装包下载(新项目自行修改地址)
- 测试:[http://test-download-ss-client.xiaojiaoyu100.com/XHClassroom.exe](http://test-download-ss-client.xiaojiaoyu100.com/XHClassroom.exe)
- 预发布:[http://pre-download-ss-client.xiaojiaoyu100.com/XHClassroom.exe](http://pre-download-ss-client.xiaojiaoyu100.com/XHClassroom.exe)
- 生产:[http://download-ss-client.xiaojiaoyu100.com/XHClassroom.exe](http://download-ss-client.xiaojiaoyu100.com/XHClassroom.exe)

# 客户端自动更新机制
- `package.json` 中 version字段滚动更新,对应的软件包会自动下载更新


# 版本号定义规范
- A.B.CXXX
  - A.B是业务版本号
  - C是hotfix次数  范围:0-9
  - XXX是开发滚动版本 范围:1-999
