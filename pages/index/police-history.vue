<template>
	<view class="container padding-bottom">
		<view class="tui-status-bar"></view>
			
		<xui-case-police-list  :list="list" @reload="getList()" :showHistory="false" />
		<u-loadmore  bg-color="#f5f5f5" @loadmore="loadData(true)" :status="loadStatus" icon-type="circle"  />
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
			console.log(this.role)
			if(this.list.length==0){
				this.getList();
			}
		},
		onLoad(option){
			if(!this.hasLogin){
				this.navToLogin();
				return;
			}
			this.updateUserInfo();
			let callPhone=option.callPhone.trim();
			this.queryParams={
				pageNum:1,
				pageSize:10,
				callPhone:callPhone
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
				this.Api.getCasePoliceList(this.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(this.queryParams.pageNum==1){
						this.list=list;
					}else{
						this.list=this.list.concat(list);
					}
					if(list.length <this.queryParams.pageSize){
						this.loadStatus="nomore";
					}else{
						this.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					this.loadStatus="loadmore";
				})
			},
			search(){
				uni.navigateTo({
					url:'/pages/index/search?type=0'
				})
			},
			
		}
	}
</script>

<style lang="scss">
.container{
  height: calc(100vh - 120rpx) ;
}

</style>
