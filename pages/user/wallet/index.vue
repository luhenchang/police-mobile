<template>  
    <view class="container">  
		<view >
			<view class="tj-sction linear-bg">
				<view class="tj-item">
					<text class="num">{{wallet.balance || 0.00}}</text>
					<text>可用余额</text>
				</view>
				<view class="tj-item">
					<text class="num">{{wallet.withdrawing || 0.00}}</text>
					<text>提现中</text>
				</view>
				<view class="tj-item">
					<text class="num">{{wallet.total_income || 0.00}}</text>
					<text>总收入</text>
				</view>
			</view>
			<!-- <view class="tj-sction linear-bg">
				<view class="tj-item">
					<text class="num">￥{{wallet.withdrawing || 0}}</text>
					<text>提现中</text>
				</view>
				<view class="tj-item">
					<text class="num">￥{{wallet.total_income || 0}}</text>
					<text>总收入</text>
				</view>
			</view> -->
			
			<!-- 浏览历史 -->
			<u-cell-group >
				<u-cell-item title="提现说明" @click="navTo('/pages/user/single-page?name=withdrawdesc')" :title-style="{'font-size':'30rpx','color':'#333','font-weight':'bold'}" ></u-cell-item>
			</u-cell-group>
		
			<view class="history-section ">
				<view class="sec-header b-b">
					<text class="yticon icon-lishijilu"></text>
					<text>收入明细</text>
				</view>
				<u-cell-group title="收入明细">
						<u-cell-item  v-for="(item,index) in list" :key="index" :icon="item.type==1?'plus':'minus'" 
						 :icon-style="{'color':item.type==1?'#5fcda2':'#e07472','align-items':'flex-start','height':'76rpx'}"  :title="item.amount" :label="item.remark" :value="item.createTime" :arrow="false" />
				</u-cell-group>
				
			</view>
		</view>
			<view class="bottom-btn linear-bg" @click="toWithdraw" v-if="wallet.balance>0">
			申请提现
			</view>
		
    </view>  
</template>  
<script>  
    import {  
        mapState,mapMutations 
    } from 'vuex';  
	
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		
		data(){
			return {
				wallet:{},
				list:[]
			}
		},
		onShow(){
			this.init();
		},
		
		onLoad(){
			
		},
		
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
	
        methods: {
			checkLogin(){
				if(!this.hasLogin){
					
				}else{
					this.getWallet();
					this.getWalletRec();
				}
			},
			init(){
				this.checkLogin();
			},
			getWallet(){
			   this.Api.getWallet().then(data=>{
				   this.wallet=data || {};
			   })	
			},
			getWalletRec(){
			  this.Api.getWalletRec().then(data=>{
				  this.list=data;
			  })	
			},
			toWithdraw(){
				if(!this.userInfo.bank || !this.userInfo.bank_account){
					this.$msg("请先完善财务信息");
					let self=this;
					setTimeout(function(){
						self.navTo('/pages/user/userInfo')
					},1500);
				}else{
					this.navTo('/pages/user/withdraw')
				}
			}
			
        }  
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  
	}

	.user-section{
		height: 520rpx;
		padding: 100rpx 30rpx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(10px);
			opacity: .7;
		}
	}
	.panel-white{
		background: #fff;
	}
	.user-info-box{
		height: 180rpx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130rpx;
			height: 130rpx;
			border:5rpx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg;
			color: $font-color-base;
			margin-left: 20rpx;
		}
		.addr{
			font-size: $font-base;
			color: $font-color-base;
			margin-left: 20rpx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240rpx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20rpx 24rpx;
		.card-bg{
			position:absolute;
			top: 20rpx;
			right: 0;
			width: 380rpx;
			height: 260rpx;
		}
		.b-btn{
			position: absolute;
			right: 20rpx;
			top: 16rpx;
			width: 232rpx;
			height: 40rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 22rpx;
			color: #36343c;
			border-radius: 10px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2rpx;
			color: #f7d680;
			margin-bottom: 28rpx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16rpx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10rpx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150rpx;
		padding: 0 20rpx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20rpx;
		.arc{
			position:absolute;
			left: 0;
			top: -34rpx;
			width: 100%;
			height: 36rpx;
		}
	}
	.tj-sction{
		@extend %section;
		padding: 140rpx 0;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			font-size: $font-sm;
			color: #f5f5f5;
			width: 50%;
			margin-left: -2px;
		}
		.num{
			font-size: $font-lg+8rpx;
			color: #fff;
			font-weight: bold;
			margin-bottom: 8rpx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28rpx 0;
		margin-top: 20rpx;
		.order-item{
			@extend %flex-center;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48rpx;
			margin-bottom: 18rpx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44rpx;
		}
	}
	.history-section{
		padding: 30rpx 0 0;
		margin-top: 20rpx;
		background: #fff;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40rpx;
			margin-left: 30rpx;
			.yticon{
				font-size: 44rpx;
				color: #5eba8f;
				margin-right: 16rpx;
				line-height: 40rpx;
			}
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.h-list{
			display: flex;
			white-space: nowrap;
			image{
				display:inline-block;
				width: 160rpx;
				height: 160rpx;
				margin-right: 20rpx;
				border-radius: 10rpx;
			}
			.more{
				display:flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				flex-shrink: 0;
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				background: #f3f3f3;
				font-size: $font-base;
				color: $font-color-light;
				text:first-child{
					margin-bottom: 4rpx;
				}
			}
		}
	}
	
</style>