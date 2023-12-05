<template>
     <view > 
		<u-popup v-model="show" mode="bottom" height="40vh" closeable>
			<view class="title panel-white flex-center">接收警情</view>
			<view class="panel-white">
				<view class="title-bold mb10">警情指引</view>
				<u-collapse :item-style="itemStyle" ref="collapse" event-type="close" >
				<u-collapse-item :title="item.jqzy" v-for="(item, index) in jqzyList" :key="index" >
							{{item.jqzy}}
				</u-collapse-item>
				</u-collapse>
				<!-- <view>
					<view>1、出警过程全程录音录像，并及时回传执法音视频平台。</view>
					<view>2、如实告知报警人权利和义务，属于案件的应告知报警人三种报案方式；不得只提供”回所“这一种报案方式。</view>
					<view>3、严禁采用诱导、欺骗、刁难等方式使报警人作出不制作询问笔录、放弃报警的虚假意思表示。</view>
					<view>4、不得以无管辖权等为由不予受理，不得让报案人二次报警，不得相互推诿、扯皮。</view>
					<view>5、违反治安管理行为有下列情形之一的，不适用治安调解；</view>
					    <view >（一）雇凶伤害他人的；</view>
					    <view>（二）结伙斗殴的；</view>
					    <view>（三）寻衅滋事的；</view>
					    <view>（四）多次实施违反治安管理行为的；</view>
					    <view>（五）当事人在治安调解过程中又挑起事端的；</view>
					    <view>（六）其他不宜治安调解的</view>
				</view> -->
				<view class="action-line panel-white" >
					<u-button type="primary" @click="compare">智能比对</u-button>
					<u-button type="error" @click="receive">接收警情</u-button>
				</view>
			
			</view>
		
		</u-popup>
     </view>
</template>

<script>

let Str=""
export default {
 
  props:{
   

  },
  data () {
    return {
	  id:'',
	  res:'',
	  other:'',
	  show:false,
	  detail:{},
	  jqzyList:[],
	  itemStyle:{}
	 
    }
  },
  created(){
   
  },
  methods:{
	
	getDetail(){
		this.Api.getCasePolice({id:this.id}).then(data=>{
			this.detail=data;
			this.Api.policeCompare({content:data.content}).then(data=>{
			   this.jqzyList=data.jqzyList;
			   this.$nextTick(()=>{
				   this.$refs.collapse.init();
			   })
			})
		})
	},
	open(id){
		this.id=id;
		this.show=true;
		this.getDetail();
	},
	compare(){
		uni.navigateTo({
			url:'/pages/index/police-compare?id='+this.id
		})
	},
	receive(){
		this.Api.policeReceive(this.detail).then(data=>{
			
			this.$toast('警情接收成功');
			this.$emit('reload');
			this.show=false;
			
		})
	},
   

  }
}
</script>

<style lang="less" scoped>
.action-line{
		border-top:1px solid #F5F5F5;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

</style>
