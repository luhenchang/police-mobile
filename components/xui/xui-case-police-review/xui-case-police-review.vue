<template>
     <view > 
		<u-popup v-model="show" mode="bottom"  closeable>
			<view class="title panel-white flex-center">分局复核</view>
			<view class="panel-white">
				<u-form :model="detail" ref="uForm" label-position="top">
						<u-form-item label="分局复核意见" required><u-input v-model="detail.directorOpinion" placeholder="请输入分局复核意见"/></u-form-item>
						<u-form-item label="分局认定整改情况" required><u-input v-model="detail.directorRectify" placeholder="请输入分局认定整改情况"/></u-form-item>
						<u-form-item label="认定理由" required><u-input v-model="detail.identityReason" placeholder="请输入认定理由"/></u-form-item>
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
		if(!this.detail.directorOpinion){
			this.$toast("请输入分局复核意见");
			return ;
		}
		this.Api.policeReview(this.detail).then(data=>{
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
