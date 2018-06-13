<template>
	<div class="home-cont">
		<div :class="'menu clear '+(showMenu?'show':'')">
			<div class="menu-left pull-left">
				<ul>
					<li :class="menuTab==0?'active':''" @click="menuTab=0">女装</li>
					<li :class="menuTab==1?'active':''" @click="menuTab=1">男装</li>
					<li :class="menuTab==2?'active':''" @click="menuTab=2">鞋靴</li>
					<li :class="menuTab==3?'active':''" @click="menuTab=3">箱包</li>
					<li :class="menuTab==4?'active':''" @click="menuTab=4">服配</li>
				</ul>
			</div>
			<div class="menu-right pull-left">
				<div :class="menuTab==0?'show':''">
					<divider>上装</divider>
					<group :guttet="0">
						<cell title="背心" link="/list"></cell>
						<cell title="T恤" link="/list"></cell>
						<cell title="衬衫" link="/list"></cell>
						<cell title="针织衫" link="/list"></cell>
						<cell title="卫衣" link="/list"></cell>
						<cell title="毛衣" link="/list"></cell>
						<cell title="夹克" link="/list"></cell>
						<cell title="风衣" link="/list"></cell>
						<cell title="马甲" link="/list"></cell>
						<cell title="大衣" link="/list"></cell>
						<cell title="皮衣" link="/list"></cell>
						<cell title="西装" link="/list"></cell>
						<cell title="棉衣" link="/list"></cell>
						<cell title="羽绒服" link="/list"></cell>
					</group>
					<divider>裤装</divider>
					<group :guttet="0">
						<cell title="短裤" link="/list"></cell>
						<cell title="休闲裤" link="/list"></cell>
						<cell title="牛仔裤" link="/list"></cell>
						<cell title="西裤" link="/list"></cell>
						<cell title="运动裤" link="/list"></cell>
						<cell title="连体裤" link="/list"></cell>
					</group>
					<divider>裙装</divider>
					<group :guttet="0">
						<cell title="连衣裙" link="/list"></cell>
						<cell title="半身裙" link="/list"></cell>
					</group>
				</div>
				<div :class="menuTab==1?'show':''">
					<divider>上装</divider>
					<group :guttet="0">
						<cell title="背心" link="/list"></cell>
						<cell title="T恤" link="/list"></cell>
						<cell title="衬衫" link="/list"></cell>
						<cell title="POLO衫" link="/list"></cell>
						<cell title="针织衫" link="/list"></cell>
						<cell title="卫衣" link="/list"></cell>
						<cell title="毛衣" link="/list"></cell>
						<cell title="夹克" link="/list"></cell>
						<cell title="风衣" link="/list"></cell>
						<cell title="马甲" link="/list"></cell>
						<cell title="大衣" link="/list"></cell>
						<cell title="皮衣" link="/list"></cell>
						<cell title="西装" link="/list"></cell>
						<cell title="棉衣" link="/list"></cell>
						<cell title="羽绒服" link="/list"></cell>
					</group>
					<divider>裤装</divider>
					<group :guttet="0">
						<cell title="短裤" link="/list"></cell>
						<cell title="休闲裤" link="/list"></cell>
						<cell title="牛仔裤" link="/list"></cell>
						<cell title="西裤" link="/list"></cell>
						<cell title="运动裤" link="/list"></cell>
						<cell title="连体裤" link="/list"></cell>
					</group>
				</div>
				<div :class="menuTab==2?'show':''">
					<divider>女鞋</divider>
					<group :guttet="0">
						<cell title="运动鞋" link="/list"></cell>
						<cell title="休闲鞋" link="/list"></cell>
						<cell title="平底鞋" link="/list"></cell>
						<cell title="粗跟鞋" link="/list"></cell>
						<cell title="细跟鞋" link="/list"></cell>
						<cell title="低帮鞋" link="/list"></cell>
						<cell title="靴子" link="/list"></cell>
						<cell title="棉鞋" link="/list"></cell>
						<cell title="凉鞋" link="/list"></cell>
						<cell title="凉拖" link="/list"></cell>
					</group>
					<divider>男鞋</divider>
					<group :guttet="0">
						<cell title="运动鞋" link="/list"></cell>
						<cell title="休闲鞋" link="/list"></cell>
						<cell title="商务鞋" link="/list"></cell>
						<cell title="正装鞋" link="/list"></cell>
						<cell title="懒人鞋" link="/list"></cell>
						<cell title="靴子" link="/list"></cell>
						<cell title="凉鞋" link="/list"></cell>
						<cell title="凉拖" link="/list"></cell>
					</group>
				</div>
				<div :class="menuTab==3?'show':''">
					<divider>女包</divider>
					<group :guttet="0">
						<cell title="托特包" link="/list"></cell>
						<cell title="水桶包" link="/list"></cell>
						<cell title="马鞍包" link="/list"></cell>
						<cell title="波士顿包" link="/list"></cell>
						<cell title="贝壳包" link="/list"></cell>
						<cell title="饺子包" link="/list"></cell>
						<cell title="机车包" link="/list"></cell>
						<cell title="风琴包" link="/list"></cell>
						<cell title="帆布包" link="/list"></cell>
						<cell title="双肩包" link="/list"></cell>
					</group>
					<divider>男包</divider>
					<group :guttet="0">
						<cell title="商务包" link="/list"></cell>
						<cell title="休闲包" link="/list"></cell>
						<cell title="胸包" link="/list"></cell>
						<cell title="腰包" link="/list"></cell>
						<cell title="公文包" link="/list"></cell>
						<cell title="手抓包" link="/list"></cell>
						<cell title="帆布包" link="/list"></cell>
					</group>
					<divider>钱包/卡包</divider>
					<group :guttet="0">
						<cell title="长款" link="/list"></cell>
						<cell title="短款" link="/list"></cell>
						<cell title="零钱包" link="/list"></cell>
						<cell title="卡包" link="/list"></cell>
						<cell title="钥匙包" link="/list"></cell>
						<cell title="手机包" link="/list"></cell>
					</group>
					<divider>旅行箱包</divider>
					<group :guttet="0">
						<cell title="拉杆箱" link="/list"></cell>
						<cell title="登机箱" link="/list"></cell>
						<cell title="拉杆包" link="/list"></cell>
						<cell title="行李包" link="/list"></cell>
					</group>
				</div>
				<div :class="menuTab==4?'show':''">
					<divider>女士服配</divider>
					<group :guttet="0">
						<cell title="帽子" link="/list"></cell>
						<cell title="太阳镜/眼镜" link="/list"></cell>
						<cell title="手表" link="/list"></cell>
						<cell title="首饰" link="/list"></cell>
						<cell title="手套" link="/list"></cell>
						<cell title="袜子" link="/list"></cell>
						<cell title="围巾/丝巾/披肩" link="/list"></cell>
						<cell title="发绳" link="/list"></cell>
						<cell title="发夹" link="/list"></cell>
						<cell title="发箍" link="/list"></cell>
						<cell title="腰带/皮带/腰封" link="/list"></cell>
					</group>
					<divider>男士服配</divider>
					<group :guttet="0">
						<cell title="帽子" link="/list"></cell>
						<cell title="太阳镜/眼镜" link="/list"></cell>
						<cell title="手表" link="/list"></cell>
						<cell title="首饰" link="/list"></cell>
						<cell title="围巾/丝巾/披肩" link="/list"></cell>
						<cell title="手套" link="/list"></cell>
						<cell title="袜子" link="/list"></cell>
						<cell title="皮带" link="/list"></cell>
					</group>
				</div>
			</div>
		</div>
		<div :class="'home-main '+(showMenu?'hide':'')">
			<div :class="'main-search home-top clear'+(top<=10?' transparent':'')">
				<i class="iconfont icon-sort pull-left" @click="showMenu=!showMenu"></i>
				<search class="pull-left" auto-scroll-to-top ref="search"></search>
			</div>
			<div class="home-scroll" ref="mainDiv">
				<group :gutter="0">
					<swiper :aspect-ratio="280/520" :show-dots="true" dots-position="center" loop auto>
						<swiper-item class="swiper-demo-img"><img src="../../assets/img/home1.jpg"></swiper-item>
						<swiper-item class="swiper-demo-img"><img src="../../assets/img/home2.jpg"></swiper-item>
						<swiper-item class="swiper-demo-img"><img src="../../assets/img/home3.jpg"></swiper-item>
						<swiper-item class="swiper-demo-img"><img src="../../assets/img/home4.jpg"></swiper-item>
						<swiper-item class="swiper-demo-img"><img src="../../assets/img/home5.jpg"></swiper-item>
					</swiper>
				</group>
				<group title="热门分类">
					<grid :cols="4" class="hot-cat">
						<grid-item label="T恤" link="/list">
							<img slot="icon" src="../../assets/img/type1.jpg" />
						</grid-item>
						<grid-item label="衬衫" link="/list">
							<img slot="icon" src="../../assets/img/type2.jpg" />
						</grid-item>
						<grid-item label="卫衣" link="/list">
							<img slot="icon" src="../../assets/img/type3.jpg" />
						</grid-item>
						<grid-item label="外套" link="/list">
							<img slot="icon" src="../../assets/img/type4.jpg" />
						</grid-item>
						<grid-item label="休闲裤" link="/list">
							<img slot="icon" src="../../assets/img/type5.jpg" />
						</grid-item>
						<grid-item label="牛仔裤" link="/list">
							<img slot="icon" src="../../assets/img/type6.jpg" />
						</grid-item>
						<grid-item label="半身裙" link="/list">
							<img slot="icon" src="../../assets/img/type7.jpg" />
						</grid-item>
						<grid-item label="连衣裙" link="/list">
							<img slot="icon" src="../../assets/img/type8.jpg" />
						</grid-item>
						<grid-item label="运动鞋" link="/list">
							<img slot="icon" src="../../assets/img/type9.jpg" />
						</grid-item>
						<grid-item label="凉拖" link="/list">
							<img slot="icon" src="../../assets/img/type10.jpg" />
						</grid-item>
						<grid-item label="双肩包" link="/list">
							<img slot="icon" src="../../assets/img/type11.jpg" />
						</grid-item>
						<grid-item label="帽子" link="/list">
							<img slot="icon" src="../../assets/img/type12.jpg" />
						</grid-item>
					</grid>
				</group>
				<group title="编辑推荐" class="high-recommend">
					<img src="../../assets/img/match1.jpg" />
					<img src="../../assets/img/match2.jpg" />
					<img src="../../assets/img/match3.jpg" />
					<img src="../../assets/img/match4.jpg" />
					<img src="../../assets/img/match5.jpg" />
					<img src="../../assets/img/match6.jpg" />
					<img src="../../assets/img/match7.jpg" />
					<img src="../../assets/img/match8.jpg" />
				</group>
			</div>
			<xfooter></xfooter>
			<div class="weui-mask" @click="showMenu=!showMenu"></div>
		</div>
	</div>
