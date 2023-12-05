import config from '../config/index'
import querystring from './querystring/index.js'
import cache from './cache.js'
import Api from '@/api/index.js'
import moment from 'moment'
import {roleMap,eduList,eduMap,salaryList,salaryMap} from './constants'
export default {
	getPhoto(img) {
		if (!img) {
			return '';
		}
	
		if (img.indexOf('http') > -1) {
			return img;
		}
		return config.cdnHost + img;
	},
	getFile(file) {
		if (!file) {
			return '';
		}
	
		if (file.indexOf('http') > -1) {
			return file;
		}
		return config.cdnHost+ file;
	},
	
	getAvatar(userInfo){
	   
	     if(userInfo && userInfo.avatar){
			if (userInfo.avatar.indexOf('uploads') > -1) {
				return config.imgHost+userInfo.avatar;
			}
	         return config.imgHost+'uploads/avatar/' +userInfo.avatar;
	     }
	     let male='http://xinghun8.com/images/male.jpg';
	     let female='http://xinghun8.com/images/female.jpg';
	     let defaultLogo=userInfo.sex==2?female:male;
	      return userInfo.headimgurl || defaultLogo;
	 },
	 getSex(sex){
		if(sex==1){
			return '男';
		} else if(sex==2){
			return '女';
		}
		
		return '未知';
	 },
	getFullUrl(url) {
		url = config.apiHost + url;
		if (url.indexOf('?') > -1) {
			url += '&access-token=' + cache.get('token');
		} else {
			url += '?access-token=' + cache.get('token');
		}
		return url;
	},
	importJs(jsPath) {
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", jsPath);
		var heads = document.getElementsByTagName("head");
		if (heads.length)
			heads[0].appendChild(script);
		else
			document.documentElement.appendChild(script);
	},
	isWechat() {
		let u = navigator.userAgent;
		return u.indexOf('MicroMessenger') > -1;
	},
	fixedValue(val) {
		val = parseFloat(val);
		return parseFloat(val.toFixed(2));
	},
	getQueryString() {
		var reg = location.href.split('?');
		if (reg.length >= 2 && reg[1]) {
			return querystring.parse(reg[1]);
		}
		return {};
	},
	getQueryStringWithHash() {
		var reg = location.href.split('#/')[1].split('?');
		if (reg.length >= 2 && reg[1]) {
			return querystring.parse(reg[1]);
		}
		return {};
	},

	getClearPage() {
		var hash = location.hash;
		var page = hash.split('#/')[1].split('?')[0] + '?' + this.clearHash(hash);
		if (page.indexOf('?') > -1) {
			page += '&inviteCode=' + userInfo.invite_code;
		} else {
			page += '?inviteCode=' + userInfo.invite_code;
		}
		return encodeURIComponent(page);
	},
	clearHash(hash) {
		var param = {};
		var reg = hash.split('#/')[1].split('?');
		if (reg.length >= 2 && reg[1]) {
			param = querystring.parse(reg[1]);
		}
		delete param.token;
		delete param.inviteCode;
		return querystring.stringify(param);

	},
	
	add(a, b) {
		return parseFloat(a) + parseFloat(b);
	},
	checkValidDate(endDate) {
		let a = new Date();
		let b = new Date(endDate);
		return b > a;
	},
	//是否可退货
	checkCanReturn(confirmTime) {
		let d1;
		if (isNaN(Date.parse(confirmTime)))
			d1 = new Date(Date.parse(confirmTime.replace(/-/g, '/').replace(/T/g, ' ')));
		else
			d1 = new Date(Date.parse(confirmTime));

		d1.setDate(d1.getDate() + 7);
		let d2 = new Date(d1);
		let now = new Date();
		return now < d2;
	},
	formatTime(value){
	     if(value){
	        return moment(value).format('YYYY-MM-DD HH:mm')
	     }
	     return moment(value).format('YYYY-MM-DD HH:mm')
	 },
	 formatDate(value){
	    if(value){
	       return moment(value).format('YYYY-MM-DD')
	    }
	    return moment(value).format('YYYY-MM-DD')
	},
	formatYear(value){
	    if(value){
	       return moment.unix(value).format('YYYY')
	    }
	    return moment().format('YYYY')
	},
	 getDay(day){
	    let doHandleMonth=function(month){    
	        var m = month;    
	        if(month.toString().length == 1){    
	        m = "0" + month;    
	        }    
	        return m;    
	    } 
	    var today = new Date();    
	        
	    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;            
	 
	    today.setTime(targetday_milliseconds); 
	        
	    var tYear = today.getFullYear();    
	    var tMonth = today.getMonth();    
	    var tDate = today.getDate();    
	    tMonth = doHandleMonth(tMonth + 1);    
	    tDate = doHandleMonth(tDate);    
	    return tYear+"-"+tMonth+"-"+tDate;    
	 },
	  
	 fixedValue(val){
	     val=parseFloat(val);
	     return parseFloat(val.toFixed(2));
	 },
	
	 getRoleName(role_id){
	     return roleMap[role_id];
	 },
	 getRoleIcon(role){
	     switch(role){
	         case 2:
	          return "<view class='vip-icon silver'> <text class='iconfont icon-baiyin1 '></text></view>";
	        case 3:
	          return "<view class='vip-icon gold'><text class='iconfont icon-huangjinhuiyuan gold'></text></view>";
	        case 4:
	          return "<view class='vip-icon goldenrod'> <text class='iconfont icon-bojinhuiyuan goldenrod'></text><view>";
	        case 5:
	          return "<view class='vip-icon diamond'> <text class='iconfont icon-svipdisc '></text></view>";
	        default:
	         return '';
	     }
	},
	pureHtmlTag(str){
		return str.replace(/<[^>]+>/g,"");  //正则去掉所有的html标记
	},
	getAuth(user){
	    if(user.role>=4){
	        return true;
	    }
	    if(user.role==2 || user.role==3){
	        let time=moment().unix();
	        if(user.expire_time>time){
	            return true;
	        }
	    }
	    return false;
	},
	getRandom(n,m){
	        var random = Math.floor(Math.random()*(m-n+1)+n);
	        return random;
	},
	
	 getAge(strBirthday){ 
	     if(!strBirthday){
	         return '';
	     }      
	     var returnAge;
	     var strBirthdayArr=strBirthday.split("-");
	     var birthYear = strBirthdayArr[0];
	     var birthMonth = strBirthdayArr[1];
	     var birthDay = strBirthdayArr[2];
	     
	     let  d = new Date();
	     var nowYear = d.getFullYear();
	     var nowMonth = d.getMonth() + 1;
	     var nowDay = d.getDate();
	     
	     if(nowYear == birthYear){
	         returnAge = 0;//同年 则为0岁
	     }
	     else{
	         var ageDiff = nowYear - birthYear ; //年之差
	         if(ageDiff > 0){
	             if(nowMonth == birthMonth) {
	                 var dayDiff = nowDay - birthDay;//日之差
	                 if(dayDiff < 0)
	                 {
	                     returnAge = ageDiff - 1;
	                 }
	                 else
	                 {
	                     returnAge = ageDiff ;
	                 }
	             }
	             else
	             {
	                 var monthDiff = nowMonth - birthMonth;//月之差
	                 if(monthDiff < 0)
	                 {
	                     returnAge = ageDiff - 1;
	                 }
	                 else
	                 {
	                     returnAge = ageDiff ;
	                 }
	             }
	         }
	         else
	         {
	             returnAge = "";//返回-1 表示出生日期输入错误 晚于今天
	         }
	     }
	     
	     return returnAge;//返回周岁年龄
	     
	    } ,
	
	getDistrict(item){
	   if(item.city=='市辖区'){
	       return item.province+' '+item.district;
	   }else{
	       if(item.province && item.city){
	        return item.province+' '+item.city;
	       }
		   if(item.province){
			  return item.province; 
		   }
	   }
	   return '';
	},
	
	getEdu(edu){
	    return eduMap[edu];
	},
	getSalary(salary){
	    return salaryMap[salary];
	},
	getUserDesc(item){
		var res='';
		 if(item.birthday && item.birthday!=null){
			 res +=this.getAge(item.birthday)+'岁 ';
		 }
		 if(item.height && item.height!=null){
			 res+= + item.height+'cm '
		 }
		res +=this.getDistrict(item) + ' ';
		if(item.edu!=null){
			res +=item.edu;
		}
		return res;
	},
	broswer(){
		var u = navigator.userAgent,ua=navigator.userAgent.toLowerCase();
		return {
		    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
		    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
		    iPad: u.indexOf('iPad') > -1, //是否iPad
		    wechat: ua.match(/MicroMessenger/i) == "micromessenger"
		};
	},
	getRuntime(){
		let runtime='h5';
		// #ifdef H5
		runtime='h5';
		if(this.isWechat()){
			runtime='h5_weixin';
		}
		// #endif
		
		// #ifdef APP-PLUS
		runtime='app';
		let res=uni.getSystemInfoSync();
		runtime=res.platform;
		// #endif
		
		// #ifdef MP-WEIXIN
		runtime='mp_weixin';
		// #endif
		
		// #ifdef MP-BAIDU
		runtime='mp_baidu';
		// #endif
		
		// #ifdef MP-TOUTIAO
		runtime='mp_toutiao';
		// #endif
		
		// #ifdef MP-QQ
		runtime='mp_qq';
		// #endif
		
		// #ifdef MP-ALIPAY
		runtime='mp_alipay';
		// #endif
		
		// #ifdef MP-360
		runtime='mp_360';
		// #endif
		return runtime;
	},
	weChatLogin(){
	    let appid=config.appid;
	    var hash=location.hash || '/#/';
	    let redirectUrl=location.href.split('?')[0];
	    if(redirectUrl.indexOf('#/')<=-1){
	        redirectUrl=redirectUrl+hash;
	    }
		let state=1;
		let params=this.getQueryStringWithHash();
		  if(params.inviteCode){
			  state=params.inviteCode;
		}
		console.log(redirectUrl)
	    location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURIComponent(redirectUrl)+"&response_type=code&scope=snsapi_userinfo&state="+state+"#wechat_redirect";
	 },
	 getDateDiff(dateTimeStamp){
	 var minute = 1000 * 60;
	 var hour = minute * 60;
	 var day = hour * 24;
	 var halfamonth = day * 15;
	 var month = day * 30;
	 var now = new Date().getTime();
	 var diffValue = now - dateTimeStamp;
	 if(diffValue < 0){return;}
	 var monthC =diffValue/month;
	 var weekC =diffValue/(7*day);
	 var dayC =diffValue/day;
	 var hourC =diffValue/hour;
	 var minC =diffValue/minute;
	 var result="";
	 if(monthC>=1){
		 result="1 年前";
	 }else if(monthC>=1){
	     result="" + parseInt(monthC) + " 月前";
	 }
	 else if(weekC>=1){
	     result="" + parseInt(weekC) + " 周前";
	 }
	 else if(dayC>=1){
	     result=""+ parseInt(dayC) +" 天前";
	 }
	 else if(hourC>=1){
	     result=""+ parseInt(hourC) +" 小时前";
	 }
	 else if(minC>=1){
	     result=""+ parseInt(minC) +" 分钟前";
	 }else{
		 result="刚刚"; 
	 }
	 return result;
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
	 setWechatShare(page,name,img,desc){
	 	 let userInfo=cache.get('userInfo');
	 	 if(!page){
	 			page =config.mHost;
	 	 }
	 	 let shareUrl=page;
	 	console.log('wechat share setting',shareUrl);
	 	//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）

	 	 wx.updateAppMessageShareData({ 
	        title: name || '学霸作文', // 分享标题
	        desc: desc || '【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半', // 分享描述
	        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	        imgUrl:img || (config.imgHost+'/logo.png'), // 分享图标
	        success: function () {
	          console.log('设置成功!')
	        }
	    })
	 	
	 	wx.updateTimelineShareData({ 
	        title: name ||  ('【'+userInfo.nick+'】邀请您加入学霸作文，寻找携手的另一半'), // 分享标题
	        link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
	        imgUrl: img || (config.imgHost+'/logo.png'), // 分享图标
	        success: function () {
	           console.log('设置成功!')
	        }
	    })
	 },
	 setTabbarlang(_this){
		 uni.setTabBarItem({
		     index: 0,
		     text: _this.$t('tabBar.home')
		 });
		 uni.setTabBarItem({
		     index: 1,
		     text: _this.$t('tabBar.auction')
		 });
		 uni.setTabBarItem({
		     index: 2,
		     text: _this.$t('tabBar.identity')
		 });
		 uni.setTabBarItem({
		     index: 3,
		     text: _this.$t('tabBar.me')
		 });
	 },
	 /**
	  * 构造树型结构数据
	  * @param {*} data 数据源
	  * @param {*} id id字段 默认 'id'
	  * @param {*} parentId 父节点字段 默认 'parentId'
	  * @param {*} children 孩子节点字段 默认 'children'
	  */
	 handleTree(data, id, parentId, children) {
	 	let config = {
	 		id: id || 'id',
	 		parentId: parentId || 'parentId',
	 		childrenList: children || 'children'
	 	};
	 
	 	var childrenListMap = {};
	 	var nodeIds = {};
	 	var tree = [];
	 
	 	for (let d of data) {
			d.text=d.categoryName;
			d.value=d.categoryId;
	 		let parentId = d[config.parentId];
	 		if (childrenListMap[parentId] == null) {
	 			childrenListMap[parentId] = [];
	 		}
	 		nodeIds[d[config.id]] = d;
	 		childrenListMap[parentId].push(d);
	 	}
	 
	 	for (let d of data) {
			d.text=d.categoryName;
			d.value=d.categoryId;
	 		let parentId = d[config.parentId];
	 		if (nodeIds[parentId] == null) {
	 			tree.push(d);
	 		}
	 	}
	 
	 	for (let t of tree) {
	 		adaptToChildrenList(t);
	 	}
	 
	 	function adaptToChildrenList(o) {
	 		if (childrenListMap[o[config.id]] !== null) {
	 			o[config.childrenList] = childrenListMap[o[config.id]];
	 		}
	 		if (o[config.childrenList]) {
	 			for (let c of o[config.childrenList]) {
	 				adaptToChildrenList(c);
	 			}
	 		}
	 	}
	 	return tree;
	 },
	 getDeviceIp(){  
		 var deviceIp ='';   
		 if(plus.os.name=="Android"){  
			 var Context = plus.android.importClass("android.content.Context");  
			 var wifiManager =plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);  
			 var wifiInfo = plus.android.invoke(wifiManager, "getConnectionInfo");  
			 var ipAddress = plus.android.invoke(wifiInfo, "getIpAddress");  
			 deviceIp = '';  
			 if (ipAddress != 0) {  
				 deviceIp = ((ipAddress & 0xff) + "." + (ipAddress >> 8 & 0xff) + "." + (ipAddress >> 16 & 0xff) + "." + (ipAddress >> 24 & 0xff));  
			 }  
		 }  
		 console.log(deviceIp)  
	    return deviceIp;  
	}

}
