import config from '../config/index'
import querystring from './querystring/index.js'
import cache from './cache.js'
import Api from '@/api/index.js'
export default {
  weChatLogin(){
    let appid=config.appid;
    var hash=location.hash;
    let redirectUrl=location.href.split('?')[0];
    if(redirectUrl.indexOf('#')<=-1){
        redirectUrl=redirectUrl+hash;
    }
    location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(redirectUrl)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
  },
  wechatConfig(){
    let url=location.href.split('#/')[0];
	let self=this;
     Api.getJsApi({url:url}).then(
         data=>{
		 let config={
			 debug:false,
			 appId:data.appId,
			 timestamp:data.timestamp,
			 nonceStr:data.nonceStr,
			 signature:data.signature,
			 jsApiList:[	
					"updateAppMessageShare",
					"updateTimelineShare",
					"updateAppMessageShareData",
					"updateTimelineShareData",
					"onMenuShareTimeline",
					"onMenuShareAppMessage",
					"onMenuShareQQ",
					"onMenuShareWeibo",
					"onMenuShareQZone",
					"checkJsApi"
			 ]
		 }
         wx.config(config);
		 self.setWechatShare();
         }
     )
 },
 //设置公众号网页分享
 setWechatShare(page,name,img){
	 let userInfo=cache.get('userInfo');
	 if(!page){
			page ='?inviteCode='+userInfo.invite_code;
	 }
	let shareUrl=config.mpHost+'?page='+encodeURIComponent(page);
	console.log('wechat share setting',shareUrl);
	//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
	 wx.updateAppMessageShareData({ 
        title: name || '学霸作文', // 分享标题
        desc: '【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半', // 分享描述
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:img || (config.imgHost+'/logo.png'), // 分享图标
        success: function () {
          // 设置成功
        }
    })
	
	wx.updateTimelineShareData({ 
        title: name ||  ('【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半'), // 分享标题
        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: img || (config.imgHost+'/logo.png'), // 分享图标
        success: function () {
          // 设置成功
        }
    })
	
	wx.onMenuShareAppMessage({
	  title: '学霸作文', // 分享标题
	  desc: '【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半',
	  link: shareUrl,
	  imgUrl:config.imgHost+'/logo.png'
	})

	wx.onMenuShareTimeline({
	  title: '【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半',
	  link: shareUrl,
	  imgUrl: config.imgHost+'/logo.png'
	})

 }

}