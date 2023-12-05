<template>
	<view class="container">
		<view class="tui-status-bar"></view>
			<u-tabs :list="tabList" :current="tabCurrent" font-size="32" height="90" class="b-b"  :active-color="tempColor" @change="tabChange"></u-tabs>
			<swiper :current="tabCurrent" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(item,index) in tabList" :key="index">
					<scroll-view
						class="list-scroll-content " 
						scroll-y
						@scrolltoupper="loadData(false)"
						@scrolltolower="loadData(true)"
					>
				<!-- 	<view class="search-wrap" v-if="item.type==0">
						<u-search placeholder="搜索警情" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
					</view> -->
					<view class="search-wrap" v-if="item.type==1">
						<u-search placeholder="搜索案件" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
					</view>
					<view class="search-wrap" v-if="item.type==2">
						<u-search placeholder="搜索案卷" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
					</view>
					<view class="search-wrap" v-if="item.type==3">
						<u-search placeholder="搜索涉案财物" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
					</view>
					<view class="search-wrap" v-if="item.type==4">
						<u-search placeholder="搜索场所" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
					</view>
					<!-- <xui-case-police-list v-if="item.type==0" :list="item.list" @reload="loadData()" /> -->
					<xui-case-manage-list v-if="item.type==1" :list="item.list" />
					<xui-case-file-list v-if="item.type==2" :list="item.list" />
					<xui-case-property-list v-if="item.type==3" :list="item.list" />
					<xui-case-place-list v-if="item.type==4" :list="item.list" />
					<u-loadmore  bg-color="#f5f5f5" @loadmore="loadData(true)" :status="item.loadStatus" icon-type="circle"  />
					</scroll-view>
					
				</swiper-item>
			</swiper>
		
	</view>
</template>

<script>
	// #ifdef APP-PLUS
		import push from '@/utils/push.js'
	// #endif

	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		components:{
		},
		
		data() {
			return {
				showCard:false,
				tabCurrent:0,
				tabList:[
					// {name:"警情",type:0,loadStatus:'loadmore',queryParams:{keyword:'',pageNum:1,pageSize:10},list:[]},
					{name:"案件",type:1,loadStatus:'loadmore',queryParams:{keyword:'',pageNum:1,pageSize:10},list:[]},
					{name:"案卷",type:2,loadStatus:'loadmore',queryParams:{keyword:'',pageNum:1,pageSize:10},list:[]},
					{name:"涉案财物",type:3,loadStatus:'loadmore',queryParams:{keyword:'',pageNum:1,pageSize:10},list:[]},
					{name:"场所管理",type:4,loadStatus:'loadmore',queryParams:{keyword:'',pageNum:1,pageSize:10},list:[]},
					],
		  }
		},
		onShow() {
			if(!this.hasLogin){
				this.navToLogin();
				return;
			}
			// #ifdef APP-PLUS
				push.init();
			// #endif
			this.loadData();
		},
		onLoad(option){
				
		},
		onPullDownRefresh() {
			
			this.loadData(false);
		},
		onReachBottom() {
			
			uni.stopPullDownRefresh();
		},
		watch:{
			tabCurrent:function(nval){
				let item = this.tabList[this.tabCurrent];
				if(item.list.length==0){
					this.loadData(false);
				}else{
					this.loadData(true);
				}
				
			}
		},
		methods: {
			tabChange(index) {
				this.tabCurrent = index;
			},
			changeTab(e){
				console.log(e)
				this.tabCurrent=e.target.current;
			},
			loadData(more){
				//这里是将订单挂载到tab列表下
				
				let index = this.tabCurrent;
				let item = this.tabList[index];
				// if(item.loadStatus === 'loading' ){
				// 	//防止重复加载
				// 	uni.stopPullDownRefresh()
				// 	return;
				// }
				if(more && item.loadStatus =='nomore' ){
					uni.stopPullDownRefresh()
					return;
				}
				item.loadStatus='loading';
				this.getList(item,more);
			}, 
			getList(item,more){
				console.log(item)
				if(more){
					item.queryParams.pageNum ++;
				}else{
					item.queryParams.pageNum =1;
				}
				if(item.type==0){
					this.getCasePoliceList(item);
				}else if(item.type==1){
					this.getCaseManageList(item);
				}
				else if(item.type==2){
					this.getCaseFileList(item);
				}
				else if(item.type==3){
					this.getCasePropertyList(item);
				}
				else if(item.type==4){
					this.getCasePlaceList(item);
				}
			},
			search(){
				let index = this.tabCurrent;
				let item = this.tabList[index];
				uni.navigateTo({
					url:'/pages/index/search?type='+item.type
				})
			},
			getCasePoliceList(item){
				this.Api.getCasePoliceList(item.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length <item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					item.loadStatus="loadmore";
				})
			},
			getCaseManageList(item){
				this.Api.getCaseManageList(item.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length <item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					item.loadStatus="loadmore";
				})
			},
			getCaseFileList(item){
				this.Api.getCaseFileList(item.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length <item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					item.loadStatus="loadmore";
				})
			},
			getCasePropertyList(item){
				this.Api.getCasePropertyList(item.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length <item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					item.loadStatus="loadmore";
				})
			},
			getCasePlaceList(item){
				this.Api.getCasePlaceList(item.queryParams).then(data=>{
					console.log(data);
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length <item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				},e=>{
					item.loadStatus="loadmore";
				})
			},
		}
	}
</script>

<style lang="scss">

.list-scroll-content{
	height: calc(100vh - 180rpx);
}
</style>
