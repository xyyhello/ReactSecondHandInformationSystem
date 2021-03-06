import React,{Component} from "react";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Aside from './Aside.js';
import {dofabiao,showloginbox} from "../action/Action.js";
import Login from '../component/Login.js';

class Fabu extends Component{
	//组件上树的时候，创建编辑器实例
	componentDidMount(){
		if(this.props.islogin) {

			this.props.showloginbox(false);

		}else{
			this.props.showloginbox(true);
		}
		UE.getEditor('editor');
	}

	//组件下树的时候
	componentWillUnmount(){
		//要摧毁这个编辑器，然后再次进入的时候就可以 UE.getEditor('editor');
		UE.getEditor('editor').destroy();
	}
	//提交函数
	tijiaobtnhandler(){
		//内容
		var content = UE.getEditor('editor').getContent();
		//标题
		var title = $("#biaoji").val();
		//类型
		var leixing = $("#leixing").val();

		//调用Action
		this.props.fabiao(title,content,leixing,function(data){
			if(data == 1){
				alert("发表成功！");
			}else{
				alert("失败！");
			}
		});
	}
	//预备的东西，圆括号里面没有东西
	render(){
		return (
			<div>
				{this.props.showLogin ? <Login></Login> : null}
				<div id="main-content">

					<section className="wrapper">
						<h1>发布帖子</h1>
						标题：<input id="biaoji" className="form-control" type="text" style={{"width":"700px"}}/>
						<br/>
						类型：
						<select className="form-control" style={{"width":"700px"}} id="leixing">
							{
								this.props.alltypes.map((item)=>{
									return <option value={item.id} key={item.id}>{item.typename}</option>
								})
							}
						</select>
						内容：
						<div id="editor" type="text/plain" style={{"width":"700px" , "height":"260px"}}></div>

						<input type="button" value="提交"  onClick={this.tijiaobtnhandler.bind(this)}/>
					</section>
				</div>

			</div>
		)
	}
}

//加工CounterContainer
Fabu = connect(
	(state)=>{
		return {
			 alltypes : state.indexReducer.alltypes,
			showLogin : state.indexReducer.showLogin,
			 islogin : state.indexReducer.login

		}
	},{
		fabiao : function(title,content,leixing,cb){
			return function(dispatch){
				 dispatch(dofabiao(title,content,leixing,cb));
			}
		},
		showloginbox
	}
)(Fabu);

export default Fabu;