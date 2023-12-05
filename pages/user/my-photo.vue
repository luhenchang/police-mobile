<template>
	<view class="wrap">
	<view class="pannel-white margin-bottom">
	
			<u-row gutter="16" >
				<u-col span="3" v-for="(item,index) in imgArr" :key="index">
					<view class="img-wrapper" @click="prewImg(index)">
						<image :src="item.img" mode="aspectFill"></image>
						<u-icon name="close" size="28" class="del" color="white" @click.native.stop @click="removePhoto(item.id)"></u-icon>
					</view>
				</u-col>
				
				</u-row>
				<!-- <view class="pic-list">
					<view class="item" v-for="(item,index) in imgArr" :key="index">
						<view class="img-wrapper" @click="prewImg(index)">
							<image :src="item.img" mode="aspectFill"></image>
							<u-icon name="close" size="28" class="del" color="white" @click.native.stop @click="removePhoto(item.id)"></u-icon>
						</view>
					</view>
				</view> -->
		
			<u-upload ref="uUpload" @on-uploaded="onUploaded" :action="action"  @on-remove="onRemove"></u-upload>
				
			
	</view>
	
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				action:this.$helper.getFullUrl('/user/upload-user-photo'),
				imgArr:[],
				preArr:[]
			}
		},
		onLoad(option) {
			this.init()
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
				this.getUserPhotos()
			},
			stop(e){
			  e.stopPropagation()	
			},
			prewImg(index){
			  uni.previewImage({
			  	current:index,
				urls:this.preArr
			  })	
			},
			
			 getUserPhotos(){
			      this.Api.getUserPhotos({user_guid:this.userInfo.user_guid}).then(
			        data=>{
						data.forEach(item=>{
							item.img=this.$helper.getPhoto(item.path+'thumb/'+item.photo)
							this.preArr.push(this.$helper.getPhoto(item.path+item.photo))
						},this);
			          this.imgArr=data;
			        }
			      )
			},
		  onUploaded(e){
			  console.log(e)
			  this.$toast('上传成功！');
		  },
		  onRemove(index,list){
			  console.log(index,list)
			  let id=list[0].response.data.id;
			  console.log(id);
			  this.delPhoto(id,'new');
		  },
		  removePhoto(id){
			  let self=this;
			  uni.showModal({
			  	title:'提示',
				content:'你确定要删除吗?',
				success(e) {
					if(e.confirm){
						self.delPhoto(id,'old');
					}
				}
			  })
		  },
		  delPhoto(id,type){
			  this.Api.delPhoto({id:id}).then(data=>{
				  console.log(data)
				  if(type=='old'){
					  this.getUserPhotos();
				  }
			  })
		  }
		}
	}
</script>

<style lang="scss">
.pic-list{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	.list-item{
		width: 33%;
	}
}

	.pannel-white{
		width: 100%;
		padding: 0;
	}
	.radio-wrap{
		width: 100%;
		border-bottom: 1px solid #F5F5F5;
	}
	.u-border-bottom{
		border-bottom: 1px solid #F5F5F5;
	}
	.img-wrapper{
		height: 200rpx;
		position: relative;
		margin-bottom: 16rpx;
		image{
			max-width: 100%;
			max-height: 100%;
			border-radius: 8rpx;
		}
		.del{
			position: absolute;
			top:10rpx;
			right: 10rpx;
			padding: 8rpx;
			background: red;
			border-radius: 50%;
			z-index:10;
		}
	}
</style>
