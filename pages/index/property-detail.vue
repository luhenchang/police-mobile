<template>
	<view class="container">
		<view class=" page-margin-bottom">
			<view class="pannel-white mb10">
				<view class="line"> <text class="label ">处置日期：</text><text class="text">{{detail.dealDate}}</text></view>
					<view class="line"> <text class="label">案件编号：</text><text class="text">{{detail.caseSn}}</text></view>
					<view class="line"> <text class="label">案件名称：</text><text class="text">{{detail.caseName}}</text></view>
					<view class="line"> <text class="label">通报时间：</text><text class="text">{{detail.reportTime}}</text></view>
					<view class="line"> <text class="label">通报类型：</text><text class="text">{{detail.isFenju==1?'分局通报':''}} {{detail.isSuo==1?'派出所通报':''}}</text></view>
					
					<!-- <view class="line"> <text class="label">案件性质：</text><text class="text">{{detail.caseNature}}</text></view> -->
					<view class="line"> <text class="label">物品编号：</text><text class="text">{{detail.propertySn}}</text></view>
					<view class="line"> <text class="label">物品名称：</text><text class="text">{{detail.propertyName}}</text></view>
					<view class="line"> <text class="label">物品数量：</text><text class="text">{{detail.number}}</text></view>
					<view class="line"> <text class="label">录入单位：</text><text class="text">{{detail.deptName}}</text></view>
					<!-- <view class="line"> <text class="label">承办人：</text><text class="text">{{detail.hostName}}</text></view> -->
					<view class="line"> <text class="label">存在问题：</text></view>
					<view class="panel-white">
						<text class="text">{{detail.question}}</text>
					</view>
			</view>
			
			<!-- <view class="pannel-white mb10">
					<view class="line"> <text class="label big">处置方式：</text><text class="text">{{detail.dealWay}}</text></view>
					<view class="line"> <text class="label big">处置日期：</text><text class="text">{{detail.dealDate}}</text></view>
					<view class="line"> <text class="label big">物品出库情况：</text><text class="text">{{detail.storeStatus}}</text></view>
					<view class="line"> <text class="label big">未出库原因：</text><text class="text">{{detail.reason}}</text></view>
			</view> -->
			<view class="pannel-white mb10">
					<view class="line"> <text class="label big">办案单位自查情况：</text><text class="text">{{detail.directorReply}}</text></view>
					<view class="line"> <text class="label big">整改情况：</text><text class="text">{{detail.reactResult}}</text></view>
					<!-- <view class="line"> <text class="label big">整改时限：</text><text class="text">{{detail.reactTime}}</text></view> -->
					<view class="line"> <text class="label big">执法监督措施情况：</text><text class="text">{{detail.directorIdentify}}</text></view>
					<view class="line"> <text class="label big">备注：</text><text class="text">{{detail.remark}}</text></view>
			</view>
		</view>

	</view>
</template>

<script>
	 import uniCopy from '@/utils/uni-copy.js'
	export default {
		data() {
			return {
				id:'',
				detail:{},
				meta:{},
				isFavorite:false,
				loading:true,
				style: {
						p: 'line-height:1.8',
						div: 'line-height:1.8'
					}
				}
		},
	
		onLoad(option){
			console.log(option);
			this.id=option.id;
			this.getList();
		},
		onShow(){
			if(!!this.id){
				this.getList();
			}
		},
		methods: {
			getList(){
			   this.Api.getCaseProperty({id:this.id}).then(data=>{
				   this.detail=data;
				   this.loading=false;
			   })
			},
			preImg(img){
				uni.previewImage({
					current:0,
					urls:[img]
				})
			},
			copy(){
				  uniCopy({
					content:this.$helper.pureHtmlTag(this.detail.content.content),
					success:(res)=>{
						uni.showToast({
							title: res,
							icon: 'none'
						})
					},
					error:(e)=>{
						uni.showToast({
							title: e,
							icon: 'none',
							duration:3000,
						})
					}
				})
			},
		
			
		}
	}
</script>

<style lang="scss">
uni-button,button{
		line-height: 1;
		background: none;
		border:none;
		&::after{
			border: none;
		}
	}
.active{
	color: $base-color !important;
}
.sub-wrap{
	padding: 10rpx 0;
	margin-bottom: 10rpx;
	display: flex;
	justify-content: space-between;
}
.icon{
	width: 35rpx;
	height: 35rpx;
	margin-right: 10rpx;
}
.pannel-white{
	padding: 30rpx 12rpx;
}

</style>
