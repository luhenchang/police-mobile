<template>
     <view > 
			<view class="panel-white">
				<u-form :model="detail" ref="uForm" label-position="left" label-width="200">
					<u-form-item label="案卷出入时间" ><u-input v-model="detail.inOutTime" disabled @click="showTime=true" placeholder="请输入案卷出入时间"/></u-form-item>
					<u-form-item label="问题" ><u-input v-model="detail.question" placeholder="请输入问题"/></u-form-item>
					<u-form-item label="整改情况" ><u-input v-model="detail.reactResult" placeholder="请输入整改情况"/></u-form-item>
					<u-form-item label="整改时限" ><u-input v-model="detail.reactTime" type="number" placeholder="请输入整改时限"/>
					<view slot="right">天</view>
					</u-form-item>
						<u-form-item label="分局复核情况" ><u-input v-model="detail.directorReply" placeholder="请输入分局复核情况"/></u-form-item>
						<u-form-item label="分局认定整改情况" ><u-input v-model="detail.directorRectify" placeholder="请输入分局认定整改情况"/></u-form-item>
						<u-form-item label="备注" ><u-input v-model="detail.remark" placeholder="请输入备注"/></u-form-item>
				</u-form>
		<u-picker v-model="showTime" mode="time" :params="timeParams" :default-time="detail.inOutTime || ''" @confirm="timeConfirm"></u-picker>
				
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
		this.Api.getCaseFile({id:this.id}).then(data=>{
			this.detail=data;
		})
	},
	timeConfirm(e){
		let timeStr=e.year+'-'+e.month+'-'+e.day+' '+e.hour+':'+e.minute+':'+e.second;
		this.detail.inOutTime=timeStr;
	},
	submit(){
		this.Api.policeEdit({type:3,'caseFileBo':this.detail}).then(data=>{
			uni.$emit('updateReport',{msg:'页面修改'})
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
