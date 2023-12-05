<template>
	<!-- 会员卡 -->
	<view class="card-wrap">
		<navigator :url="'/pages/card/detail?id='+cardObj.id">
		<view class="box over-hide">
			<view class="card-box-header">
				<image class="bg" v-if="card.type==2" :src="statics.cardBg[0]"></image>
				<image class="bg" v-if="cardObj.type==1" :src="statics.cardBg[1]"></image>
				<view class="main pd16_15">
					<view class="flex space">
						<view>
							<view class="ft16 ftw600 cl-w">{{cardObj.name}}</view>
							<view class="mt8 flex alcenter">
								<view class="tag-card">{{cardObj.type_name}}</view>
								<text class="ft12 cl-w ml4">{{cardObj.remark}}</text>
							</view>
						</view>
						<text class="iconfont iconicon_arrow_circle ft22 cl-w8" v-if="showType=='buy'"></text>
					</view>
					<view class="mt16  flex alcenter space">
						<view class="flex alcenter">
							<view class="cl-yellow">
								<text class="ft12">¥</text>
								<text class="ml4 ft24 ftw600">{{cardObj.price}}</text>
							</view>
							<view class="tag-save ml10">
								省{{cardObj.cut_amount}}元
							</view>
						</view>
						<text class="cl-yellow ft12">有效期：{{cardObj.period_name}}</text>
					</view>
				</view>
			</view>
			<view class="pd16_15 flex alcenter space">
				<view class="ft12 cl-notice">{{cardObj.count_sale}}人已购</view>
				<button class="btn-small" v-if="showType=='buy'" :style="getBtnStyle">立即购买</button>
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
	import {cardTypeMap,periodTypeMap} from '@/utils/constants.js'
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
			this.genCardObj();
		},
		watch:{
			card(nval){
				this.genCardObj();
			}
		},
		methods:{
			genCardObj(){
				let card=JSON.parse(JSON.stringify(this.card));
				card.type_name=cardTypeMap[card.type];
				card.period_name=card.period+''+periodTypeMap[card.period_type];
				if(card.period_type==4){
					card.period_name='长期';
				}
				this.cardObj=card;
			}
		}
	}
</script>

<style lang="scss">
	.card-wrap{
		padding: 20rpx;
	}
	.card-box-header{
		height: 232rpx;
		width: 100%;
		position: relative;
	}
	.card-box-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 232rpx;
	}
	.card-box-header .bg{
		width: 100%;
		height: 232rpx;
	}
	.tag-card{
		width: auto;
		padding: 0 6rpx;
		height: 32rpx;
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
