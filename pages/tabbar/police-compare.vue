<template>
	<view class="container">
			<view class="panel-white" style="margin-bottom: 10rpx;">
				<u-search placeholder="请输入内容" v-model="keyword"  @custom="search" @search="search()"></u-search>
			</view>
			<view class="card">
				<view class="title-bold mb10">警情指引</view>
				<view class="pannel-white" v-if="jqzyList.length==0">
					<view class="mb5">比对结果为：</view>
					<view class="pl10">与搜索内容相关的警情指引。</view>
				</view>
				<view class="item  " v-for="(item,index) in jqzyList" :key="index" @click="jqzyDetail(item)" v-show="index<5 || (index >= 5 && showJqzyMore)">
						<view class="clamp-2" >{{index+1}} 、{{item.jqzy}}</view>
				</view>
				<view class="pt10 flex-center" v-if="jqzyList.length>=5" @click="showJqzyMore = !showJqzyMore">
					<view class="link" v-if="!showJqzyMore"> 更多 <u-icon name="arrow-down" class="ml5"></u-icon></view>
					<view class="link" v-if="showJqzyMore"> 收起 <u-icon name="arrow-up" class="ml5"></u-icon></view>
				</view>
			</view>
		
			<view class="card">
				<view class="title-bold mb10">市局通报</view>
				<view class="pannel-white" v-if="directorReportList.length==0">
					<view class="mb5">比对结果为：</view>
					<view class="pl10">搜索内容与市局"办案中心+案管组" 通报的疑似红线问题匹配度最高的警情。</view>
				</view>
				<view class="item  " v-for="(item,index) in directorReportList" :key="index" @click="directorReportDetail(item)" v-show="index<5 || (index >= 5 && showDirectorReportMore)">
						<view class="clamp-2" >{{index+1}} 、{{item.jqnr}}</view>
				</view>
				<view class="pt10 flex-center" v-if="directorReportList.length>=5" @click="showDirectorReportMore = !showDirectorReportMore">
					<view class="link" v-if="!showDirectorReportMore"> 更多 <u-icon name="arrow-down" class="ml5"></u-icon></view>
					<view class="link" v-if="showDirectorReportMore"> 收起 <u-icon name="arrow-up" class="ml5"></u-icon></view>
				</view>
			</view>
			
			<view class="card">
				<view class="title-bold mb10">执法办案平台</view>
				<view class="pannel-white" v-if="platformList.length==0">
					<view class="mb5">比对结果为：</view>
					<view class="pl10">搜索内容与执法办案平台中已受理为案件的匹配度最高的警情。</view>
				</view>
				<view class="item " v-for="(item,index) in platformList" :key="index" @click="platformDetail(item)" v-show="index<5 || (index >= 5 && showPlatformMore)">
					<view class="clamp-2"> {{index+1}} 、{{item.jjnr}}</view>
				</view>
				<view class="pt10 flex-center" v-if="platformList.length>=5" @click="showPlatformMore = !showPlatformMore">
					<view class="link" v-if="!showPlatformMore"> 更多 <u-icon name="arrow-down" class="ml5"></u-icon></view>
					<view class="link" v-if="showPlatformMore"> 收起 <u-icon name="arrow-up" class="ml5"></u-icon></view>
				</view>
			</view>
			
			
			
		<!-- <view class=" page-margin-bottom"> -->
			<view class="card">
				<view class="title-bold mb10">适用法条</view>
				<view class="pannel-white" v-if="fitLawList.length==0">
					<view class="mb5">比对结果为：</view>
					<view class="pl10">与搜索内容可能相关的适用法条及解释。</view>
				</view>
				<view class="item " v-for="(item,index) in fitLawList" :key="index" @click="fitLawDetail(item)" v-show="index<5 || (index >= 5 && showFitLawMore)">
					<view class="clamp-2">	{{index+1}} 、{{item.ay}} {{item.ft}}</view>
				</view>
				<view class="pt10 flex-center" v-if="fitLawList.length>=5" @click="showFitLawMore = !showFitLawMore">
					<view class="link" v-if="!showFitLawMore"> 更多 <u-icon name="arrow-down" class="ml5"></u-icon></view>
					<view class="link" v-if="showFitLawMore"> 收起 <u-icon name="arrow-up" class="ml5"></u-icon></view>
				</view>
			</view>
		<!-- </view> -->
		
		<!-- <view class=" page-margin-bottom">
			<view class="card">
				<view class="title-bold mb10">执法指引</view>
				<view class="pannel-white" v-if="executeLawList.length==0">
					<view class="mb5">比对结果为：</view>
					<view class="pl10">执法过程中可能引发红线的执法易犯问题与搜索内容相关的执法指引。</view>
				</view>
				<view class="item " v-for="(item,index) in executeLawList" :key="index" @click="executeLawDetail(item)" v-show="index<5 || (index >= 5 && showExecuteLawMore)">
				<view class="clamp-2">	{{index+1}} 、{{item.jqmc || item.wt ||item.dxal}}</view>
				</view>
				<view class="pt10 flex-center" v-if="executeLawList.length>=5" @click="showExecuteLawMore = !showExecuteLawMore">
					<view class="link" v-if="!showExecuteLawMore"> 更多 <u-icon name="arrow-down" class="ml5"></u-icon> </view>
					<view class="link" v-if="showExecuteLawMore"> 收起 <u-icon name="arrow-up" class="ml5"></u-icon> </view>
				</view>
			</view>
		</view> -->
			
		
		<u-popup v-model="showPlatform" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">执法办案平台</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{platformItem.ajmc}}</text></view>
				<view class="line b-b"> <text class="label  left">案件类型：</text><text class="text">{{platformItem.ajlx}}</text></view>
				<view class="line b-b"> <text class="label left">主案别：</text><text class="text">{{platformItem.zab}}</text></view>
				<view class="line "> <text class="label left">简要案情：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{platformItem.jjnr}}</text>
				</view>
				<view class="line "> <text class="label left">警情内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{platformItem.jyaq}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showDirectorReport" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">市局通报</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{directorReportItem.ajmc}}</text></view>
				<view class="line b-b"> <text class="label left">案件编号：</text><text class="text">{{directorReportItem.ajbh}}</text></view>
				<view class="line b-b"> <text class="label left">问题：</text><text class="text">{{directorReportItem.wt}}</text></view>
				<view class="line b-b"> <text class="label  left">案件类别：</text><text class="text">{{directorReportItem.ajlb}}</text></view>
				<view class="line b-b"> <text class="label  left">关键字：</text><text class="text">{{directorReportItem.gjc}}</text></view>
				
				<view class="line "> <text class="label left">简要案情：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.jyay}}</text>
				</view>
				<view class="line "> <text class="label left">警情内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.jqnr}}</text>
				</view>
				<view class="line "> <text class="label left">市局通报：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.sjtb}}</text>
				</view>
				<view class="line "> <text class="label left">派出所回复：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.pcshf}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showFitLaw" mode="bottom" border-radius="10" height="80%" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">适用法条</view>
				<view class="line b-b"> <text class="label ">案由：</text><text class="text">{{fitLawItem.ay}}</text></view>
				<view class="line b-b"> <text class="label ">法条：</text><text class="text">{{fitLawItem.ft}}</text></view>
				<view class="line "> <text class="label ">警条内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{fitLawItem.jtnr}}</text>
				</view>
				
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showExecuteLaw" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">执法指引</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{executeLawItem.jqmc}}</text></view>
				<view class="line "> <text class="label left">问题：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.wt}}</text>
				</view>
				<view class="line "> <text class="label left">典型案例：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.dxal}}</text>
				</view>
				<view class="line "> <text class="label left">市局标准：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.sjbz}}</text>
				</view>
				<view class="line "> <text class="label left">派出所管制情况：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.pcsgzqk}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showJqzy" mode="bottom" height="60%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">警情指引</view>
				<view class="line b-b"> <text class="label left">相似警情：</text><text class="text">{{jqzyItem.gjc}}</text></view>
				<view class="line "> <text class="label left">警情指引：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{jqzyItem.jqzy}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	 import uniCopy from '@/utils/uni-copy.js'
	export default {
		data() {
			return {
				id:'',
				detail:{},
				keyword:"",
				loading:true,
				queryParams:{
					pageNum:1,
					pageSize:5,
					keywordList:[]
				},
				directorReportList:[],
				platformList:[],
				fitLawList:[],
				executeLawList:[],
				gflaList:[],
				jqzyList:[],
				showPlatform:false,
				showDirectorReport:false,
				showFitLaw:false,
				showExecuteLaw:false,
				platformItem:{},
				directorReportItem:{},
				fitLawItem:{},
				executeLawItem:{},
				showDirectorReportMore:false,
				showPlatformMore:false,
				showFitLawMore:false,
				showExecuteLawMore:false,
				showJqzyMore:false,
				showJqzy:false,
				jqzyItem:{}
			}
				
		},
		onLoad(option){
			console.log(option);
			// this.id=option.id;
			// this.search();
		},
		methods: {
			getList(){
			   this.Api.getCasePolice({id:this.id}).then(data=>{
				   this.detail=data;
				   this.loading=false;
				   this.Api.policeCompare({content:data.content}).then(data=>{
					   this.platformList=data.jqxxList ||[];
					   this.directorReportList=data.sjtbList ||[];
					   this.fitLawList=data.ftList ||[];
					   this.executeLawList=data.zfzyList ||[];
					   this.gflaList=data.gflaList ||[];
					   this.jqzyList=data.jqzyList ||[];
				   })
			   })
			},
			reset(){
				this.platformList=[];
				this.directorReportList=[];
				this.fitLawList=[];
				this.executeLawList=[];
				this.gflaList=[];
				this.jqzyList=[];
			},
			search(){
				if(!this.keyword){
					this.reset();
					return ;
				}
				this.Api.policeCompare({content:this.keyword}).then(data=>{
				   this.platformList=data.jqxxList ||[];
				   this.directorReportList=data.sjtbList ||[];
				   this.fitLawList=data.ftList ||[];
				   this.executeLawList=data.zfzyList ||[];
				   this.gflaList=data.gflaList ||[];
				   this.jqzyList=data.jqzyList ||[];
				})
			},
		
			platformDetail(item){
				this.platformItem=item;
				this.showPlatform=true;
			},
			directorReportDetail(item){
				this.directorReportItem=item;
				this.showDirectorReport=true;
			},
			executeLawDetail(item){
				this.executeLawItem=item;
				this.showExecuteLaw=true;
			},
			fitLawDetail(item){
				this.fitLawItem=item;
				this.showFitLaw=true;
			},
			jqzyDetail(item){
				this.jqzyItem=item;
				this.showJqzy=true;
			},
			
		
		
			
		}
	}
</script>

<style lang="scss">
.item{
	padding:8rpx 10rpx;
	background: #FFFFFF;
	border-bottom: 1px solid #F5F5F5;
}


</style>
