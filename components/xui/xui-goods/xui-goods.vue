<template>
	<view>
	<view class="title-box">
		<view class="flex alcenter space">
			<view class="flex alcenter">
				<image style="width: 50rpx;height: 50rpx;" v-if="!!icon" :src="icon"></image>
				<text class="ft16 ftw600 cl-main ml10">{{title}}</text>
			</view>
			<navigator url="/pages/mall/cate">
			<view class="ft14 cl-notice">更多</view>
			</navigator>
		</view>
		</view>
		<xui-goods-list :list="list" :show-type="showType"></xui-goods-list>
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
				default:'pic'
			},
			title:{
				type:String,
				default:''
			},
			icon:{
				type:String,
				default:''
			},
			isHot:{
				type:[String,Number],
				default:0
			},
			isNew:{
				type:[String,Number],
				default:0
			},
			merchantId:{
				type:[String,Number],
				default:''
			},
			merchantType:{
				type:[String,Number],
				default:''
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
				isot:this.isHot,
				isNew:this.isNew,
				merchantId:this.merchantId,
				merchantType:this.merchantType
			}
			this.loadData();
		},
		methods:{
			loadData(){
				this.Api.getGoodsList(this.queryParams).then(data=>{
					this.list=data.rows;
					console.log(this.list,data)
				})
			},
		}
	}
</script>

<style lang="scss">
.title-box{
	padding: 20rpx;
}
</style>
