<template>
     <view class="list" > 
		<view  v-for="(item,index) in list" :key="index" @click="showAction(item)">
			<view class="item">
			<view class="icon" v-if="item.type=='docx'">
				<image src="../../../static/images/icon-word.png" mode="aspectFill"></image>
			</view>
			<view class="icon" v-if="item.type=='xlsx'">
				<image src="../../../static/images/icon-excel.png" mode="aspectFill"></image>
			</view>
			<view class="icon" v-if="item.type=='pdf'">
				<image src="../../../static/images/icon-pdf.png" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="flex-row between start">
					<view class="tit">{{item.name}}</view>
					<view class="action" ><u-icon name="more-dot-fill" class="action-icon" size="30"></u-icon></view>
				</view>
				<view class="flex-row between start">
					<view class="sub-title">来源: {{item.source}}</view>
					<view class="sub-title time-wrap">{{item.createTime}}</view>
				</view>
			</view>
			</view>
			<view class="action-line" v-if="!!reportId">
				<u-button type="warning" size="medium" class="mb10"   @click="reportFeedback(item)">处置反馈</u-button>
			</view>
		</view>
		<u-popup mode="bottom" v-model="show"  border-radius="10" z-index="99" closeable>
			<view class="panel-white mb30">
				<view class="title mb20">{{item.name}}</view>
				<view class="">
					<view>分享给:</view>
					<scroll-view scroll-x >
						<view class="user-wrap">
						<view class="user-box" v-for="(n,j) in userList" :key="j" @click="checkUser(n)">
							<view class="avatar">
								<image :src="n.avatar" v-if="n.avatar" mode="aspectFill"></image>
								<text>{{n.name && n.name.slice(0,1)}}</text>
								<view v-if="curUser.userId==n.userId" class="checked-box">
									<u-icon name="checkbox-mark" size="40"></u-icon>
								</view>
							</view>
							<view class="name">{{n.name}}</view>
						</view>
						<view class="user-box" @click="toMore">
							<view class="avatar more">
								<u-icon name="more-dot-fill"></u-icon>
							</view>
							<view class="name">更多</view>
						</view>
						</view>
						
					</scroll-view>
				</view>
				<view class="flex-row between pop-item" @click="share">
						<view class="">分享</view>
						<view><u-icon name="share" size="40" :color="tempColor"></u-icon></view>
				</view>
			<!-- 	<view class="flex-row between pop-item" @click="preview">
						<view class="">预览</view>
						<view><u-icon name="eye" size="40" color="#999"></u-icon></view>
				</view> -->
				<view class="flex-row between pop-item del" @click="del()" >
						<view class="">删除</view>
						<view><u-icon name="close" size="40" color="red"></u-icon></view>
				</view>
			</view>
		</u-popup>
     </view>
</template>

<script>
// #ifdef APP-PLUS
	var docModule = uni.requireNativePlugin("YSCloud-OFFICE-DocPreviewModule")
// #endif

