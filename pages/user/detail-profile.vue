<template>
	<view>
	<view class="pannel-white margin-bottom">
			<u-form :model="form" ref="uForm" :label-width="170" :border-bottom="true" >
						
						<xui-selector
						v-model="form.area" label="户籍" prop="area"
						:default-value="addr"
						 type="region">
						 </xui-selector>
						
						<xui-selector
						v-model="form.minzu" label="民族" prop="minzu"
						 :list="minzuList"
						 :defaultValue="form.minzu"
						 value-name="key" label-name='value'>
						 </xui-selector>
						 <xui-selector
						 v-model="form.religion" label="宗教" prop="religion"
						  :list="religionList"
						  :defaultValue="form.religion"
						  value-name="key" label-name='value'>
						  </xui-selector>
						
					
						<xui-selector
						v-model="form.smoke" label="是否吸烟" prop="smoke"
						 :list="smokeList"
						  :defaultValue="form.smoke"
						 value-name="key" label-name='value'>
						 </xui-selector>
						 <xui-selector
						 v-model="form.drink" label="是否喝酒" prop="drink"
						  :list="drinkList"
						   :defaultValue="form.drink"
						  value-name="key" label-name='value'>
						  </xui-selector>
						
					</u-form>
				
			
	</view>
	<view class="bottom-btn">
		<u-button @click="submit" type="error">提交</u-button>
	</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	import {smokeList,drinkList,religionList,minzuList} from '@/utils/constants.js'
	export default {
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		data() {
			return {
				smokeList:smokeList,
				drinkList:drinkList,
				religionList:religionList,
				minzuList:minzuList(),
				user:{},
				addr:[],
				from:'new',
				form:{
					
				},
				rules:{
					
				}
			}
		},
		onLoad(option) {
			this.from=option.from;
			this.init()
		},
		onReady() {
				this.$refs.uForm.setRules(this.rules);
		},
	    watch:{
			
			"form.area"(nval){
				console.log(nval)
				this.form.born_province=nval.province.label+' '+nval.city.label+' '+nval.area.label;
			},
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
				
				this.getUserProfile()
			},
			 getUserProfile(){
			      this.Api.getUserProfile({user_guid:this.userInfo.user_guid}).then(
			        data=>{
			          this.user=data;
					  this.form=data;
					  if(data.born_province){
						   this.addr=data.born_province.split(' ')
					  }
					 
			        }
			      )
			    },
		   submit(){
			 
			   console.log(this.form)
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
			   this.Api.saveUser(this.form).then(data=>{
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
</style>
