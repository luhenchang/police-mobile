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
					<u-form-item label="派出所处警反馈" ><u-input v-model="detail.dealFeedback" placeholder="请输入派出所处警反馈"/></u-form-item>
					<u-form-item label="执法仪问题" ><u-checkbox-group @change="checkboxGroupChange1">
									<u-checkbox 
										v-model="item.checked" 
										v-for="(item, index) in list1" :key="index" 
										:name="item.name"
									>{{item.name}}</u-checkbox>
								</u-checkbox-group>
						</u-form-item>
					<u-form-item label="案管组意见" ><u-input v-model="detail.manageOpinion" placeholder="请输入案管组意见"/></u-form-item>
					<!-- <u-form-item label="打击民警" ><u-input v-model="detail.dajiUserName" placeholder="请输入打击民警"/></u-form-item> -->
					<u-form-item label="整改情况" ><u-input v-model="detail.reactResult" placeholder="请输入整改情况"/></u-form-item>
					<u-form-item label="整改时限" ><u-input v-model="detail.reactLimit" type="number" placeholder="请输入整改时限"/>
					<view slot="right">天</view>
					</u-form-item>
						<u-form-item label="分局复核意见" ><u-input v-model="detail.directorOpinion" placeholder="请输入分局复核意见"/></u-form-item>
						<u-form-item label="分局认定整改情况" ><u-input v-model="detail.directorRectify" placeholder="请输入分局认定整改情况"/></u-form-item>
						<u-form-item label="认定理由" ><u-input v-model="detail.identityReason" placeholder="请输入认定理由"/></u-form-item>
						<u-form-item label="备注" ><u-input v-model="detail.remark" placeholder="请输入备注"/></u-form-item>
				</u-form>
		
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
	  list:[
	  		  {
	  			name:'疑似应受未受',
	  			checked:false  
	  		  },
	  		  {
	  			name:'疑似推诿',
	  			checked:false  
	  		  },
	  		  {
	  			name:'警情待办未处理',
	  			checked:false  
	  		  },
	  		{
	  					name:'警情反馈不实',
	  					checked:false  
	  		},
	  		{
	  					name:'非重点警情',
	  					checked:false  
	  		},
	  		{
	  					name:'其他',
	  					checked:false  
	  		},
	  ],
	  list1:[
	  		  {
	  			name:'无现场执法记录',
	  			checked:false  
	  		  },
	  		  {
	  			name:'无电话回访',
	  			checked:false  
	  		  },
	  		  {
	  			name:'记录不完整、不清晰',
	  			checked:false  
	  		  },
	  		{
	  					name:'使用、管理制度不落实',
	  					checked:false  
	  		},
	  		{
	  					name:'设备维护不到位',
	  					checked:false  
	  		},
	  		{
	  					name:'其他',
	  					checked:false  
	  		},
	  ],
    }
  },
  onLoad(option){
	  this.id=option.id;
    this.getDetail();
  },
  methods:{
	getDetail(){
		this.Api.getCasePolice({id:this.id,type:1}).then(data=>{
			this.detail=data;
			let questionTypeArr=this.detail.questionType && this.detail.questionType.split(',');
			if(questionTypeArr && questionTypeArr.length>0){
				this.list.forEach(item=>{
					questionTypeArr.forEach(n=>{
						if(n==item.name){
							item.checked=true;
						}
					})
				})
			}
			let phoneFeedbackArr=this.detail.phoneFeedback && this.detail.phoneFeedback.split(',');
			if(phoneFeedbackArr && phoneFeedbackArr.length>0){
				this.list1.forEach(item=>{
					phoneFeedbackArr.forEach(n=>{
						if(n==item.name){
							item.checked=true;
						}
					})
				})
			}
		})
	},
	checkboxGroupChange(e){
		this.detail.questionType=e.join(',');
	},
	checkboxGroupChange1(e){
		this.detail.phoneFeedback=e.join(',');
	},
	submit(){
		this.Api.policeEdit({type:1,'casePoliceBo':this.detail}).then(data=>{
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