</template>

<script>
	import mtype from '@/store/mutation-types'
	import xfooter from '@/components/xfooter'
	import { ViewBox, Swiper, SwiperItem, Group, Grid, GridItem, Search, Cell, Divider } from 'vux'

	export default {
		name: 'index',
		components: {
			ViewBox,
			Swiper,
			SwiperItem,
			Group,
			Grid,
			GridItem,
			Search, 
			Cell,
			Divider,
			'xfooter': xfooter
		},
		data() {
			return {
				top: 0,
				scrollTop: 0,
				showMenu: false,
				menuTab: 0
			}
		},
		beforeRouteEnter(to, from, next){
			next(vm => {
				let tim = setInterval(function(){
					if(vm.$refs.mainDiv){
						clearInterval(tim);
						vm.$refs.mainDiv.scrollTop = vm.scrollTop;
					}
				}, 1);
			});
		},
		beforeRouteLeave(to, from, next){
			this.scrollTop = this.$refs.mainDiv.scrollTop;
			next();
		},
		mounted(){
			let self = this;
			this.$refs.mainDiv.addEventListener('scroll', (el)=>{
				self.top = el.target.scrollTop;
			}, false);
		},
		activated(){
			this.$store.commit(mtype.SET_NAV_INDEX, '1');
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car {
	.home-top {
		>.icon-sort {
			padding: 7px 0px 5px 10px;
			font-size: 30px;
			color: @whiteColor;
		}
		>.vux-search-box {
			width: 80%;
		}
	}
	.home-cont {
		.menu {
			position: absolute;
			top: 0px;
			left: -300px;
			height: 100%;
			color: @darkColor;
			.boxShadow(5px, 0px, 10px);
			background-color: @whiteColor;
			z-index: 501;
			.transition;
			&.show {
				left: 0px;
			}
			ul>li {
				padding: 10px 0px;
				text-align: center;
				border-bottom: 1px solid @whiteColor;
				background-color: @darkWhite;
				&.active {
					border-left: 5px solid @darkColor;
					background-color: @whiteColor;
				}
			}
		}
		.menu-left {
			width: 80px;
		}
		.menu-right {
			.setWH(200px);
			padding: 0 10px 5px 10px;
			.overflow(auto);
			.vux-divider {
				margin: 0 auto;
				&:after,
				&:before {
					width: 35%;
				}
			}
			>div {
				display: none;
				&.show {
					display: block;
				}
			}
			.weui-cells {
				margin-top: 0px;
				font-size: 14px;
				line-height: 14px;
			}
			.weui-cell {
				background-color: @darkWhite;
			}
		}
		.home-main {
			position: absolute;
			left: 0px;
			.setWH;
			.transition;
			&.hide {
				left: 280px;
			}
			>.weui-mask {
				display: none;
				position: absolute;
				width: 100%;
				top: 0px;
				background-color: rgba(0, 0, 0, 0.4);
			}
			&.hide>.weui-mask {
				display: block;
			}
			.home-scroll {
				height: 100%;
				padding-bottom: 53px;
				.overflow(auto);
				.weui-cells__title {
					margin-bottom: 0.77em;
					color: @blackColor;
					&:before {
						content: '';
						display: inline-block;
						.setWH(3px, 18px);
						margin-right: 10px;
						vertical-align: text-bottom;
						background-color: @blackColor;
					}
				}
				.hot-cat>.weui-grid {
					padding: 10px 0px;
					>.weui-grid__icon {
						.setWH(50px, 50px);
					}
				}
				.high-recommend .weui-cells {
					&:after {
						border-bottom: none;
					}
					>img {
						width: 100%;
					}
				}
			}
			.vux-slider {
				.swiper-demo-img>img {
					width: 100%;
				}
				>.vux-indicator .vux-icon-dot {
					background-color: @whiteColor;
					&.active {
						background-color: @darkColor;
					}
				}
			}
		}
	}
}
</style>