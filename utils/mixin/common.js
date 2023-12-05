import {statics} from '../statics.js';
import {mapState,mapMutations} from 'vuex';
import store from '../../store/index.js';
export const common = {
	data(){
		return {
			statics:statics,
			loadStatus:'loadmore',
			
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {// 来自页面内分享按钮
			console.log(res.target)
		}
	
	},
	filters:{
	   pureNick(nick){
		   if(!nick){
			   return '***';
		   }
		   if(nick.length <2){
			   return nick+'*';
		   }
		   return nick[0]+'***'+nick[nick.length-1];
	   }	
	},
	computed:{
		...mapState({
			tempColor:state			=> state.tempColor,
			tempColorRgb:state  	=> state.tempColorRbg,
			hasLogin:state  		=> state.hasLogin,
			userInfo:state  		=> state.userInfo,
			token:state  			=> state.token,
			roles:state				=>state.roles,
			role:state              =>state.role,
			sysConfig:state			=>state.sysConfig,
			policeTab:state			=>state.policeTab,
		}),
		checkLogin(){ //验证是否登录
			if(this.token === null) return false;
			if(this.userInfo == null) return false;
			if(!this.userInfo.id) return false;
			return true;
		},
		getBtnStyle(){
			let style = 'background:'+this.tempColor+';color:#ffffff;';
			style+="box-shadow: 0px "+uni.upx2px(8)+"px "+uni.upx2px(32)+"px -"+uni.upx2px(8)+"px rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.3);";
			return style;
		},
		getBtnDisStyle(){
			let style = 'background:#F0F1F5;color:#AEB2C1;';
			return style;
		},
		getTagStyle(){
			let style = "background:rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.08);";
			style+='color:'+this.tempColor + ';';
			return style;
		},
		getBtnPlanStyle(){
			let style = 'border: 1px solid '+this.tempColor+';';
			style+='color:'+this.tempColor+';';
			return style;
		}
	},
	methods:{
		...mapMutations(['login','updateUserInfo','updatePoliceTab','userNameLogin','updateNumType','getDeviceInfo','updateDeviceUser','updateSysConfig']),
		navToLogin(){
			// #ifdef H5
			if(this.$helper.isWechat()){
				this.$helper.weChatLogin();
			}else{
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
			}
			// #endif
			// #ifndef H5
			uni.navigateTo({
				url:'/pages/auth/login/login'
			})
			// #endif
			
		},
		toHome(){
			uni.switchTab({
				url:'/pages/index/index'
			})
		},
		
	},
}