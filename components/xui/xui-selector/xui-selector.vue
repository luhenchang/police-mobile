<template>
     <view > 
	  <u-form-item :label="label" :prop="prop" :required="required">
	  	<u-input v-model="res" type="select" @click="onClick" :placeholder="'请选择'+label"/>
	  </u-form-item>
		
	 <u-select 
	 v-if="type=='custom'"
	 v-model="show" 
	 mode="single-column" 
	 :value-name="valueName"
	 :label-name="labelName"
	 :list="list" @confirm="confirm">
	 </u-select>
	 
	 <u-picker mode="time" v-model="show"  :params="timeParams" v-if="type=='time'" @confirm="confirm"></u-picker>
	 <u-picker mode="time" v-model="show"  :params="dateParams" v-if="type=='date'" @confirm="confirm"></u-picker>
	 <u-picker mode="region" v-model="show" :params="regionParams" v-if="type=='region'" @confirm="confirm" :default-region="defaultValue"></u-picker>
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
	list:{
		type:Array,
		default:function(){
			return [];
		}
	},
	disabled:{
		type:Boolean,
		default:false
	},
	required:{
		type:Boolean,
		default:false
	},
	defaultValue:{
		
	},
	label:{
		type:String,
	},
	prop:{
		type:String
	},
	type:{
		type:String,
		default:'custom'
	},
	valueName:{
		type:String,
		default:'value'
	},
	labelName:{
		type:String,
		default:'label'
	}
  },
  data () {
    return {
		show:false,
		res:'',
		dateParams: {
			year: true,
			month: true,
			day: true,
			hour: false,
			minute: false,
			second: false
		},
		timeParams: {
			year: true,
			month: true,
			day: true,
			hour: true,
			minute: true,
			second: true
		},
		regionParams : {
			province: true,
			city: true,
			area: true
		}
		
	}
      
  },

  created(){
	this.init()
  },
  watch:{
	 defaultValue(nval){
		 this.init()
	 } 
  },
  methods:{
	  init(){
		 if(this.type!='region'){
			 if(this.defaultValue){
				 this.res=this.defaultValue;
			 }else{
				 this.res=this.value;
			}
		 }else{
		 	this.res=this.defaultValue.join('-');
			
		 } 
	  },
	  onClick(){
		  if(this.disabled){
			  this.$toast(this.label+'不能修改!');
			  return;
		  }
		this.show=true;  
	  },
	  confirm(e){
		  console.log(this.type)
		  if(this.type=='custom'){
			 this.res=e[0].label;
			 this.$emit('input',e[0].value); 
		  }else if(this.type=='date'){
			  this.res=e.year+'-'+e.month+'-'+e.day;
			  this.$emit('input',this.res); 
		  }
		   if(this.type=='region'){
			  this.res=e.province.label+'-'+e.city.label+'-'+e.area.label;
			  console.log(this.res)
			  this.$emit('input',e); 
		  }
		  console.log(e)
	
	  }
	
   

  }
}
</script>


<style lang="scss">
.u-border-bottom{
		border-bottom: 1px solid #F5F5F5;
	}
</style>