<template>
	<div class="login-cont">
		<div class="login-top">
			<i class="iconfont icon-close" @click="$router.go(-1);"></i>
			<img src="../../assets/img/login.jpg"/>
		</div>
		<div class="login-mid">
			<div class="log-cont">
				<x-input title="" v-model="userInfo.usernam" placeholder="请输入用户名" @on-change="canSubmit" @on-enter="checkInfo" ref="usernam" required>
					<i class="iconfont icon-people" slot="label"></i>
				</x-input>
			</div>
			<div class="log-cont">
				<x-input title="" type="password" v-model="userInfo.passwd" placeholder="请输入登录密码" @on-change="canSubmit" @on-enter="checkInfo" ref="passwd" required>
					<i class="iconfont icon-unlock" slot="label"></i>
				</x-input>
			</div>
			<x-button text="登录" :disabled="isDisable" :show-loading="showLoading" @click.native="checkInfo"></x-button>
		</div>
	</div>
</template>

<script>
	import mtype from '@/store/mutation-types'
	import {Group, XInput, XButton} from 'vux'
	
	export default {
		name: 'login',
		components: {
			Group, 
			XInput,
			XButton
		},
		data(){
			return {
				userInfo: {'usernam':'', 'passwd':''},
				isDisable: true,
				showLoading: false
			}
		},
		methods: {
			canSubmit(val){
				if(val != '' && val.length != 0){
					this.isDisable = false;
				}else{
					this.isDisable = true;
				}
			},
			checkInfo(){
				if(!this.$refs.usernam.valid || this.userInfo.usernam == ''){
					this.showTextToast('用户名不能为空');
				}else if(!this.$refs.passwd.valid || this.userInfo.passwd == ''){
					this.showTextToast('密码不能为空');
				}else{
					this.isDisable = true;
					window.localStorage.user_info = this.userInfo.usernam;
					setTimeout(()=>{
						this.$router.push(this.$store.state.to_path);
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="less">
@import '../../assets/less/variables.less';

#car .login-cont{
	.login-top{
		position: relative;
		>.iconfont{
			position: absolute;
			top: 10px;
			left: 10px;
			font-size: 26px;
	    color: @blackColor;
		}
		>img{
			width: 100%;
		}
	}
	.login-mid{
		.setWH(270px, 162px);
		margin: 0 auto;
		padding-top: 20px;
		>.log-cont{
			margin-bottom: 10px;
			font-size: 1em;
			border-bottom: 1px solid @darkWhite;
			.weui-cell{
				padding: 10px 5px;
				.iconfont{
					margin-right: 15px;
					font-size: 20px;
					font-weight: 600;
				}
			}
		}
		>.weui-btn{
			margin-top: 30px;
			font-size: 16px;
			color: @whiteColor;
			border-radius: 0px;
			background-color: @blackColor;
			cursor: pointer;
			outline: none;
			&.weui-btn_disabled{
				color: rgba(0, 0, 0, 0.3);
		    background-color: #F7F7F7;
			}
		}
	}
}
</style>