<template>
	<div class="list-cont">
		<div :class="'list-main '+(showFilterCont?'hide':'')">
			<div class="main-search list-top clear">
				<i class="iconfont icon-back pull-left" @click="$router.push('/')"></i>
				<search class="pull-left" auto-scroll-to-top ref="search"></search>
			</div>
			<view-box body-padding-top="45px" body-padding-bottom="30px">
				<flexbox class="list-filter" :gutter="0">
		      <flexbox-item :span="1/4">
		      	<div class="text-center" :style="sortBy==0?'color:#000;':''" @click="sortList(0)">
		      		默认<i class="iconfont icon-triangledownfill"></i>
		      	</div>
		      </flexbox-item>
		      <flexbox-item :span="1/4">
		      	<div class="text-center" :style="sortBy==1?'color:#000;':''" @click="sortList(1)">
		      		人气
		      	</div>
		      </flexbox-item>
		      <flexbox-item :span="1/4">
		      	<div class="text-center" :style="sortBy==2?'color:#000;':''" @click="sortList(2)">
		      		价格<span :class="sortSeq=='asc'?'up':'down'"><i class="iconfont icon-fold"></i><i class="iconfont icon-unfold"></i></span>
		      	</div>
		      </flexbox-item>
		      <flexbox-item :span="1/4">
		      	<div class="text-center" style="color:#000;" @click="showFilterCont=!showFilterCont">
		      		<i class="iconfont icon-filter"></i>筛选
		      	</div>
		      </flexbox-item>
		    </flexbox>
				<pull-to @infinite-scroll="infinite" @scroll="roll" ref="scroller">
					<grid :cols="2" class="list-deil">
						<grid-item v-for="(item, idx) in listData" :key="idx">
							<img slot="icon" :src="item.pic" />
							<div slot="label">
								<p class="text-left title">{{item.title}}</p>
								<p class="text-left">
									<span class="price">￥{{item.price}}</span><span class="payNum">{{item.pay}}人付款</span>
									<i class="iconfont icon-cart pull-right" @click="addCart(item)"></i>
								</p>
							</div>
						</grid-item>
					</grid>
					<div class="loading-bar text-center" v-if="loading"><spinner type="ios"></spinner>加载中...</div>
				</pull-to>
			</view-box>
			<div class="list-goTop" @click="goTop" v-if="!isTop">
				<i class="iconfont icon-top"></i>
			</div>
			<div class="weui-mask" @click="showFilterCont=!showFilterCont"></div>
		</div>
		<div :class="'filter-cont '+(showFilterCont?'show':'')">
			<group class="filter-main" :gutter="0">
				<cell title="性别" is-link :arrow-direction="showSexy?'up':'down'" @click.native="showSexy=!showSexy">
					<span slot="default" class="filter-choosed">{{sexy}}</span>
				</cell>
				<checker type="radio" class="clear" default-item-class="item-unselected" selected-item-class="item-selected" v-model="sexy" v-if="showSexy">
		      <checker-item value="男" class="pull-left">男</checker-item>
		      <checker-item value="女" class="pull-left">女</checker-item>
	      </checker>
				<cell title="价格" is-link :arrow-direction="showPrice?'up':'down'" @click.native="showPrice=!showPrice">
					<span slot="default" class="filter-choosed">{{price}}</span>
				</cell>
				<checker type="radio" class="clear" default-item-class="item-unselected" selected-item-class="item-selected" v-model="price" v-if="showPrice">
		      <checker-item value="￥0-239" class="pull-left">￥0-239</checker-item>
		      <checker-item value="￥240-369" class="pull-left">￥240-369</checker-item>
		      <checker-item value="￥370-659" class="pull-left">￥370-659</checker-item>
		      <checker-item value="￥659以上" class="pull-left">￥659以上</checker-item>
	      </checker>
				<cell title="颜色" is-link :arrow-direction="showColor?'up':'down'" @click.native="showColor=!showColor">
					<span slot="default" class="filter-choosed">{{color}}</span>
				</cell>
				<checker type="radio" class="clear" default-item-class="item-unselected" selected-item-class="item-selected" v-model="color" v-if="showColor">
		      <checker-item value="红色" class="pull-left">红色</checker-item>
		      <checker-item value="白色" class="pull-left">白色</checker-item>
		      <checker-item value="橙色" class="pull-left">橙色</checker-item>
		      <checker-item value="黑色" class="pull-left">黑色</checker-item>
		      <checker-item value="灰色" class="pull-left">灰色</checker-item>
		      <checker-item value="棕色" class="pull-left">棕色</checker-item>
		      <checker-item value="绿色" class="pull-left">绿色</checker-item>
		      <checker-item value="蓝色" class="pull-left">蓝色</checker-item>
		      <checker-item value="黄色" class="pull-left">黄色</checker-item>
		      <checker-item value="棕卡其" class="pull-left">棕卡其</checker-item>
		      <checker-item value="彩色" class="pull-left">彩色</checker-item>
	      </checker>
				<cell title="尺码" is-link :arrow-direction="showSize?'up':'down'" @click.native="showSize=!showSize">
					<span slot="default" class="filter-choosed">{{size}}</span>
				</cell>
				<checker type="radio" class="clear" default-item-class="item-unselected" selected-item-class="item-selected" v-model="size" v-if="showSize">
		      <checker-item value="XXS" class="pull-left">XXS</checker-item>
		      <checker-item value="XS" class="pull-left">XS</checker-item>
		      <checker-item value="S" class="pull-left">S</checker-item>
		      <checker-item value="M" class="pull-left">M</checker-item>
		      <checker-item value="L" class="pull-left">L</checker-item>
		      <checker-item value="XL" class="pull-left">XL</checker-item>
		      <checker-item value="XXL" class="pull-left">XXL</checker-item>
	      </checker>
			</group>
			<group class="filter-btn clear" :gutter="0">
				<x-button class="pull-left" @click.native="clearFilter">清空</x-button>
				<x-button class="btn-confirm pull-left" @click.native="filterList">确定</x-button>
			</group>
		</div>
	</div>
