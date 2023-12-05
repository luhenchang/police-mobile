var KeepAliveModule = uni.requireNativePlugin("yh-alive")//保活组件
const modal = uni.requireNativePlugin('modal');//弹toast需要
var globalEvent = uni.requireNativePlugin('globalEvent');//监听回调需要
import CIMPushManager from '@/utils/cim/cim.web.sdk.js'
 globalEvent.addEventListener('myEvent', function(e) {
        // console.log('myEvent' + JSON.stringify(e));
		CIMPushManager.connect();
       //  modal.toast({
       //  message: "myEvent收到：" + JSON.stringify(e),
       //  duration: 1.5
       // });
   });
   
   export default {
	   //开始保活
	   startKeepAlive() {
	       KeepAliveModule.startKeepAlive({
	           showNotification:true,
	           notificationTitle:"案管助手",
	           notificationText:"后台运行中",
	           runModel:1,//0-省电模式,1-流氓模式
	           intervalTime:5000,
	       },res=>{
			   console.log(res);
	           // modal.toast({
	           //     message: res,
	           //     duration: 1.5
	           // });
	       })
		},
		//停止保活
	  stopKeepAlive() {
	      var ret = KeepAliveModule.stopKeepAlive({})
	      // modal.toast({
	      //     message: ret,
	      //     duration: 1.5
	      // });
	  },
   }