<template>
     <view class=""> 

    <view  class="user-media-list"  v-for="(item,index) in list" :key="index">
    <view class="media" @click="toProfile(item.user)">
          <view class=" media-object"  >
            <image class="" :src="item.user.avatar" >
          </view>
          <view class="media-body">
          <view class="media-heading">
            <view class="title ellipsis clamp-2">{{item.user && item.user.nick}}</view>
			  <view class="sub-txt">{{item.user.sub_title}}</view>
             <view class="sub-txt">{{item.message.created_at}}</view>
          </view>
      </view>
     </view> 
     <view class="content">
       {{item.message.content}}
       <view class="pic-wrap" v-if="item.message.photos">
		   <u-row gutter="16" >
		   	<u-col span="3" v-for="(n,j) in item.message.imgArr" :key="j">
		   		<view class="img-wrapper" @click="prewImg(item.message.imgArr,j)">
		   			<image :src="n.img" mode="aspectFill"></image>
		   		</view>
		   	</u-col>
		   	
		   </u-row>
		<!--   <view class="tui-flex ">
		   	<view class="tui-center tui-col-4 mr" v-for="(n,j) in item.message.imgArr" :key="j" >
				<view class="img-wrapper" @click="prewImg(item.message.imgArr,j)">
					<image :src="n.img" mode="aspectFill"></image>
				</view>
			</view>
		  
		   </view> -->
  
       </view>
     </view>
      <view class="action" v-if="edit">  
	  <u-button type="error" size='mini' @click="deleteItem(item.message)">删除</u-button>
        <!-- <view  class="del " @click="deleteItem(item.message)">删除</view> -->
      </view>

    </view>

     </view>
</template>

<script>

import {mapState} from 'vuex'

export default {
  components: {
  },
  props:{
    
    list:{
      type:Array,
      required:true
    },
    showType:{
      type:String,
      default:'list'
    },
    edit:{
      type:Boolean,
      default:false
    }

  },
  data () {
    return {
      
    }
  },

  created(){
     
  },
  methods:{
	  prewImg(imgArr,index){
		  let imgs=[];
		  imgArr.forEach(item=>{
			  imgs.push(item.origin)
		  })
		  uni.previewImage({
		  	current:index,
			urls:imgs,
			indicator:true,
			loop:true
		  })
	  },
	   toProfile(item){
		 uni.navigateTo({
		 	url:'/pages/user/user-profile?user_guid='+item.user_guid
		 })
	   },
	  
		deleteItem(item){
		  console.log(item);
		  let self=this;
		  uni.showModal({
			title:'提示',
			content:'您确定要删除这条动态吗？',
			success(e) {
				if(e.confirm){
					uni.showLoading({
						title:'正在删除...'
					})
					self.Api.delPubMessage({id:item.id}).then(data=>{
					  self.$toast('删除成功!');
					  self.$emit('reload');
					})
				}
				
			}
		  })
		  
		},
    
   

  }
}
</script>

<style lang="less" scoped>
.pic-wrap{
	margin: 20rpx 0;
}
.del{
	color: red;
	float: right;
}
.action{
	position: absolute;
	top:20rpx;
	right: 16rpx;
}

.img-wrapper{
	width: 100%;
	height: 200rpx;
	line-height: 200rpx;
	text-align: center;
	margin-bottom: 20rpx;
	image{
		max-width: 100%;
		max-height: 100%;
		display: inline-block;
	}
}
.user-media-list{
    margin-bottom: 16rpx;
    background: #fff;
	padding: 20rpx;
	position: relative;
	.title{
		color: #1A1A1A;
		font-size: 30rpx;
	}
    .content{
        padding: 16rpx;
		color: #333333;
		font-size: 28rpx;
    }
   
    .media{
        padding-bottom: 8rpx;
		display: flex;
		border-bottom: 1px solid #f5f5f5;
        .media-object{
            width: 120rpx;
            height: 120rpx;
            line-height: 120rpx;
			margin-right: 16rpx;
            image{
                border-radius: 50%;
				max-width: 100%;
				max-height: 100%;
            }
        }
        .media-body{
            margin-top:0;
        }
    }
}

</style>
