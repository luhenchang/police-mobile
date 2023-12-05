<template>
	<view class="container padding-bottom">
		<view class="tui-status-bar"></view>
		<xui-txl  @ev="evFunc" :datas="list" :color="tempColor" :index="true" name="name"></xui-txl>
			
	</view>
</template>

<script>


	export default {
		components:{
		},
		data() {
			return {
				keyword:'',
				//分类列表
				list:[],
				queryParams:{}
				}
		},
		onShow() {
			console.log("contact show")
			if(this.list.length==0){
				this.getList();
			}
		},
		onLoad(option){
			if(!this.hasLogin){
				this.navToLogin();
				return;
			}
			this.queryParams={
				pageNum:1,
				pageSize:100,
				roleId:1
			}
			this.getList();
		},
		onPullDownRefresh() {
			this.getList(false);
		},
		onReachBottom() {
			if(this.loadStatus=='nomore'){
				return;
			}
			this.getList(true);
		},
	
		methods: {
			getList(more){
				if(more){
					this.queryParams.pageNum++;
				}else{
					this.queryParams.pageNum=1;
				}
				if(this.loadStatus =='loading'){
					return ;
				}
				this.loadStatus='loading';
				this.Api.getUserList(this.queryParams).then(data=>{
					if(data instanceof String){
						data=JSON.parse(data);
					}
					this.list=data;
					console.log(data)
					if(data.length <  this.queryParams.pageSize){
						this.loadStatus='nomore';
					}else{
						this.loadStatus='loadmore';
					}
					console.log(this.loadStatus)
					uni.stopPullDownRefresh();
				})
			},
			evFunc(data){
			            console.log(data)
			}
		}
	}
</script>

<style lang="scss">
.container{
  height: calc(100vh - 120rpx) ;
}

</style>
