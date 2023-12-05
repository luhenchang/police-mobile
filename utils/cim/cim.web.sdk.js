import config from '@/config/index.js';
import socket from "./socket.js"

require("./message.js")
require('./replybody.js')
require('./sentbody.js')


import cache from '@/utils/cache';
import Base64 from '../base64.js'

// #ifdef APP-PLUS
let WebSocketTool = uni.requireNativePlugin("CL-WebSocket");
// #endif

/*CIM服务器IP*/
const CIM_HOST = config.pushHost;
/*
 *服务端 websocket端口
 */
const CIM_PORT = 34567;


const CIM_URI = "ws://" + CIM_HOST + ":" + CIM_PORT;


const APP_VERSION = "1.0.3";
const APP_CHANNEL = "web";
const APP_PACKAGE = "cn.dcfuture.police";

/*
 *特殊的消息类型，代表被服务端强制下线
 */
const ACTION_999 = "999";
const DATA_HEADER_LENGTH = 1;

const MESSAGE = 2;
const REPLY_BODY = 4;
const SENT_BODY = 3;
const PING = 1;
const PONG = 0;
/**
 * PONG字符串转换后
 * @type {Uint8Array}
 */
const PONG_BODY = new Uint8Array([80, 79, 78, 71]);


let scoketTask;
let manualStop = false;
let hasConnect=false;
const CIMPushManager = {};

CIMPushManager.connect = function() {
	manualStop = false;
	// console.log(hasConnect)
	if (hasConnect) {
		return;
	}
	let account = cache.get("userId");
	if(!account){
		return;
	}
	console.log(" 连接websocket")

	// #ifndef APP-PLUS
	socket.connectSocket({
		url: CIM_URI,
		header: {
			'binaryType': 'arraybuffer',
			'cookieEnabled': false
		}
	})
	hasConnect=true;
	socket.onSocketOpen(function(res) {
		
	
		hasConnect=true;
		CIMPushManager.innerOnConnectFinished();
	})
	socket.onSocketMessage(function(res) {
		CIMPushManager.innerOnMessageReceived(res)
	})
	socket.onSocketClose(function() {
		hasConnect=false;
		CIMPushManager.innerOnConnectionClosed();
	})
	// #endif

	// #ifdef APP-PLUS
	WebSocketTool.initWS({
		url: CIM_URI, //ws服务器地址
		pingInterval: 5 //心跳频率单位s
	});
	hasConnect=true;
	WebSocketTool.connect(result => {
		console.log(result);
		let type = result.type;
		if (type == 'onOpen') {
			console.log("socket 连接成功")
			hasConnect=true;
			cache.put("hasConnect",true);
			CIMPushManager.innerOnConnectFinished();
		} else if (type == 'onReconnect') {
			console.log("重新连接中")

		} else if (type == 'd') {
			hasConnect=false;
			cache.put("hasConnect",false);
			console.log("服务器已断开")

		} else if (type == 'onFailure') {
			console.log("连接失败,请等待重连")
			cache.put("hasConnect",false);
			hasConnect=false;

		}
	});
	 WebSocketTool.onSocketMessage(result=>{
	
	            console.log("收到消息:"+result);
	
	    })  
	WebSocketTool.onSocketByte(result=>{
	                //数据做了base64处理;

	        console.log("收到btye数据:"+ result);
	     CIMPushManager.innerOnMessageReceived(uni.base64ToArrayBuffer(result))
	 });
	 
	
	// #endif


};

async function  sendSocketMessage(msg) {
	// #ifndef APP-PLUS
	socket.sendSocketMessage({
		data: msg
	});
	// #endif
	
	
	// #ifdef APP-PLUS
	let state= await WebSocketTool.getCurrentStatus();
	if(state==1){
		let byteStr=uni.arrayBufferToBase64(msg);
		console.log("byteStr",byteStr)
		WebSocketTool.sendByteString(byteStr,result=>{
		     //发送状态回调;
			console.log(result)
		 });
	}
	
	

	// #endif

}

CIMPushManager.bind = function(account) {
	let deviceId = cache.get("deviceId", false);
	console.log(deviceId)
	if (!deviceId) {
		deviceId = generateUUID();
		cache.put("deviceId", deviceId)
	}
	console.log(account, deviceId)

	//    let browser = getBrowser();
	// console.log(browser)
	let body = new proto.com.farsunset.cim.sdk.web.model.SentBody();
	body.setKey("client_bind");
	body.setTimestamp(new Date().getTime());
	body.getDataMap().set("uid", account);
	body.getDataMap().set("channel", APP_CHANNEL);
	body.getDataMap().set("appVersion", APP_VERSION);
	body.getDataMap().set("osVersion", "13");
	body.getDataMap().set("packageName", APP_PACKAGE);
	body.getDataMap().set("deviceId", deviceId);
	body.getDataMap().set("deviceName", "android");
	CIMPushManager.sendRequest(body);
};

