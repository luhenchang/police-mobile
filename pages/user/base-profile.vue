<template>
	<view>
		<tui-list-cell padding="0" :arrow="true" @click="changeAvatar">
			<view class="tui-list-cell">
				<view>头像</view>
				<image :src="userInfo.avatar" class="tui-avatar"></image>
			</view>
		</tui-list-cell>
	<view class="pannel-white margin-bottom ">
		
			<u-form :model="form" ref="uForm" :label-width="170" :border-bottom="true" >
						<u-form-item label="姓名" prop="name" :required="true" :border-bottom="true" >
							<u-input v-model="form.name" />
						</u-form-item>
						<!-- <xui-selector
						v-model="district" label="所在地区" prop="district" :required="true"
						:default-value="addr"
						 :disabled='disabled'
						 type="region">
						 </xui-selector> -->
						
						<xui-selector 
						v-model="form.sex" label="性别" prop="sex"
						 :list="sexList"
						 :defaultValue="sex"
						 value-name="value" label-name='label'>
						 </xui-selector>
						<!-- <xui-selector
						v-model="form.birthday" label="生日" prop="birthday"
						:default-value="form.birthday"
						 type="date">
						 </xui-selector>
						
						<u-form-item label="微信" prop="wechat">
							<u-input v-model="form.wechat" />
						</u-form-item> -->
						<u-form-item label="邮箱" prop="email">
							<u-input v-model="form.email" />
						</u-form-item>
						
		</u-form>
				
			
	</view>
	<view class="bottom-btn">
		<u-button @click="submit" type="primary">提交</u-button>
	</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	import {sexList} from '@/utils/constants.js'
	export default {
		data() {
			return {
				sexList:sexList,
				sex:"",
				user:{},
				addr:[],
				company:'',
				district:"",
				disabled:false,
				form:{
					nickName:'',
					email:''
				},
				rules:{
					name:[
						{
							required:true,
							message:'姓名必填',
							trigger: ['blur', 'change']
						}
					],
					email:[
						{
							message:'邮箱格式不正确',
							type:'email',
							trigger: ['blur', 'change']
						}
					],
				}
			}
		},
		onLoad(option) {
			this.init()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		watch:{
			"form.sex"(nval){
				console.log(nval)
			},
			"district"(nval){
				console.log(nval)
				if(nval){
					this.form.province=nval.province.label;
					this.form.city=nval.city.label;
					this.form.area=nval.area.label;
				}
				
			},
		},
		methods: {
			init(){
				if(!this.hasLogin){
					uni.navigateTo({
						url:'/pages/auth/login/login'
					})
					return;
				}
				// this.form=this.$u.deepClone(this.userInfo);
				// console.log(this.form)
				// this.user=this.form;
				// this.sex=this.$helper.getSex(this.userInfo.sex)
				// if(this.user.province && !this.user.district){
				// 	   if(this.user.province.indexOf('市')==-1){
				// 			this.user.province+='市' 
				// 	   }
				// 	  this.addr.push(this.user.province);
				// 	  this.addr.push('市辖区');
				// 	  if(this.user.city.indexOf('区')==-1){
				// 		 this.user.city+='区' 
				// 	  }
				// 	  this.addr.push(this.user.city);
				// }else if(this.user.province && (this.user.province.indexOf('省') >-1 || this.user.province.indexOf('市') >-1) ){
				// 	  this.addr.push(this.user.province);
				// 	  this.addr.push(this.user.city);
				// 	  this.addr.push(this.user.district);
				// }
				
				// console.log(this.form)
				this.Api.getUser().then(data=>{
					this.form=data;
					this.sex=this.$helper.getSex(data.sex)
				})
			},
			changeAvatar(){
				uni.navigateTo({
					url:'/pages/user/crop'
				})
			},
		   submit(){
			   console.log(this.form)
			   this.form.province=this.district && this.district.province.label;
			   this.form.city=this.district && this.district.city.label;
			   this.form.area=this.district && this.district.area.label;
			   this.$refs.uForm.validate(valid => {
						if (valid) {
							this.submitDo()
						} else {
							console.log('验证失败');
						}
			   });
			  
		   },
		   submitDo(){
			   uni.showLoading({
			   	title:'正在提交...'
			   })
			   this.Api.updateUser(this.form).then(data=>{
					uni.navigateBack({
						delta:1
					   })
				})
		   }
		}
	}
</script>

<style>
	.radio-wrap{
		width: 100%;
		border-bottom: 1px solid #F5F5F5;
	}
	.u-border-bottom{
		border-bottom: 1px solid #F5F5F5;
	}
	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
	}
	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		margin-bottom: 20rpx;
	}
</style>
