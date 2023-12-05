<template>
	<view class="form-container">
			<u-form :model="form" ref="uForm" label-position="top">
				<u-form-item label="收货人姓名" prop="name"><u-input v-model="form.name" placeholder="请输入收货人姓名"/></u-form-item>
				<u-form-item label="手机号码" prop="mobile">
					<u-input v-model="form.mobile" placeholder="请输入手机号" max-length="11" /></u-form-item>
				<xui-selector
				v-model="district" label="省、市、区 " prop="district"
				:default-value="addr"
				 type="region">
				 </xui-selector>
				<u-form-item label="邮政编码" prop="postcode"><u-input v-model="form.postcode" placeholder="请输入邮政编码" /></u-form-item>
				<u-form-item label="详细地址" prop="address"><u-input v-model="form.address"  type="textarea" placeholder="请输入详细地址(街道/小区/楼栋单元)"/></u-form-item>
			</u-form>
		
		<view class="bottom-btn" >
			<u-button type="primary"  @click="formSubmit">提交</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAddr:false,
				addrStr:'',
				addr:[],
				district:{},
				form:{
					name:'',
					mobile:'',
					postcode:'',
					address:''
				},
				rules:{
					name:[
						{
							required:true,
							message:'姓名必填',
							trigger: ['blur', 'change']
						}
					],
					mobile:[
						{
							required:true,
							message:'手机号必填',
							trigger: ['blur', 'change']
						}
					],
					address:[
						{
							required:true,
							message:'详细地址必填',
							trigger: ['blur', 'change']
						}
					],
				}
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(option) {
			if(option.id){
				this.form.id=option.id;
				this.getAddress(option.id);
				uni.setNavigationBarTitle({
					title:'编辑收货地址'
				})
			}else{
				uni.setNavigationBarTitle({
					title:'新增收货地址'
				})
			}
		},
		watch:{
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
			getAddress(id){
				this.Api.getAddress({id:id}).then(data=>{
					this.form=data;
					this.addr.push(data.province);
					this.addr.push(data.city);
					this.addr.push(data.area);
				})
			},
			formSubmit() {
				this.form.province=this.district && this.district.province.label;
				this.form.city=this.district && this.district.city.label;
				this.form.area=this.district && this.district.area.label;
				if(!this.form.province){
					this.$toast('请选择省、市、区');
					return;
				}
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
					title:'请稍候'
				})
				this.Api.saveAddress(this.form).then(data=>{
					this.$alert('保存成功！');
					uni.navigateBack()
				})
			},
			
		}
	}
</script>

<style lang="scss">
.form-container{
	background: #fff;
	padding: 30rpx;
	.uni-form-item{
		font-size: $font-base;
		margin-bottom: 15rpx;
		border-bottom: 1px solid #f5f5f5;
	}
}
</style>
