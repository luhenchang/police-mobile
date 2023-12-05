<template>
	<!-- 头部轮播 -->
	<view class="footer center" :class="{'tab-bar':hasTabbar,'fixed':isFixed}">
		
		<view class="sub-txt">全国注册备案号：{{sign}}</view>
		<view class="sub-txt">{{sysConfig['app.copyright']}} </view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	// #ifdef APP-PLUS
		var signAuthModule=uni.requireNativePlugin("SignAuthModule");
	// #endif

	export default {
		props:{
			position:{
				type:String,
				default:'home'
			},
			hasTabbar:{
				type:Boolean,
				default:false
			},
			isFixed:{
				type:Boolean,
				default:true
			}
		},
		computed:{
			...mapState(['userInfo','city','sysConfig'])
		},
		data() {
			return {
			  date:this.$helper.formatYear(),
			  sign:''
			};
		},
		created() {
			// #ifdef APP-PLUS
			this.getSign();
			// #endif
			
		},
		methods:{
			getSign(){
				// 获取全国注册备案号
				// #ifdef APP-PLUS
				var ret = signAuthModule.getSignNum()
				console.log(ret)
				this.sign=ret;
				// #endif
				
			}
		}
		
	}
</script>

<style lang="scss">
.footer{
	padding: 30rpx;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 2;
	&.tab-bar{
		/* #ifdef H5 */
			bottom: 90rpx;
		/* #endif */
	}
	&.fixed{
		position: fixed;
	}
}
</style>
