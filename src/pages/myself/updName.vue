<template>
	<div class="info-cont">
		<xheader htitle="昵称" :leftOpt="leftOpt">
			<a slot="rightOpt" @click="saveName">保存</a>
		</xheader>
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<group :gutter="8">
				<x-input type="text" v-model="nicknam"></x-input>
			</group>
		</view-box>
	</div>
</template>

<script>
	import {ViewBox, Group, XInput} from 'vux'
	import xheader from '@/components/xheader'
	
	export default {
		name: 'myQrcode',
		components: {
			ViewBox, Group, XInput,
			'xheader': xheader
		},
		data() {
			return {
				leftOpt: {'showBack': true, 'backText':''},
				nicknam: window.localStorage.getItem('user_info')
			}
		},
		methods: {
			saveName(){
				if(this.nicknam == ''){
					this.showTextToast('昵称不能为空');
				}else{
					window.localStorage.setItem('user_info', this.nicknam);
					this.$router.go(-1);
				}
			}
		}
	}
</script>
