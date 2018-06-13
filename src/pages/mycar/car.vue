<template>
	<div class="car-cont">
		<xheader :htitle="htitle+carNum" :leftOpt="leftOpt">
			<a slot="rightOpt" @click="setEdit">{{isEdit?'完成':'编辑'}}</a>
		</xheader>
		<div class="car-main" ref="mainDiv">
			<div class="empty-cart text-center" v-if="listData.length==0">
				<i class="iconfont icon-cart"></i>
				<p>您的购物车暂无商品</p>
			</div>
			<swipeout v-if="listData.length>0">
				<swipeout-item transition-mode="reveal" v-for="(item, idx) in listData" :key="idx" :disabled="scrolling" ref="carItem">
	        <div slot="right-menu">
	          <swipeout-button type="warn" @click.native="deleteItem(idx)">删除</swipeout-button>
	        </div>
	        <flexbox slot="content" :gutter="0">
	        	<flexbox-item :span="1/8" class="text-center">
							<check-icon :value.sync="item.isCheck"></check-icon>
						</flexbox-item>
						<flexbox-item :span="1/4">
							<img :src="item.pic" />
						</flexbox-item>
						<flexbox-item :span="1/2" class="list-info">
							<p class="info-num clear" v-if="isEdit">
								<span class="pull-left" @click="subNum(idx)">-</span>
								<span class="pull-left"><input type="text" :value="item.num" /></span>
								<span class="pull-left" @click="plusNum(idx)">+</span>
							</p>
							<p v-if="!isEdit">{{item.title}}</p>
							<p class="red-font">￥{{item.price}}</p>
						</flexbox-item>
	        	<flexbox-item :span="1/8" class="text-center light-font">
							x {{item.num}}
						</flexbox-item>
					</flexbox>
	    	</swipeout-item>
	    </swipeout>
		</div>
		<flexbox class="sum-bar">
			<flexbox-item :span="1/4">
				<check-icon :value.sync="checkAll">全选</check-icon>
			</flexbox-item>
			<flexbox-item class="text-right" v-if="!isEdit">
				<span>总计：￥{{total}}</span>
			</flexbox-item>
			<flexbox-item class="text-right" v-if="isEdit">
				<x-button mini type="warn" @click.native="deleteItem(-1)">删除</x-button>
			</flexbox-item>
		</flexbox>
		<xfooter></xfooter>
	</div>
</template>

<script>
  import mtype from '@/store/mutation-types'
	import xheader from '@/components/xheader'
	import xfooter from '@/components/xfooter'
	import {XButton, Flexbox, FlexboxItem, CheckIcon, Swipeout, SwipeoutItem, SwipeoutButton, ViewBox } from 'vux'
	
	export default{
		name: 'car',
		components: {
			'xheader': xheader,
			'xfooter': xfooter,
			XButton, Flexbox, FlexboxItem, CheckIcon, Swipeout, SwipeoutItem, SwipeoutButton, ViewBox,
		},
		data(){
			return {
				htitle: '购物车',
				leftOpt: {'showBack': false, 'backText':''},
				isEdit: false,
				checkAll: false,
				listData: JSON.parse(window.localStorage.getItem('car')) || [],
				scrolling: true
			}
		},
		computed: {
			total(){
				let sum = 0;
				this.listData.forEach(function(obj){
					if(obj['isCheck']){
						sum += obj['price'] * obj['num'];
					}
				});
				return Number(sum.toFixed(2));
			},
			carNum(){
				let num = 0;
				this.listData.forEach(function(obj){
					num += obj['num'];
				});
				return '('+num+')';
			}
		},
		created(){
			this.$store.commit(mtype.SET_NAV_INDEX, '2');
			this.listData.forEach(function(obj){
				obj['isCheck'] = false;
			});
		},
		watch: {
			checkAll(nVal, oVal){
				this.listData.forEach(function(obj){
					obj['isCheck'] = nVal;
				});
			},
			listData: {
				handler(nVal, oVal){
					window.localStorage.setItem('car', JSON.stringify(nVal));
				},
				deep: true
			}
		},
		mounted(){
			let self = this, startX, startY, moveX, moveY, X, Y;
			this.$refs.mainDiv.addEventListener('touchstart', function(el){
				startX = el.changedTouches[0].pageX,
				startY = el.changedTouches[0].pageY;
			});
			this.$refs.mainDiv.addEventListener('touchmove', function(el){
				moveX = el.changedTouches[0].pageX,
				moveY = el.changedTouches[0].pageY;
				X = moveX - startX,
				Y = moveY - startY;
				if(Math.abs(X) > Math.abs(Y)){
					self.scrolling = false;
				}
			});
		},
		methods: {
			setEdit(){
				if(this.$refs.carItem){
					this.$refs.carItem.forEach(function($t){
						$t.close();
					});
				}
				this.isEdit = this.isEdit ? false : true;
			},
			subNum(idx){
				let siz = this.listData[idx]['num'];
				siz = siz == 1 ? 1 : siz - 1;
				this.listData[idx]['num'] = siz;
			},
			plusNum(idx){
				let siz = this.listData[idx]['num'];
				siz += 1;
				this.listData[idx]['num'] = siz;
			},
			deleteItem(idx){
				if(idx == -1){
					for(let i = 0; i < this.listData.length; i++){
						if(this.listData[i]['isCheck']){
							this.listData.splice(i, 1);
							i -= 1;
						}
					}
				}else{
					this.listData.splice(idx, 1);
				}
				this.checkAll = false;
				this.isEdit = false;
				this.listData.forEach(function(obj){
					obj['isCheck'] = false;
				});
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .car-cont{
	.car-main{
		height: 100%; 
		padding-top: 46px; 
		padding-bottom: 90px; 
		.overflow(auto);
		>.empty-cart{
			padding-top: 100px;
			color: @lightGreys;
			>i.icon-cart{
				font-size: 100px;
			}
		}
		.vux-swipeout-item{
			border-bottom: 10px solid @darkWhite;
			.vux-swipeout-content{
				z-index: 2;
				.vux-flexbox{
					padding: 5px 0;
					.vux-flexbox-item{
						&.list-info{
							padding-left: 10px;
							>p+p{
								margin-top: 5px;
							}
							.info-num{
								span {
							    display: inline-block;
							    height: 30px;
							    min-width: 30px;
							    margin-left: -1px;
							    line-height: 30px;
							    text-align: center;
							    vertical-align: middle;
									border: 1px solid @lightGrey;
							    .overflow(hidden);
								}
								input{
							    .setWH(30px, 100%);
							    text-align: center;
							    outline: none;
							    border: 0;
								}
							}
						}
						>img{
							width: 100%;
						}
					}
					.light-font{
						color: @darkGrey;
					}
					.red-font{
						color: @redColor;
					}
				}
			}
		}
	}
	.sum-bar{
		position: absolute;
		left: 0px;
		bottom: 50px;
		padding-top: 0px;
		padding-bottom: 0px;
		border-top: 1px solid @darkGrey;
		background-color: @whiteColor;
		z-index: 3;
		.vux-flexbox-item{
			font-size: 12px;
			.vux-check-icon{
				i{
					font-size: 20px;
				}
			}
			&.text-right{
				>span{
					margin-right: 5px;
					line-height: 39px;
					color: @redColor;
				}
				>.weui-btn_warn{
					line-height: 3;
					border-radius: 0;
				}
			}
		}
	}
}
</style>