</template>

<script>
	import PullTo from 'vue-pull-to'
	import xfooter from '@/components/xfooter'
	import { ViewBox, Search, Flexbox, FlexboxItem, Grid, GridItem, Group, Cell, Checker, CheckerItem, XButton, Spinner } from 'vux'
	
	export default {
		name: 'list',
		components: {
			PullTo,
			ViewBox,
			Search, 
			Flexbox,
			FlexboxItem, 
			Grid, 
			GridItem, 
			Group,
			Cell, 
			Checker, 
			CheckerItem, 
			XButton,
			Spinner,
			'xfooter': xfooter
		},
		data() {
			return {
				sortBy: 0,
				sortSeq: '',
				listData:[],
				loadCnt: 0,
				loading: true,
				scrollTop: 0,
				showSexy: true,
				sexy: '',
				showPrice: false,
				price: '',
				showColor: false,
				color: '',
				showSize: false,
				size: '',
				showFilterCont: false,
				isTop: true
			}
		},
		mounted() {
			this.getList();
		},
		beforeRouteEnter(to, from, next){
			next(vm=>{
				if(vm.$store.state.cache_list.indexOf('list') == -1){
  				vm.$store.state.cache_list += ',list';
  			}
				let $div = document.querySelector('.scroll-container');
				if($div){
					$div.scrollTop = vm.scrollTop;
				}
			});
		},
		beforeRouteLeave(to, from, next){
			if(to.meta.status < from.meta.status){
				this.$store.state.cache_list = this.$store.state.cache_list.replace(/,list/g, '');
			}
			this.scrollTop = document.querySelector('.scroll-container').scrollTop;
			next();
		},
		methods: {
			sortList(num){
				this.sortBy = num;
				this.sortSeq = num == 2 ? (this.sortSeq == 'asc' ? 'desc' : 'asc') : '';
				this.loadCnt = 0;
				this.listData = [];
				setTimeout(()=>{
					this.getList();
				}, 2000);
			},
			getList(){
				let arr = [];
				if(this.sortBy == 0){
					arr = [
						{'title':'LRUD2018夏装新款韩版半袖T恤', 'price':39.91, 'pay':'1471', 'pic':require('../../assets/img/txu1.jpg'), 'num':1, 'isCheck':false},
						{'title':'后背镂空短袖t恤纯色', 'price':42, 'pay':'1576', 'pic':require('../../assets/img/txu2.jpg'), 'num':1, 'isCheck':false},
						{'title':'白色短袖T恤韩版潮学生宽松上衣', 'price':59, 'pay':'3926', 'pic':require('../../assets/img/txu3.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女短款韩版T恤', 'price':159, 'pay':'1364', 'pic':require('../../assets/img/txu4.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女韩版宽松T恤', 'price':139, 'pay':'3077', 'pic':require('../../assets/img/txu5.jpg'), 'num':1, 'isCheck':false},
						{'title':'INSUN舒适宽松100%棉灯笼袖白色衬衫', 'price':714, 'pay':'118', 'pic':require('../../assets/img/chenshan1.jpg'), 'num':1, 'isCheck':false},
						{'title':'JackJones男亚麻修身格纹七分袖衬衫', 'price':199.5, 'pay':'2410', 'pic':require('../../assets/img/chenshan3.jpg'), 'num':1, 'isCheck':false},
						{'title':'纯棉长袖修身衬衫商务休闲外套', 'price':75, 'pay':'6072', 'pic':require('../../assets/img/chenshan2.jpg'), 'num':1, 'isCheck':false},
						{'title':'诗篇百搭镂空蕾丝喇叭袖衬衫', 'price':806, 'pay':'79', 'pic':require('../../assets/img/chenshan5.jpg'), 'num':1, 'isCheck':false},
						{'title':'芮时气质绑带联排袖扣复古雪纺衬衫', 'price':179, 'pay':'598', 'pic':require('../../assets/img/chenshan4.jpg'), 'num':1, 'isCheck':false}
					];
				}else if(this.sortBy == 1){
					arr = [
						{'title':'纯棉长袖修身衬衫商务休闲外套', 'price':75, 'pay':'6072', 'pic':require('../../assets/img/chenshan2.jpg'), 'num':1, 'isCheck':false},
						{'title':'白色短袖T恤韩版潮学生宽松上衣', 'price':59, 'pay':'3926', 'pic':require('../../assets/img/txu3.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女韩版宽松T恤', 'price':139, 'pay':'3077', 'pic':require('../../assets/img/txu5.jpg'), 'num':1, 'isCheck':false},
						{'title':'JackJones男亚麻修身格纹七分袖衬衫', 'price':199.5, 'pay':'2410', 'pic':require('../../assets/img/chenshan3.jpg'), 'num':1, 'isCheck':false},
						{'title':'后背镂空短袖t恤纯色', 'price':42, 'pay':'1576', 'pic':require('../../assets/img/txu2.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018夏装新款韩版半袖T恤', 'price':39.91, 'pay':'1471', 'pic':require('../../assets/img/txu1.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女短款韩版T恤', 'price':159, 'pay':'1364', 'pic':require('../../assets/img/txu4.jpg'), 'num':1, 'isCheck':false},
						{'title':'芮时气质绑带联排袖扣复古雪纺衬衫', 'price':179, 'pay':'598', 'pic':require('../../assets/img/chenshan4.jpg'), 'num':1, 'isCheck':false},
						{'title':'INSUN舒适宽松100%棉灯笼袖白色衬衫', 'price':714, 'pay':'118', 'pic':require('../../assets/img/chenshan1.jpg'), 'num':1, 'isCheck':false},
						{'title':'诗篇百搭镂空蕾丝喇叭袖衬衫', 'price':806, 'pay':'79', 'pic':require('../../assets/img/chenshan5.jpg'), 'num':1, 'isCheck':false}
					];
				}else if(this.sortBy == 2 && this.sortSeq == 'asc'){
					arr = [
						{'title':'LRUD2018夏装新款韩版半袖T恤', 'price':39.91, 'pay':'1471', 'pic':require('../../assets/img/txu1.jpg'), 'num':1, 'isCheck':false},
						{'title':'后背镂空短袖t恤纯色', 'price':42, 'pay':1576, 'pic':require('../../assets/img/txu2.jpg'), 'num':1, 'isCheck':false},
						{'title':'白色短袖T恤韩版潮学生宽松上衣', 'price':59, 'pay':'3926', 'pic':require('../../assets/img/txu3.jpg'), 'num':1, 'isCheck':false},
						{'title':'纯棉长袖修身衬衫商务休闲外套', 'price':75, 'pay':'6072', 'pic':require('../../assets/img/chenshan2.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女韩版宽松T恤', 'price':139, 'pay':'3077', 'pic':require('../../assets/img/txu5.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女短款韩版T恤', 'price':159, 'pay':'1364', 'pic':require('../../assets/img/txu4.jpg'), 'num':1, 'isCheck':false},
						{'title':'芮时气质绑带联排袖扣复古雪纺衬衫', 'price':179, 'pay':'598', 'pic':require('../../assets/img/chenshan4.jpg'), 'num':1, 'isCheck':false},
						{'title':'JackJones男亚麻修身格纹七分袖衬衫', 'price':199.5, 'pay':'2410', 'pic':require('../../assets/img/chenshan3.jpg'), 'num':1, 'isCheck':false},
						{'title':'INSUN舒适宽松100%棉灯笼袖白色衬衫', 'price':714, 'pay':'118', 'pic':require('../../assets/img/chenshan1.jpg'), 'num':1, 'isCheck':false},
						{'title':'诗篇百搭镂空蕾丝喇叭袖衬衫', 'price':806, 'pay':'79', 'pic':require('../../assets/img/chenshan5.jpg'), 'num':1, 'isCheck':false}
					];
				}else if(this.sortBy == 2 && this.sortSeq == 'desc'){
					arr = [
						{'title':'诗篇百搭镂空蕾丝喇叭袖衬衫', 'price':806, 'pay':'79', 'pic':require('../../assets/img/chenshan5.jpg'), 'num':1, 'isCheck':false},
						{'title':'INSUN舒适宽松100%棉灯笼袖白色衬衫', 'price':714, 'pay':'118', 'pic':require('../../assets/img/chenshan1.jpg'), 'num':1, 'isCheck':false},
						{'title':'JackJones男亚麻修身格纹七分袖衬衫', 'price':199.5, 'pay':'2410', 'pic':require('../../assets/img/chenshan3.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女短款韩版T恤', 'price':159, 'pay':'1364', 'pic':require('../../assets/img/txu4.jpg')},
						{'title':'芮时气质绑带联排袖扣复古雪纺衬衫', 'price':179, 'pay':'598', 'pic':require('../../assets/img/chenshan4.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018春季新款女韩版宽松T恤', 'price':139, 'pay':'3077', 'pic':require('../../assets/img/txu5.jpg'), 'num':1, 'isCheck':false},
						{'title':'纯棉长袖修身衬衫商务休闲外套', 'price':75, 'pay':'6072', 'pic':require('../../assets/img/chenshan2.jpg'), 'num':1, 'isCheck':false},
						{'title':'白色短袖T恤韩版潮学生宽松上衣', 'price':59, 'pay':'3926', 'pic':require('../../assets/img/txu3.jpg'), 'num':1, 'isCheck':false},
						{'title':'后背镂空短袖t恤纯色', 'price':42, 'pay':'1576', 'pic':require('../../assets/img/txu2.jpg'), 'num':1, 'isCheck':false},
						{'title':'LRUD2018夏装新款韩版半袖T恤', 'price':39.91, 'pay':'1471', 'pic':require('../../assets/img/txu1.jpg'), 'num':1, 'isCheck':false}
					];
				}
				for(let i = 0; i < 10; i++){
					this.listData.push(arr[i]);
				}
				this.loadCnt += 1;
			},
			infinite(){
				if(this.loadCnt <= 5){
					setTimeout(() => {
						this.getList();
					}, 1000);
				}else{
					this.loading = false;
				}
			},
			roll(el){
				this.isTop = el.target.scrollTop == 0 ? true : false;
			},
			goTop(){
				let tim,
					$div = document.querySelector('.scroll-container');
				tim = setInterval(()=>{
					$div.scrollTop -= 50;
					if($div.scrollTop == 0){
						clearInterval(tim);
					}
				}, 10);
			},
			addCart(item){
				if(!window.localStorage.user_info){
					this.$store.commit('SET_TO_PATH', '/list');
					this.$router.push('/login');
				}else{
					let car = JSON.parse(window.localStorage.getItem('car')) || [],
							isIn = false;
					car.forEach(function(obj){
						if(obj['title'] == item['title']){
							obj['num'] += 1;
							isIn = true;
							return;
						}
					});
					if(!isIn){
						car.push(item);
					}
					window.localStorage.setItem('car', JSON.stringify(car));
					this.$vux.toast.text('已加入购物车');
				}
			},
			clearFilter(){
				this.sexy = '',
				this.price = '',
				this.color = '',
				this.size = '';
			},
			filterList(){
				let str = '', self = this;
				str += self.sexy == '' ? '' : ('性别：' + self.sexy);
				str += self.price == '' ? '' : ('价格' + self.price);
				str += self.color == '' ? '' : ('颜色' + self.color);
				str += self.size == '' ? '' : ('尺码' + self.size);
				self.showTextToast('筛选条件为：'+ str, function(){
					self.showFilterCont = false;
				});
			}
		}
	}
</script>

</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .list-cont {
	.filter-cont{
		position: absolute;
		top: 0;
		right: -210px;
		.setWH(200px);
		border-left: 1px solid @darkWhite;
		.boxShadow(0px, 5px, 10px);
		background-color: @whiteColor;
		z-index: 2;
    .transition;
		&.show{
			right: 0px;
		}
		.filter-main{
			height: 100%;
			padding-bottom: 36px;
			.overflow(auto);
		}
		.weui-cells{
			font-size: 12px;
			color: @darkGrey;
		}
		.filter-choosed{
			padding-right: 5px;
			color: @redColor;
		}
		.vux-checker-box{
			padding-left: 15px;
			padding-right: 5px;
			padding-bottom: 2px;
		}
		.item-unselected{
			width: 80px;
			margin-right: 8px;
			margin-bottom: 8px;
			padding: 5px 0;
			font-size: 14px;
			text-align: center;
			color: @darkColor;
			border: 1px solid @darkWhite;
			border-radius: 2px;
			background-color: @darkWhite;
		}
		.item-selected{
			border-color: @darkColor;
			background-color: @whiteColor;
		}
		.filter-btn{
			position: absolute;
			bottom: 0px;
			width: 100%;
			border-top: 1px solid @darkWhite;
		}
		.weui-btn{
			width: 50%;
			margin-top: 0;
			font-size: 16px;
			color: @darkColor;
			border-radius: 0;
			background-color: @whiteColor;
			&:after{
				border: none;
			}
			&.btn-confirm{
				color: @whiteColor;
				background-color: @darkColor;
			}
		}
	}
	.list-main{
		position: absolute;
		left: 0;
		.setWH;
    .transition;
		&.hide{
			left: -200px;
			>.weui-mask{
				display: block;
			}
		}
		>.weui-mask{
			display: none;
	    position: absolute;
	    width: 100%;
			top: 0px;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.list-top{
			>.icon-back {
				padding: 7px 0px 5px 10px;
				font-size: 30px;
				color: @whiteColor;
			}
			>.vux-search-box {
				width: 85%;
			}
		}
		.list-filter{
			padding: 5px 0;
			border-bottom: 1px solid @lightGrey;
			.vux-flexbox-item {
				>div{
					font-size: 14px;
					color: @lightGreys;
					>span{
						position: relative;
				    display: inline-block;
				    .setWH(5px, 11px);
				    &.down i.icon-fold, &.up i.icon-unfold{
				    	color: @lightGreys;
			    	}
					}
				}
				+.vux-flexbox-item>div{
					border-left: 1px solid @lightGrey;
				}
				i.icon-triangledownfill{
					position: relative;
			    top: 2px;
					font-size: 10px;
					vertical-align: text-top;
				}
				i.icon-fold, i.icon-unfold{
			    position: absolute;
					font-size: 10px;
				}
				i.icon-fold{
			    top: -3px;
				}
				i.icon-unfold{
			    bottom: -6px;
				}
			}
		}
		.list-deil{
			&:before{
				border-top: none;
			}
			&:after{
				border-left: none;
			}
			.weui-grid{
				padding: 20px 10px 0px 10px;
				&:before{
					border-right: none;
				}
				&:after{
					border-bottom: none;
				}
				.weui-grid__icon{
					.setWH;
				}
				.weui-grid__label {
					.title, .payNum{
						font-size: 12px;
					}
					.title{
				    min-height: 32px;
				    max-height: 32px;
						white-space: pre-wrap;
						.overflow(hidden);
					}
					.price{
						color: @redColor;
					}
					.payNum{
						margin-left: 5px;
						color: @darkGrey;
					}
				}
			}
		}
		.loading-bar{
			line-height: 30px;
			>.vux-spinner{
				.setWH(20px, 20px);
				margin-right: 5px;
				>svg{
					.setWH(20px, 20px);
				}
			}
		}
		.list-goTop{
	    position: fixed;
	    right: 10px;
	    bottom: 10px;
	    .setWH(30px, 30px);
	    line-height: 28px;
	    text-align: center;
	    border-radius: 50%;
	    border: 1px solid @darkWhite;
	    z-index: 1;
	    background-color: rgba(255, 255, 255, 0.8);
	    .icon-top{
		    font-size: 18px;
			}
		}
	}
}
</style>