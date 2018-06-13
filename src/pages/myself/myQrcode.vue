<template>
	<div class="info-cont">
		<xheader htitle="我的二维码名片" :leftOpt="leftOpt"></xheader>
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<div class="qrcode text-center">
				<p>{{nicknam}}</p>
			<qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
			</div>
		</view-box>
	</div>
</template>

<script>
	import {ViewBox, Qrcode} from 'vux'
	import xheader from '@/components/xheader'
	
	export default {
		name: 'myQrcode',
		components: {
			ViewBox, Qrcode,
			'xheader': xheader
		},
		data(){
			return {
				leftOpt: {'showBack': true, 'backText':''},
				nicknam: window.localStorage.getItem('user_info')
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .info-cont .qrcode{
	position: relative;
	top: 50px;
	>p{
		margin-bottom: 10px;
		font-size: 18px;
	}
}
</style>