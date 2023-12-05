<template>
     <view > 
		<u-popup v-model="show" mode="bottom" height="40vh" closeable>
			<view class="title panel-white flex-center">警情处置</view>
			<view class="panel-white">
				<view class="sub-txt mb10">以下根据实际情况选择处置结果</view>
				<u-radio-group v-model="res" wrap :active-color="tempColor">
							<u-radio 
								v-for="(item, index) in list" :key="index" 
								class="mb10"
								:name="item.name"
							>
								{{item.name}}
							</u-radio>
				</u-radio-group>
				<u-input v-model="remark" border  placeholder="备注"></u-input>
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
	  res:'',
	  remark:'',
	  show:false,
	  detail:{},
	  list:[{
			name:'回所'
		},{
		  name:'现场调解'
		},{
			name:'非现场'
		},{
			name:'未回所'
		}]
    }
  },
  created(){
   
  },
  methods:{
	
	getDetail(){
		this.Api.getCasePolice({id:this.id,type:2}).then(data=>{
			this.detail=data;
		})
	},
	open(){
		this.show=true;
		this.getDetail();
	},
	submit(){
		if(!this.res){
			this.$toast("请选择处置结果");
			return ;
		}
		// this.detail.dealResult=this.res;
		this.detail.dealFeedback=this.res;
		this.detail.remark=this.remark;
		this.Api.policeDeal(this.detail).then(data=>{
			this.$toast("处置成功!");
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
