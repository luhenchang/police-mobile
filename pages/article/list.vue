<template>
	<view class="container">
			<view class="page-margin-bottom" >
				<view class="panel-white" style="margin-bottom: 10rpx;">
					<u-search placeholder="请输入关键字搜索" v-model="keyword"  @custom="search" @search="search()"></u-search>
				</view>
				
				 <xui-skeleton :loading="loading">
			    <xui-article-list  :list="list" show-type="media"></xui-article-list>
				</xui-skeleton>
				<u-loadmore  bg-color="#f5f5f5" @loadmore="loadMore" :status="loadStatus" icon-type="circle"  />
			</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				scrollTop:0,
				categoryId:'',
				categoryName:'',
				keyword:'',
				loading:true,
				//分类列表
				list:[],
				queryParams:{}
				}
		},
	
		onShow() {
		
		
		},
		onLoad(option){
			console.log(option);
			this.categoryId=option.categoryId || '';
			this.categoryName=option.categoryName || '';
			this.keyword=option.keyword || '';
			let title=option.title || option.categoryName;
			if(!title && this.keyword){
				title='搜索['+this.keyword+']';
			}
			this.queryParams={
				pageIndex:1,
				pageSize:20,
				categoryId:this.categoryId,
				categoryName:this.categoryName,
				keyword:this.keyword
			}
			if(title){
				uni.setNavigationBarTitle({
					title:title
				})
			}
		
		
			this.getList();
		},
		onPullDownRefresh() {
			this.getList('refresh');
		},
		onReachBottom() {
			if(this.loadStatus=='nomore'){
				return;
			}
			this.getList('more');
		},
		methods: {
			getList(direc){
				direc=direc || 'refresh';
				if(direc=='refresh'){
					this.queryParams.pageIndex=1;
				}else{
					this.queryParams.pageIndex++;
				}
				this.queryParams.keyword=this.keyword;
				if(this.loadStatus=='loading'){
					return;
				}
				this.loadStatus='loading';
			   this.Api.getArticleList(this.queryParams).then(data=>{
				   this.loading=false;
				   let list=data.rows;
				   list.forEach(item=>{
					   item.thumb=this.$helper.getPhoto(item.thumb)
				   },this)
				   if(list.length<this.queryParams.pageSize){
				   		this.loadStatus='nomore';
				   }else{
				   		this.loadStatus='loadmore';
				   }
				   if(direc=='refresh'){
					   uni.stopPullDownRefresh();
					   this.list=list;
				   }else{
					   
					   this.list=this.list.concat(list);
				   }
				   
			   },e=>{
				   this.loadStatus='loadmore';
			   })
			},
			loadMore(){
			   if(this.loadStatus=='nomore'){
				   return;
			   }	
			   this.getList('more');
			},
			//搜索跳转
			search(){
				let title='搜索['+this.keyword+']';
				uni.setNavigationBarTitle({
					title:title
				})
				this.setHistory(this.keyword);
				this.getList();
			},
			setHistory(key){
				let r=true;
				let history=this.$cache.get('$keywords',[]);
				history && history.forEach(item=>{
					if(item==key){
						r=false;
					}
				})
				if(r){
					history.push(key);
					this.$cache.put('$keywords',history);
				}
			},
		
		}
	}
</script>

<style lang="scss">
uni-page-body, uni-page-refresh{
	height: 100%;
}

</style>
