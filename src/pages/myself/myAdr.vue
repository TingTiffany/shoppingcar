<template>
	<div class="adr-cont">
		<xheader htitle="地址管理" :leftOpt="leftOpt"></xheader>
		<view-box body-padding-top="46px" body-padding-bottom="0px">
			<x-button class="btn-add" @click.native="$router.push('/addAdr')">添加新地址</x-button>
			<ul class="adr-list">
				<li v-for="(item, idx) in adrData">
					<div class="list-top clear">
						<p class="pull-left">{{item.nam}}</p>
						<p class="pull-right">{{item.tel}}</p>
					</div>
					<p>{{item.adrf}}</p>
					<hr />
					<div class="list-btm clear">
						<p class="pull-left">
							<check-icon :value.sync="item.is" @click.native="setDefault(idx)">{{item.is?'默认地址':'设为默认'}}</check-icon>
						</p>
						<p class="pull-right">
							<router-link :to="{name:'editAdr', params:{id:idx} }">
								<i class="iconfont icon-post"></i>编辑
							</router-link>
							<a @click="deleteAdr(idx)">
								<i class="iconfont icon-delete"></i>删除
							</a>
						</p>
					</div>
				</li>
			</ul>
		</view-box>
	</div>
</template>

<script>
	import {ViewBox, XButton, CheckIcon, Confirm} from 'vux'
	import xheader from '@/components/xheader'
	
	export default {
		name: 'myAdr',
		components: {
			ViewBox, XButton, CheckIcon, Confirm,
			'xheader': xheader
		},
		data(){
			return {
				leftOpt: {'showBack': true, 'backText':''},
				adrData: JSON.parse(window.localStorage.getItem('adr')) || [],
				isConfirm: false
			}
		},
		watch: {
			adrData: {
				handler(nVal, oVal){
					window.localStorage.setItem('adr', JSON.stringify(nVal));
				},
				deep: true
			}
		},
		methods: {
			setDefault(idx){
				this.adrData.forEach(function(obj, i){
					if(i == idx){
						obj.is = true;
					}else{
						obj.is = false;
					}
				});
			},
			deleteAdr(idx){
				let self = this;
				self.$vux.confirm.show({
					content: '确定删除该地址吗？',
	        onConfirm (idx) {
	          self.adrData.splice(idx, 1);
	        }
				});
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .adr-cont {
	.weui-tab__panel{
		background-color: @darkWhite;
		.btn-add{
			font-size: 16px;
			border-radius: 0;
			background-color: @whiteColor;
			&:after{
				border: none;
			}
		}
		.adr-list>li{
			margin-top: 10px;
			padding: 15px 10px 10px 10px;
			background-color: @whiteColor;
			.list-top{
				margin-bottom: 5px;
				font-size: 16px;
				+p{
					color: @darkGrey;
				}
			}
			hr{
				margin: 10px -10px;
				border-color: @lightGrey;
				border-style: solid;
			}
			.list-btm{
				width: 100%;
				font-size: 12px;
				.weui-icon-circle, .weui-icon-success{
					margin-left: -.2em;
					font-size: 20px;
				}
				.vux-check-icon > span{
					line-height: 20px;
				}
				a{
					position: relative;
					display: inline-block;
			    padding-left: 20px;
					color: inherit;
					+a{
						margin-left: 20px;
					}
					>.iconfont{
						position: absolute;
				    top: 0px;
				    left: 0px;
					}
				}
			}
		}
	}
}
</style>