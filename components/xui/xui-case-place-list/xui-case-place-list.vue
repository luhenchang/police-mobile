<template>
     <view class="list" > 
		<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
			<view class="tit">
				{{item.criminalName}}
				<view class="sub-txt">{{item.isInout}}</view>
			</view>
			<view class="content">
				<view class="line"> <text class="label">所涉案件：</text><text class="text">{{item.caseName}}</text></view>
				<view class="line"> <text class="label">案件编号：</text><text class="text">{{item.caseSn}}</text></view>
				<view class="line "> <text class="label ">证件号：</text><text class="text">{{item.idCode}}</text></view>
				<view class="line"> <text class="label">案件性质：</text><text class="text">{{item.caseType}}</text></view>
				<view class="line"> <text class="label">入区时间：</text><text class="text">{{item.inTime}}</text></view>
				<view class="line"> <text class="label">出区时间：</text><text class="text">{{item.outTime}}</text></view>
			</view>
			<view class="sub-line">
				<view>{{item.deptName}}</view>
				<view>{{item.createTime}}</view>
			</view>
			<view class="action-line" >
				<u-button type="warning" v-if="!!reportId" size="medium" class="mb10"   @click="reportFeedback(item)">处置反馈</u-button>
				<u-button type="primary" plain size="medium"   class="mb5"  @click="edit(item)">修改</u-button>
			</view>
		</view>

     </view>
</template>

<script>

import {mapState} from 'vuex'

export default {
  components: {
  },
  props:{
    
    list:{
      type:Array,
      required:true
    },
	reportId:{
		type:[Number,String],
		default:undefined
	},
    

  },
  data () {
    return {
      
    }
  },

  created(){
     
  },
  methods:{
	 toDetail(item){
	 		 uni.navigateTo({
	 		 	url:'/pages/index/place-detail?id='+item.id
	 		 })
	 },
	 edit(item){
	 		 uni.navigateTo({
	 			url:'/pages/index/place-edit?id='+item.id
	 		 })
	 },
	reportFeedback(item){
			 this.$emit("reportFeedback",this.reportId);
	}
   

  }
}
</script>

<style lang="less" scoped>
.item{
	margin:16rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
	padding: 16rpx;
	.tit{
		margin-bottom: 16rpx;
		font-size: 32rpx;
		color: #000;
		display: flex;
		justify-content: space-between;
	}
	.content{
		font-size: 30rpx;
		padding-bottom: 16rpx;
	}
	.sub-line{
		font-size: 28rpx;
		color: #666666;
		padding: 16rpx;
		
		border-top:1px solid #F5F5F5;
		display: flex;
		justify-content: space-between;
	}
	.action-line{
		border-top:1px solid #F5F5F5;
		padding-top: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

</style>
