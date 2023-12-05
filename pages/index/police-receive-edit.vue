<template>
     <view > 
			<view class="panel-white">
				<u-form :model="detail" ref="uForm" label-position="left" label-width="200">
					<u-form-item label="报警电话" ><u-input v-model="detail.callPhone" placeholder="报警电话"/></u-form-item>
					<u-form-item label="反映内容" ><u-input type="textarea"  v-model="detail.content" placeholder="请输入反映内容"/></u-form-item>
					<u-form-item label="接警时间" ><u-input v-model="detail.receiveTime" disabled @click="showTime=true" placeholder="请输入接警时间"/></u-form-item>
					<!-- <u-form-item label="派出所处警反馈" ><u-input type="textarea" v-model="detail.dajiUserName" placeholder="请输入派出所处警反馈"/></u-form-item> -->
					<u-form-item label="派出所处警反馈" ><u-input type="textarea" v-model="detail.dealFeedback" placeholder="请输入派出所处警反馈"/></u-form-item>
				</u-form>
				<u-picker v-model="showTime" mode="time" :params="timeParams" :default-time="detail.receiveTime || ''" @confirm="timeConfirm"></u-picker>
		
				<view class="panel-white" >
					<u-button type="primary" @click="submit">提交</u-button>
				</view>
			
			</view>
		
	
     </view>
</template>

<script>


export default {
 
 
  data () {
    return {
		id:'',
	  detail:{},
	  showTime:false,
	  timeParams: {
			year: true,
			month: true,
			day: true,
			hour: true,
			minute: true,
			second: true
		},
    }
  },
  onLoad(option){
	  this.id=option.id;
    this.getDetail();
  },
  methods:{
	getDetail(){
		this.Api.getCasePolice({id:this.id,type:2}).then(data=>{
			this.detail=data;
		})
	},
	timeConfirm(e){
		console.log(e)
		let timeStr=e.year+'-'+e.month+'-'+e.day+' '+e.hour+':'+e.minute+':'+e.second;
		this.detail.receiveTime=timeStr;
	},
	submit(){
		this.Api.policeEdit({type:0,'casePoliceRecviveBo':this.detail}).then(data=>{
			uni.$emit('updateReceive',{msg:'页面修改'})
			this.$successBack('修改成功!');
		})
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
	}
}

</style>