export default {
  components: {
  },
  props:{
    
    list:{
      type:Array,
      required:true
    },
	reportId:{
		type:[Number,String],
		default:undefined
	},
    

  },
  data () {
    return {
	   show:false,
       item:{},
	   userList:[],
	   curUser:{}
    }
  },

  created(){
    this.getUserList();
  },
  methods:{
	showAction(item){
		this.item=item;
		this.show=true;
	},
	getUserList(){
		let queryParams={
				pageNum:1,
				pageSize:20,
				roleId:1
			}
		this.Api.getUserList(queryParams).then(data=>{
			this.userList=data;
		})
	},
	checkUser(item){
		this.curUser=item;
	},
	share(){
		let curUser=this.curUser;
		if(!curUser.userId){
			this.$toast("请选择要分享的用户");
			return;
		}
		let params={
			userId:this.curUser.userId,
			reportId:this.item.id,
			type:2,
			reportType:0
		}
		this.Api.assignReport(params).then(data=>{
			if(data){
					this.$toast("分享成功");
			}else{
					this.$toast("分享失败");
			}
		})
	},
	toMore(){
		uni.navigateTo({
			url:'/pages/report/share-more?reportId='+this.item.id
		})
	},
	del(){
		let self=this;
	  uni.showModal({
	  	title:"删除通报",
		content:"删除不可恢复，您确定要删除吗？",
		success(e){
			if(e.confirm){
				self.delDo();
			}
		}
	  })	
	},
	delDo(){
		this.Api.delReport({id:this.item.id}).then(data=>{
			this.$toast("删除成功！");
			this.show=false;
			this.$emit("reload");
		})
	},
	download(item) {
	        var _this = this;
	        uni.showLoading({
	            title: "文件下载中"
	        });
	
	        const downloadTask = uni.downloadFile({
	            url: item.path,
	            success: (res) => {
	                if (res.statusCode === 200) {
	                    console.log("下载成功 res res.tempFilePath:" + JSON.stringify(res));
	                    // _this.filepath = res.tempFilePath
	                    let filePath = plus.io.convertLocalFileSystemURL(res.tempFilePath);
	                    console.log("下载成功 res res.filePaths:" + filePath);
	                    uni.hideLoading();
						_this.openDocFile(filePath,item.name);
						}
					},
			})
			downloadTask.onProgressUpdate((res) => {
				console.log('下载进度' + res.progress);
				console.log('已经下载的数据长度' + res.totalBytesWritten);
				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			});
	},
	preview(){
		let item=this.item;
		console.log(item)
		// #ifdef APP-PLUS
		this.download(item);
		// #endif
		
		// #ifdef H5
		window.open(item.path);
		// #endif
	},
	openDocFile(path,title){
		// #ifdef APP-PLUS
		docModule.openDocument(path, {
		    navBar:{
		        background:this.tempColor,     //原生导航栏背景色
		        text:title,                 //导航栏标题栏文本
		        textcolor:'#FFFFFFFF'       //标题栏文本颜色
		    },
		    waterMark:{
		        textsize:'22.0',            //水印字体大小
		        textcolor:this.tempColor,      //水印字体颜色
		        text:"案管助手",  //水印主文本
		        subtext:title               //水印副文本
		    }
		});
		// #endif
	},
	reportFeedback(item){
		this.$emit("reportFeedback",this.reportId);
	}
	

  }
}
</script>

<style lang="scss" scoped>
.item{
	margin:16rpx;
	background: #FFFFFF;
	border-radius: 16rpx;
	padding: 16rpx;
	display: flex;
	align-items: center;
	.icon{
		width: 100rpx;
		height: 100rpx;
		margin-right: 16rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.tit{
		margin-bottom: 16rpx;
		font-size: 32rpx;
		color: #000;
		display: flex;
		justify-content: space-between;
	}
	.content{
		font-size: 30rpx;
		width: 100%;
	}
	.sub-line{
		font-size: 28rpx;
		color: #666666;
		padding: 16rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.action{
		.action-icon{
			transform: rotate(90deg);
		}
	}
	.time-wrap{
		min-width: 300rpx;
	}
}
.action-line{
		border-top:1px solid #F5F5F5;
		padding-top: 16rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
.pop-item{
	padding: 30rpx;
	margin:20rpx 0;
	border-radius: 16rpx ;
	border: 1px solid #F5F5F5;
	box-shadow: 1px 3px 10px #DDDDDD;
	font-size: 32rpx;
	color: #000;
	&.del{
		// background-color: red;
		color: red;
	}
}
.user-wrap{
	display: flex;
	align-items: center;
}
.more-box{
	min-width: 100rpx;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #F5F5F5;
	border-radius: 50%;
}
.user-box{
	min-width: 120rpx;
	margin-right: 16rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.avatar{
		position: relative;
		background: $base-color;
		color: #FFFFFF;
		width: 100rpx;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-radius: 50%;
		margin-bottom: 16rpx;
		font-size: 32rpx;
		margin-right: 0;
		&.more{
			background: #EEEEEE;
			color: #333333;
		}
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.checked-box{
			position: absolute;
			border-radius: 50%;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 100rpx;
			color: #FFFFFF;
			background: rgba(0,0,0,0.4);
		}
	}
	.name{
	display: flex;
	justify-content: center;
	align-items: center;	
	}
}
</style>
