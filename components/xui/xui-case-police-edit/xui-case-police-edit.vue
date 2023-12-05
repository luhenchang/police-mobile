<template>
     <view > 
		<u-popup v-model="show" mode="bottom"  closeable>
			<view class="title panel-white flex-center">警情修改</view>
			<view class="panel-white">
				<u-form :model="detail" ref="uForm" label-position="left" label-width="200">
					<u-form-item label="派出所处警反馈" ><u-input v-model="detail.dealFeedback" placeholder="请输入派出所处警反馈"/></u-form-item>
					<u-form-item label="执法仪问题" ><u-input v-model="detail.phoneFeedback" placeholder="请输入执法仪问题"/></u-form-item>
					<u-form-item label="案管组意见" ><u-input v-model="detail.manageOpinion" placeholder="请输入案管组意见"/></u-form-item>
					<u-form-item label="打击民警" ><u-input v-model="detail.dajiUserName" placeholder="请输入打击民警"/></u-form-item>
					<u-form-item label="整改情况" ><u-input v-model="detail.react" placeholder="请输入整改情况"/></u-form-item>
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
		
		</u-popup>
     </view>
</template>

<script>


export default {
 
  props:{
    id:{
		type:[Number,String],
		default:''
	}

  },
  data () {
    return {
	  show:false,
	  detail:{},
    }
  },
  created(){
   
  },
  methods:{
	
	getDetail(){
		this.Api.getCasePolice({id:this.id}).then(data=>{
			this.detail=data;
		})
	},
	open(){
		this.show=true;
		this.getDetail();
	},
	submit(){
		this.Api.policeEdit(this.detail).then(data=>{
			this.$toast("操作成功!");
			this.$emit("reload");
			this.show=false;
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
