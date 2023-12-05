<template>
	<view class="container">
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<icon type="search" :size='13' color='#333'></icon>
				<input confirm-type="search" placeholder="输入关键字搜索" :focus="true" auto-focus placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="key" @input="inputKey" @confirm="searchDo" />
				<icon type="clear" :size='13' color='#bcbcbc' @click="cleanKey" v-show="key"></icon>
			</view>
			<view class="tui-cancle" @click="searchDo">搜索</view>
		</view>
	   <view v-show="key">
			<view class="tui-header">
				<view class="tui-header-left tui-noboredr" @click="searchDo">搜索 “{{key}}”</view>
			</view>
			<view class="tui-result-box">
				<block v-for="(item,index) in searchList" :key="index">
					<view class="tui-result-item" hover-class="tui-opcity" :hover-stay-time="150">
						<rich-text :nodes="item.showKey"></rich-text>
					</view>
				</block>
			</view>
		</view>
		<view class="tui-search-history" v-show="history.length>0 ">
			<view class="tui-history-header">
				<view class="tui-search-title">搜索历史</view>
				<tui-icon name="delete" :size='14' color='#333' @click="openActionSheet" class="tui-icon-delete"></tui-icon>
			</view>
			<view class="tui-history-content">
				<block v-for="(item,index) in history" :key="index">
					<tui-tag margin="0 24rpx 24rpx 0" type="gray" shape="circle" @click="toSearch(item)">{{item}}</tui-tag>
				</block>
			</view>
		</view>
		

		<view class="tui-search-hot margin-bottom">
			<view class="tui-hot-header">
				<view class="tui-search-title">大家正在搜</view>
			</view>
			<view class="tui-history-content">
				<block v-for="(item,index) in hot" :key="index">
					<tui-tag margin="0 24rpx 24rpx 0" type="gray" shape="circle" @click="toSearch(item)">{{item}}</tui-tag>
				</block>
			</view>
		</view>
		
		<!-- #ifdef MP-QQ -->
		<ad unit-id="0a3829fbcc536395552e06dda877fcef"></ad>
		<!-- #endif -->
		
		<tui-actionsheet :show="showActionSheet" :tips="tips" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
	</view>

</template>

<script>
	const util = require("@/utils/util.js")
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['sysConfig']),
		},
		data() {
			return {
				history: [
					
				],
				hot: [
				
				],
				key: "",
				showActionSheet: false,
				tips: "确认清空搜索历史吗？",
				searchResult:["按照展示的列表输入关键词看效果","thorui","2019退役球星","搜索关键词高亮显示","模拟搜索结果集","开源不易，需要鼓励","人人为我，我为人人"],
				searchList:[]
			}
		},
		watch:{
			sysConfig(nval){
				if(nval.hot_key){
					this.hot=this.sysConfig.hot_key.split(',');
				}
			}
		},
		onShow() {
		   let history=this.$cache.get('$keywords',[]);
		   if(history){
			   this.history=history
		   }
		   if(this.sysConfig && this.sysConfig.hot_key ){
			   console.log(this.sysConfig);
		   		this.hot=this.sysConfig.hot_key.split(',');
		   }
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
			cleanKey: function() {
				this.key = ''
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			openActionSheet: function() {
				this.showActionSheet = true
			},
			itemClick: function(e) {
				let index = e.index;
				if (index == 0) {
					this.showActionSheet = false;
					this.history = []
				}
			},
			inputKey: function(e) {
				this.key = util.trim(e.detail.value);
				if (!this.key) {
					this.searchList = [];
					return;
				}
				//根据关键词查找
				let arr = []
				//实际开发中，根据搜索返回结果集，此处只是做展示提示搜索哪些文字
				// this.searchResult.forEach((item) => {
				// 	arr.push({
				// 		key: item,
				// 		showKey: util.replaceAll(item, this.key, `<label style="color:#E41F19">${this.key}</label>`)
				// 	})
				// })
				this.searchList = arr
			},
			setHistory(key){
				let r=true;
				this.history.forEach(item=>{
					if(item==key){
						r=false;
					}
				})
				if(r){
					this.history.push(key);
					this.$cache.put('$keywords',this.history);
				}
			},
			searchDo(){
				this.setHistory(this.key);
				uni.navigateTo({
					url:'/pages/article/list?keyword='+this.key
				})
			},
			toSearch(item){
				this.setHistory(item);
				uni.navigateTo({
					url:'/pages/article/list?keyword='+item
				})
			}
		}
	}
</script>

<style>
	page {
		color: #333;
		background: #fff;
	}

	.container {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-searchbox {
		padding: 30rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-search-input {
		width: 100%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 28rpx;
	}

	.tui-input-plholder {
		font-size: 28rpx;
		color: #b2b2b2;
	}

	.tui-cancle {
		color: #888;
		font-size: 28rpx;
		padding-left: 30rpx;
		flex-shrink: 0;
	}

	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	.tui-history-content{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.tui-icon-delete {
		padding: 10rpx;
	}

	.tui-search-title {
		font-size: 28rpx;
		font-weight: bold;
	}

	.tui-hot-header {
		padding: 30rpx 0;
	}
	
	.tui-header {
		padding: 26rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-header-left {
		font-size: 30rpx;
		color: #222;
		border-left: 4rpx solid #EB0909;
		padding-left: 10rpx;
		word-break: break-all;
	}
	
	.tui-noboredr {
		border-left: 0 !important;
	}

	.tui-result-box {
		font-size: 28rpx;
	}
	
	.tui-result-item {
		line-height: 28rpx;
		padding: 28rpx 0;
	}
</style>