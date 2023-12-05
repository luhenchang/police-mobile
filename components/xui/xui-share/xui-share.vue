<template>
     <view > 
	<!--底部分享弹窗-->
	
	<!-- #ifndef APP-PLUS || MP -->
	<view v-if="show" class="mask" @click="toggleMask" @touchmove.stop
		:style="{backgroundColor: config.backgroundColor}"
	>
		<view 
		class="mask-tips"
		@click.stop
		:style="[{
			height: '100%', 
			transform: transform
		}]"
		>
		<view class="img-wrapper">
			<image src="/static/images/share/arrow_share.png"></image>
		</view>
		
		<view class="tips">
		   点击右上角 ... 分享给朋友或朋友圈
		</view>
		<view class="bottom b-t" @click="toggleMask">取消</view>
		</view>
	</view>
	<!-- #endif -->
			
			

     </view>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import uniShare from '@/components/uni-share/js_sdk/uni-share.js';
export default {
  computed: {
  	...mapState(['sysConfig'])
  },
  props:{
	contentHeight:{
		type: Number,
		default: 0
	},
	//是否是tabbar页面
	hasTabbar:{
		type: Boolean,
		default: false
	},
	content:{
		type:Object,
		default:function(){
			return {};
		}
	}
  },
  data () {
    return {
		show:false,
      
      }
  },

  created(){
	  const height = uni.upx2px(this.contentHeight) + 'px';
	  this.config = {
		height: height,
		transform: `translateY(${height})`,
		backgroundColor: 'rgba(0,0,0,.6)',
	  }
	  this.transform = this.config.transform;
  },
  methods:{
	 share(){
		 // #ifdef APP-PLUS
		 this.uniShare();
		 // #endif
		 
		 // #ifdef H5 
		 this.toggleMask();
		 // #endif
	 },
	 toggleMask(){
	 	//防止高频点击
	 	if(this.timer == 1){
	 		return;
	 	}
	 	this.timer = 1;
	 	setTimeout(()=>{
	 		this.timer = 0;
	 	}, 500)
	 	
	 	if(this.show){
	 		this.transform = this.config.transform;
	 		this.backgroundColor = 'rgba(0,0,0,0)';
	 		setTimeout(()=>{
	 			this.show = false;
	 			this.hasTabbar && uni.showTabBar();
	 		}, 200)
	 		return;
	 	}
	 	
	 	this.show = true;
	 	//等待mask重绘完成执行
	 	if(this.hasTabbar){
	 		// #ifndef MP
	 		uni.hideTabBar({
	 			success: () => {
	 				setTimeout(()=>{
	 					this.backgroundColor = this.config.backgroundColor;
	 					this.transform = 'translateY(0px)';
	 				}, 10)
	 			}
	 		});
	 		// #endif
	 		// #ifdef MP
	 				setTimeout(()=>{
	 					this.backgroundColor = this.config.backgroundColor;
	 					this.transform = 'translateY(0px)';
	 				}, 10)
	 			
	 		// #endif
	 		
	 	}else{
	 		setTimeout(()=>{
	 			this.backgroundColor = this.config.backgroundColor;
	 			this.transform = 'translateY(0px)';
	 		}, 10)
	 	}
	 },
     uniShare() {
                uniShare({
                    content: { //公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
                        type: 0,
                        href: 'http://www.dcfuture.com.cn/xbzw.html',
                        title: this.sysConfig.website_name,
                        summary: this.sysConfig.seo_description,
                        imageUrl: this.sysConfig.logo
                    },
                    menus: [{
                            "img": "/static/images/sharemenu/wechatfriend.png",
                            "text": "微信好友",
                            "share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
                                "provider": "weixin",
                                "scene": "WXSceneSession"
                            }
                        },
                        {
                            "img": "/static/images/sharemenu/wechatmoments.png",
                            "text": "微信朋友圈",
                            "share": {
                                "provider": "weixin",
                                "scene": "WXSenceTimeline"
                            }
                        },
                        // {
                        //     "img": "/static/images/sharemenu/mp_weixin.png",
                        //     "text": "微信小程序",
                        //     "share": {
                        //         provider: "weixin",
                        //         scene: "WXSceneSession",
                        //         type: 5,
                        //         miniProgram: {
                        //             id: 'gh_10f39437b61e',//微信小程序原始ID
                        //             path: '/pages/index/index',
                        //             webUrl: '/#/pages/index/index',
                        //             type: 0
                        //         },
                        //     }
                        // },
                        {
                            "img": "/static/images/sharemenu/weibo.png",
                            "text": "微博",
                            "share": {
                                "provider": "sinaweibo"
                            }
                        },
                        {
                            "img": "/static/images/sharemenu/qq.png",
                            "text": "QQ",
                            "share": {
                                "provider": "qq"
                            }
                        },
                        {
                            "img": "/static/images/sharemenu/copyurl.png",
                            "text": "复制",
                            "share": "copyurl"
                        },
                        {
                            "img": "/static/images/sharemenu/more.png",
                            "text": "更多",
                            "share": "shareSystem"
                        }
                    ],
                    cancelText: "取消分享",
                }, e => { //callback
                    console.log(e);
                })
            }
        
  }
}
</script>


<style lang="scss">
	/* 隐藏scroll-view滚动条*/
uni-scroll-view{
	::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
}  
.mask{
		position:fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display:flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		.bottom{
			position:absolute;
			left: 0;
			bottom: 0;
			display:flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90rpx;
			background: #fff;
			z-index: 9;
			font-size: $font-base + 2rpx;
			color: $font-color-dark;
		}
	}
	.mask-tips{
		width: 100%;
		height: 100%;
		transition: .3s;
		background: transparent;
		
		.img-wrapper{
			width: 100%;
			height: 400rpx;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-end;
		}
		image{
			width: 100%;
			height: 500rpx;
		}
		.tips{
		    width: 100%;
			flex-direction: row;
			display: flex;
			margin:40rpx;
			color: #fff;
			font-size: $font-lg;
			justify-content: center;
		}
		
	}
	
	.mask-content{
		width: 100%;
		height: 580rpx;
		transition: .3s;
		background: #fff;
		&.has-bottom{
			padding-bottom: 90rpx;
		}
		.view-content{
			height: 100%;
		}
	}
	.share-header{
		height: 110rpx;
		font-size: $font-base+2rpx;
		color: font-color-dark;
		display:flex;
		align-items:center;
		justify-content: center;
		padding-top: 10rpx;
		&:before, &:after{
			content: '';
			width: 240rpx;
			heighg: 0;
			border-top: 1px solid $border-color-base;
			transform: scaleY(.5);
			margin-right: 30rpx;
		}
		 &:after{
			 margin-left: 30rpx;
			 margin-right: 0;
		 }
	}
	.share-list{
		display:flex;
		flex-wrap: wrap;
	}
	.share-item{
		min-width: 33.33%;
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180rpx;
		image{
			width: 80rpx;
			height: 80rpx;
			margin-bottom: 16rpx;
		}
		text{
			font-size: $font-base;
			color: $font-color-base;
		}
	}
</style>