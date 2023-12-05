<template>
     <view > 
		<u-popup v-model="show" mode="bottom" height="90%" closeable>
			<view class="txl-container">
				<xui-txl @ev="confirm" showSelect :datas="list" :color="tempColor" :index="true" name="name"></xui-txl>
			</view>
			<view class="panel-white">
				<u-button type="primary" @click="submit">提交</u-button>
			</view>
		</u-popup>
     </view>
</template>

<script>


export default {
 
  props:{
    id:{
		type:[Number,String],
		default:''
	}

  },
  data () {
    return {
	  show:false,
	  detail:{},
	  list:[],
	  queryParams:{
		  pageNum:1,
		  pageSize:500,
		  roleId:1
	  }
    }
  },
  created(){
   
  },
  methods:{
	
	getDetail(){
		this.Api.getCasePolice({id:this.id}).then(data=>{
			this.detail=data;
			this.getContactList();
		})
	},
	getContactList(){
		this.Api.getUserList(this.queryParams).then(data=>{
			this.list=data;
		})
	},
	open(){
		this.show=true;
		this.getDetail();
	},
	confirm(userId){
		console.log(userId)
		this.detail.dajiUserId=userId;
	},
	submit(){
		if(!this.detail.dajiUserId){
			this.$toast('请选择打击民警')
			return;
		}
		this.Api.policeAssign(this.detail).then(data=>{
			this.$toast("操作成功!");
			this.$emit("reload");
			this.show=false;
		})
	}
   

  }
}
</script>

<style lang="less" scoped>
.txl-container{
	height: 80vh;
}

</style>
