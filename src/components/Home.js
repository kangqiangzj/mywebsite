import React,{ Component } from "react";
import QueueAnim from 'rc-queue-anim';
import { Card } from 'antd';
const { Meta } = Card;
//import game from "../game"
//<canvas id="canvas" height="400" width="600" style="background: #333;"></canvas>
class Home extends Component{
	render(){
		return(
			<QueueAnim delay={300} className="demo-content">
				<div className="home" key="a">				
				  <div className="home_container">
				 	 <QueueAnim delay={500} className="demo-left">
				  		<div className="home_left" key="b">
							<h2 className="home-t1">鸭梨那么大</h2>
							<p>
								<span className="home-t1-sp">One:</span>小新眼神儿不好。一天，他了一只鸡，沿着一窄小路往家里走，迎面走来一伙计端了一盆豆腐。二人错身时稍有擦碰。小新就嘟囔了一句；‘也不瞅着点儿！大肥肉就往人身上蹭！’端豆腐的也不含糊，还了一句‘耶嗬~~~~~~瞧您那眼神儿吧，还玩鹰！’
							</p>
							<br />
							<p>
								<span className="home-t1-sp">Two:</span>有个害羞的小伙子告诉妈妈说，他要去同一位姑娘约会。半小时以后，他回来了。母亲问：“谈的怎么样？”“很顺利。”“见到她了吗？”“当然见到了，”他咯咯地笑着说，“不过，要是我不躲在大树后面的话，她也会看见我的。”
							</p>
							<br />
							<p>
								<span className="home-t1-sp">Three:</span>一笔100万无的赛马奖金被一个白痴获得众人不解,问白痴:"你是怎样买赛马奖券的?"白痴说:"我连续三天梦到"7"这个数字,3乘以7=24,所以我买了第24号赛马奖券,一下中了众人大惊:"3乘以7=21,怎么会是24呢?"
白痴也吓了一跳:"真的?这回买错了,下次买21号."
							</p>
				  		</div>
				     </QueueAnim>
				  	<QueueAnim delay={700} className="demo-right">
				  		<div className="home_right" key="c">
				  			<h2 className="home-t1">&nbsp;</h2>
				  			<p>
								<span className="home-t1-sp">Four:</span>三个年轻人走进一家酒店喝啤酒.服务员向他们要身份证,因为按当地的法律规定,只有对成所人才供应酒.其中两人马拿出证件,第三个人却因还不到法定许可喝酒的年龄,摸了摸口袋,无可奈何地拿出一张图书馆借书卡,问服务员能否通融一下.服务员对他笑笑,然后大声招呼柜台后边的掌柜说:"两瓶啤酒......外加一 本连环画."
							</p>
							<br />
							<p>
								<span className="home-t1-sp">Five:</span>男女女都喜欢在周末一起逛公园。一天，和朋友们一起瞎转呼，累了坐在一个长板凳上闲聊。突然，朋友指着一个方向说：“看，那边在干什么？”众人皆往那个方向看去，原来是一对情侣在拥抱着接吻。于是，有一个朋友不爽了，“光天化日，大众场合竟然这么亲热，太不象话！我要过去说他两句。”于是，大家突然开始讨论过去说什么能很优雅的把他们分开。#$^#%#@（一阵口舌！）这时，我冒出一句：“你过去跟他们说：‘加张嘴，好吗？’”顿时，一片狂笑。。。然后只听女的说，好啊，然后女的就走了。
							</p>
							<br />
				  		</div>
				     </QueueAnim>
				  </div>
				</div>
			</QueueAnim>
		)
	}
	componentDidMount(){
//		game()
	}
}
export default Home;