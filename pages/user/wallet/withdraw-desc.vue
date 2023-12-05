<template>  
    <view class="container">  
		<view >
				<scroll-view scroll-y class="scroll-list-content">
				<!-- <u-parse v-if="!!data" :content="data"></u-parse> -->
				<rich-text :nodes="data"></rich-text>
				</scroll-view>
				
			</view>
		</view>
			
		
    </view>  
</template>  
<script>  
	import uParse from '@/components/uParse/src/wxParse.vue'
    import {  
        mapState,mapMutations 
    } from 'vuex';  
	
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			uParse
		},
		data(){
			return {
				data:''
			}
		},
		onShow(){
		},
		
		onLoad(){
			this.getData();
		},
		
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
		onShareAppMessage(res){
			  console.log(res);
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '凯洛琦',
			  path: '/pages/public/register?inviteCode='+this.userInfo.invite_code
			}
		},
        methods: {
			
			getData(){
			   this.Api.getPage({page:'withdraw-desc'}).then(data=>{
				   this.data=data;
			   })	
			}
			
        }  
    }  
</script>  
<style lang='scss'>

.scroll-list-content{
	background: #fff;
	padding: 40upx 20upx;
	height: 100vh;
}

.wxParse{
	line-height: 1.5 !important;
}
	
</style>