<template>
	<div class="my-cont">
		<xheader :leftOpt="leftOpt">
			<div slot="leftOpt">
				<div class="user-portrait">
					<i class="iconfont icon-my"></i>
				</div>
				<p class="user-name">{{loginUser}}</p>
			</div>
			<a slot="rightOpt" @click="isShow=true">
				<i class="iconfont icon-exit"></i>
			</a>
		</xheader>
		<view-box class="my-main" body-padding-top="78px" body-padding-bottom="52px">
			<group class="my-order" :gutter="0">
		    <cell title="我的订单" value="全部订单" is-link></cell>
		    <grid :cols="5">
				  <grid-item label="待付款">
				    <i class="iconfont icon-pay" slot="icon"></i>
				  </grid-item>
				  <grid-item label="待发货">
				    <i class="iconfont icon-send" slot="icon"></i>
				  </grid-item>
				  <grid-item label="待收货">
				    <i class="iconfont icon-deliver" slot="icon"></i>
				  </grid-item>
				  <grid-item label="待评价">
				    <i class="iconfont icon-evaluate" slot="icon"></i>
				  </grid-item>
				  <grid-item label="退/换货">
				    <i class="iconfont icon-service" slot="icon"></i>
				  </grid-item>
				</grid>
		  </group>
			<grid class="my-list" :cols="3">
			  <grid-item label="卡券包">
			    <i class="iconfont icon-ticket" slot="icon"></i>
			  </grid-item>
			  <grid-item label="礼品卡">
			    <i class="iconfont icon-vipcard" slot="icon"></i>
			  </grid-item>
			  <grid-item label="我的评价">
			    <i class="iconfont icon-evaluate" slot="icon"></i>
			  </grid-item>
			  <grid-item label="商品收藏">
			    <i class="iconfont icon-goods" slot="icon"></i>
			  </grid-item>
			  <grid-item label="店铺收藏">
			    <i class="iconfont icon-shop" slot="icon"></i>
			  </grid-item>
			  <grid-item label="浏览记录">
			    <i class="iconfont icon-footprint" slot="icon"></i>
			  </grid-item>
			  <grid-item label="地址管理" link="/myAdr">
			    <i class="iconfont icon-location" slot="icon"></i>
			  </grid-item>
			  <grid-item label="资料管理" link="/myInfo">
			    <i class="iconfont icon-profile" slot="icon"></i>
			  </grid-item>
			  <grid-item label="账户安全">
			    <i class="iconfont icon-safe" slot="icon"></i>
			  </grid-item>
			</grid>
		</view-box>
		<xfooter></xfooter>	
		<actionsheet v-model="isShow" :menus="menu" show-cancel @on-click-menu="logOut"></actionsheet>
	</div>
</template>

<script>
  import mtype from '@/store/mutation-types'
	import xheader from '@/components/xheader'
	import xfooter from '@/components/xfooter'
	import {XButton, Actionsheet, Group, Cell, Grid, GridItem, ViewBox} from 'vux'
	
	export default{
		name: 'myInfo',
		components: {
			XButton, Actionsheet, Group, Cell, Grid, GridItem, ViewBox,
			'xheader': xheader,
			'xfooter': xfooter
		},
		data(){
			return {
				leftOpt: {'showBack': false, 'backText':''},
				loginUser: window.localStorage.getItem('user_info'),
				isShow: false,
				menu: {'confirm':'确定'}
			}
		},
		created(){
			this.$store.commit(mtype.SET_NAV_INDEX, '3');
		},
		methods: {
			logOut(key, item){
				if(key == 'confirm'){
					window.localStorage.removeItem('car');
					window.localStorage.removeItem('user_info');
					this.$router.push('/');
				}
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .my-cont {
	.vux-header{
		.setWH(100%, 78px);
		.user-portrait{
			display: inline-block;
			.setWH(50px, 50px);
	    line-height: 50px;
	    text-align: center;
	    border-radius: 50%;
	    background-color: @whiteColor;
	    >.iconfont{
				font-size: 40px;
				color: @darkColor;
			}
		}
		.user-name{
			display: inline-block;
	    margin-left: 5px;
	    line-height: 50px;
	    font-size: 20px;
	    color: @whiteColor;
	    vertical-align: top;
		}
	}
	.my-main {
		.my-order, .my-list{
			border-top: 10px solid @darkWhite;
		}
		.my-order>.weui-cells{
			font-size: 14px;
			.weui-cell__ft{
				font-size: 13px;
			}
			.weui-grids{
				&:after{
					border-left: none;
				}
				.weui-grid{
					padding: 15px 10px 10px 10px;
					&:before{
						border-right: none;
					}
					&:after{
						border-bottom: none;
					}
					.weui-grid__icon{
				    .setWH(30px, 30px);
				    line-height: 30px;
				    text-align: center;
				    >.iconfont{
							font-size: 30px;
							color: @darkColor;
						}
					}
					.weui-grid__label{
						font-size: 12px;
						color: @darkColor;
					}
				}
			}
		}
		.my-list{
			&:after{
				border-left: none;
			}
			.weui-grid{
				&:before{
					border-right: none;
				}
				.weui-grid__icon>.iconfont{
					font-size: 28px;
					color: @darkColor;
				}
				.weui-grid__label{
					font-size: 12px;
					color: @darkColor;
				}
			}
		}
	}
}
</style>