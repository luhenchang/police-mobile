<template>
	<view class="container">
		<view v-if="!hasLogin" class="container">
			<u-empty text="您还未登录,请先登录" mode="permission">
				<u-button slot="bottom" type="primary" @click="navTo('/pages/auth/login/login')">去登录</u-button>
			</u-empty>
		</view> 
		<view v-else>
			<view >
			<view class="panel-white page-margin-bottom">
				<u-form :model="form" ref="uForm" label-position="top">
					<u-form-item><u-input v-model="form.title" type='text' input-align="center" placeholder-style="text-align:center;color: #c0c4cc;font-size:32rpx" placeholder="请输入作文标题"/></u-form-item>
					<u-form-item><u-input v-model="form.content" maxlength="10000" placeholder-style="text-align:center;color: #c0c4cc;" type='textarea' placeholder="请输入作文正文,你也可以直接粘贴在这里" height="2000"/></u-form-item>
				</u-form>
			</view>
			<view class="bottom-btn " >
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
			
			</view>
			
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
				form:{},
				loading:false
			};
		},
		onLoad(options){
		},
		onShow() {
		},
	
		methods: {
			submit(){
				if(!this.form.title){
					this.$toast('请输入作文标题');
					return ;
				}
				if(!this.form.content){
					this.$toast('请输入作文正文');
					return ;
				}
				if(this.loading){
					return ;
				}
				this.loading=true;
				let params={
					title:this.form.title,
					content:this.form.content.replace(/[\r\n]/g,"</br>")
				}
		
				this.Api.articleSubmit(params).then(data=>{
					this.loading=false;
					uni.showModal({
						title: '提示',
						content: '您的作文已经提交成功，请等待审核',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success:e => {
							if(e.confirm){
								uni.navigateTo({
									url:'/pages/article/detail?id='+data.id
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				},e=>{
					this.loading=false;
				})
			}
			
		},
	}
</script>

<style lang="scss">
	
</style>
