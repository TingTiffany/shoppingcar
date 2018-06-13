<template>
	<div class="info-cont">
		<xheader htitle="个人信息" :leftOpt="leftOpt"></xheader>
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<group :gutter="0">
				<cell title="头像">
					<i slot="default" class="iconfont icon-my"></i>
				</cell>
				<cell title="昵称" :value="nicknam" link="/updName"></cell>
				<cell title="我的二维码" link="/myQrcode">
					<i slot="default" class="iconfont icon-erweima"></i>
				</cell>
				<cell is-link title="性别" :value="sexy" @click.native="showSex=true"></cell>
				<datetime v-model="birth" title="生日" :min-year="1900" @on-confirm="setBirth"></datetime>
			</group>
		</view-box>
		<actionsheet v-model="showSex" :menus="sexyData" @on-click-menu="setSexy" show-cancel></actionsheet>
	</div>
</template>

<script>
	import {ViewBox, Group, Cell, Actionsheet, Datetime} from 'vux'
	import xheader from '@/components/xheader'
	
	export default {
		name: 'myAdr',
		components: {
			ViewBox, Group, Cell, Actionsheet, Datetime,
			'xheader': xheader
		},
		data(){
			return {
				leftOpt: {'showBack': true, 'backText':''},
				nicknam: window.localStorage.getItem('user_info'),
				sexy: window.localStorage.getItem('sexy') || '',
				birth: window.localStorage.getItem('birth') || '',
				showSex: false,
				sexyData: {'man':'男', 'female':'女'}
			}
		},
		watch: {
			nicknam(nVal, oVal){
				window.localStorage.setItem('user_info', nVal);
			},
			sexy(nVal, oVal){
				window.localStorage.setItem('sexy', nVal);
			},
			birth(nVal, oVal){
				window.localStorage.setItem('birth', nVal);
			}
		},
		methods: {
			setSexy(key, val){
				if(key != 'cancel'){
					this.sexy = val;
				}
			},
			setBirth(val){
				this.birth = val;
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .info-cont{
	background-color: @darkWhite;
	.weui-cells{
		font-size: 16px;
		.weui-cell{
			&:before{
				left: 0px;
			}
			.icon-my{
				font-size: 20px;
		    border: 1px solid @darkColor;
		    border-radius: 50%;
			}
			.icon-erweima{
		    position: absolute;
		    top: -14px;
		    right: 13px;
				font-size: 20px;
			}
		}
	}
}
</style>