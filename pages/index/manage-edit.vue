<template>
     <view > 
			<view class="panel-white">
				<u-form :model="detail" ref="uForm" label-position="left" label-width="200">
					<u-form-item label="问题类型" >
						<u-checkbox-group @change="checkboxGroupChange">
									<u-checkbox 
										v-model="item.checked" 
										v-for="(item, index) in list" :key="index" 
										:name="item.name"
									>{{item.name}}</u-checkbox>
								</u-checkbox-group>
					</u-form-item>
					<u-form-item label="受理时间" ><u-input v-model="detail.acceptTime" disabled @click="selectTime(1)" placeholder="请输入受理时间"/></u-form-item>
					<u-form-item label="临期时间" ><u-input v-model="detail.nearTime" disabled @click="selectTime(2)" placeholder="请输入临期时间"/></u-form-item>
					<u-form-item label="超期时间" ><u-input v-model="detail.beyondTime" disabled @click="selectTime(3)" placeholder="请输入超期时间"/></u-form-item>
					<u-form-item label="具体问题" ><u-input type="textarea" v-model="detail.question" placeholder="请输入具体问题"/></u-form-item>
					<u-form-item label="派出所整改情况" ><u-input v-model="detail.reactResult" placeholder="请输入派出所整改情况"/></u-form-item>
					
					<u-form-item label="整改时限" ><u-input v-model="detail.reactTime" type="number" placeholder="请输入整改时限"/>
					<view slot="right">天</view>
					</u-form-item>
						<u-form-item label="分局复核情况" ><u-input v-model="detail.directorReply" placeholder="请输入分局复核情况"/></u-form-item>
						<u-form-item label="分局认定整改情况" ><u-input v-model="detail.directorRectify" placeholder="请输入分局认定整改情况"/></u-form-item>
						<u-form-item label="备注" ><u-input v-model="detail.remark" placeholder="请输入备注"/></u-form-item>
				</u-form>
		<u-picker v-model="showTime" mode="time" :params="timeParams" :default-time="defaultTime || ''" @confirm="timeConfirm"></u-picker>
				
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
	  defaultTime:'',
	  list:[
		  {
			name:'电子卷宗问题',
			checked:false  
		  },
		  {
			name:'人员录入问题',
			checked:false  
		  },
		  {
			name:'行政超期未结',
			checked:false  
		  },
		{
					name:'案件问题',
					checked:false  
		},
		{
					name:'刑事立案即将超期',
					checked:false  
		},
		{
					name:'疑似虚假受案',
					checked:false  
		},
		{
					name:'疑似降格处理',
					checked:false  
		},
		{
					name:'其他',
					checked:false  
		},
	  ],
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
		this.Api.getCaseManage({id:this.id}).then(data=>{
			this.detail=data;
			let questionTypeArr=this.detail.questionType.split(',');
			if(questionTypeArr.length>0){
				this.list.forEach(item=>{
					questionTypeArr.forEach(n=>{
						if(n==item.name){
							item.checked=true;
						}
					})
				})
			}
		})
	},
	checkboxGroupChange(e){
		console.log(e)
		this.detail.questionType=e.join(',');
	},
	selectTime(type){
		this.timeType=type;
		if(this.timeType==1){
		  this.defaultTime=	 this.detail.acceptTime;
		}
		if(this.timeType==2){
			 this.defaultTime=	 this.detail.nearTime;
		}
		if(this.timeType==3){
			 this.defaultTime=	 this.detail.beyondTime;
		}
		console.log(this.defaultTime)
		this.showTime=true;
	},
	timeConfirm(e){
		console.log(e)
		let timeStr=e.year+'-'+e.month+'-'+e.day+' '+e.hour+':'+e.minute+':'+e.second;
		if(this.timeType==1){
			this.detail.acceptTime=timeStr;
		}
		if(this.timeType==2){
			this.detail.nearTime=timeStr;
		}
		if(this.timeType==3){
			this.detail.beyondTime=timeStr;
		}
		
	},
	submit(){
		this.Api.policeEdit({type:2,'caseManageBo':this.detail}).then(data=>{
			// this.$toast("操作成功!");
			// this.$emit("reload");
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
