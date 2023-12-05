<template>
	<view class="container">
		<tui-list-cell :hover="false" :lineLeft="false">
			<view class="tui-cell-input">
				<input :value="value" :placeholder="placeholder" :disabled="disabled" @click="onClick" placeholder-class="tui-phcolor" type="text" :auto-focus="true" :focus="true" maxlength="40" @input="inputNickname" />
			<!-- 	<view class="tui-icon tui-icon-close_fill" v-show="nickname" @click="clearInput"></view> -->
			   <icon type="clear" :size="14" color="#bfbfbf" v-show="value&&!disabled" @click="clearInput"></icon>
			</view>
		</tui-list-cell>
		<view class="tui-btn-box">
			<u-button shadow  shape="circle" type="primary" @click="submit">确定</u-button>
		</view>
			<u-select v-model="show" mode="single-column" :list="sexList" @confirm="confirm"></u-select>
	</view>
</template>

<script>

export default {
	data() {
		return {
			value: '',
			type:'nick',
			text:'昵称',
			placeholder:'请输入',
			show:false,
			sex:'',
			sexList: [
				{
					value: '1',
					label: '男'
				},
				{
					value: '2',
					label: '女'
				}
			],
			disabled:false
		};
	},
	onLoad(option) {
		this.type=option.type;
		if(this.type=='nickName'){
			this.text='昵称';
			this.value=this.userInfo.nick;
		}else if(this.type=='userName'){
			this.text='用户名';
				this.value=this.userInfo.userName;
		}else if(this.type=='sex'){
			this.text='性别';
			this.value=this.userInfo.sex==1?'男':'女';
			this.sex=this.userInfo.sex;
			this.placeholder='请选择'
			this.disabled=true
		}
		this.placeholder +=this.text;
		uni.setNavigationBarTitle({
			title:'修改'+this.text
		})
		this.init()
	},
	methods: {
		init(){
			if(!this.hasLogin){
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
				return;
			}
		},
		onClick(){
			if(this.type=='sex'){
				this.show=true;
			}
		},
		inputNickname(e) {
			this.value = e.detail.value;
		},
		clearInput() {
			this.value = '';
		},
		confirm(e){
		  this.value=e[0].label;
		  this.sex=e[0].value;
		},
		submit(){
			let params=this.$u.deepClone(this.userInfo);
			if(!this.value){
				this.$alert(this.placeholder);
				return;
			}
			if(this.type=='userName'){
				params.userName=this.value;
			}else if(this.type=='nickName'){
				params.nick=this.value;
			}else if(this.type=='sex'){
				params.sex=this.sex;
			}
			this.Api.updateUser(params).then(data=>{
				uni.navigateBack({
					delta:1
				})
			})
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-top: 20rpx;
	.tui-cell-input {
		width: 100%;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		
		input {
			flex: 1;
			padding-left: $uni-spacing-row-base;
		}
	}
	.tui-btn-box {
		padding: 40rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
	}
}
</style>
