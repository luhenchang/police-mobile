<template>
	<!-- 分类-->
	<view>
		<view >
		<view class="card" @click="toPolice">
			<view class="title-bold">今日接报警情</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
					{{total.casePolice && total.casePolice.currentCount}}
					<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.casePolice && total.casePolice.currentCount) < (total.casePolice && total.casePolice.lastCount)"></text>
					<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.casePolice && total.casePolice.currentCount) > (total.casePolice && total.casePolice.lastCount)"></text>
					<text class="sub-txt ml10" v-if="(total.casePolice && total.casePolice.currentCount) == (total.casePolice && total.casePolice.lastCount)">--</text>
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-data.svg"></image>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title-bold">今日登录次数</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.loginInfor && total.loginInfor.currentCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.loginInfor && total.loginInfor.currentCount) < (total.loginInfor && total.loginInfor.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.loginInfor && total.loginInfor.currentCount) > (total.loginInfor && total.loginInfor.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.loginInfor && total.loginInfor.currentCount) == (total.loginInfor && total.loginInfor.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-login.svg"></image>
				</view>
			</view>
		</view>
		
		<view class="card" @click="toReport(0)">
			<view class="title-bold">警情管控</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.casePolice && total.casePolice.totalCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.casePolice && total.casePolice.currentCount) < (total.casePolice && total.casePolice.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.casePolice && total.casePolice.currentCount) > (total.casePolice && total.casePolice.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.casePolice && total.casePolice.currentCount) == (total.casePolice && total.casePolice.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-police.svg"></image>
				</view>
			</view>
			<view class="flex-row around">
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.casePolice && total.casePolice.questionCount}}</view>
					<view class="sub-title">问题</view>
				</view>
				<view class="flex-center  col">
					<view class="title-bold big mb5">{{total.casePolice && total.casePolice.unResolveCount}}</view>
					<view class="sub-title">未整改</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.casePolice && total.casePolice.resolveCount}}</view>
					<view class="sub-title">已整改</view>
				</view>
				
			</view>
			<view class="charts-box">
			  <qiun-data-charts type="bar" :opts="{extra:{bar:{linearType:'custom',barBorderCircle:true}}}" :chartData="chartsData"/>
			</view>
		</view>
		
		<view class="card" @click="toReport(1)">
			<view class="title-bold">案件管理</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.caseFile && total.caseFile.totalCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.caseFile && total.caseFile.currentCount) < (total.caseFile && total.caseFile.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.caseFile && total.caseFile.currentCount) > (total.caseFile && total.caseFile.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.caseFile && total.caseFile.currentCount) == (total.caseFile && total.caseFile.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-case.svg"></image>
				</view>
			</view>
			<view class="flex-row around">
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseFile && total.caseFile.questionCount}}</view>
					<view class="sub-title">问题</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseFile && total.caseFile.unResolveCount}}</view>
					<view class="sub-title">未整改</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold  big mb5">{{total.caseFile && total.caseFile.resolveCount}}</view>
					<view class="sub-title">已整改</view>
				</view>
				
			</view>
		</view>
		
		<view class="card" @click="toReport(2)">
			<view class="title-bold">案卷管理</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.caseManage && total.caseManage.totalCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.caseManage && total.caseManage.currentCount) < (total.caseManage && total.caseManage.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.caseManage && total.caseManage.currentCount) > (total.caseManage && total.caseManage.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.caseManage && total.caseManage.currentCount) == (total.caseManage && total.caseManage.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-file.svg"></image>
				</view>
			</view>
			<view class="flex-row around">
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseManage && total.caseManage.questionCount}}</view>
					<view class="sub-title">问题</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseManage && total.caseManage.unResolveCount}}</view>
					<view class="sub-title">未整改</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseManage && total.caseManage.resolveCount}}</view>
					<view class="sub-title">已整改</view>
				</view>
				
			</view>
		</view>
		
		<view class="card" @click="toReport(3)">
			<view class="title-bold">涉案财物</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.caseProperty && total.caseProperty.totalCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.caseProperty && total.caseProperty.currentCount) < (total.caseProperty && total.caseProperty.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.caseProperty && total.caseProperty.currentCount) > (total.caseProperty && total.caseProperty.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.caseProperty && total.caseProperty.currentCount) == (total.caseProperty && total.caseProperty.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-money.svg"></image>
				</view>
			</view>
			<view class="flex-row around">
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseProperty && total.caseProperty.questionCount}}</view>
					<view class="sub-title">问题</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold  big mb5">{{total.caseProperty && total.caseProperty.unResolveCount}}</view>
					<view class="sub-title">未整改</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.caseProperty && total.caseProperty.resolveCount}}</view>
					<view class="sub-title">已整改</view>
				</view>
				
			</view>
		</view>
		
		<view class="card" @click="toReport(4)">
			<view class="title-bold">场所管理</view>
			<view class="flex-row between panel-white">
				<view>
					<view class="title-bold big">
						{{total.casePlace && total.casePlace.totalCount}}
						<text class="iconfont icon-tubiaoxiajiangqushi ml10 success" v-if="(total.casePlace && total.casePlace.currentCount) < (total.casePlace && total.casePlace.lastCount)"></text>
						<text class="iconfont icon-tubiaoshangshengqushi ml10 red" v-if="(total.casePlace && total.casePlace.currentCount) > (total.casePlace && total.casePlace.lastCount)"></text>
						<text class="sub-txt ml10" v-if="(total.casePlace && total.casePlace.currentCount) == (total.casePlace && total.casePlace.lastCount)">--</text>
						
					</view>
				</view>
				<view>
					<image class="icon" src="../../../static/images/icon/icon-place.svg"></image>
				</view>
			</view>
			<view class="flex-row around">
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.casePlace && total.casePlace.questionCount}}</view>
					<view class="sub-title">问题</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.casePlace && total.casePlace.unResolveCount}}</view>
					<view class="sub-title">未整改</view>
				</view>
				<view class="flex-center col">
					<view class="title-bold big mb5">{{total.casePlace && total.casePlace.resolveCount}}</view>
					<view class="sub-title">已整改</view>
				</view>
				
			</view>
		</view>
		
		</view>
		<!-- <view class="panel-white" v-else>
			<u-loadmore  bg-color="#f5f5f5"  :status="loadStatus" icon-type="circle"  />
		</view> -->
		
	</view>
	
