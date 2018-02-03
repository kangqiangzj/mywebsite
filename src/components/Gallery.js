import React,{ Component } from "react";
import QueueAnim from 'rc-queue-anim';
class Gallery extends Component{
	render(){
		return(
			<QueueAnim delay={300} className="demo-content">
				<div className="gallery" key="a">
					<div className="learn">
						<dl>
							<dt><img src={require("../img/l1.jpg")} /></dt>
							<dd>
								<h4>VUE 使用中踩过的坑</h4>
								<p>2018/02/02 · JavaScript</p>
								<p>图片上传，作为web端一个常用的功能，在不同的项目中有不同的需求，在这里实现一个比价基本的上传图片插件，主要能实现图片的浏览，剪裁，上传这三个功能，同时也是为了让自己对图片／文件上传和HTML5中名声在外的canvas相关能够有一些了解</p>
							</dd>
						</dl>
						<dl>
							<dt><img src={require("../img/l1.jpg")} /></dt>
							<dd>
								<h4>VUE 使用中踩过的坑</h4>
								<p>2018/02/02 · JavaScript</p>
								<p>图片上传，作为web端一个常用的功能，在不同的项目中有不同的需求，在这里实现一个比价基本的上传图片插件，主要能实现图片的浏览，剪裁，上传这三个功能，同时也是为了让自己对图片／文件上传和HTML5中名声在外的canvas相关能够有一些了解</p>
							</dd>
						</dl>
						<dl>
							<dt><img src={require("../img/l1.jpg")} /></dt>
							<dd>
								<h4>VUE 使用中踩过的坑</h4>
								<p>2018/02/02 · JavaScript</p>
								<p>图片上传，作为web端一个常用的功能，在不同的项目中有不同的需求，在这里实现一个比价基本的上传图片插件，主要能实现图片的浏览，剪裁，上传这三个功能，同时也是为了让自己对图片／文件上传和HTML5中名声在外的canvas相关能够有一些了解</p>
							</dd>
						</dl>
						<dl>
							<dt><img src={require("../img/l1.jpg")} /></dt>
							<dd>
								<h4>VUE 使用中踩过的坑</h4>
								<p>2018/02/02 · JavaScript</p>
								<p>图片上传，作为web端一个常用的功能，在不同的项目中有不同的需求，在这里实现一个比价基本的上传图片插件，主要能实现图片的浏览，剪裁，上传这三个功能，同时也是为了让自己对图片／文件上传和HTML5中名声在外的canvas相关能够有一些了解</p>
							</dd>
						</dl>
					</div>
				</div>
			</QueueAnim>
		)
	}
}
export default Gallery;