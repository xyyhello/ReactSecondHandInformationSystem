import React from "react";
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
 
class NavBlock extends React.Component{
	render(){
		return (

			<div className="col-md-2 col-sm-2 box0 col-lg-2">
               			<div className="box1">
                  			<span className={"fa "+this.props.classname}></span>
                  			<h3>{this.props.name}</h3>
                		</div>
               			
             </div>
			)
	}
}
//加工
NavBlock = connect(
	(state)=>{
		return {
			
		}
	},{
		
	}
)(NavBlock);

export default NavBlock;