import React from "react";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Login from '../component/Login.js';
import Regist from '../component/Regist.js';
import {showloginbox,showregistbox,logout} from '../action/Action.js';
 
var Header = ({showLogin,showRegist,showloginbox,showregistbox,login,username,logout}) => {

	//预备的东西，圆括号里面没有东西
	return (
		<div>
			<header className="header black-bg">
				<div className="sidebar-toggle-box">
					<div className="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
				</div>

				<a href="/" className="logo"><b>公司内部信息发布平台</b></a>

				<div className="top-menu">
					{
						(()=>{
							if(!login){
								return <ul className="nav pull-right top-menu">
					    					<li><a className="btn_login" href="javascript:;" onClick={()=>{showloginbox(true)}}>登录</a></li>
					    					<li><a className="btn_regist" href="javascript:;" onClick={()=>{showregistbox(true)}}>注册</a></li>
									</ul>
							}else{
								return <ul className="nav pull-right top-menu">
										<li>欢迎!</li>
                                    <li><a className="btn_regist" onClick={()=>{logout(username)}}>注销</a></li>
	 								</ul>
							}
						})()
					}
				</div>
	        </header>

	        {showLogin ? <Login></Login> : null}
	        {showRegist ? <Regist></Regist> : null}
		</div>
	)
}

//加工CounterContainer
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