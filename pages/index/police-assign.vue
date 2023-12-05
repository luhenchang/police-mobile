<template>
	<view class="container padding-bottom">
		<xui-txl  @ev="confirm" @search="search" showSelect :datas="list" :bottom="100" :color="tempColor" :index="true" name="name"></xui-txl>
		<view class="bottom-btn">
			<u-button type="primary" @click="submit">提交</u-button>
		</view>	
	</view>
</template>

<script>


	export default {
		components:{
		},
		data() {
			return {
				id:'',
				keyword:'',
				//分类列表
				list:[],
				queryParams:{}
				}
		},
		onShow() {
			
		
		},
		onLoad(option){
			this.id=option.id;
			this.queryParams={
				pageIndex:1,
				pageSize:20,
				name:'',
				roleId:102
			}
			this.getDetail();
			// this.getList();
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
			getDetail(){
				this.Api.getCasePolice({id:this.id}).then(data=>{
					this.detail=data;
				})
			},
			search(keyword){
				console.log(keyword);
				this.queryParams.name=keyword;
				this.getList(false);
			},
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
				this.Api.getUserAllocatedList(this.queryParams).then(data=>{
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
			confirm(item){
				this.detail.dajiUserId=item.userId;
			},
			submit(){
				if(!this.detail.dajiUserId){
					this.$toast('请选择打击民警')
					return;
				}
				this.Api.policeAssign(this.detail).then(data=>{
					// this.$toast("操作成功!");
					this.$successBack('操作成功');
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
  height: calc(100vh - 160rpx) ;
}

</style>
