<template>
	<view class="container">
		<view v-if="!hasLogin" class="container">
			<u-empty text="您还未登录,请先登录" mode="permission">
				<u-button slot="bottom" type="primary" @click="navTo('/pages/auth/login/login')">去登录</u-button>
			</u-empty>
		</view>
		<view v-else>
		
				<view 
					class="list-scroll-content page-margin-bottom" 				
				>
					<!-- 空白页 -->
					<u-empty v-if="list.length === 0" class="full"></u-empty>
					<view v-else>
						<view v-for="(item,index) in list" :key="index">
							<view v-if="item.type==1 && item.goodsVo">
								<xui-goods-list :list="[item.goodsVo]" showType="media"></xui-goods-list>
							</view>
							<view v-if="item.type==2 && item.merchantVo">
								<xui-merchant-list :list="[item.merchantVo]" showType="media" />
							</view>
							<view v-if="item.type==3 && item.boxVo">
								<xui-box-item :item="item.boxVo" showType="media" />
							</view>
						</view>
					</view>
					 
					<u-loadmore class="panel-white" bg-color="#f5f5f5" @loadmore="getList(true)" :status="loadStatus" icon-type="circle" :load-text="loadText" />
					
				</view>
		</view>
	</view>
</template> 

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		computed: {
		},
		data() {
			return {
				list:[],
				referType:1,
				pageNum:1,
				pageSize:10,
				loadStatus:'loading',
				loadText: {
					loadmore: '点击或上拉加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},				
			};
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.getList();
		},
		onReachBottom() {
			if(this.loadStatus=='nomore'){
				return;
			}
			this.loadStatus='loading';
			this.getList(true);
		},
		onLoad(options){
			this.referType=options.referType;
			if(this.referType==1){
				uni.setNavigationBarTitle({
					title:'我的收藏'
				})
			}
			if(this.referType==2){
				uni.setNavigationBarTitle({
					title:'我的足迹'
				})
			}
		},
		onShow() {
			this.getList();
		},
		methods: {
			
			getList(more){
				if(this.loadStatus=='nomore' && more){
					uni.stopPullDownRefresh()
					return;
				}
				if(!more){
					this.pageNum=1;
				}else{
					this.pageNum++;
				}
				let params={
					pageNum:this.pageNum ||1,
					pageSize:this.pageSize,
					referType:this.referType
				}
				this.loadStatus='loading';
				this.Api.getUserFavoriteList(params).then(data=>{
				   let list=data.rows;
					if(this.pageNum==1){
						this.list=list;
					}else{
						this.list=this.list.concat(list);
					}
					if(list.length==0 || list.length<this.pageSize){
						this.loadStatus = 'nomore';
					}else{
						this.loadStatus = 'loadmore';
					}
					this.$forceUpdate()
					uni.stopPullDownRefresh();
				})
			},
		},
	}
</script>

<style lang="scss">

	
	
	
</style>
