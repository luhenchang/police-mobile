// #ifdef APP-PLUS
import request from '@/api/request.js';
import config from '@/config/index.js'
const platform = uni.getSystemInfoSync().platform;
const appPackage='cn.dcfuture.police';
const appUpdateUrl=config.apiHost+ '/api/common/get-app-info';
// 主颜色
const $mainColor = "FF5B78";
// const $mainColor = "0599f7";

// 弹窗图标url
const $iconUrl = "http://xinghun8.com/images/ic_ar.png";

// 获取当前应用的版本号
export const getCurrentNo = function(callback) {
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		callback && callback({
			versionCode: inf.version.replace(/\./g, ""),
			version: inf.version
		});
	});
} 
// 发起ajax请求获取服务端版本号
export const getServerNo = function(version,isPrompt = false, callback) {
	let params = {
		// version:version,
		platform:platform,
		'packageName':appPackage
	};
	
	/* 接口入参说明
	 * version: 应用当前版本号（已自动获取）
	 * type：平台（1101是安卓，1102是IOS）
	 */

	request({
		url:appUpdateUrl,
		method:'GET',
		params:params,
	}).then(res => {
		console.log(res);
		/* res的数据说明
		 * | 参数名称	     | 一定返回 	| 类型	    | 描述
		 * | -------------|--------- | --------- | ------------- |
		 * | versionCode	 | y	    | int	    | 版本号        |
		 * | versionName	 | y	    | String	| 版本名称      |
		 * | versionInfo	 | y	    | String	| 版本信息      |
		 * | forceUpdate	 | y	    | boolean	| 是否强制更新  |
		 * | downloadUrl	 | y	    | String	| 版本下载链接（IOS安装包更新请放跳转store应用商店链接,安卓apk和wgt文件放文件下载链接）  |
		 */
		let newVer=res.appVersion.replace(/\./g, "");
		if (newVer > version) {
			callback && callback(res);
		} else if (isPrompt) {
			uni.showToast({
				title: "当前已是最新版本",
				icon: "none"
			});
		}
	});
}
// 从服务器下载应用资源包（wgt文件）
export const getDownload = function(data) {
	let popupData = {
		progress:true,
		buttonNum: 2
	};
	if(data.forceUpdate){
		popupData.buttonNum = 0;
	}
	let dtask;
	let lastProgressValue = 0;
	downloadPopup(popupData, function(res) {
		dtask = plus.downloader.createDownload(data.apkUrl, {
			filename: "_doc/update/"
		}, function(download, status) {
			if (status == 200) {
				res.change({
					progressValue: 100,
					progressTip:"正在安装文件...",
					progress: true,
					buttonNum: 0
				});
				res.cancel();
				plus.runtime.install(download.filename, {}, function() {
					// res.change({
					// 	contentText: "完成！",
					// 	buttonNum: 1,
					// 	progress: false
					// });
					res.cancel();
				}, function(e) {
					res.cancel();
					plus.nativeUI.alert("安装文件失败[" + e.code + "]：" + e.message);
				});
			} else {
				res.change({
					contentText: "文件下载失败...",
					buttonNum: 1,
					progress: false
				});
			}
		});
		dtask.start();
		dtask.addEventListener("statechanged", function(task, status) {
			switch (task.state) {
				case 1: // 开始
					res.change({
						progressValue:0,
						progressTip:"准备下载...",
						progress: true
					});
					break;
				case 2: // 已连接到服务器  
					res.change({
						progressValue:0,
						progressTip:"开始下载...",
						progress: true
					});
					break;
				case 3:
					const progress = parseInt(task.downloadedSize / task.totalSize * 100);
					if(progress - lastProgressValue >= 2){
						lastProgressValue = progress;
						res.change({
							progressValue:progress,
							progressTip: "已下载" + progress + "%",
							progress: true
						});
					}
					
					break;
			}
		});
	},function(){
		// 取消下载
		dtask && dtask.abort();
		uni.showToast({
			title: "已取消下载",
			icon:"none"
		});
	},
	function(){
		// 重启APP
		plus.runtime.restart();
	});
}
// 文字换行
function drawtext(text, maxWidth) {
	let textArr = text.split("");
	let len = textArr.length;
	// 上个节点
	let previousNode = 1;
	// 记录节点宽度
	let nodeWidth = 0;
	// 文本换行数组
	let rowText = [];
	for (let i = 0; i < len; i++) {
		if (/[\u4e00-\u9fa5]/g.test(textArr[i])) {
			nodeWidth += 24;
		} else {
			nodeWidth += 12;
		}
		if (nodeWidth >= maxWidth) {
			rowText.push(text.substring(previousNode, i));
			previousNode = i;
			nodeWidth = 0;
		}
	}
	if (previousNode < text.length) {
		rowText.push(text.substring(previousNode, text.length));
	}
	return rowText.length;
}
// 是否更新弹窗
function updatePopup(data, callback) {
	uni.showModal({
		title:'升级APP',
		content:data.info,
		confirmText:'立即升级',
		success(e) {
			if(e.confirm){
				callback && callback(data);
			}
		}
	})
	return;
	// 弹窗遮罩层
	let maskLayer = new plus.nativeObj.View("maskLayer", { //先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});

	// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	const screenWidth = plus.screen.resolutionWidth;
	const screenHeight = plus.screen.resolutionHeight;
	//弹窗容器宽度
	const popupViewWidth = screenWidth * 0.7;
	// 弹窗容器的Padding
	const viewContentPadding = 20;
	// 弹窗容器的宽度
	const viewContentWidth = parseInt(popupViewWidth - (viewContentPadding * 2));
	// 文本高度
	let viewContentHeight = parseInt(drawtext(data.versionInfo, viewContentWidth) * 16) + 10;
	// 弹窗容器高度
	const popupViewHeight = viewContentHeight + 80 + 20 + 20 + 90;
	// 弹窗内容
	let popupView = new plus.nativeObj.View("popupView", { //创建底部图标菜单
		tag: "rect",
		top: (screenHeight - popupViewHeight) / 2 + "px",
		left: '15%',
		height: popupViewHeight + "px",
		width: "70%"
	});
	// 绘制白色背景
	popupView.drawRect({
		color: "#FFFFFF",
		radius: "8px"
	}, {
		top: "40px",
		height: popupViewHeight - 40 + "px",
	});
	// 绘制底边按钮
	popupView.drawRect({
		radius: "3px",
		borderColor: "#f1f1f1",
		borderWidth: "1px",
	}, {
		bottom: viewContentPadding + 'px',
		left: viewContentPadding + "px",
		width: (viewContentWidth - viewContentPadding) / 2 + "px",
		height: "30px",
	});
	// 绘制底边按钮
	popupView.drawRect({
		radius: "3px",
		color: $mainColor,
	}, {
		bottom: viewContentPadding + 'px',
		left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
		width: (viewContentWidth - viewContentPadding) / 2 + "px",
		height: "30px",
	});
	popupView.draw([{
			src: $iconUrl,
			id: "logo",
			tag: "img",
			position: {
				top: "0px",
				left: (popupViewWidth - 124) / 2 + "px",
				width: "124px",
				height: "80px",
			}
		},
		{
			tag: 'font',
			id: 'title',
			text: "发现新版本" + data.versionName,
			textStyles: {
				size: '18px',
				color: "#333",
				weight: "bold",
				whiteSpace: "normal"
			},
			position: {
				top: '90px',
				left: viewContentPadding + "px",
				width: viewContentWidth + "px",
				height: "30px",
			}
		},
		{
			tag: 'font',
			id: 'content23',
			text: data.versionInfo,
			textStyles: {
				size: '14px',
				color: "#666",
				lineSpacing: "50%",
				whiteSpace: "normal"
			},
			position: {
				top: '130px',
				left: viewContentPadding + "px",
				width: viewContentWidth + "px",
				height: viewContentHeight + "px",
			}
		},
		{
			tag: 'font',
			id: 'cancelText',
			text: "暂不升级",
			textStyles: {
				size: '14px',
				color: "#666",
				lineSpacing: "0%",
				whiteSpace: "normal"
			},
			position: {
				bottom: viewContentPadding + 'px',
				left: viewContentPadding + "px",
				width: (viewContentWidth - viewContentPadding) / 2 + "px",
				height: "30px",
			}
		},
		{
			tag: 'font',
			id: 'confirmText',
			text: "立即升级",
			textStyles: {
				size: '14px',
				color: "#FFF",
				lineSpacing: "0%",
				whiteSpace: "normal"
			},
			position: {
				bottom: viewContentPadding + 'px',
				left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
				width: (viewContentWidth - viewContentPadding) / 2 + "px",
				height: "30px",
			}
		},
	]);
	popupView.addEventListener("click", function(e) {
		let maxTop = popupViewHeight - viewContentPadding;
		let maxLeft = popupViewWidth - viewContentPadding;
		let buttonWidth = (viewContentWidth - viewContentPadding) / 2;
		if (e.clientY > maxTop - 30 && e.clientY < maxTop) {
			// 暂不升级
			if (e.clientX > viewContentPadding && e.clientX < maxLeft - buttonWidth - viewContentPadding) {
				maskLayer.hide();
				popupView.hide();
			} else if (e.clientX > maxLeft - buttonWidth && e.clientX < maxLeft) {
				// 立即升级
				maskLayer.hide();
				popupView.hide();
				callback && callback();
			}
		}
	});
	// 点击遮罩层
	maskLayer.addEventListener("click", function() { //处理遮罩层点击
		maskLayer.hide();
		popupView.hide();
	});
	// 显示弹窗
	maskLayer.show();
	popupView.show();
}
// 文件下载的弹窗绘图
function downloadPopupDrawing(data){
	// 以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
	const screenWidth = plus.screen.resolutionWidth;
	const screenHeight = plus.screen.resolutionHeight;
	//弹窗容器宽度
	const popupViewWidth = screenWidth * 0.7;
	// 弹窗容器的Padding
	const viewContentPadding = 20;
	// 弹窗容器的宽度
	const viewContentWidth = popupViewWidth - (viewContentPadding * 2);
	// 弹窗容器高度
	let popupViewHeight = viewContentPadding * 3 + 60;
	let progressTip = data.progressTip || "准备下载...";
	let contentText = data.contentText || "正在为您更新，请耐心等待";
	let elementList = [
		{
			tag: 'rect', //背景色
			color: '#FFFFFF',
			rectStyles:{
				radius: "8px"
			}
		},
		{
			tag: 'font',
			id: 'title',
			text: "升级APP",
			textStyles: {
				size: '16px',
				color: "#333",
				weight: "bold",
				verticalAlign: "middle",
				whiteSpace: "normal"
			},
			position: {
				top: viewContentPadding + 'px',
				height: "30px",
			}
		},
		{
			tag: 'font',
			id: 'content',
			text: contentText,
			textStyles: {
				size: '14px',
				color: "#333",
				verticalAlign: "middle",
				whiteSpace: "normal"
			},
			position: {
				top: viewContentPadding * 2 + 30 + 'px',
				height: "20px",
			}
		}
	];
	// 是否有进度条
	if(data.progress){
		popupViewHeight += viewContentPadding + 40;
		elementList = elementList.concat([
			{
				tag: 'font',
				id: 'progressValue',
				text: progressTip,
				textStyles: {
					size: '14px',
					color: $mainColor,
					whiteSpace: "normal"
				},
				position: {
					top: viewContentPadding * 4 + 20 + 'px',
					height: "30px"
				}
			},
			{
				tag: 'rect', //绘制进度条背景
				id: 'progressBg',
				rectStyles:{
					radius: "4px",
					borderColor: "#f1f1f1",
					borderWidth: "1px",
				},
				position:{
					top: viewContentPadding * 4 + 60 + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "8px"
				}
			},
		]);
	}
	if (data.buttonNum == 2) {
		popupViewHeight += viewContentPadding + 30;
		elementList = elementList.concat([
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "3px",
					borderColor: "#f1f1f1",
					borderWidth: "1px",
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px"
				}
			},
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "3px",
					color: $mainColor
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px"
				}
			},
			{
				tag: 'font',
				id: 'cancelText',
				text: "取消下载",
				textStyles: {
					size: '14px',
					color: "#666",
					lineSpacing: "0%",
					whiteSpace: "normal"
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px",
				}
			},
			{
				tag: 'font',
				id: 'confirmText',
				text: "后台下载",
				textStyles: {
					size: '14px',
					color: "#FFF",
					lineSpacing: "0%",
					whiteSpace: "normal"
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: ((viewContentWidth - viewContentPadding) / 2 + viewContentPadding * 2) + "px",
					width: (viewContentWidth - viewContentPadding) / 2 + "px",
					height: "30px",
				}
			}
		]);
	}
	if (data.buttonNum == 1) {
		popupViewHeight += viewContentPadding + 40;
		elementList = elementList.concat([
			{
				tag: 'rect', //绘制底边按钮
				rectStyles:{
					radius: "6px",
					color: $mainColor
				},
				position:{
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "40px"
				}
			},
			{
				tag: 'font',
				id: 'confirmText',
				text: "关闭",
				textStyles: {
					size: '14px',
					color: "#FFF",
					lineSpacing: "0%",
				},
				position: {
					bottom: viewContentPadding + 'px',
					left: viewContentPadding + "px",
					width: viewContentWidth + "px",
					height: "40px"
				}
			}
		]);
	}
	return {
		popupViewHeight:popupViewHeight,
		popupViewWidth:popupViewWidth,
		screenHeight:screenHeight,
		viewContentWidth:viewContentWidth,
		viewContentPadding:viewContentPadding,
		elementList: elementList
	};
}
// 文件下载的弹窗
function downloadPopup(data, callback, cancelCallback,rebootCallback) {
	// 弹窗遮罩层
	let maskLayer = new plus.nativeObj.View("maskLayer", { //先创建遮罩层
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0,0,0,0.5)'
	});
	let popupViewData = downloadPopupDrawing(data);
	// 弹窗内容
	let popupView = new plus.nativeObj.View("popupView", { //创建底部图标菜单
		tag: "rect",
		top: (popupViewData.screenHeight - popupViewData.popupViewHeight) / 2 + "px",
		left: '15%',
		height: popupViewData.popupViewHeight + "px",
		width: "70%",
	});
	let progressValue = 0;
	let progressTip = 0;
	let contentText = 0;
	let buttonNum = 2;
	if(data.buttonNum >= 0){
		buttonNum = data.buttonNum;
	}
	popupView.draw(popupViewData.elementList);
	popupView.addEventListener("click", function(e) {
		let maxTop = popupViewData.popupViewHeight - popupViewData.viewContentPadding;
		let maxLeft = popupViewData.popupViewWidth - popupViewData.viewContentPadding;
		if (e.clientY > maxTop - 40 && e.clientY < maxTop) {
			if(buttonNum == 1){
				// 单按钮
				if (e.clientX > popupViewData.viewContentPadding && e.clientX < maxLeft) {
					maskLayer.hide();
					popupView.hide();
					rebootCallback && rebootCallback();
				}
			}else if(buttonNum == 2){
				// 双按钮
				let buttonWidth = (popupViewData.viewContentWidth - popupViewData.viewContentPadding) / 2;
				if (e.clientX > popupViewData.viewContentPadding && e.clientX < maxLeft - buttonWidth - popupViewData.viewContentPadding) {
					maskLayer.hide();
					popupView.hide();
					cancelCallback && cancelCallback();
				} else if (e.clientX > maxLeft - buttonWidth && e.clientX < maxLeft) {
					maskLayer.hide();
					popupView.hide();
				}
			}
		}
	});
	// 显示弹窗
	maskLayer.show();
	popupView.show();
	// 改变进度条
	callback({
		change: function(res) {
			let progressElement = [];
			if(res.progressValue){
				progressValue = res.progressValue;
				// 绘制进度条
				progressElement.push({
					tag: 'rect', //绘制进度条背景
					id: 'progressValueBg',
					rectStyles:{
						radius: "4px",
						color: $mainColor
					},
					position:{
						top: popupViewData.viewContentPadding * 4 + 60 + 'px',
						left: popupViewData.viewContentPadding + "px",
						width: popupViewData.viewContentWidth * (res.progressValue / 100) + "px",
						height: "8px"
					}
				});
			}
			if(res.progressTip){
				progressTip = res.progressTip;
				progressElement.push({
					tag: 'font',
					id: 'progressValue',
					text: res.progressTip,
					textStyles: {
						size: '14px',
						color: $mainColor,
						whiteSpace: "normal"
					},
					position: {
						top: popupViewData.viewContentPadding * 4 + 20 + 'px',
						height: "30px"
					}
				});
			}
			if(res.contentText){
				contentText = res.contentText;
				progressElement.push({
					tag: 'font',
					id: 'content',
					text: res.contentText,
					textStyles: {
						size: '16px',
						color: "#333",
						whiteSpace: "normal"
					},
					position: {
						top: popupViewData.viewContentPadding * 2 + 30 + 'px',
						height: "30px",
					}
				});
			}
			if(res.buttonNum >= 0 && buttonNum != res.buttonNum){
				buttonNum = res.buttonNum;
				popupView.reset();
				popupViewData = downloadPopupDrawing(Object.assign({
					progressValue:progressValue,
					progressTip:progressTip,
					contentText:contentText,
				},res));
				let newElement = [];
				popupViewData.elementList.map((item,index) => {
					let have = false;
					progressElement.forEach((childItem,childIndex) => {
						if(item.id == childItem.id){
							have = true;
						}
					});
					if(!have){
						newElement.push(item);
					}
				});
				progressElement = newElement.concat(progressElement);
				popupView.setStyle({
					tag: "rect",
					top: (popupViewData.screenHeight - popupViewData.popupViewHeight) / 2 + "px",
					left: '15%',
					height: popupViewData.popupViewHeight + "px",
					width: "70%",
				});
				popupView.draw(progressElement); 
			}else{
				popupView.draw(progressElement);
			}
		},
		cancel: function() { 
			maskLayer.hide();
			popupView.hide();
		}
	});
}
export default function(isPrompt = false) {
	getCurrentNo(version => {
		console.log(version)
		getServerNo(version.versionCode,isPrompt, res => {
			console.log(res)
		
			if (res.force_update) {
					if (platform == "android") {
						getDownload(res);
					} else {
						plus.runtime.openURL(res.ios_url);
					}
			} else {
				console.log('开始更新')
				
				updatePopup(res, function() {
						if (platform == "android") {
							getDownload(res);
						} else {
							plus.runtime.openURL(res.ios_url);
						}
				});
			}
		});
	});
}
// #endif