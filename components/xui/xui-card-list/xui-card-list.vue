<template>
	<!-- 会员卡 -->
	<view >
		<card v-for="(item,index) in list" :key="index" :card="item"></card>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	import Card from '../xui-card/xui-card';
	
	export default {
		components:{
			Card
		},
		props:{
			params:{
				type:Object,
				default:()=>{
					return {
						pageIndex:1,
						is_rec:1,
						pageSize:3
					};
				}
				
			}
		},
		data() {
			return {
				list:[]
			};
		},
		created() {
			this.getList()
		},
		methods:{
			getList(){
				this.Api.getCardList(this.params).then(data=>{
					this.list=data;
				})
			}
			
		}
	}
</script>

<style lang="scss">
	
</style>
