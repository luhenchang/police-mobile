<template>
     <view > 
			<view class="txl-container">
				<xui-txl @ev="confirm" @search="search"  showSelect :datas="list" :bottom="150" :color="tempColor" :index="true" name="name"></xui-txl>
			</view>
			<view class="panel-white bottom-btn">
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
     </view>
</template>

<script>


export default {
 
  data () {
    return {
	  show:false,
	  detail:{},
	  list:[],
	  userId:'',
	  reportId:'',
	  queryParams:{
		  pageNum:1,
		  pageSize:20,
		  roleId:1
	  }
    }
  },
  created(){
   
  },
  onLoad(option){
	  this.reportId=option.reportId;
	  // this.getContactList();
  },
  methods:{
	getContactList(){
		this.Api.getUserList(this.queryParams).then(data=>{
			this.list=data;
		})
	},
	search(keyword){
		console.log(keyword);
		this.queryParams.name=keyword;
		this.getContactList(false);
	},
	confirm(item){
		this.userId=item.userId;
	},
	submit(){
		if(!this.userId){
			this.$toast('请选择要分享的用户')
			return;
		}
		let params={
			userId:this.userId,
			reportId:this.reportId,
			type:2,
			reportType:0
		}
		this.Api.assignReport(params).then(data=>{
			if(data){
					this.$successBack('分享成功');
			}else{
					this.$toast("分享失败");
			}
		})
	}
   

  }
}
</script>

<style lang="less" scoped>
.txl-container{
	height: calc(100vh - 200rpx);
}

</style>
