<template>
	<view class="form-container">
		 <form @submit="formSubmit" >
                <view class="uni-form-item uni-column">
                    <label class="title">提现金额</label>
                    <input type="number" :max="wallet.balance" v-model="form.amount" placeholder="请输入提现金额" /> 
                </view>
				 <view class="tip">
				    <text class="title">可提现金额:<text class="price">￥{{wallet.balance}}</text></text>
				</view>
				
				
		</form>
	
		 
		
		<view class="bottom-btn linear-bg" @click="formSubmit">
			提交
		</view>

	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				wallet:{},
				form:{
					amount:0
				},
			}
		},
		onLoad(option) {
			this.getWallet();
		},
		methods: {
			getWallet(){
			   this.Api.getWallet().then(data=>{
				   this.wallet=data || {};
			   })	
			},
			formSubmit() {
				if(!this.form.amount || this.form.amount<=0){
					this.$msg('请输入提现金额，不能小于0');
					return;
				}
				if(this.form.amount>this.wallet.balance){
					this.$msg('提现金额不能大于余额');
					return;
				}
				
				uni.showLoading({
					title:'正在提交，请稍后'
				})
				this.Api.submitWithdraw(this.form).then(data=>{
					this.$msg('提交成功，请等待审核，预计3-5个工作日到账!');
					uni.hideLoading();
					uni.navigateBack()
				})
			}
			
		}
	}
</script>

<style lang="scss">
.form-container{
	background: #fff;
	padding: 30upx;
	.uni-form-item{
		font-size: $font-base;
		margin-bottom: 15upx;
		border-bottom: 1px solid #f5f5f5;
	}
}
.tip{
	margin-left: 20upx;
	font-size: $font-base;
}
</style>
