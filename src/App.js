import React, { Component } from 'react';
import { Link } from "react-router"
import QueueAnim from 'rc-queue-anim';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      	<div className="touxiang">头像</div>
      	<div className="nav-box">
      	 	<QueueAnim type="bottom" component="ul">
		         		<Link to="/home" key="0">
			         		<a className="frame-btn _first" href="#">
										<span className="frame-btn__outline frame-btn__outline--tall">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__outline frame-btn__outline--flat">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__solid"></span>
										<span className="frame-btn__text">&nbsp;&nbsp;&nbsp;首页&nbsp;&nbsp;&nbsp;</span>
									</a>	         	       
		         		</Link>
		         		<Link to="/about" key="1">
			         		<a className="frame-btn" href="#">
										<span className="frame-btn__outline frame-btn__outline--tall">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__outline frame-btn__outline--flat">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__solid"></span>
										<span className="frame-btn__text">&nbsp;&nbsp;关于我&nbsp;&nbsp;</span>
									</a>	         	       
		         		</Link>
		         		<Link to="/gallery" key="2">
			         		<a className="frame-btn" href="#">
										<span className="frame-btn__outline frame-btn__outline--tall">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__outline frame-btn__outline--flat">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__solid"></span>
										<span className="frame-btn__text">&nbsp;学无止境&nbsp;</span>
									</a>	         	       
		         		</Link>
		         		<Link to="/service" key="3">
			         		<a className="frame-btn" href="#">
										<span className="frame-btn__outline frame-btn__outline--tall">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__outline frame-btn__outline--flat">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__solid"></span>
										<span className="frame-btn__text">生活乐事</span>
									</a>	         	       
		         		</Link>
		         		<Link to="/contact" key="4">
			         		<a className="frame-btn" href="#">
										<span className="frame-btn__outline frame-btn__outline--tall">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__outline frame-btn__outline--flat">
											<span className="frame-btn__line frame-btn__line--tall"></span>
											<span className="frame-btn__line frame-btn__line--flat"></span>
										</span>
										<span className="frame-btn__solid"></span>
										<span className="frame-btn__text">给我留言</span>
									</a>	         	       
		         		</Link>
		        </QueueAnim>
	      </div>
	      <div className="content-box">	
			      {this.props.children} 
	      </div>
      </div>
    );
  }
}

export default App;
