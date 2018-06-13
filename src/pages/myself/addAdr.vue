<template>
	<div class="adr-cont">
		<xheader htitle="新增收货地址" :leftOpt="leftOpt"></xheader>
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<group :gutter="10" label-width="62px" label-align="left" label-margin-right="10px">
				<x-input title="收货人" type="text" v-model="adrObj.nam"></x-input>
				<x-input title="联系电话" type="tel" v-model="adrObj.tel"></x-input>
				<x-address title="所在地区" value-text-align="left" :list="adrList" placeholder="请选择" v-model="adrObj.adr"></x-address>
				<x-textarea title="详细地址" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等" v-model="adrObj.adrs"></x-textarea>
			</group>
			<group :gutter="10" label-width="92px" label-align="left">
				<x-switch title="设为默认地址" v-model="adrObj.is"></x-switch>
			</group>
			<div class="btn-save"><x-button @click.native="saveAdr">保存</x-button></div>
		</view-box>
	</div>
</template>

<script>
	import {ViewBox, XButton, Group, XInput, XAddress, ChinaAddressV4Data, Value2nameFilter, XTextarea, XSwitch} from 'vux'
	import xheader from '@/components/xheader'
	
	export default {
		name: 'myAdr',
		components: {
			ViewBox, XButton, Group, XInput, XAddress, XTextarea, XSwitch,
			'xheader': xheader
		},
		data(){
			return {
				leftOpt: {'showBack': true, 'backText':''},
				adrList: ChinaAddressV4Data,
				adrObj: {
					nam: '',
					tel: '',
					adr: [],
					adrs: '',
					is:false
				},
				adrArr: JSON.parse(window.localStorage.getItem('adr')) || []
			}
		},
		methods: {
			getAdrName(val){
				return Value2nameFilter(val, ChinaAddressV4Data);
			},
			saveAdr(){
				if(this.adrObj.nam == ''){
					this.showTextToast('收货人不能为空');
				}else if(this.adrObj.tel == ''){
					this.showTextToast('号码不能为空');
				}else if(this.adrObj.tel.match(new RegExp(/^1[0-9]{10}$/)) == null){
					this.showTextToast('请您填写正确11位手机号码');
				}else if(this.adrObj.adr.length == 0 || this.adrObj.adrs == ''){
					this.showTextToast('地址不能为空');
				}else{
					let adrData = {};
					adrData['nam'] = this.adrObj.nam,
					adrData['tel'] = this.adrObj.tel,
					adrData['adr'] = this.adrObj.adr,
					adrData['adrs'] = this.adrObj.adrs,
					adrData['adrf'] = this.getAdrName(this.adrObj.adr).replace(/ /g, '') + this.adrObj.adrs,
					adrData['is'] = this.adrObj.is;
					this.adrArr.push(adrData);
					window.localStorage.setItem('adr', JSON.stringify(this.adrArr));
					this.$router.go(-1);
				}
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .adr-cont{
	.weui-cells{
		font-size: 15px;
		.weui-cell:before, .vux-cell-box:not(:first-child):before{
			left: 0px;
		}
		.weui-switch{
			height: 30px;
			&:before, &:after{
				height: 28px;
			}
		}
	}
	.btn-save{
		padding: 30px 12px 0 12px;
		>.weui-btn{
			font-size: 16px;
			color: @whiteColor;
			border-radius: 0;
			background-color: @darkColor;
		}
	}
}	
</style>