<template>
	<view class="container">
			<view class="pannel-white">
				<u-parse  :html="data.content"></u-parse>
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
		},
		data() {
			return {
				data:{},
				name:''
				}
		},
		onShow() {
		},
		onLoad(option){
			this.name=option.name;
			this.getList()
		},
		onPullDownRefresh() {
		},
		methods: {
			
			getList(){
				if(this.name=="about"){
					this.data.content=this.sysConfig['app.about'];
				}
			   // this.Api.getSinglePage({alias:this.name}).then(data=>{
				  //  this.data=data || {}
				  //  if(data.title){
					 //   uni.setNavigationBarTitle({
					 //   	title:data.title
					 //   })
				  //  }
				   
				   
			   // })
			},
			
		
		}
	}
</script>

<style lang="scss">

</style>
