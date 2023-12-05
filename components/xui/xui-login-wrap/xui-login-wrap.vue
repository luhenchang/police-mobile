<template>
	<view >
		<view v-if="!hasLogin" class="container">
			<u-empty text="您还未登录,请先登录" mode="permission">
				
				<!-- #ifdef MP-WEIXIN -->
				<view slot="bottom" class="flex-center col" >
					 	<open-data type="userAvatarUrl" class="circle"></open-data>
					 	<open-data type="userNickName"></open-data>
						<u-button shape="circle" class="margin-tb" size="medium"  type="primary" @click="wxmaUserLogin"> 授权登录</u-button>
						<u-button shape="circle" class="margin-tb" size="medium" type="primary" plain @click="toHome"> 取消登录</u-button>
				</view>
				<!-- #endif -->
				
				<!-- #ifndef MP-WEIXIN  -->
				<u-button shape="circle"  slot="bottom"   type="primary" @click="navTo('/pages/auth/login/login')"> 去登录</u-button>
				<!-- #endif -->
				
			</u-empty>
		</view> 
		<view v-else>
			<slot></slot>
		</view>
	</view>
</template> 

<script>
	
	export default {
		
		data() {
			return {
			
			};
		},
		onLoad(options){
			// #ifdef MP-WEIXIN
			let self=this;
			   wx.getSetting({
			      success (res){
			        if (res.authSetting['scope.userInfo']) {
			          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
			        }else{
						wx.authorize({scope: "scope.userInfo"})
					}
			      }
			    })
			// #endif
		},
		onShow() {
			this.init()
		},
	
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.circle{
		width: 120rpx;
		height: 120rpx;
		display: inline-block;
		image{
				border-radius: 50%;
		}
	}
	.linear-bg{
		color: #fff;
	}
</style>
