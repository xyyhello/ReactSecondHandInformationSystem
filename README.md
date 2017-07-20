# React_SecondHandInformationSystem

# 技术栈
## FLUX架构
在MVC架构中，应用程序被强制性的将输入、处理和输出分开，将其分成模型、视图和控制器，各自处理自己的业务。在实现分组开发，人员协作的同时，这种模式也造成了思维线的拉长。在处理大型业务的时候，由于非常巨大的代码库和庞大的组织，MVC很快变得非常复杂。因此，Facebook认为MVC不适合大规模应用。每次他们努力增加一项新特性时，系统的复杂性成级数增长，代码变得“脆弱和不可预测”。对于刚接触某个代码库的开发人员来说，这正成为一个严重的问题，因为他们害怕破坏什么东西，不敢动这些代码。其结果是Facebook的MVC正在土崩瓦解。解决这个问题需要“以某种方式使代码结构化，使其更加可预测”。这已经通过Flux和React完成。Flux是一个系统架构，用于推进应用中的数据单向流动。在这个demo中，我们可以非常清晰的感受到数据单向流动的好处。

	Flux is the application architecture that Facebook uses for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow. It's more of a pattern rather than a formal framework, and you can start using Flux immediately without a lot of new code.

基于FLUX架构，React官方推荐Redux来实现FLUX架构。主要的定义就是store、action、reducer、dispatcher。reducer是一个状态机，就是在切换到某种状态的时候，状态要如何变化。store是一个数据存储单元，非常类似MVC中的model。strore的建立要指定状态机。用户在视图上的操作，会最先让store去dispatch一个新的状态type，然后根据reducer来改变状态对象，路由采用官方路由React-router。由于webpack配合Babel优秀的编译能力，因此本项目采用webpack +babel + ES2016作为编译工具。后台接口用PHP实现，数据库采用MySQL。	
# 项目功能
* 用户注册
* 用户登录
* 发布信息（内嵌Ueditor）
* 查看信息
* 查看某个分类中的信息
# 项目文件夹：
该项目的文件夹结构如下所示：<br>
```javascript
		┠ app 	 	开发文件件
			┃ ┠	action
				┃ ┠action.js	redux 中的action,即需要dispatch的部分，异步请求也写在这里
			┃ ┠	component react中不可细分的组件
			┃ ┠	container react中充当容器的组件	
			┃ ┠	reducer   处理状态的部分，可以有好多个，最红用conbine函数结合
			┃ ┠	main.js		入口文件
		┠ assets	静态资源文件,存放	所有不需要跨域就能请求的静态资源比如images、css、js库等
		┠ dist		存放编译后的文件
			┃ ┠ bundle.js 编译后的文件
		┠  PHP     PHP接口
		┠	uploads  项目功能文件，存在微博发布资源
		┠	.babelrc	babel配置文件
		┠	index.html  主页
		┠	package.json 依赖文件
		┠	webpack.config.js  webpack配置文件
		
```
# 项目启动
### 安装node & npm

[https://nodejs.org/](https://nodejs.org/)

### 安装 `cnpm`

```shell
npm --registry=http://registry.npm.taobao.org i -g cnpm
```

### 安装依赖

```shell
cnpm install
```


### 项目开发

```shell
npm run start
```
###  数据库准备
* 数据库：主机地址：localhost 用户名：root 密码：123456
* 数据库名称：ershou_sys
* 表：types/tiezi/users
# 项目主要概述
## webpack.config.json:
```javascript
var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {             //loader
    loaders:[ 
          { 
              test:/.jsx?$/,
              loaders:"babel-loader",
              exclude:["/node_modules/","assets"]
          }
      ]
  }
};
```
## package,json:
```javascript
{
  "name": "microblog_sys",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack --watch"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.22.1",				//编译ES2016
    "babel-loader": "^6.2.10",				//编译ES2016
    "babel-preset-es2015": "^6.22.0",		//编译ES2016
    "babel-preset-es2016": "^6.22.0",		//编译ES2016
    "babel-preset-react": "^6.22.0",      	//编译ES2016
    "react-redux": "latest",			  	//react结合Redux
    "redux": "^3.6.0",						//react结合Redux
    "redux-logger": "^2.8.1",				// state日志，调试用
    "redux-thunk": "^2.2.0",				//dispatch异步请求用
    "webpack": "^2.2.1",					// 编译工具
    "babel-plugin-transform-object-rest-spread": "^6.3.13" // ES2016rest操作符支持插件
  },
  "dependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "react-router": "^3.0.2",				// 路由
    "react-router-redux": "^4.0.8"			// 路由
  }
}

```
## .babelrc
```javascript
{
	"presets": [
		"es2015",
		"es2016",
		"react"
	],
	"plugins": [
		"transform-object-rest-spread"  //ES2016rest操作符支持插件
	]
}
```
## main.js
redux 提供了provider组件，自定义组件放在里面，这样，每个子组件中只要用connect函数修饰一下，就可以将全局状态和Dispatch函数影射到子组件的属性上
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore , applyMiddleware , combineReducers} from 'redux';
import { Provider } from 'react-redux';
import indexReducer from './reducer/indexReducer.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './Container/App.js';
import Suibiankankan from './Container/Suibiankankan.js';
import Fabu from './Container/Fabu.js';
import Yonghu from './Container/Yonghu.js';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { getalltype } from './action/Action.js';

//日志中间件
var logger = createLogger();

//处理加工一下reducer
var reducer = combineReducers({
	indexReducer,
	routing: routerReducer
});
 
//创建了一个store对象，使用counter来创建
var store = createStore(reducer,applyMiddleware(thunk,logger));


//创建一个History对象
const history = syncHistoryWithStore(hashHistory, store);

//此时就可以上组件了
ReactDOM.render(
	<Provider store={store}>
	    <Router history={history}>
			<Route path="/" component={App}>
				<Route path="/suibiankankan" component={Suibiankankan}>
					<Route path="/suibiankankan/:dongxi" ></Route>
				</Route>
				<Route path="/fabu" component={Fabu}></Route>
				<Route path="/yonghu" component={Yonghu}></Route>
			</Route>
	    </Router>
  	</Provider>
	,
	document.getElementById("container")
)
```
### 子组件用connect函数修饰一下：
该函数接收四个参数，最常用的是前两个：mapStateToProps和mapDispatchToProps，分别将全局状态和该函数接收四个参数，最常用的是前两个：mapStateToProps和mapDispatchToProps，分别将全局状态和dispatch影射到子组件属性上：
```javascript
Header = connect(
	(state)=>{
		return {
			showLogin : state.indexReducer.showLogin,
			showRegist : state.indexReducer.showRegist,
			login : state.indexReducer.login,
			username : state.indexReducer.username
		}
	},{
		showloginbox,
		showregistbox,
        logout
	}
)(Header);

export default Header;
```
















