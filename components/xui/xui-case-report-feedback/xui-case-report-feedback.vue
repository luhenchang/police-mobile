<template>
     <view > 
		<u-popup v-model="show" mode="bottom"  closeable>
			<view class="title panel-white flex-center">通报处置反馈</view>
			<view class="panel-white">
				<u-form :model="form" ref="uForm" label-position="top">
						<u-form-item label="整改情况" required><u-input v-model="form.reactResult" placeholder="请输入整改情况"/></u-form-item>
						<u-form-item label="整改时限" ><u-input v-model="form.reactTime" type="number" placeholder="请输入整改时限"/>
						<view slot="right">天</view>
						</u-form-item>
						<u-form-item label="备注" ><u-input v-model="form.remark"  placeholder="请输入备注"/>
						</u-form-item>
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
    
  },
  data () {
    return {
	  show:false,
	  detail:{},
	  id:'',
	  form:{
		  reactResult:'',
		  reactTime:'',
		  remark:''
	  }
    }
  },
  created(){
   
  },
  methods:{
	
	open(id){
		this.id=id;
		this.form={
			  reactResult:'',
			  reactTime:'',
			  remark:''
		  }
		this.show=true;
	},
	submit(){
		if(!this.form.reactResult){
			this.$toast("请输入整改情况");
			return ;
		}
		
		this.form.id=this.id;
		this.form.reactTime=this.form.reactTime+'天';
		this.Api.reportFeedback(this.form).then(data=>{
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
