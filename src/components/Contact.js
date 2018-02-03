import React,{ Component } from "react";
import QueueAnim from 'rc-queue-anim';
class Contact extends Component{
	render(){
		return(
			<QueueAnim delay={300} className="demo-content">
				<div className="contact" key="a">
					<section className="contentipt bgcolor-1">
					<span className="input input--nao">
						<input className="input__field input__field--nao" type="text" id="input-1" />
						<label className="input__label input__label--nao" for="input-1">
							<span className="input__label-content input__label-content--nao">留下你的足迹</span>
						</label>
						<svg className="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
							<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
						</svg>
					</span>
					<br />
					<span className="input input--nao">
						<input className="input__field input__field--nao" type="text" id="input-2" />
						<label className="input__label input__label--nao" for="input-2">
							<span className="input__label-content input__label-content--nao">邮箱</span>
						</label>
						<svg className="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
							<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
						</svg>
					</span>
					<br />
					<span className="input input--nao">
						<input className="input__field input__field--nao" type="text" id="input-3" />
						<label className="input__label input__label--nao" for="input-3">
							<span className="input__label-content input__label-content--nao">QQ联系</span>
						</label>
						<svg className="graphic graphic--nao" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
							<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
						</svg>
					</span>
					<br />
				</section>
				</div>
			</QueueAnim>
		)
	}
}
export default Contact;