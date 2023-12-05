export default {
	  init(){
		
			  	// 扩展API加载完毕，现在可以正常调用扩展API
			  	// 添加监听从系统消息中心点击某条消息启动应用事件
			  	plus.push.addEventListener('click', function(msg){
			  		// 分析msg.payload处理业务逻辑 
			  	        console.log(msg);
						let payload=msg.payload;
						console.log(payload)
						if( payload.type ==1 && !!payload.referId){
							
							uni.navigateTo({
								url:'/pages/index/police-detail?id='+payload.referId
							})
						}
						if(payload.type ==2 && !!payload.reportId){
							if(payload.reportType==0){
								uni.switchTab({
									url:'/pages/tabbar/report'
								})
							}
							if(payload.reportType==1){
								uni.navigateTo({
									url:'/pages/index/police-detail?id='+payload.reportId
								})
							}
							if(payload.reportType==2){
								uni.navigateTo({
									url:'/pages/index/manage-detail?id='+payload.reportId
								})
							}
							if(payload.reportType==3){
								uni.navigateTo({
									url:'/pages/index/file-detail?id='+payload.reportId
								})
							}
							if(payload.reportType==4){
								uni.navigateTo({
									url:'/pages/index/property-detail?id='+payload.reportId
								})
							}
							if(payload.reportType==5){
								uni.navigateTo({
									url:'/pages/index/place-detail?id='+payload.reportId
								})
							}
						}
						 
			  	}, false );
		
	  },
	  
	}