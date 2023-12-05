<template>
	<view class="tui-set-box">
		<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/userInfo')">
			<view class="tui-list-cell tui-info-box">
				<image :src="userInfo.avatar" class="tui-avatar"></image>
				<view>{{userInfo.nickName}}</view>
			</view>
		</tui-list-cell>
		<view class="tui-mtop">
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/account')">
				<view class="tui-list-cell">
					账户与安全
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/auth/forgetPwd/forgetPwd')">
				<view class="tui-list-cell">
					修改密码
				</view>
			</tui-list-cell> -->
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/single-page?name=contact')">
				<view class="tui-list-cell">
					联系我们
				</view>
			</tui-list-cell> -->
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/single-page?name=userterms')">
				<view class="tui-list-cell">
					用户条款
				</view>
			</tui-list-cell>
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/single-page?name=privacy')">
				<view class="tui-list-cell">
					隐私政策
				</view>
			</tui-list-cell> -->
			<!-- <tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/feedback')">
				<view class="tui-list-cell">
					意见反馈
				</view>
			</tui-list-cell> -->
			<tui-list-cell padding="0" :lineLeft="false" :arrow="true" @click="navTo('/pages/user/single-page?name=about')">
				<view class="tui-list-cell">
					关于应用
				</view>
			</tui-list-cell>
			
			<!-- #ifdef APP-PLUS -->
			<u-cell-group>
				<u-cell-item  title="检查更新" :value="'当前版本'+version"></u-cell-item>
			</u-cell-group>
			<!-- #endif -->
			
			
		</view>

		<view class="tui-exit">
			<u-button shape="circle" shadow type="error" height="88rpx" @click="logout">退出登录</u-button>
		</view>
		<xui-footer></xui-footer>
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
				version:'',
			}
		},
		onLoad() {
			this.getVersion()
		},
		methods: {
			...mapMutations(['logout']),
			getVersion(){
				let self=this;
				// #ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					self.version=inf.version;
				});
				// #endif
			},
			checkUpdate(){
				APPUpdate(true);
			},
			destory(){
				let self=this;
				uni.showModal({
					title:'账户注销',
					content:'账户注销后，您的个人资料将被删除，您确定要注销账户吗？',
					cancelText:'取消',
					confirmText:'确定',
					success(res) {
						console.log(res);
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/user/del-user'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.tui-set-box {
		padding-bottom: 20rpx;
		color: #333;
	}

	.tui-list-cell {
		display: flex;
		align-items: center;
		padding: 24rpx 30rpx;
		font-size: 30rpx;
	}

	.tui-info-box {
		font-size: 34rpx;
	}

	.tui-avatar {
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}

	.tui-mtop {
		margin-top: 20rpx;
	}

	.tui-exit {
		padding: 100rpx 24rpx;
	}
</style>
