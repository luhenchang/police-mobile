<template>
	<view class="city-wrap " @click="show=true" :style="{'color':color}">
	  {{currentCity || '请选择'}}
	  <u-icon name='arrow-down'></u-icon>
	  <u-picker mode="region" v-model="show" :params="regionParams"  @confirm="confirm" ></u-picker>
	</view>
</template>

<script>
	
	export default {
		props:{
			color:{
				type:String,
				default:'#333333'
			}
		},
		data() {
			return {
				show:false,
				regionParams : {
					province: true,
					city: true,
					area: false
				}
			};
		},
		created() {
			console.log('获取位置')
			let self=this;
			uni.getLocation({
			    type: 'gcj02',
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					self.updateCurPosition({
						lng:res.longitude,
						lat:res.latitude
					})
					self.Api.getAddrFromLngLat({lng:res.longitude,lat:res.latitude}).then(data=>{
						if(data && data.status==0){
							if(data.result && data.result.addressComponent){
								let city=data.result.addressComponent.city;
								console.log(city)
								self.updateCurrentCity(city);
							}
						}
					})
			    },
				fail(e){
					console.log(e)
				}
			});
			// this.Api.getAddrFromLngLat({lng:'102.73020',lat:'25.07476'}).then(data=>{
			// 	console.log(data)
			// 	if(data && data.status==0){
			// 		if(data.result && data.result.addressComponent){
			// 			let city=data.result.addressComponent.city;
			// 			console.log(city)
			// 			this.updateCurrentCity(city);
			// 		}
			// 	}
			// })
		},
		methods:{
		  confirm(e){
			  console.log(e)
			  let city=e.city.label;
			  if(city=='市辖区'){
				  city=e.province.label;
			  }
			  this.updateCurrentCity(city);
		  }
		}
	}
</script>

<style lang="scss">
	.city-wrap{
		display: flex;
		width: 160rpx;
		justify-content: center;
		align-items: center;
	}
</style>
