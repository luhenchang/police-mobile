<template>
	<view>
		<view class="">
			<view class="line"><text class="info tit">用户头像</text></view>
			<view class="img-wrapper " @click="previewImage(photo)">
				<image class="img-responsive user-photo" :src="photo"></image>
			</view>
			<view class="sub-txt center" style="margin-top: 20upx;"></view>
			<view class="center button-sp-area" style="padding: 50upx;">
				<u-button  class="mini-btn" type="primary" @click="getImage('avatar')">上传头像</u-button>
			</view>
		</view>
		<xui-cropper  :crop-width="cropWidth" :crop-height="cropHeight" :crop-fixed="true" :src="tempFilePath" @confirm="cropConfirm" @cancel="cancel"></xui-cropper>
	
	</view>
</template>

<script>
	import {  
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	// import lrz from '@/libs/lrz/dist/lrz.bundle.js'
	export default {
		data() {
			return {
				showAddr:false,
				addrStr:'',
				addr:[0,0,0],
				sexArray:['男','女'],
				sexIndex:0,
				form:{
				},
				photo:'',
				imgData:'',
				tempFilePath:'',
				type:'avatar',
				idPhoto:'',
				cropWidth:192,
				cropHeight:192,
				from:'',
				name:'',
				id_code:'',
				showAuth:false,
				themeColor:'#fa436a'
			};
		},
		computed:{
			...mapState(['userInfo','hasLogin']),
		},
		onShow() {
			this.init()
		
		},
		onLoad(option) {
			
		},
		methods: {
			...mapMutations(['login']),
			init(){
				if(!this.hasLogin){
					 uni.navigateTo({
					 	url:'/pages/auth/login/login'
					 })
					 return;
				}
				this.photo=this.userInfo.avatar;
			},
			
		    getImage(type) {
				this.type=type;
				if(type=='avatar'){
					this.cropWidth=192;
					this.cropHeight=192;
				}else{
					this.cropWidth=258;
					this.cropHeight=162;
				}
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
							this.tempFilePath = res.tempFilePaths.shift()
						}
					});
				},
				previewImage(url){
				 uni.previewImage({
				            urls: [url],
				            // longPressActions: {
				            //     itemList: ['发送给朋友', '保存图片', '关注'],
				            //     success: function(data) {
				            //         console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				            //     },
				            //     fail: function(err) {
				            //         console.log(err.errMsg);
				            //     }
				            // }
				        });	
				},
			cropConfirm(e){
				console.log(e);
				this.tempFilePath = '';
				this.imgData=e.detail.tempFilePath;
				if(this.type=='avatar'){
					this.photo = e.detail.tempFilePath;
				}else{
					this.idPhoto = e.detail.tempFilePath;
				}
				
				this.uploadImg(this.imgData);
			},
			uploadImg(path){
				let self=this;
				uni.showLoading({
					title:'正在上传，请稍候...'
				})
				let header={};
				header['Authorization'] = 'Bearer ' +this.token
				uni.uploadFile({
				url: self.$helper.getFullUrl('/system/user/profile/avatar'),
				filePath: path,
				header:header,
				name: 'avatarfile',
				success: (uploadFileRes) => {
					uni.hideLoading();
					
					console.log(uploadFileRes)
					let res=JSON.parse(uploadFileRes.data);
					if(res.code==200){
						self.$msg('上传成功');
						self.updateUserInfo();
					}else{
						self.$msg('上传失败');
					}
					
					// uni.navigateBack();
				},
				fail() {
					uni.hideLoading();
				}
			});	
			},
			cancel(){
			 console.log('cancel');	
			},
			
			submitAuth(){
				
				if(!this.name){
					this.$msg('请输入姓名');
					return;
				}
				if(!this.id_code){
					this.$msg('请输入身份证号');
					return;
				} 
				let params={
					name:this.name,
					id_code:this.id_code
				};
				this.Api.submitAuth(params).then(data=>{
					this.$msg('提交成功，请等待人工审核!');
					this.login(data);
					uni.navigateBack();
				})
			}
		},
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
	.wrap{
		margin-bottom: 200upx;
		padding-bottom: 100px;
		padding: 0 15upx;
		background: #fff;
	}
	.line{
		padding: 10upx;
		margin-bottom: 10upx;
		border-bottom:1px solid #f5f5f5;
		font-size: 13px;
		background: #fff;
		color: #777;
		.info{
			font-size: 15px;
			margin-left:15upx;
			color: #333;
		}
	}
	.last{
		padding-bottom: 50px;
	}
	.user-photo{
		width: 280rpx;
		height: 280rpx;
		display: inline-block;
	}
	.id-photo{
		width: 430rpx;
		height: 270rpx;
	}
	.img-wrapper{
		background: #000000;
		text-align: center;
		width: 100%;
		height: 200px;
		line-height: 200px;
		display: flex;
		    justify-content: center;
		    align-items: center;
		

	}
	
	.user-section{
		display:flex;
		align-items:center;
		justify-content: center;
		height: 360upx;
		padding: 30upx 30upx 0;
		position:relative;
		margin-bottom: 30upx;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(10px);
			opacity: .7;
		}
		.portrait-box{
			width: 200upx;
			height: 200upx;
			border:6upx solid #fff;
			border-radius: 50%;
			position:relative;
			z-index: 2;
		}
		.portrait{
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.yticon{
			position:absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0,0,0,.4);
		}
		.pt-upload-btn{
			right: 0;
			bottom: 10upx;
		}
		.bg-upload-btn{
			right: 20upx;
			bottom: 16upx;
		}
	}


</style>
