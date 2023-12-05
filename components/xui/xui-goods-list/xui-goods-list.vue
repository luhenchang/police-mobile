<template>
		<view >
			<media-list :list="list" v-if="showType=='media'"></media-list>
			<pic-list :list="list" v-if="showType=='pic'"></pic-list>
			<card-list :list="list" v-if="showType=='card'"></card-list>
		</view>
</template>

<script>
	import mediaList from './media-list'
	import picList from './pic-list'
	import cardList from './card-list'
	export default {
		components:{
			mediaList,picList,cardList
		},
		props:{
			showType:{
			 type:String,
			 default:'pic'
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
			}
		},
		data() {
			return {};
		},
	
		methods:{
			
		}
	}
</script>

<style lang="scss">

</style>
