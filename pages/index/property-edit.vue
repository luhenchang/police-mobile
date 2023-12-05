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
					<u-form-item label="存在问题" ><u-input v-model="detail.question" placeholder="请输入存在问题"/></u-form-item>
					<u-form-item label="办案单位自查情况" ><u-input v-model="detail.directorReply" placeholder="请输入办案单位自查情况"/></u-form-item>
					<u-form-item label="整改情况" ><u-input v-model="detail.reactResult" placeholder="请输入整改情况"/></u-form-item>
				<!-- 	<u-form-item label="整改时限" ><u-input v-model="detail.reactLimit" type="number" placeholder="请输入整改时限"/>
					<view slot="right">天</view>
					</u-form-item> -->
						<u-form-item label="执法监督措施情况" ><u-input v-model="detail.directorIdentify" placeholder="请输入执法监督措施情况"/></u-form-item>
			<!-- 			<u-form-item label="分局认定整改情况" ><u-input v-model="detail.directorRectify" placeholder="请输入分局认定整改情况"/></u-form-item>
						<u-form-item label="认定理由" ><u-input v-model="detail.identityReason" placeholder="请输入认定理由"/></u-form-item>
						<u-form-item label="备注" ><u-input v-model="detail.remark" placeholder="请输入备注"/></u-form-item>
			 -->	
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
	  			name:'涉案财物管理',
	  			checked:false  
	  		  },
	  		  {
	  			name:'随身财物管理',
	  			checked:false  
	  		  },
	  		  {
	  			name:'随案移送开具、协同',
	  			checked:false  
	  		  },
	  		{
	  					name:'使用、管理制度不落实',
	  					checked:false  
	  		},
	  		{
	  					name:'未成年案件办理',
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
		this.Api.getCaseProperty({id:this.id}).then(data=>{
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
	submit(){
		this.Api.policeEdit({type:4,'casePropertyBo':this.detail}).then(data=>{
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
