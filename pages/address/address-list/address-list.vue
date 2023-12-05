<template>
	<view class="container">
		<u-empty v-if="addressList.length==0" class="container"></u-empty>
		<view class="list" v-if="addressList.length>0">
			<radio-group @change="radioChange">
			<view class="list-item" v-for="(item,index) in addressList" :key="index">
				<view >
				<view class="title">
					{{item.name}} 
					<view class="right-info">
						{{item.mobile}}
					</view>
				</view>
				
				</view>
				<view class="content">
					{{item.province}} {{item.city}} {{item.area}} {{item.address}} {{item.postcode}}
				</view>
				<view class="action" >
					<label class="radio"><radio :value="item.id+''"  :checked="item.id===current" color="#F94A3D"  />{{dText}}</label>
					<view class="right-info">
						<u-icon name="edit-pen" @click="editAddr(item)"  color="#F94A3D" size="36" style="margin-right:20rpx"></u-icon>
						<u-icon name="trash"  @click="delAddr(item)" v-if="item.id!=current"  color="red" size="36"></u-icon>
					</view>
				</view>
			</view>
			</radio-group>
		</view>
		<view class="bottom-btn" >
			<u-button type="primary"  @click="newAddr">新增收货地址</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList: [],
				current:0,
				dText:'设为默认地址',
				from:"list"
			}
		},
		onShow() {
			this.getAddressList();
		},
		onLoad(option) {
			this.from=option.from || 'list';
			if(this.from=='select'){
				this.dText='选择'
			}
			this.getAddressList();
			
		},
		methods: {
			getAddressList() {
				this.Api.getAddressList().then(data=>{
					this.addressList=data;
					this.addressList.forEach(item=>{
						if(item.isDefault==1){
							this.current=item.id;
						}
					})
				})
			},
			radioChange(e){
			 console.log(e);
			  this.current=e.detail.value;
			  console.log(this.current);
			  if(this.from=='list'){
				   this.setDefaultAddr(this.current);
			  }
			  if(this.from=='select'){
				   this.addressList.forEach(item=>{
					   if(item.id==this.current){
						   this.updateCurAddress(item);
					   }
				   },this);
			   }
			},
			editAddess(id) {
				console.log("edit item id:" + id);
			},
			newAddr() {
				uni.navigateTo({
					url:'/pages/address/edit-address/edit-address'
				})
			},
			editAddr(item){
				uni.navigateTo({
					url:'/pages/address/edit-address/edit-address?id='+item.id
				})
			},
			setDefaultAddr(id){
			  this.Api.setDefaultAddress({id:id}).then(data=>{
				  this.$toast('设置成功')
			  });	
			},
			delAddr(item){
				uni.showModal({
					title: '确定要删除么？',
					success: (e)=>{
						if(e.confirm){
							this.Api.delAddress({id:item.id}).then(data=>{
								this.$msg('删除成功!')
								this.getAddressList();
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	uni-page-body{
		height: 100%;
	}
</style>
<style lang="scss">
	.container {
		background-color: #F2f2f2;
	}

	.list {
		width: 100%;
	}
	.list-item{
		background: #fff;
		padding: 30rpx;
		margin-bottom: 20rpx;
		.action{
			margin-top:10rpx;
			padding-top:20rpx;
			border-top: 1px solid #f5f5f5;
			font-size: $font-base;
			.iconfont{
				margin: 0 20rpx;
				font-size: 40rpx;
			}
		}
		.title{
			font-size: $font-lg;
			margin-bottom: 10rpx;
		}
		.right-info{
			font-size: $font-lg;
			float: right;
		}
		.content{
			color: $font-color-base;
			font-size: $font-base;
		}
	}

</style>
