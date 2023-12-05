<template>
	<view class="container">
		<view class="title">问题描述</view>
		<view class="tui-cells">
			<textarea class="tui-textarea" placeholder="请输入问题描述" maxlength="500" placeholder-class="phcolor"
			 v-model="desc" />
			<view class="textarea-counter">{{descNum}}/500</view>
	    </view> 
	    <view class="title top64">联系邮箱</view>
	    <input class="tui-input"  placeholder-class="phcolor" placeholder="请输入邮箱" v-model="email" maxlength="20"></input>
	     <view class="tui-ptop">
			 <u-button type="primary" shadow  shape="circle" @click="submit">提交反馈</u-button>
	    </view>
	</view>

</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		computed:{
			descNum:function(){
				return this.desc.length
			}
		},
		onLoad(options) {
			this.btnType=options.page=='mall'?'danger':'primary'
			this.email=this.userInfo.email;
		},
		data() {
			return {
				desc:"",
				email:"",
				btnType:"primary"
			}
		},
		methods: {
			submit(){
				let rules = [{
					name: "content",
					rule: ["required", "minLength:5", "maxLength:500"],
					msg: ["请输入问题描述", "问题描述必须5个或以上字符", "问题描述不能超过500个字符"]
				}, {
					name: "email",
					rule: ["required", "isEmail"],
					msg: ["请输入邮箱", "请输入正确的邮箱"]
				}];
				let formData = {
					content:this.desc,
					email:this.email
				}
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					this.Api.saveAdvice(formData).then(data=>{
						this.$successBack();
					})
				} else {
					this.$toast(checkRes)
				}
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
