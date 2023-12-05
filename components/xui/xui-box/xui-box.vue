<template>
	<view>
	 <view class="title-box" v-if="showTitle">
	 	<view class="flex alcenter space">
	 		<view class="flex alcenter">
	 			<image style="width: 50rpx;height: 50rpx;" v-if="!!icon" :src="icon"></image>
	 			<text class="ft20 ftw600 cl-main ml10">{{title}}</text>
	 		</view>
	 		<navigator :url="'/pages/box/list?categoryId='+categoryId+'&isHot='+isHot+'&isNew='+isNew+'&title='+title">
	 		<view class="ft14 cl-notice">更多</view>
	 		</navigator>
	 	</view>
	 </view>
	 <media-list :list="list" v-if="showType=='media'"></media-list>
	 <pic-list :list="list" v-if="showType=='pic'"></pic-list>
	 <card-list :list="list" v-if="showType=='card'"></card-list>
	</view>
</template>

<script>
	import mediaList from './media-list'
	import picList from './pic-list'
	import cardList from './card-list'
	export default {
		components:{
			mediaList,picList,cardList
		},
		props:{
			boxType:{
				type:[Number,String],
				default:1
			},
			showTitle:{
				type:Boolean,
				default:true
			},
			icon:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:'幸运盲盒'
			},
			showType:{
				type:String,
				default:'pic'
			},
			merchantId:{
				type:[Number,String],
				default:''
			},
			categoryId:{
				type:[Number,String],
				default:''
			},
			isHot:{
				type:Number,
				default:0
			},
			isNew:{
				type:Number,
				default:0
			},
		
		},
		data() {
			return {
				list:[],
				queryParams:{}
			};
		},
		created() {
			this.queryParams={
				pageNum:1,
				pageSize:5,
				boxType:this.boxType,
				merchantId:this.merchantId,
				categoryId:this.categoryId || '',
				isHot:this.isHot,
				isNew:this.isNew
			}
			this.loadData();
		},
		methods:{
			loadData(){
				this.Api.getBoxList(this.queryParams).then(data=>{
					this.list=data
				})
			},
		}
	}
</script>

<style lang="scss">
	.title-box{
		padding: 20rpx;
		box-sizing: border-box;
	}
.d-header-wrap{
	margin-top: 16rpx;
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
