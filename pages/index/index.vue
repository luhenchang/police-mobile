<template>
	<view class="container">
		<view class="tui-status-bar"></view>
		<xui-report-card :count="count"></xui-report-card>
		<u-popup v-model="showCard" class="card" mode='center' width="100%" background="none" :custom-style="{'background':'none'}" close-icon-pos="top-left">
				<view class="card">
						<view class="line"> <text class="label">警情序号：</text><text class="text">{{detail.jingSn}}</text></view>
						<view class="line"> <text class="label">反映问题：</text></view>
						<view class="panel-white">
							<text class="text">{{detail.content}}</text>
						</view>
						
						<view class="panel-white flex-row between">
							<u-button type="primary" size="medium" class="mb5" @click="compare()">智能比对</u-button>
							<u-button type="error" size="medium"  class="mb5"  v-if="detail.status==0 && role.banan" @click="receive()">接收警情</u-button>
						</view>
				</view>
		</u-popup>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
		import push from '@/utils/push.js'
	// #endif

	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		components:{
		},
		
		data() {
			return {
				count:0,
				showCard:false,
				detail:{},
				queryParams:{
					pageNum:1,
					pageSize:5,
					type:2,
					status:0
				}
		  }
		},
		onShow() {
			this.count++
			this.getPolice();
		},
		onLoad(option){
			if(!this.hasLogin){
				this.navToLogin()
			}
		},
		onPullDownRefresh() {
			this.count++
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.count++
			uni.stopPullDownRefresh();
		},
	
		methods: {
			getPolice(){
				this.Api.getCasePoliceList(this.queryParams).then(data=>{
					let list=data.rows;
					let id=this.$cache.get("popId");
					if(list.length>0 && list[0].status==0 && id!=list[0].id){
						this.detail=list[0];
						this.showCard=true;
						this.$cache.put("popId",list[0].id)
					}
				});
			},
			compare(){
				uni.navigateTo({
					url:'/pages/index/police-compare?id='+this.detail.id
				})
				this.showCard=false;
			},
			receive(){
				this.Api.policeReceive(this.detail).then(data=>{
					this.$toast('警情接收成功');
					this.showCard=false;
					this.$emit('reload');
				})
			},
			
		}
	}
</script>

<style lang="scss">

.list-scroll-content{
	height: calc(100vh - 180rpx);
}
</style>
