<template>
	<!-- 会员卡 -->
	<view class="card-wrap">
		<navigator url="/pages/user/member">
		<view class="box over-hide">
			<view class="card-box-header">
				<image class="bg" :src="statics.vipBg1"></image>
				<view class="main pd16_15">
					<view class="flex space">
						<view>
							<view class="ft18 ftw600 cl-w">{{cardObj.memberName}}</view>
							<view class="mt8  alcenter">
								<text class="tag-card">{{cardObj.memberName}}</text>
								<text class="ft14 cl-w ml4">{{cardObj.brief}}</text>
							</view>
						</view>
						<text class="iconfont iconicon_arrow_circle ft22 cl-w8" v-if="showType=='buy'"></text>
					</view>
					<view class="mt16  flex alcenter space">
						<view class="flex alcenter">
							<view class="cl-yellow">
								<text class="ft12">¥</text>
								<text class="ml4 ft24 ftw600">{{cardObj.memberPrice}}</text>
							</view>
							<view class="tag-save ml10">
								省{{cardObj.cutAmount}}元
							</view>
						</view>
						<text class="cl-yellow ft12">有效期：{{cardObj.period}} {{cardObj.periodName}}</text>
					</view>
				</view>
			</view>
			<view class="pd16_15 flex alcenter space">
				<view class="ft12 cl-notice">{{cardObj.countSale || 0}}人已购</view>
				<button class="btn-small" v-if="showType=='buy'" :style="getBtnStyle">立即开通</button>
				<view v-if="showType=='detail'">
					<view class="flex alcenter" v-if="card.can_share==1" :style="{color:tempColor}">
						<text class="iconfont iconicon_yes"></text>
						<text class="ft12 ml5">可送好友</text>
					</view>
					
					<view class="flex alcenter" v-if="card.can_share==0"  :style="{color:'#C5CADB'}">
						<text class="iconfont iconicon_no"></text> 
						<text class="ft12 ml5">不可赠送</text>
					</view>
				</view>
				<view v-if="showType=='log'">
					<navigator url="/pages/client/card/mine/log">
					<view class="pd16_15 flex alcenter space">
						<view class="flex alcenter" >
							<text class="iconfont iconicon_record ft20" :style="{color:tempColor}"></text>
							<text class="ft16 ftw600 cl-main ml10">消费记录</text>
						</view>
						<text class="iconfont iconicon_arrow_small cl-notice ft14"></text>
					</view>
					</navigator>
				</view>
			
			</view>
		</view>
		</navigator>
			
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	import {periodTypeMap} from '@/utils/constants.js'
	export default {
		props:{
			card:{
				type:Object,
				default:()=>{
					return {};
				}
				
			},
			showType:{
				type:String,
				default:'buy'
			}
		},
		data() {
			return {
				cardObj:{}
			};
		},
		created() {
			this.getMemberConfig();
		},
		methods:{
			getMemberConfig(){
				this.Api.getMemberConfig().then(data=>{
					if(data.length>0){
						this.cardObj=data[0];
						this.cardObj.periodName=periodTypeMap[this.cardObj.periodType];
						this.cardObj.cutAmount=(parseFloat(this.cardObj.marketPrice)-parseFloat(this.cardObj.memberPrice)).toFixed(2);
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.card-wrap{
		padding: 20rpx;
	}
	.card-box-header{
		height: 300rpx;
		width: 100%;
		position: relative;
	}
	.card-box-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 300rpx;
	}
	.card-box-header .bg{
		width: 100%;
		height: 300rpx;
	}
	.tag-card{
		width: auto;
		padding: 0 6rpx;
		background: linear-gradient(139deg, #FFE5AD 0%, #FFBC5C 100%);
		border-radius: 4rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 32rpx;
		color: #A86B1B;
	}
	.tag-save{
		width: auto;
		padding: 0 10rpx;
		height: 40rpx;
		background: linear-gradient(139deg, #FFE5AD 0%, #FFBC5C 100%);
		border-radius: 20rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		color:#F51A1A;
		font-weight: 600;
	}
</style>
