<template>
	<view class="pannel-white page-margin-bottom" >
		<view class="" v-if="!showPay">
			<view class="center panel-white sub-txt">IOS 不支持购买会员，请使用Android系统 </view>
		</view>
		<view v-else>
			<u-radio-group v-model="role" @change="radioGroupChange" :wrap="true">
				<u-radio v-for="(item,index) in list"
					class="radio-wrap"
					:key="index"
					:name="item.memberId">
					<view class="pannel-white">
						<view class="vip-icon-wrap">
						 <image :src="item.icon" class="icon"></image>	<text class="margin-lr">{{item.memberName}}</text>  <text class='price'>{{item.memberPrice}}</text> <text class='market-price'>{{item.marketPrice}}</text>
						</view>
						<view>
							<u-parse :html="item.content"></u-parse>
						</view>
					</view>
				</u-radio>
		    </u-radio-group>
				<view v-if="showPayType">
				<view class="pannel-white">
					支付方式
				<u-radio-group v-model="payType"  :wrap="true">
							<u-radio 
							class="radio-wrap"
										v-for="(item, index) in payList" :key="index" 
										:name="item.name"
									>
									<view class="pannel-white">
										<u-parse  class="" v-html="item.value"></u-parse>
										
									</view>
									</u-radio>
					</u-radio-group>
					</view>
				</view>
			
				
				<view class=" bottom-btn"  >
						<u-button type="primary"  shape="circle" :ripple="true"  @click="submitOrder()">立即支付</u-button>
				</view>
		</view>
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  role:1,
			  list:[],
			  showPayType:true,
			  showPay:true,
			  payType:'wxpay',
			  order:{},
			  platform:'',
			  payList:[
				  {name:'ali_pay',
				  label:'支付宝支付',
				   value:"<text class='iconfont icon-zhifubao1 alipay'></text> ",
				  },
				  {name:'wxapp_pay',
				  label:'微信支付',
				   value:"<text class='iconfont icon-weixinzhifu2 wxpay'></text> ",
				  },
				],
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pages/auth/login/login'
					})
					return;
				}
				this.getMemberConfig();
				const res = uni.getSystemInfoSync();
				console.log(res);
				this.platform=res.platform;
				// #ifdef H5
				this.showPay=true;
				if(this.$helper.isWechat()){
					this.showPayType=false;
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				this.showPayType=false;
				// #endif
				
				// #ifdef MP-BAIDU
				this.showPayType=false;
				if(this.platform == 'ios' && this.sysConfig.baidu_online==0){
					this.showPay=false;
				}else{
					this.showPay=true;
				}
				// #endif
				
				// #ifdef MP-TOUTIAO
				this.showPayType=false;
				// #endif
				
				// #ifdef APP-PLUS
				if(this.platform == 'ios' && this.sysConfig.ios_online==0){
					this.showPay=false;
				}else{
					this.showPay=true;
				}
				// #endif
				
				
				
			},
			getMemberConfig(){
				this.Api.getMemberConfig().then(data=>{
					this.list=data;
				})
			},
			radioGroupChange(e){
				console.log(e)
			},
			submitOrder(){
				if(!this.role){
				        this.$alert('请选择会员级别!');
				        return;
				}
				// #ifdef H5
				if(this.$helper.isWechat()){
					this.payType='wxmp_pay';
				}
				// #endif
				
				// #ifdef MP-WEIXIN
				this.payType='wxma_pay';
				// #endif
				
				// #ifdef MP-ALIPAY || MP-TOUTIAO
				this.payType='ali_pay';
				// #endif
				
				// #ifdef MP-BAIDU
				this.payType='baidu';
				// #endif
				
				let params={
					memberId:this.role,
					runtime:this.$helper.getRuntime(),
					payType:this.payType,
					orderType:1
				}
				uni.showLoading({
					title:'正在支付...'
				})
				this.Api.submitOrder(params).then(data=>{
					console.log(data)
					this.orderInfo=data;
					this.pay(data.orderId,"wxma_pay");
				})
			},
			// payDo(data){
			// 		let self=this;
			// 	// #ifdef MP-WEIXIN
			// 	let orderInfo=data.payInfo;
			// 	uni.requestPayment({
			// 		provider:'wxpay',
			// 		...orderInfo,
			// 		success:function(rs) {
			// 			console.log(rs);
			// 			uni.navigateTo({
			// 				url:"/pages/user/pay-result?result=success&amount="+self.order.amount+"&orderid="+self.order.id
			// 			})
			// 		},
			// 		fail: (e) => {
			// 			console.log(e);
			// 			uni.navigateTo({
			// 				url:"/pages/user/pay-result?result=fail&amount="+self.order.amount+"&orderid="+self.order.id
			// 			})
			// 		}
			// 	})
			// 	// #endif
				
			// 	// #ifdef MP-BAIDU
			// 	uni.requestPayment({
			// 		provider:this.payType,
			// 		orderInfo:data.payInfo,
			// 		success:function(rs) {
			// 			console.log(rs);
			// 			uni.navigateTo({
			// 				url:"/pages/user/pay-result?result=success&amount="+self.order.amount+"&orderid="+self.order.id
			// 			})
			// 		},
			// 		fail: (e) => {
			// 			console.log(e);
			// 			uni.navigateTo({
			// 				url:"/pages/user/pay-result?result=fail&amount="+self.order.amount+"&orderid="+self.order.id
			// 			})
			// 		}
			// 	})
			//    // #endif
				
			// 	// #ifdef APP-PLUS || MP-TOUTIAO
			// 	if(this.payType=='alipay'){
			// 		uni.requestPayment({
			// 			provider:this.payType,
			// 			orderInfo:data.payInfo,
			// 			success:function(rs) {
			// 				console.log(rs);
			// 				uni.navigateTo({
			// 					url:"/pages/user/pay-result?result=success&amount="+self.order.amount+"&orderid="+self.order.id
			// 				})
			// 			},
			// 			fail: (e) => {
			// 				console.log(e);
			// 				uni.navigateTo({
			// 					url:"/pages/user/pay-result?result=fail&amount="+self.order.amount+"&orderid="+self.order.id
			// 				})
			// 			}
			// 		})
			// 	}else{
			// 		uni.requestPayment({
			// 			provider:this.payType,
			// 			orderInfo:JSON.stringify(data.payInfo),
			// 			success:function(rs) {
			// 				console.log(rs);
			// 				uni.navigateTo({
			// 					url:"/pages/user/pay-result?result=success&amount="+self.order.amount+"&orderid="+self.order.id
			// 				})
			// 			},
			// 			fail: (e) => {
			// 				console.log(e);
			// 				uni.navigateTo({
			// 					url:"/pages/user/pay-result?result=fail&amount="+self.order.amount+"&orderid="+self.order.id
			// 				})
			// 			}
			// 		})
			// 	}
				
			// 	// #endif
			// },
			//  wechatPay(data){
			//         let param=data.orderInfo;
			//         let self=this;
			//         WeixinJSBridge.invoke(
			//             'getBrandWCPayRequest', data.payInfo,
			//             function(res){
			//               if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			//                 self.Api.paySuccess({id:param.id,payType:'JSAPI'}).then(data=>{
			//                    param.res='success';
			//                    uni.navigateTo({
			//                    	url:"/pages/user/pay-result?result=success&amount="+self.order.amount+"&orderid="+self.order.id
			//                    })
			//                })
			//               } else {
			//                 param.res='fail';
			// 				uni.navigateTo({
			// 					url:"/pages/user/pay-result?result=fail&amount="+self.order.amount+"&orderid="+self.order.id
			// 				})
			//               }
			//             }
			//         );
			// },
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
	.radio-wrap{
		width: 100%;
		border-bottom: 1px solid #F5F5F5;
		background: #FFFFFF;
	}
	
</style>