CIMPushManager.stop = function() {
	manualStop = true;
	hasConnect=false;
	cache.put("hasConnect",false);
	// #ifndef APP-PLUS
	socket.closeSocket();
	// #endif
	// #ifdef APP-PLUS
	WebSocketTool.closeWS();
	// #endif
};

CIMPushManager.resume = function() {
	manualStop = false;
	hasConnect=false;
	cache.put("hasConnect",false);
	CIMPushManager.connect();
};


CIMPushManager.innerOnConnectFinished = function() {
	let account = cache.get("userId");
	console.log(account)
	if (account ) {
		CIMPushManager.bind(account);
	}
};


CIMPushManager.innerOnMessageReceived = function(e) {
	let res;
	// #ifdef APP-PLUS
	res=e;
	// #endif
	// #ifndef APP-PLUS
	res=e.data
	// #endif
	// console.log("收到消息",e)
	let data = new Uint8Array(res);
	let type = data[0];
	let body = data.subarray(DATA_HEADER_LENGTH, data.length);

	if (type === PING) {
		CIMPushManager.pong();
		return;
	}

	if (type === MESSAGE) {
		let message = proto.com.farsunset.cim.sdk.web.model.Message.deserializeBinary(body);
		onInterceptMessageReceived(message.toObject(false));
		return;
	}

	if (type === REPLY_BODY) {
		let message = proto.com.farsunset.cim.sdk.web.model.ReplyBody.deserializeBinary(body);
		/**
		 * 将proto对象转换成json对象，去除无用信息
		 */
		let reply = {};
		reply.code = message.getCode();
		reply.key = message.getKey();
		reply.message = message.getMessage();
		reply.timestamp = message.getTimestamp();
		reply.data = {};

		/**
		 * 注意，遍历map这里的参数 value在前key在后
		 */
		message.getDataMap().forEach(function(v, k) {
			reply.data[k] = v;
		});
		console.log("onReplyReceived", reply)
		//  if ( onReplyReceived && (onReplyReceived instanceof Function)) {
		// 	  onReplyReceived(reply);
		// }

	}
};

CIMPushManager.innerOnConnectionClosed = function(e) {
	cache.put("hasConnect",false);
	hasConnect=false;
	if (!manualStop) {
		let time = Math.floor(Math.random() * (30 - 15 + 1) + 15);
		setTimeout(function() {
			CIMPushManager.connect();
		}, time);
	}
};

CIMPushManager.sendRequest = function(body) {
	let data = body.serializeBinary();
	let protobuf = new Uint8Array(data.length + 1);
	protobuf[0] = SENT_BODY;
	protobuf.set(data, 1);
	sendSocketMessage(protobuf);
};

CIMPushManager.pong = function() {
	let pong = new Uint8Array(PONG_BODY.byteLength + 1);
	pong[0] = PONG;
	pong.set(PONG_BODY, 1);
	sendSocketMessage(pong);
};

function onInterceptMessageReceived(message) {
	console.log(message)
	/*
	 *被强制下线之后，不再继续连接服务端
	 */
	if (message.action === ACTION_999) {
		manualStop = true;
	}
	// #ifdef APP-PLUS
	console.log("创建本地消息", message.content)
	plus.push.createMessage(message.content, message.extra, {
		title: message.title || '案管助手',
		cover: false,
	});
	// #endif

	/*
	 *收到消息后，将消息发送给页面
	 */
	// if (onMessageReceived instanceof Function) {
	//     onMessageReceived(message);
	// }
}

function getBrowser() {
	let explorer = window.navigator.userAgent.toLowerCase();
	if (explorer.indexOf("msie") >= 0) {
		let ver = explorer.match(/msie ([\d.]+)/)[1];
		return {
			name: "IE",
			version: ver
		};
	} else if (explorer.indexOf("firefox") >= 0) {
		let ver = explorer.match(/firefox\/([\d.]+)/)[1];
		return {
			name: "Firefox",
			version: ver
		};
	} else if (explorer.indexOf("chrome") >= 0) {
		let ver = explorer.match(/chrome\/([\d.]+)/)[1];
		return {
			name: "Chrome",
			version: ver
		};
	} else if (explorer.indexOf("opera") >= 0) {
		let ver = explorer.match(/opera.([\d.]+)/)[1];
		return {
			name: "Opera",
			version: ver
		};
	} else if (explorer.indexOf("Safari") >= 0) {
		let ver = explorer.match(/version\/([\d.]+)/)[1];
		return {
			name: "Safari",
			version: ver
		};
	}

	return {
		name: "Other",
		version: "1.0.0"
	};
}

function generateUUID() {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid.replace(/-/g, '');
}

export default CIMPushManager;
