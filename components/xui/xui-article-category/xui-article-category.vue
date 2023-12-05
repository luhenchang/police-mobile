<template>
	<!-- 分类-->
	<view>
		<view class="cate-section" >
			<u-grid :col="4" :border="false" bg-color="#fafafa">
					<u-grid-item v-for="(n,k) in list" :key="k"
					 :custom-style="itemStyle"
					 @click="itemClick(n)" >
						<view class="icon-wrap">
							<image class="icon-image" :src="n.categoryImg" mode="aspectFit"></image></view>
						<view class="grid-text">{{n.categoryName}}</view>
					</u-grid-item>
			</u-grid>
		</view>
	</view>
	
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex';
	export default {
		props:{
			pName:{
				type:String,
				default:''
			},
			parentId:{
				type:String,
				default:''
			},
		},
		data() {
			return {
				list:[],
				swiperCurrent:0,
				swiperLength:0,
				queryParams:{},
				itemStyle:{
					'padding':'20rpx 0',
					'white-space':'nowrap',
					'overflow':'hidden'
				}
			};
		},
		created() {
			this.queryParams={
				pName:this.pName,
				parentId:this.parentId
			}
			this.getList();
		},
		methods:{
			getList(){
			 this.Api.getArticleCategory(this.queryParams).then(data=>{
				 this.list=data;
			 })	
			},
			itemClick(item){
				this.navTo("/pages/article/list?categoryId="+item.categoryId+"&categoryName="+item.categoryName)
			},
			
		}
	}
</script>

<style lang="scss">
	
	.icon-wrap{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 12rpx;
		image{
			width: 90rpx;
			height: 90rpx;
		}
	}
	.grid-text{
		color: #666666;
		font-size: 26rpx;
	}
	
	.cate-section{
		margin-top:20rpx;
	}
</style>
