<template>
	<view class="container">
		<view class="sub-txt">您正在注销您的账户，账户注销后不可找回，请谨慎操作。</view>
	    <view class="title top64">账户密码</view>
	    <input class="tui-input"  placeholder-class="phcolor" placeholder="请输入密码" v-model="pwd" maxlength="20" type="password"></input>
	     <view class="tui-ptop">
			 <tui-button type="danger" shadow height="88rpx" shape="circle" @click="submit">立即注销</tui-button>
	    </view>
	</view>

</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	import {
		mapState,mapMutations
	} from 'vuex';
	
	export default {
		
		onLoad(options) {
			this.btnType=options.page=='mall'?'danger':'primary'
		},
		data() {
			return {
				pwd:"",
				btnType:"danger"
			}
		},
		methods: {
			...mapMutations(['logout']),
			submit(){
				if(!this.pwd){
					this.$alert('请输入账户密码');
					return;
				}
				let self=this;
				uni.showModal({
					title:'账户注销',
					content:'账户注销后，您的个人资料将被删除，您确定要注销账户吗？',
					cancelText:'取消',
					confirmText:'确定',
					success(res) {
						console.log(res);
						if(res.confirm){
							self.Api.delUser({pwd:self.pwd}).then(data=>{
								self.logout();
								uni.switchTab({
									url:'/pages/index/index'
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
page {
  background: #fff;
}

.container {
  background-color: #fff;
  margin-top: 22rpx;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: 162rpx
}

.title {
  font-size: 30rpx;
  color: #666;
  padding-bottom: 32rpx;
}

.tui-cells {
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  height: 280rpx;
  box-sizing: border-box;
  padding: 20rpx 20rpx 0 20rpx;
}

.tui-textarea {
  height: 210rpx;
  width: 100%;
  color: #666;
  font-size: 28rpx;
}

.pholder {
  color: #ccc;
}

.textarea-counter {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  height: 40rpx;
  line-height: 40rpx;
  padding-top: 4rpx;
}

.top64 {
  margin-top: 64rpx;
}

.tui-input {
  font-size: 30rpx;
  height: 88rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  padding: 0 25rpx;
  box-sizing: border-box;
}
.tui-ptop{
	padding-top: 80rpx;
}

</style>
