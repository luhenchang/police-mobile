<template>
     <view class="list" > 
		<view class="item" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
			<view class="tit">
				{{item.jingSn}}
				<view class="sub-txt" v-if="showType==1">{{policeStatusMap[item.status]}}</view>
			</view>
			<view class="line" > <text class="label mini">报警电话：</text><text class="text">{{item.callPhone}}</text></view>
			<view class="line" v-if="showType==2"> <text class="label mini">通报时间：</text><text class="text">{{item.reportTime}}</text></view>
			<view class="line" v-if="showType==2"> <text class="label mini">问题类型：</text><text class="text">{{item.questionType}}</text></view>
			<view class="content">
				{{item.content}}
			</view>
			<view class="sub-line">
				<view>{{item.deptName}}</view>
				<view>{{item.createTime}}</view>
			</view>
			<view class="action-line" v-if="reportId">
				<u-button type="warning" size="medium" class="mb10"   @click="reportFeedback(item)">处置反馈</u-button>
			</view>
			<view class="action-line" v-else>		
				<u-button type="success" size="medium" class="mb10"   @click="compare(item)" >智能比对</u-button>
				<u-button type="error" size="medium"  class="mb10"  v-if="item.status==0 && role.banan && showType==1 && type==2" @click="receive(item)">接收警情</u-button>
				<u-button type="warning" size="medium" class="mb10"  v-if="item.status==1 && role.banan && showType==1 && type==2" @click="deal(item)">警情处置</u-button>
				<u-button type="success" size="medium" class="mb10"  v-if="item.callPhone && showHistory" @click="history(item)" >历史警情</u-button>
				<u-button type="success" size="medium" class="mb10"  v-if="item.status==2 && role.anguan && showType==2" @click="finish(item)" >处置无异议</u-button>
				<u-button type="warning" size="medium" class="mb10"  v-if="item.status==2 && role.anguan && showType==2" @click="assign(item)">指派打击民警</u-button>
				<u-button type="warning" size="medium" class="mb10"  v-if="item.status==3 && role.daji && item.dajiUserId==userInfo.userId && showType==2" @click="daji(item)">打击反馈</u-button>
				<u-button type="warning" size="medium" class="mb10"  v-if="item.status==4 && role.fenju && showType==2" @click="review(item)">分局复核</u-button>
				<u-button type="primary" plain size="medium"   class="mb5"  @click="edit(item)">修改</u-button>
			</view>
		</view>
		<xui-case-police-jiejing ref="jiejing"  v-if="showJiejing" @reload="reload" />
		<xui-case-police-deal ref="deal" :id="id" v-if="showDeal" @reload="reload"></xui-case-police-deal>
		<xui-case-police-daji ref="daji" :id="id" v-if="showDaji"  @reload="reload"></xui-case-police-daji>
		<xui-case-police-review ref="review" :id="id" v-if="showReview"  @reload="reload"></xui-case-police-review>
     </view>
</template>

<script>

import {policeStatusMap} from '@/utils/constants.js'

export default {
  components: {
  },
  props:{
    showType:{
		type:Number,
		default:1
	},
	type:{
		type:Number,
		default:1
	},
	showHistory:{
		type:Boolean,
		default:true
	},
    list:{
      type:Array,
      required:true
    },
	reportId:{
		type:[Number,String],
		default:''
	},
    

  },
  data () {
    return {
      policeStatusMap:policeStatusMap,
	  showDeal:false,
	  showDaji:false,
	  showReview:false,
	  showJiejing:false,
	  id:''
    }
  },

  created(){
	console.log(this.role)
  },
  methods:{
	toDetail(item){
		if(this.type ==2){
			uni.navigateTo({
				url:'/pages/index/police-detail-receive?id='+item.id
			})
		}else{
			uni.navigateTo({
				url:'/pages/index/police-detail?id='+item.id
			})
		}
		
	},
	compare(item){
		uni.navigateTo({
			url:'/pages/index/police-compare?id='+item.id+'&type='+this.type
		})
	},
	
	edit(item){
		if(this.type ==2){
			uni.navigateTo({
				url:'/pages/index/police-receive-edit?id='+item.id
			})
		}else{
			uni.navigateTo({
				url:'/pages/index/police-edit?id='+item.id
			})
		}
	},
	history(item){
		uni.navigateTo({
			url:'/pages/index/police-history?callPhone='+item.callPhone
		})
	},
	receive(item){
		this.showJiejing=true;
		let self=this;
		setTimeout(function(){
			self.$refs.jiejing.open(item.id);
		},100);
		// this.Api.policeReceive(item).then(data=>{
		// 	this.$toast('警情接收成功');
		// 	this.$emit('reload');
		// })
	},
	reload(){
		this.$emit('reload');
	},
	deal(item){
		this.id=item.id;
		this.showDeal=true;
		let self=this;
		setTimeout(function(){
			self.$refs.deal.open();
		},100);
		
	},
	daji(item){
		this.id=item.id;
		this.showDaji=true;
		let self=this;
		setTimeout(function(){
			self.$refs.daji.open();
		},100);
	},
	review(item){
		this.id=item.id;
		this.showReview=true;
		let self=this;
		setTimeout(function(){
			self.$refs.review.open();
		},100);
	},
	finish(item){
		this.Api.policeFinish(item).then(data=>{
			this.$toast('操作成功');
			this.reload();
		})
	},
	assign(item){
		this.id=item.id;
		uni.navigateTo({
			url:'/pages/index/police-assign?id='+item.id
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
	}
	.sub-line{
		font-size: 28rpx;
		color: #666666;
		padding: 16rpx;
		display: flex;
		justify-content: space-between;
	}
	.action-line{
		border-top:1px solid #F5F5F5;
		padding-top: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
}

</style>
