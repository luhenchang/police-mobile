<template>
	<view class="container padding-bottom">
		<view class="tui-status-bar"></view>
		<view class="search-wrap" >
			<u-search placeholder="搜索接警警情" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
		</view>		
		<xui-case-police-list  :list="list" @reload="getList()" :type="2"/>
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
			this.queryParams={
				pageNum:1,
				pageSize:10,
				type:2
			}
			this.getList();
			uni.$on('updateReceive',(data)=>{
				console.log(data)
				this.getList();
			})
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
					url:'/pages/index/search?type=5'
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
