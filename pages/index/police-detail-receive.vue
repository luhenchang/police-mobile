<template>
	<view class="container">
		<view class=" page-margin-bottom padding-bottom">
			<view class="pannel-white mb10">
				
					<view class="line"> <text class="label">警情序号：</text><text class="text">{{detail.jingSn}}</text></view>
					<view class="line"> <text class="label">承办单位：</text><text class="text">{{detail.deptName}}</text></view>
					<view class="line"> <text class="label">承办人：</text><text class="text">{{detail.dealUser}}</text></view>
					<view class="line"> <text class="label">反映问题：</text></view>
					<view class="panel-white">
						<text class="text">{{detail.content}}</text>
					</view>
			</view>
			<view class="pannel-white mb10">
					<view class="line"> <text class="label big">派出所处警反馈：</text><text class="text">{{detail.dealFeedback}}</text></view>
			</view>
			
		</view>
		<view class="bottom-btn flex-center " style="flex-wrap: wrap;padding-top: 16rpx;background: #FFFFFF;">
			<u-button type="primary" size="medium" class="mb5" @click="compare()">智能比对</u-button>
				<u-button type="error" size="medium"  class="mb5"  v-if="detail.status==0 && role.banan" @click="receive()">接收警情</u-button>
				<u-button type="warning" size="medium"  class="mb5" v-if="detail.status==1 && role.banan" @click="deal()">警情处置</u-button>
				<!-- <u-button type="primary" size="medium"  class="mb5" v-if="detail.callPhone"  @click="history()">历史警情</u-button> -->
			
		</view>
		<xui-case-police-deal ref="deal" :id="id" v-if="showDeal" @reload="reload"></xui-case-police-deal>
		<xui-case-police-daji ref="daji" :id="id" v-if="showDaji"  @reload="reload"></xui-case-police-daji>
		<xui-case-police-review ref="review" :id="id" v-if="showReview"  @reload="reload"></xui-case-police-review>
		<xui-case-police-edit ref="edit" :id="id" v-if="showEdit"  @reload="reload" />
	</view>
</template>

<script>
	 import uniCopy from '@/utils/uni-copy.js'
	export default {
		data() {
			return {
				id:'',
				detail:{},
				meta:{},
				isFavorite:false,
				loading:true,
				showDeal:false,
				showDaji:false,
				showReview:false,
				showEdit:false,
				style: {
						p: 'line-height:1.8',
						div: 'line-height:1.8'
					}
				}
		},
	
		onLoad(option){
			console.log(option);
			this.id=option.id;
			this.getList();
		},
		onShow(){
			if(!!this.id){
				this.getList();
			}
		},
		methods: {
			getList(){
			   this.Api.getCasePolice({id:this.id,type:2}).then(data=>{
				   this.detail=data;
				   uni.setNavigationBarTitle({
				   	title:data.title
				   })
				   this.loading=false;
				 
			   })
			},
			reload(){
				this.getList();
			},
			preImg(img){
				uni.previewImage({
					current:0,
					urls:[img]
				})
			},
			compare(){
				uni.navigateTo({
					url:'/pages/index/police-compare?id='+this.id
				})
			},
			history(){
				uni.navigateTo({
					url:'/pages/index/police-history?callPhone='+this.detail.callPhone
				})
			},
			
			receive(){
				this.Api.policeReceive(this.detail).then(data=>{
					this.$toast('警情接收成功');
					this.$emit('reload');
				})
			},
			deal(){
				this.showDeal=true;
				let self=this;
				setTimeout(function(){
					self.$refs.deal.open();
				},100);
				
			},
			edit(){
				this.showEdit=true;
				let self=this;
				setTimeout(function(){
					self.$refs.edit.open();
				},100);
			},
			daji(){
				this.showDaji=true;
				let self=this;
				setTimeout(function(){
					self.$refs.daji.open();
				},100);
			},
			review(){
				this.showReview=true;
				let self=this;
				setTimeout(function(){
					self.$refs.review.open();
				},100);
			},
			finish(){
				this.Api.policeFinish(this.detail).then(data=>{
					this.$toast('操作成功');
					this.reload();
				})
			},
			assign(){
				uni.navigateTo({
					url:'/pages/index/police-assign?id='+this.id
				})
			}
		
			
		}
	}
</script>

<style lang="scss">
uni-button,button{
		line-height: 1;
		background: none;
		border:none;
		&::after{
			border: none;
		}
	}
.active{
	color: $base-color !important;
}
.sub-wrap{
	padding: 10rpx 0;
	margin-bottom: 10rpx;
	display: flex;
	justify-content: space-between;
}
.icon{
	width: 35rpx;
	height: 35rpx;
	margin-right: 10rpx;
}
.pannel-white{
	padding: 30rpx 12rpx;
}

</style>
