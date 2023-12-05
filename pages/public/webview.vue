<template>
	<view class="container">
		<view v-if="load">
		<web-view :src="url"></web-view>
		</view>
		
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				title:'',
				url:'',
				load:false
			}
		},
		onLoad(option){
			this.title=option.title;
			this.url=decodeURIComponent(option.url);
			console.log(this.url)
			uni.setNavigationBarTitle({
				title:this.title
			})
			this.load=true;
		},
		methods: {
			
		},

	}
</script>

<style lang='scss'>
	
</style>
