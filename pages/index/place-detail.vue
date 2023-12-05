<template>
	<view class="container">
		<view class=" page-margin-bottom">
			<view class="pannel-white mb10">
				<view class="line"> <text class="label">通报时间：</text><text class="text">{{detail.reportTime}}</text></view>
				<view class="line"> <text class="label">通报类型：</text><text class="text">{{detail.isFenju==1?'分局通报':''}} {{detail.isSuo==1?'派出所通报':''}}</text></view>
				
					<view class="line"> <text class="label">涉案人员：</text><text class="text">{{detail.criminalName}}</text></view>
					<view class="line"> <text class="label">所涉案件：</text><text class="text">{{detail.caseName}}</text></view>
					<view class="line"> <text class="label">案件编号：</text><text class="text">{{detail.caseSn}}</text></view>
					<view class="line"> <text class="label">案件类型：</text><text class="text">{{detail.caseType}}</text></view>
					<view class="line"> <text class="label">证件号：</text><text class="text">{{detail.idCode}}</text></view>
					<view class="line"> <text class="label">状态：</text><text class="text">{{detail.isInout}}</text></view>
					<view class="line"> <text class="label">所属派出所：</text><text class="text">{{detail.deptName}}</text></view>
					<view class="line"> <text class="label">入区时间：</text><text class="text">{{detail.inTime}}</text></view>
					<view class="line"> <text class="label">出区时间：</text><text class="text">{{detail.outTime}}</text></view>
					<view class="line"> <text class="label">问题类型：</text><text class="text">{{detail.questionType}}</text></view>
					
			</view>
			
			<view class="pannel-white mb10">
					<view class="line"> <text class="label big">整改情况：</text><text class="text">{{detail.reactResult}}</text></view>
					<view class="line"> <text class="label big">整改时限：</text><text class="text">{{detail.reactTime}}</text></view>
					<view class="line"> <text class="label big">分局认定情况：</text><text class="text">{{detail.directorIdentify}}</text></view>
					<view class="line"> <text class="label big">分局复核情况：</text><text class="text">{{detail.directorReply}}</text></view>
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
			   this.Api.getCasePlace({id:this.id}).then(data=>{
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