</template>

<script>
	
	export default {
		props:{
		  count:{
			  type:Number,
			  default:0
		  }	
		},
		data() {
			return {
				total:{},
				unsolve:[],
				chartsData:{},
				loading:false
			};
		},
		watch:{
			count(nval){
				this.getPoliceTotal();
				this.getUnsolveByDept();
			}
		},
		created() {
			if(this.hasLogin){
				this.getPoliceTotal();
				this.getUnsolveByDept();
			}
			
		},
		methods:{
			getPoliceTotal(){
				this.loading=true;
				this.Api.getPoliceTotal().then(data=>{
					this.total=data;
					this.loading=false;
				})
			},
			getUnsolveByDept(){
				this.Api.getUnsolveByDept().then(data=>{
					this.unsolve=data;
					let categories=[];
					let seriesData=[];
					data.forEach(item=>{
						if(item.dept){
						   categories.push(item.dept.deptName);
						   seriesData.push(item.unSolveCount)
						}
					})
					this.chartsData={
						categories:categories,
						series:[
							{
								"name": "未整改数量",
								"data": seriesData
							}
						]
					}
					
					this.loading=false;
				})
			},
			
			toPolice(){
				uni.switchTab({
					url:'/pages/tabbar/receive'
				})
			},
			toReport(curTab){
				this.updatePoliceTab(curTab);
				uni.switchTab({
					url:'/pages/tabbar/report'
				})
			}
			
		}
	}
</script>

<style lang="scss">
.icon{
	width: 100rpx;
	height: 100rpx;
}
	
</style>
