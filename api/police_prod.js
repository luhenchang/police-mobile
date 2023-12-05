import objectAssign from 'object-assign'
import request from './request_prod.js';
import store from '@/store/index.js'
export default {
	//警情列表
	getCasePoliceList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN006',
			data:{
				"method":"getCasePoliceList",
				"params":params
			}
		});
	},
	//警情详情
	getCasePolice(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN007',
			data:{
				"method":"getCasePolice",
				"params":params
			}
		});
	},
	//接收警情
	policeReceive(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN009',
			data:{
				"method":"receive",
				"params":params
			}
		});
	},
	//警情处置
	policeDeal(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN010',
			data:{
				"method":"deal",
				"params":params
			}
		});
	},
	//修改警情
	policeEdit(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN011',
			data:{
				"method":"edit",
				"params":params
			}
		});
	},
	//警情处置无异议
	policeFinish(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN012',
			data:{
				"method":"finish",
				"params":params
			}
		});
	},
	//指派打击民警
	policeAssign(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN013',
			data:{
				"method":"assign",
				"params":params
			}
		});
	},
	//打击反馈
	policeFeedback(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN014',
			data:{
				"method":"feedback",
				"params":params
			}
		});
	},
	//分局复核
	policeReview(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN015',
			data:{
				"method":"review",
				"params":params
			}
		});
	},
	//案件列表
	getCaseManageList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN016',
			data:{
				"method":"getCaseManageList",
				"params":params
			}
		});
	},
	//案件详情
	getCaseManage(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN017',
			data:{
				"method":"getCaseManage",
				"params":params
			}
		});
	},
	//案卷列表
	getCaseFileList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN018',
			data:{
				"method":"getCaseFileList",
				"params":params
			}
		});
	
	},
	//案卷详情
	getCaseFile(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN019',
			data:{
				"method":"getCaseFile",
				"params":params
			}
		});
	},
	//涉案财务列表
	getCasePropertyList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN020',
			data:{
				"method":"getCasePropertyList",
				"params":params
			}
		});
		
	},
	//涉案财务详情
	getCaseProperty(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN021',
			data:{
				"method":"getCaseProperty",
				"params":params
			}
		});
	
	},
	//场所列表
	getCasePlaceList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN022',
			data:{
				"method":"getCasePlaceList",
				"params":params
			}
		});
		
	},
	//场所详情
	getCasePlace(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN023',
			data:{
				"method":"getCasePlace",
				"params":params
			}
		});
		
	},
	//通报列表
	getReportList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN024',
			data:{
				"method":"getReportList",
				"params":params
			}
		});
	},
	//待处理通报列表
	reportAssignList(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN025',
			data:{
				"method":"reportAssignList",
				"params":params
			}
		});
	
	},
	
	policeCompare(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN031',
			data:{
				"method":"search2",
				"params":params
			}
		});
		
	},
	
	
	//分享通报
	assignReport(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN026',
			data:{
				"method":"assignReport",
				"params":params
			}
		});
	},
	//删除通报
	delReport(ids){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN027',
			data:{
				"method":"delReport",
				"params":params
			}
		});
		
	},
	//通报反馈
	reportFeedback(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN028',
			data:{
				"method":"reportFeedback",
				"params":params
			}
		});
	},
	//数据统计
	getPoliceTotal(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN029',
			data:{
				"method":"getTotal",
				"params":params
			}
		});
		
	},
	//按部门统计未整改数量
	getUnsolveByDept(params){
		params=params || {};
		params.accessToken='Bearer '+store.state.token;
		return request({
			FFBS:'FUN030',
			data:{
				"method":"getUnsolveByDept",
				"params":params
			}
		});
		
	},
	
	
}