import React,{ Component } from "react";
import QueueAnim from 'rc-queue-anim';
import { Link } from "react-router"
//import Button from 'antd/lib/button';
//import QueueAnim from 'rc-queue-anim';
class Service extends Component{
	render(){
		return(
			<QueueAnim delay={300} className="demo-content">
			<div className="service" key="a">				
				<div className="service-box">
				<QueueAnim delay={500} className="de">
					<div className="list1" key="b">
					<a href="https://www.douban.com/note/463565709/">说说你读的书越多越有的感觉</a>
					<p>文/茗楚 我比较喜欢那种大气磅礴，写的酣畅淋漓的书，就像侠士执剑天涯，毫不矫揉造作，例如李敖的《北京法源寺》，莫言的《檀香刑》 读的好书多了，就越不愿看言情小说，感怀青春，初恋之类的，感觉太无聊 也越来越不愿看励志成功书，例如《谁的青春不迷茫》，感觉都是成功的人，无病，或以痊愈的呻吟 还不愿看的是韩寒...</p>
				</div>
				</QueueAnim>
				<QueueAnim delay={700} className="de">
				<div className="list2" key="c">
					<a href="https://www.douban.com/note/333673516/">个唇炎患者用过的润唇膏以及测评【这是一篇悲伤的日记】</a>
					<p>从我大三发现我有唇炎开始，我就脱过无数次皮，裂过无数次嘴角，我妈甚至怀疑我是不是生病了，怎么嘴唇发白发黑这么严重。。。。【此处应有二胡BGM】 我就病急乱投医啊，找过北大医院的皮肤科主任，甚至跑去香港花了一千多块看病买药，也有在淘宝买过一些手工治唇炎...</p>
				</div>
				</QueueAnim>
				<QueueAnim delay={900} className="de">
				<div className="list3" key="d">
					<a href="https://www.douban.com/note/364035840/">丑应该怎么办？</a>
					<p>文/负十三 泻药。（好像真有人邀请我的样子呢。） 这个问题也困扰我很久，因为长相这种东西，七分天注定，三分靠打拼，还有90分就不知道该怎么办了。 从前有这么一种回答，我个人并不赞同：书中自有黄金屋，人丑就该多读书。 多读书，对长相不佳的人，真的有用吗？ 答案是否定的。读书很可能让人沉溺于精神世界，而忽视...</p>
				</div>
				</QueueAnim>
				<QueueAnim delay={1000} className="de">
				<div className="list4" key="e">
					<a href="https://www.douban.com/note/356067412/">得一看又看的好书</a>
					<p>曹雪芹：《红楼梦》 读红楼，第一遍叹其文采，第二遍思其命运，第三遍得其哲思。最后的哲思是什么呢？当然各有体验。我比较信赖顾城对红楼的很多感受。周汝昌、张爱玲等也很好。一本红楼，令千千万万后人惊叹与羞愧。时常读着，皆有韵味。所谓开卷有益。 杜拉斯：《情人》、《广岛之恋》 杜拉斯在我国成了小资的代表之一...</p>
				</div>
				</QueueAnim>
				<QueueAnim delay={1000} className="de">
				<div className="list5" key="f">
					<a href="https://www.douban.com/note/349380766/"></a>
					<p>人的一生不是父母一生的续集，也不是儿女一生的前传，更不是朋友一生的外篇，只有你自己对自己的一生负责，别人无法也负不起这个责任。自己做的决定，至少到最后，自己没什么可后悔。看到最后总结出了：要快乐的工作，就要好好的生活！体验决定深度，知识决定广度。你的人生是什么呢？ 那我们工作到底为了什么呢？下面看...</p>
				</div>
				</QueueAnim>
				</div>
			</div>
			</QueueAnim>
		)
	}
}
export default Service;