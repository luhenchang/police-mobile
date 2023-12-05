import config from '../config/index'
import cache from '../utils/cache'
import helper from '@/utils/helper'
import objectAssign from 'object-assign'
import store from '@/store/index.js'


function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString(),          // 秒
		"s+": date.getMilliseconds().toString()     //毫秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function getTime(){
	let dates=new Date();
	return dateFormat("YYYYmmddHHMMSSsss",dates);
}

function PrefixZero(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
function RandomNumBoth(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
}
function getIP(){
	let ip="014097145015";
	// #ifdef APP-PLUS
	 ip=helper.getDeviceIp();
	
	 
	if(ip){
		let ipArr=ip.split('.');
		ipArr.forEach(item=>{
			item=PrefixZero(item,3);
		})
		ip=ipArr.join('');
	
	}else{
		ip="014097145015";
	}
	// #endif
	return ip;
}
function getBWBH(){
	
	
	let str='SR'+getIP()+getTime()+RandomNumBoth(1000,9999);
	console.log(str.length);
	return str;
}
function prepareParams(params){
	let deviceUser=cache.get("deviceUser");
	let imei=cache.get("imei");
	let numType=cache.get("numType");
	// let deviceUser=store.state.deviceUser;

	let queryParams={
		"FWQQ_BWBH":getBWBH(),//报文编号
		"BWLYIPDZ":getIP(),//报文来源IP地址
		"BWLYDKH":'80',//报文来源端口
		"FWQQZ_ZCXX":"A00111010100000010001",//服务请求者_注册信息
		"FWBS":"S00111010100000005046",//服务标识
		"FFBS":params.FFBS,//方法标识
		"FWQQ_RQSJ":getTime(),//服务请求_日期时间
		"FWQQ_NR":params.data,//服务请求_内容
		"XXCZRY_XM":deviceUser.xm || "",//信息操作人员_姓名
		"XXCZRY_GMSFHM":deviceUser.sfzh || "",//手机终端登录人身份证号
		"XXCZRY_GAJGJGDM":deviceUser.orgId || "",//手机终端登录人所属机构
		"FWQQSB_BH":imei,//手机终端IMEI
		"FWQQ_SJSJLX":"service_request",//服务请求审计事件类型（固定值：service_request）
		"YYSBS":numType,//运营商标识（联通：lt,电信：dx）
	}
	console.log(queryParams);
	return queryParams;
}
 var request=async function(params){
	
	let data=prepareParams(params);
	
	
	return await new Promise((resolve, reject) => {

	uni.request({
		url:config.apiHost,
		data:data,
		method:"POST",
		success:(res)=>{
			
			uni.hideLoading();
			console.log(res);
			let result=res.data;
			let rs=result.FWTG_NR;
			console.log(rs);
			if(rs.code==200){
				
				resolve(rs.data || rs.rows);
			}else if(rs.code==401){
				
				
				// uni.navigateTo({
				// 	url:'/pages/auth/login/login'
				// })
				reject(rs);
			}else if(rs.code==500){
				
					uni.showModal({
						title:'提示',
						content:'操作失败！',
						showCancel:false
					})
				
				
				reject(rs);
			}else{
				if(rs.msg){
					uni.showModal({
						title:'提示',
						content:rs.msg,
						showCancel:false
					})
				}
			
				reject(rs);
			}
			
		},
		fail:(e)=>{
			
			
			reject(e);
			
		}
		
	})
	})
}

export default  request;


