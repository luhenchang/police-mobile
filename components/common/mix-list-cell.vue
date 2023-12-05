<template>
	<view class="list-content"  >
		<view class="yt-list-cell" :class="border" @click="eventClick" hover-class="cell-hover"  :hover-stay-time="50">
			<view class="list-content">
			<text
				v-if="icon"
				class="cell-icon "
				:style="[{
					color: iconColor,
				}]"
				:class="icon"
			></text>
			<text class="cell-tit clamp">{{title}}</text>
			<text v-if="tips" class="cell-tip">{{tips}}</text>
			<text class="cell-more yticon" v-if="showArrow"
				:class="typeList[navigateType]"
			></text>
			</view>
			<view class="list-note sub-txt" v-if="note">
				<richTextParse :content="note"></richTextParse>
			</view>
			
		</view>
		
	</view>
</template>
 
<script>
	/**
	 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
	 *  比如加入image， iconSize可控等
	 */
	export default {
		data() {
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia'
				},
			}
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			tips: {
				type: String,
				default: ''
			},
			note: {
				type: String,
				default: ''
			},
			item: {
				type: Object,
				default: ()=>{
					return {};
				}
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			showArrow:{
				type:Boolean,
				default:true
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			iconColor: {
				type: String,
				default: '#333'
			}
		},
		methods: {
			eventClick(){
				this.$emit('eventClick');
			}
		},
	}
</script>

<style lang='scss'>

	.icon .yt-list-cell.b-b:after{
		left: 90rpx;
	}
	.red{
		margin: 0 12rpx;
	}
	.margin-lr{
		margin: 0 14rpx;
	}
	.line{
		width: 100%;
	}
	.yt-list-cell{
		display:flex;
		align-items:baseline;
		flex-wrap: wrap;
		padding: 20rpx $page-row-spacing;
		line-height:60rpx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30rpx;
		}

		.cell-icon{
			align-self:center;
			width:56rpx;
			max-height:60rpx;
			font-size:38rpx;
		}
		.cell-more{
			align-self: center;
			font-size:30rpx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right:10rpx;
		}
		.cell-tip{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.list-content{
			overflow: hidden;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			width: 100%;
		}
		.list-note{
		flex: 1;
		overflow: hidden;
		display: flex;
		width: 100%;
		flex-direction: column;
		font-size: $font-sm;
		color: $font-color-light;
		margin-left: 10rpx;
		}
	}
	.danger .yt-list-cell .cell-tip{
		font-size: 28rpx;
		color: red;
	}
</style>
