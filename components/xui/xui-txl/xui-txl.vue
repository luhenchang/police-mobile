<template>
	<view class="yt-txl-container">
		<view class="panel-white">
			<!-- <input type="text" @input="inputFunc" class="s-input" placeholder="搜索" /> -->
			<u-search placeholder="输入姓名或手机号搜索" bg-color="#f5f5f5"  v-model="keyword"  show-action @custom="search" @search="search" ></u-search>
		</view>
		<view class="scroll" :style="{'bottom':bottom+'rpx'}">
			<scroll-view :scroll-into-view="to" scroll-y style="width: 100%;height: 100%;">
				<view :id="o.key" v-for="(o,i) in resource" :key="i">
					<view class="p" >{{o.key}}</view>
					<view @click="clickFunc(item)" v-for="(item,index) in o.data" class="info-wrap" :key="index">
						
						<view class="info">
						<view :style="'background:'+color" class="icon">
							<image :src="item.avatar" v-if="item.avatar" mode="aspectFill"></image>
							<text v-else>{{item[name] && item[name].slice(0,1)}}</text>
						</view>
						<view class="item">
							<view class="name">{{item[name] || ''}} <text class="sub-title ml20">{{item.phonenumber}}</text></view>
							<text class="post">{{item.dept && item.dept.deptName}} {{getRoleName(item)}}</text>
						</view>
						</view>
						<view v-if="showSelect" class="check-box" :class="{'checked':userId == item.userId}">
							<u-icon name="checkbox-mark" v-if="userId == item.userId" color="#ffffff" size="40"></u-icon>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="flag" v-if="index">
			<scroll-view scroll-y="true" :show-scrollbar="false" class="flag-scroll" style="width: 100%;height: 100%;">
				<view @click="toFunc(o.key)" class="flag-key" v-for="(o,i) in resource" :key="i">
					{{o.key}}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	'use strict';

	let pinyin = new(require('./pinyin'))({
		charCase: 0
	});

	export default {
		props: {
			datas: {
				type: Array,
				default () {
					return [];
				}
			},
			name: {
				type: String,
				default () {
					return "name";
				}
			},
			index: {
				type: Boolean,
				default: true
			},
			color: {
				type:String,
				default:"#f44336"
			},
			showSelect:{
				type:Boolean,
				default:false
			},
			bottom:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				resource: [],
				chars: [],
				to: "",
				keyword:'',
				cache:[],
				userId:''
			};
		},
		watch: {
			datas(r) {
				// if (!(r instanceof Array)) {
				// 	console.log("the props datas type must be array")
				// 	return
				// }
				this._parseData(r)
			}
		},
		methods: {
			toFunc(o) {
				this.to = o
			},
			search(){
				this.$emit("search",this.keyword);
			},
			clickFunc(item){
				console.log(item)
				if(!this.showSelect){
					uni.makePhoneCall({
						phoneNumber:item.phonenumber
					})
				}
				this.userId=item.userId;
				
				this.$emit("ev",item)
			},
			getRoleName(item){
				let roleName='';
				if(item.roles.length>0){
					item.roles.forEach(item=>{
						roleName +=' '+item.roleName;
					})
				}
				return roleName;
			},
			inputFunc(r){ //搜索功能
			    r=this.keyword;
				if(!r) {
					this.resource = this.cache
					return
				}
				
				let temp = []
				this.cache.forEach(o => {
					o.data.forEach(item =>{
						if(item[this.name] && item[this.name].indexOf(r) > -1){ // 匹配到
							// 确定当前这个元素的key是谁
							let key = o.key
							// 找到temp中的key
							let index = 0 //下标
							let find = false // 数据是否存在
							for(let d in temp){
								if(temp[d].key === o.key){
									index = d
									find = true
								}
							}
							if(find){ // 如果key已经存在，直接插入数据
								temp[index].data.push(item)
							} else { // 不存在初始化一个并存入
								temp.push({
									key:o.key,
									data:[item]
								})
							}
						}
					})
				})
				this.resource = temp
			},
			_type(val){
				return Object.prototype.toString.call(val).slice(8,-1).toLowerCase()
			},
			_parseData(r) {
				// 生成a-z的数组
				let data = [];
				this.chars = []
				for (let i = 65; i <= 90; i++) {
					let key = String.fromCharCode(i)
					data.push({"key":key,data:[]})
					this.chars.push(key)
				}
				this.chars.push("#");
				data.push({"key":"#",data:[]})
				if(this._type(r) === "array") {
					
					// 填充数据
					r.forEach(o => {
						// 找到char的位置
						data.forEach( (item,index) => {
							let a = this._parseChar(o[this.name || 'name'])
							if(item.key === a){
								data[index].data.push(o)
							}
						})
					})
				}
				// 组合最后数据并踢出没有匹配到a-z中的任意数据
				let finalData = []
				for (let i in data) {
					if(data[i].data.length > 0){
						finalData.push(data[i])
					}
				}
				this.resource = finalData
				this.cache = finalData
				finalData = null
			},
			_parseChar(name) {
				if (Object.prototype.toString.call(name).slice(8, -1) !== 'String') {
					// console.error("name is not string")
					return '#';
				}
				let chars = pinyin.getFullChars(name);
				return chars[0].toUpperCase()
			}
		},
		mounted() {
			this._parseData(this.datas)
		}
	};
</script>

<style lang="scss">


	.search {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20rpx;
		background: #FFFFFF;
	}

	.s-input {
		width: 700rpx;
		height: 80rpx;
		background: url('data:image/png;base64,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') 20rpx center no-repeat #fff;
		background-size: 40rpx;
		text-indent: 80rpx;
	}
	.check-box{
		min-width: 50rpx;
		min-height: 50rpx;
		display: flex;
		margin-right: 16rpx;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border:1px solid #999;
		&.checked{
			border-color: $base-color;
			background: $base-color;
		}
	}

	.scroll {
		position: absolute;
		left: 0;
		top: 120rpx;
		/* #ifdef APP-PLUS */
		top: 160rpx;
		/* #endif */
		right: 100rpx;
		bottom: 0rpx;
		width: 100%;
	}

	.p {
		position: sticky;
		top: 0;
		left: 0;
		background: #F5F5F5;
		font-size: 30rpx;
		padding: 16rpx 0;
		margin-bottom: 10rpx;
		text-indent: 40rpx;
		z-index: 99;
		font-weight: bold;
	}

	.info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 20rpx 25rpx;
	}
	
	.info-wrap{
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		padding-right: 30rpx;
		margin-bottom: 10rpx;
		background: #fff;
	}

	.icon {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #fff;
		
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.name{
		font-size: 32rpx;
		color: #000000;
	}
	.post{
		font-size: 26rpx;
	}
	.item {
		height: 100rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.flag {
		width: 50rpx;
		position: absolute;
		top: 130rpx;
		/* #ifdef APP-PLUS */
		top: 170rpx;
		/* #endif */
		right: 0rpx;
		bottom: 25rpx;
		z-index:1000;
		// background: #F5F5F5;
	}

	.flag-scroll {
		padding-top: 10rpx;
	}

	.flag-key {
		padding: 0;
		margin: 0 auto 28rpx auto;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		color: #333;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
	}
</style>
