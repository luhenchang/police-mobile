<template>
	<view>
		<view class="tui-status-bar"></view>
		<u-tabs :list="tabList" :current="tabCurrent" font-size="34" class="b-b" :show-bar="false" :is-scroll="true" :active-color="tempColor" @change="tabChange"></u-tabs>
		<swiper :current="tabCurrent" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(item,index) in tabList" :key="index">
				<scroll-view
					class="list-scroll-content " 
					scroll-y
					@scrolltoupper="loadData(false)"
					@scrolltolower="loadData(true)"
				>
				<view v-if="item.type==0">
					<report ref="reportTabs" :curTab="curTab" />
				</view>
				<view v-if="item.type==1">
				
				<view v-for="(n,j) in item.list" :key="j">
					<xui-report-list :list="[n.reportVo]" :report-id="n.id" v-if="n.reportType==0 && n.reportVo" @reload="loadData(false)" @reportFeedback="reportFeedback"></xui-report-list>
					<xui-case-police-list :list="[n.casePoliceVo]" :reportId="n.id" v-if="n.reportType==1 && n.casePoliceVo" @reload="loadData(false)" @reportFeedback="reportFeedback" />
					<xui-case-manage-list :list="[n.caseManageVo]" :report-id="n.id" v-if="n.reportType==2 && n.caseManageVo" @reload="loadData(false)"  @reportFeedback="reportFeedback"/>
					<xui-case-file-list :list="[n.caseFileVo]" :report-id="n.id" v-if="n.reportType==3 && n.caseFileVo" @reload="loadData(false)" @reportFeedback="reportFeedback"/>
					<xui-case-property-list :list="[n.casePropertyVo]" :report-id="n.id" v-if="n.reportType==4 && n.casePropertyVo" @reload="loadData(false)"  @reportFeedback="reportFeedback"/>
					<xui-case-place-list :list="[n.casePlaceVo]" :report-id="n.id" v-if="n.reportType==2 && n.casePlaceVo" @reload="loadData(false)" @reportFeedback="reportFeedback" />
				</view>
				
				<u-loadmore  bg-color="#f5f5f5" @loadmore="loadData(true)" :status="item.loadStatus" icon-type="circle"  />
				</view>
				
				<view v-if="item.type==2">
				<view class="search-wrap" >
					<u-search placeholder="搜索案件或通报" bg-color="#ffffff"   @click="search" :show-action="false" disabled></u-search>
				</view>
				<xui-report-cate @confirm="cateConfirm"></xui-report-cate>
				<view class="sub-title mt5 mb5 ml0">{{cateTitle}}</view>
				<xui-report-list :list="item.list" @reload="loadData(false)"></xui-report-list>
				<u-loadmore  bg-color="#f5f5f5" @loadmore="loadData(true)" :status="item.loadStatus" icon-type="circle"  />
				</view>
				</scroll-view>
				
			</swiper-item>
		</swiper>
			<xui-case-report-feedback ref="reportFeedback" @reload="loadData(false)"></xui-case-report-feedback>
	
	</view>
</template>

<script>
	import Report from '../report/index'
	export default {
		components:{
			Report
		},
		data() {
			return {
				keyword:'',
				curTab:0,
				tabList:[
					{name:"警情通报",type:0,list:[],queryParams:{pageNum:1,pageSize:10}},
					{name:"待处理通报",type:1,list:[],queryParams:{pageNum:1,pageSize:10}},
					// {name:"通报总结",type:2,list:[],queryParams:{pageNum:1,pageSize:10}},
					],
				tabCurrent:0,
				cate:0,
				cateMap:{
					0:'最近推送',
					1:'今日通报',
					2:'本周通报',
					3:'本月通报'
				},
				cateTitle:"最近推送"
			}
		},
		onShow() {
			if(!this.hasLogin){
				this.navToLogin();
				return;
			}
			this.loadData(false);
			this.curTab=this.policeTab
			console.log(this.policeTab);
			if(this.$refs.reportTabs.length>=1 && !!this.$refs.reportTabs[0]){
				this.$refs.reportTabs[0].loadData();
			} 
			
		},

		onLoad(option){
			uni.$on('updateReport',(data)=>{
				console.log("updateReport",data)
				this.$nextTick(()=>{
					if(this.$refs.reportTabs.length>=1 && !!this.$refs.reportTabs[0]){
						this.$refs.reportTabs[0].loadData();
					} 
				})
				
			})
		},
		watch:{
		   keyword(nval){
			   this.queryParams.keyword=nval;
		   },
		   tabCurrent:function(nval){
			let item = this.tabList[this.tabCurrent];
			if(item.type ==0){
				return ;
			}
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
				this.tabCurrent=e.target.current;
			},
			loadData(more){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrent;
				let item = this.tabList[index];
				console.log(item)
				// if(item.loadStatus === 'loading' ){
				// 	//防止重复加载
				// 	uni.stopPullDownRefresh()
				// 	return;
				// }
				if(more && item.loadStatus =='nomore' ){
					uni.stopPullDownRefresh()
					return;
				}
				this.getList(item,more);
			}, 
			getList(item,more){
				console.log(item)
				if(more){
					item.queryParams.pageNum ++;
				}else{
					item.queryParams.pageNum =1;
				}
				if(item.type==2){
					this.getReportList(item)
				}else if(item.type==1){
					this.reportAssignList(item)
				}
			},
			getReportList(item){
				item.queryParams.cate=this.cate;
				this.Api.getReportList(item.queryParams).then(data=>{
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length < item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				})
			},
			reportAssignList(item){
				item.queryParams.status=0;
				this.Api.reportAssignList(item.queryParams).then(data=>{
					let list=data.rows;
					if(item.queryParams.pageNum==1){
						item.list=list;
					}else{
						item.list=item.list.concat(list);
					}
					if(list.length < item.queryParams.pageSize){
						item.loadStatus="nomore";
					}else{
						item.loadStatus="loadmore";
					}
					uni.stopPullDownRefresh();
					this.$forceUpdate();
				})
			},
			reportFeedback(reportId){
				console.log(reportId);
				 this.$refs.reportFeedback.open(reportId);
			},
			cateConfirm(cate){
				this.cate=cate;
				this.cateTitle=this.cateMap[this.cate];
				this.loadData();
			},
			search(){
				uni.navigateTo({
					url:"/pages/index/search?type=5"
				})
			}
			
			
		}
	}
</script>

<style lang="scss">

.list-scroll-content{
	height: calc(100vh - 180rpx);
}
</style>
