<template>
	<view >
	<view class="article-box">
		<view class="flex alcenter space">
			<view class="flex alcenter">
				<image style="width: 50rpx;height: 50rpx;" v-if="!!icon" :src="icon"></image>
				<text class="ft16 ftw600 cl-main ml10">{{title}}</text>
			</view>
			<navigator :url="'/pages/article/list?flag='+flag+'&cname='+cname+'&cid='+cid+'&title='+title">
			<view class="ft14 cl-notice">更多</view>
			</navigator>
		</view>
	</view>
		<xui-article-list :list="list" ></xui-article-list>
		<u-loadmore  bg-color="#f5f5f5" @loadmore="loadMore" v-if="loadStatus=='loading' || showMore" :status="loadStatus" icon-type="circle" :load-text="loadText" />
	</view>
</template>

<script>
	
	export default {
		props:{
			type:{
				type:Number,
				default:1
			},
			showType:{
				type:String,
				default:'media'
			},
			title:{
				type:String,
				default:''
			},
			icon:{
				type:String,
				default:''
			},
			flag:{
				type:String,
				default:''
			},
			cname:{
				type:String,
				default:''
			},
			cid:{
				type:String,
				default:''
			},
			pageSize:{
				type:Number,
				default:10
			},
			showMore:{
				type:Boolean,
				default:false
			}
		
		},
		data() {
			return {
				list:[],
				queryParams:{},
				loadStatus:'loading',
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				}
				
			};
		},
		created() {
			this.queryParams={
				pageIndex:1,
				pageSize:this.pageSize,
				flag:this.flag || '',
				cname:this.cname || '',
				cid:this.cid || ''
			}
			this.loadData();
		},
		methods:{
			loadData(){
				this.loadStatus='loading';
				this.Api.getArticleList(this.queryParams).then(data=>{
					if(this.queryParams.pageIndex==1){
						this.list=data;
					}else{
						this.list=this.list.concat(data);
					}
					
					if(data.length==0){
						this.loadStatus='nomore';
					}else{
						this.loadStatus='loadmore';
					}
				})
			},
			loadMore(){
				this.queryParams.pageIndex++;
				this.loadData();
			}
		}
	}
</script>

<style lang="scss">
.d-header-wrap{
	margin-top: 16rpx;
}
.article-box{
	padding: 20rpx;
	box-sizing: border-box;
}
.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80rpx;
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20rpx;
				background: #FAFAFA;
				position: relative;
				z-index: 1;
			}
			.tit2{
				font-size: $font-sm;
				color: $font-color-light;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300rpx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
}
</style>
