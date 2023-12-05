<template>
		<view class="goods-section">
			<view 
				v-for="(item, index) in list" :key="index"
				class="goods-item"
				@click="toDetail(item)"
				>
				<view class="image-wrapper">
						<image :src="item.thumb" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.name}}</text>
				<view class="clamp-2 sub-title" >{{item.summary || item.sub_title}}</view>
			</view>
		</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>{
					return [];
				}
			},
			level:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:'/pages/product/product?id='+item.id
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
