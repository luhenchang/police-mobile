<template>
		<view >
			<media-list :list="list" v-if="showType=='media'" :showStatus="showStatus"></media-list>
			<pic-list :list="list" v-if="showType=='pic'"></pic-list>
		</view>
</template>

<script>
	import mediaList from './media-list'
	import picList from './pic-list'
	export default {
		components:{
			mediaList,picList
		},
		props:{
			showType:{
			 type:String,
			 default:'media'
			},
			list:{
				type:Array,
				default:()=>{
					return [];
				}
			},
			level:{
				type:Number,
				default:1
			},
			showStatus:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		watch:{
		
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
