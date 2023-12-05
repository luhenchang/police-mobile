<template>
    
	<view v-if="show" class="mask" @click="toggleMask" @touchmove.stop.prevent="stopPrevent"
		:style="{backgroundColor: backgroundColor}"
	>
	
		
			<view 
			class="mask-tips"
			@click="toggleMask"
			@click.stop.prevent="stopPrevent"
			:style="[{
				height: '100%', 
				transform: transform
			}]"
			>
			<view class="qr-wrapper ">
				  <tki-qrcode
				ref="qrcode"
				:val="shareUrl"
				:size="400"
				unit="rpx"
				:loadMake="true"
				@result="qrR" />
				<view class="tip">
			【{{userInfo.nick}}】的二维码，扫码加入学霸作文
			</view>
			</view>
			
			
			<view class="bottom b-t" @click="toggleMask">关闭</view>
			</view>
		
	</view>
	
	
</template>

<script>
	import tkiQrcode from "./tki-qrcode/tki-qrcode.vue"
	import {  
        mapState,mapMutations 
    } from 'vuex'; 
	import config from "@/config/index"
	export default {
		data() {
			return {
				transform: 'translateY(50vh)',
				timer: 0,
				backgroundColor: 'rgba(0,0,0,0)',
				show: false,
				config: {},
				shareUrl:'',
				icon:''
			};
		},
		components:{
		 tkiQrcode
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		props:{
			contentHeight:{
				type: Number,
				default: 0
			},
			//是否是tabbar页面
			hasTabbar:{
				type: Boolean,
				default: false
			},
			shareList:{
				type: Array,
				default: function(){
					return [];
				}
			}
		},
		created() {
			const height = uni.rpx2px(this.contentHeight) + 'px';
			this.config = {
				height: height,
				transform: `translateY(${height})`,
				backgroundColor: 'rgba(0,0,0,.4)',
			}
			this.transform = this.config.transform;
			// this.icon=this.userInfo.headimgurl;
			// this.$refs.qrcode._makeCode();
			this.shareUrl=config.mHost+'?#/?inviteCode='+this.userInfo.invite_code;
		},
		methods:{
			toggleMask(){
				//防止高频点击
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)
				
				if(this.show){
					this.transform = this.config.transform;
					this.backgroundColor = 'rgba(0,0,0,0)';
					setTimeout(()=>{
						this.show = false;
						this.hasTabbar && uni.showTabBar();
					}, 200)
					return;
				}
				
				this.show = true;
				//等待mask重绘完成执行
				if(this.hasTabbar){
					// #ifndef MP
					uni.hideTabBar({
						success: () => {
							setTimeout(()=>{
								this.backgroundColor = this.config.backgroundColor;
								this.transform = 'translateY(0px)';
							}, 10)
						}
					});
						// #endif
						// #ifdef MP
							setTimeout(()=>{
								this.backgroundColor = this.config.backgroundColor;
								this.transform = 'translateY(0px)';
							}, 10)
						
					// #endif
				}else{
					setTimeout(()=>{
						this.backgroundColor = this.config.backgroundColor;
						this.transform = 'translateY(0px)';
					}, 10)
				}
			},
			//防止冒泡和滚动穿透
			stopPrevent(){},
			//分享操作
			shareToFriend(type){
				this.$api.msg(`分享给${type}`);
				this.toggleMask();
			},
			qrR(e){
				console.log(e)
			}
		}
	}
</script>

<style lang='scss'>
	.qrimg {
  display: flex;
  justify-content: center;
}
	.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		.bottom{
			position:absolute;
			left: 0;
			bottom: 0;
			display:flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90rpx;
			background: #fff;
			z-index: 9;
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
		}
	}
	.qr-wrapper{
		margin: 40rpx;
		margin-top:150rpx;
		background: #fff;
		border-radius: 10rpx;
		padding: 60rpx 20rpx;
		text-align: center;
		.tip{
			margin-top:50rpx;
			color:#666;
			font-size: $font-base;
		}
	}
	
	.mask-tips{
		width: 100%;
		height: 100%;
		transition: .3s;
		background: transparent;
		
		.img-wrapper{
			width: 100%;
			height: 400rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-end;
		}
		image{
			width: 100%;
			height: 500rpx;
		}
		.tips{
		    width: 100%;
			flex-direction: row;
			display: flex;
			margin:40rpx;
			color: #fff;
			font-size: $font-lg;
			justify-content: center;
		}
		
	}
	
	.mask-content{
		width: 100%;
		height: 580rpx;
		transition: .3s;
		background: #fff;
		&.has-bottom{
			padding-bottom: 90rpx;
		}
		.view-content{
			height: 100%;
		}
	}
	.share-header{
		height: 110rpx;
		font-size: $font-base+2rpx;
		color: font-color-dark;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10rpx;
		&:before, &:after{
			content: '';
			width: 240rpx;
			heighg: 0;
			border-top: 1px solid $border-color-base;
			transform: scaleY(.5);
			margin-right: 30rpx;
		}
		 &:after{
			 margin-left: 30rpx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;
		flex-wrap: wrap;
	}
	.share-item{
		min-width: 33.33%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		image{
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 16rpx;
		}
		text{
			font-size: $font-base;
			color: $font-color-base;
		}
	}
</style>
