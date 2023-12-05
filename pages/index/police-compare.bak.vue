<template>
	<view class="container">
		<view class=" padding-bottom">
			<view class="brief">
				<view class="line "> <text class="label ">案/事件编号：</text><text class="text">{{detail.caseNo}}</text></view>
				<view class="line"> <text class="label">警情名称：</text><text class="text">{{detail.name}}</text></view>
				<view class="line"> <text class="label">反映问题：</text>
				<text class="text">{{detail.content}}</text></view>
			
			</view>
			<view class="card">
				<view class="title-bold mb10">市局通报</view>
				<view class="item  " v-for="(item,index) in directorReportList" :key="index" @click="directorReportDetail(item)">
						<view class="clamp-2">{{index+1}} 、{{item.caseContent}}</view>
				</view>
			</view>
			
			<view class="card">
				<view class="title-bold mb10">执法办案平台</view>
				<view class="item " v-for="(item,index) in platformList" :key="index" @click="platformDetail(item)">
					<view class="clamp-2"> {{index+1}} 、{{item.caseContent}}</view>
				</view>
			</view>
			
			
		
			<view class="card">
				<view class="title-bold mb10">适用法律</view>
				<view class="item " v-for="(item,index) in fitLawList" :key="index" @click="fitLawDetail(item)">
				<view class="clamp-2">	{{index+1}} 、{{item.law}}</view>
				</view>
			</view>
		
		<view class=" page-margin-bottom">
			<view class="card">
				<view class="title-bold mb10">执法指引</view>
				<view class="item " v-for="(item,index) in executeLawList" :key="index" @click="executeLawDetail(item)">
				<view class="clamp-2">	{{index+1}} 、{{item.caseName || item.question ||item.caseExample}}</view>
				</view>
			</view>
		</view>
			
		</view>
		<u-popup v-model="showPlatform" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">执法办案平台</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{platformItem.caseName}}</text></view>
				<view class="line b-b"> <text class="label  left">案件类型：</text><text class="text">{{platformItem.caseType}}</text></view>
				<view class="line b-b"> <text class="label left">主案别：</text><text class="text">{{platformItem.mainType}}</text></view>
				<view class="line "> <text class="label left">简要案情：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{platformItem.caseBrief}}</text>
				</view>
				<view class="line "> <text class="label left">警情内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{platformItem.caseContent}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showDirectorReport" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">市局通报</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{directorReportItem.caseName}}</text></view>
				<view class="line b-b"> <text class="label left">案件编号：</text><text class="text">{{directorReportItem.caseSn}}</text></view>
				<view class="line b-b"> <text class="label left">问题：</text><text class="text">{{directorReportItem.question}}</text></view>
				<view class="line b-b"> <text class="label  left">案件类别：</text><text class="text">{{directorReportItem.caseNature}}</text></view>
				<view class="line b-b"> <text class="label  left">关键字：</text><text class="text">{{directorReportItem.keyword}}</text></view>
				
				<view class="line "> <text class="label left">简要案情：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.caseBrief}}</text>
				</view>
				<view class="line "> <text class="label left">警情内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.caseContent}}</text>
				</view>
				<view class="line "> <text class="label left">市局通报：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.directorReport}}</text>
				</view>
				<view class="line "> <text class="label left">派出所回复：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{directorReportItem.stationReply}}</text>
				</view>
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showFitLaw" mode="bottom" border-radius="10" height="80%" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">适用法律</view>
				<view class="line b-b"> <text class="label ">案由：</text><text class="text">{{fitLawItem.caseReason}}</text></view>
				<view class="line b-b"> <text class="label ">法条：</text><text class="text">{{fitLawItem.law}}</text></view>
				<view class="line "> <text class="label ">警条内容：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{fitLawItem.policeBlotters}}</text>
				</view>
				
			</view>
			</view>
		</u-popup>
		
		<u-popup v-model="showExecuteLaw" mode="bottom" height="80%" border-radius="10" closeable>
			<view class="padding-bottom">
			<view class="panel-white ">
				<view class="title-bold mb10">执法指引</view>
				<view class="line b-b"> <text class="label left">案件名称：</text><text class="text">{{executeLawItem.caseName}}</text></view>
				<view class="line "> <text class="label left">问题：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.question}}</text>
				</view>
				<view class="line "> <text class="label left">典型案例：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.caseExample}}</text>
				</view>
				<view class="line "> <text class="label left">市局标准：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.directorStandard}}</text>
				</view>
				<view class="line "> <text class="label left">派出所管制情况：</text></view>
				<view class="panel-white b-b">
					<text class="text">{{executeLawItem.stationSituation}}</text>
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
				showPlatform:false,
				showDirectorReport:false,
				showFitLaw:false,
				showExecuteLaw:false,
				platformItem:{},
				directorReportItem:{},
				fitLawItem:{},
				executeLawItem:{},
			}
				
		},
		onLoad(option){
			console.log(option);
			this.id=option.id;
			this.getList();
		},
		methods: {
			getList(){
			   this.Api.getCasePolice({id:this.id}).then(data=>{
				   this.detail=data;
				   this.loading=false;
				   this.Api.policeCompare({content:data.content}).then(data=>{
					   this.queryParams.keywordList=data;
					   this.getCaseDirectorReportList();
					   this.getCasePlatformtList();
					   this.getCaseExcuteLawList();
					   this.getCaseFitLawList();
				   })
			   })
			 
			},
			getCaseDirectorReportList(){
				this.Api.getCaseDirectorReportList(this.queryParams).then(data=>{
					this.directorReportList=data.rows;
				})
			},
			getCasePlatformtList(){
				this.Api.getCasePlatformtList(this.queryParams).then(data=>{
					this.platformList=data.rows;
				})
			},
			getCaseFitLawList(){
				this.Api.getCaseFitLawList(this.queryParams).then(data=>{
					this.fitLawList=data.rows;
				})
			},
			getCaseExcuteLawList(){
				this.Api.getCaseExcuteLawList(this.queryParams).then(data=>{
					this.executeLawList=data.rows;
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
