import React,{ Component } from "react";
import QueueAnim from 'rc-queue-anim';
//import { Collapse } from 'antd';
import { Card } from 'antd';

class About extends Component{
	render(){
		
		return(
			<QueueAnim delay={300} className="demo-content">
			<div className="about" key="a">	
				<QueueAnim delay={500} className="demo-content">
					<div className="about_cont" key="b">
						<QueueAnim delay={600} className="title1">
							<div key="c">
								<h2>基本信息</h2>
								<div>
									<p>张杰,男,90后web前端工程师.</p>
									<p></p>
								</div>	
							</div>
						</QueueAnim>
					  <QueueAnim delay={700} className="title1">					  
					    	<div key="d">
					    		<h2>教育背景</h2>
						    	<div>
						    		<p><span>2011-2015</span><span>成都信息工程大学</span><span>网络工程(本科)</span></p>
						    		<h4>主修课程:</h4>
						    		
						    	</div>
					    	</div>
					  </QueueAnim>
					  <QueueAnim delay={800} className="title1">					  						  
					    	<div key="e">
					    		<h2>工作经历与技能</h2>
						    	<div>
						    		<p>技能:</p>
						    	</div>
					    	</div>
					  </QueueAnim>
					  <QueueAnim delay={900} className="title1">					  						  
					    	<div key="f">
					    		<h2>个人爱好</h2>
						    	<div>
						    		<p>学习,学习,学习,学习</p>
						    	</div>
					    	</div>
					  </QueueAnim>
					  <QueueAnim delay={1000} className="title1">					  						  
					    	<div key="f">
					    		<h2>联系我</h2>
						    	<div>
						    		<p>电话(tel):15108494106</p>
						    		<p>QQ:15108494106</p>
						    		<p>微信 :15108494106</p>
						    	</div>
					    	</div>
					  </QueueAnim>
					</div>
				</QueueAnim>
			</div>
			</QueueAnim>
		)
	}
}
export default About;
