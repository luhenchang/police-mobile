<template>
     <view > 
	  <u-tag v-for="(item,index) in cateList" class="tag-wrap" :key="index" 
	  :text="item.name" 
	  :type="item.id==current.id?'error':'info'"
	  :mode="item.id==current.id?'dark':'light'"
	  @click="onClick(item)" ></u-tag>
	 </view>
</template>

<script>

import {mapState,mapMutations} from 'vuex'

export default {
  computed: {
  },
  props:{
	value:{
	},
	
  },
  data () {
    return {
		cateList:[],
		current:{}
		
	}
      
  },

  created(){
	this.init()
  },

  methods:{
	  init(){
		 this.getCateList();
	  },
	  getCateList(){
	  	this.Api.getCateList().then(data=>{
	  		this.cateList=data;
	  	})
	  },
	  onClick(item){
		this.current=item
		this.$emit('input',item);  
	  },
	 
	
   

  }
}
</script>


<style lang="scss">
.u-border-bottom{
		border-bottom: 1px solid #F5F5F5;
	}
 
</style>