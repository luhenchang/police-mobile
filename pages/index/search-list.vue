<template>
	<view class="container">
			<view class="page-margin-bottom" >
				<view class="panel-white" style="margin-bottom: 10rpx;">
					<u-search placeholder="请输入关键字搜索" v-model="keyword"  @custom="search" @search="search()"></u-search>
				</view>
				
				 <xui-case-police-list v-if="type==0" :list="list" :type="policeType" @reload="getList(false)"/>
				 <xui-case-manage-list v-if="type==1" :list="list" @reload="getList(false)" />
				 <xui-case-file-list v-if="type==2" :list="list" />
				 <xui-case-property-list v-if="type==3" :list="list" />
				 <xui-case-place-list v-if="type==4" :list="list" />
				 <xui-report-list v-if="type==5" :list="list" @reload="getList(false)"></xui-report-list>
				<u-loadmore  bg-color="#f5f5f5" @loadmore="loadMore" :status="loadStatus" icon-type="circle"  />
			</view>
	</view>
</template>

<script>
	import {policeTypeMap} from '@/utils/constants.js'
	export default {
	
		data() {
			return {
				loading:true,
				keyword:'',
				policeType:1,
				//分类列表
				list:[],
				queryParams:{
					pageNum:1,
					pageSize:10,
					searchValue:''
					}
			}
		},
	
		onShow() {
		
		
		},
		onLoad(option){
			console.log(option);
			this.type=option.type || 0;
			if(this.type==0){
				this.policeType=1;
			}
			if(this.type==5){
				this.policeType=2;
			}
			this.keyword=option.keyword || '';
			let title=option.title ||'';
			let typeName=policeTypeMap[this.type];
			if(!title && this.keyword){
				title=typeName+'-搜索['+this.keyword+']';
			}
			if(title){
				uni.setNavigationBarTitle({
					title:title
				})
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
					this.queryParams.pageNum =1;
				}
				this.queryParams.searchValue=this.keyword;
				if(this.loadStatus=='loading'){
					return;
				}
				this.loadStatus='loading';
				if(this.type==0 || this.type==5){
					this.queryParams.type=this.policeType;
					this.getCasePoliceList();
				}else if(this.type==1){
					this.getCaseManageList();
				}
				else if(this.type==2){
					this.getCaseFileList();
				}
				else if(this.type==3){
					this.getCasePropertyList();
				}
				else if(this.type==4){
					this.getCasePlaceList();
				}else if(this.type==5){
					this.getReportList();
				}
			  
			},
			getCasePoliceList(){
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
					this.$forceUpdate();
				})
			},
			getCaseManageList(){
				this.Api.getCaseManageList(this.queryParams).then(data=>{
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
					this.$forceUpdate();
				})
			},
			getCaseFileList(){
				this.Api.getCaseFileList(this.queryParams).then(data=>{
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
					this.$forceUpdate();
				})
			},
			getCasePropertyList(){
				this.Api.getCasePropertyList(this.queryParams).then(data=>{
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
					this.$forceUpdate();
				})
			},
			getCasePlaceList(){
				this.Api.getCasePlaceList(this.queryParams).then(data=>{
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
					this.$forceUpdate();
				})
			},
			getReportList(){
				this.queryParams.name=this.keyword;
				this.Api.getReportList(this.queryParams).then(data=>{
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
					this.$forceUpdate();
				})
			},
			loadMore(){
			   if(this.loadStatus=='nomore'){
				   return;
			   }	
			   this.getList(true);
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
