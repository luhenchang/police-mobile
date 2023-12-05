import request from './request';
import config from '@/config/index.js'

export default {
	//警情列表
	getCasePoliceList(params){
		return request({
			url:'/api/police/getCasePoliceList',
			method:'GET',
			params:params,
		});
	},
	//警情详情
	getCasePolice(params){
		return request({
			url:'/api/police/getCasePolice',
			method:'GET',
			params:params,
		});
	},
	//接收警情
	policeReceive(params){
		return request({
			url:'/api/police/receive',
			method:'POST',
			params:params,
		});
	},
	//警情处置
	policeDeal(params){
		return request({
			url:'/api/police/deal',
			method:'POST',
			params:params,
		});
	},
	//修改警情
	policeEdit(params){
		return request({
			url:'/api/police/edit',
			method:'POST',
			params:params,
		});
	},
	//警情处置无异议
	policeFinish(params){
		return request({
			url:'/api/police/finish',
			method:'POST',
			params:params,
		});
	},
	//指派打击民警
	policeAssign(params){
		return request({
			url:'/api/police/assign',
			method:'POST',
			params:params,
		});
	},
	//打击反馈
	policeFeedback(params){
		return request({
			url:'/api/police/feedback',
			method:'POST',
			params:params,
		});
	},
	//分局复核
	policeReview(params){
		return request({
			url:'/api/police/review',
			method:'POST',
			params:params,
		});
	},
	//案件列表
	getCaseManageList(params){
		return request({
			url:'/api/police/getCaseManageList',
			method:'GET',
			params:params,
		});
	},
	//案件详情
	getCaseManage(params){
		return request({
			url:'/api/police/getCaseManage',
			method:'GET',
			params:params,
		});
	},
	//案卷列表
	getCaseFileList(params){
		return request({
			url:'/api/police/getCaseFileList',
			method:'GET',
			params:params,
		});
	},
	//案卷详情
	getCaseFile(params){
		return request({
			url:'/api/police/getCaseFile',
			method:'GET',
			params:params,
		});
	},
	//涉案财务列表
	getCasePropertyList(params){
		return request({
			url:'/api/police/getCasePropertyList',
			method:'GET',
			params:params,
		});
	},
	//涉案财务详情
	getCaseProperty(params){
		return request({
			url:'/api/police/getCaseProperty',
			method:'GET',
			params:params,
		});
	},
	//场所列表
	getCasePlaceList(params){
		return request({
			url:'/api/police/getCasePlaceList',
			method:'GET',
			params:params,
		});
	},
	//场所详情
	getCasePlace(params){
		return request({
			url:'/api/police/getCasePlace',
			method:'GET',
			params:params,
		});
	},
	//通报列表
	getReportList(params){
		return request({
			url:'/api/police/getReportList',
			method:'GET',
			params:params,
		});
	},
	//待处理通报列表
	reportAssignList(params){
		return request({
			url:'/api/police/reportAssignList',
			method:'GET',
			params:params,
		});
	},
	//智能比对
	// policeCompare(params){
	// 	return request({
	// 		url:'/api/police/policeCompare',
	// 		method:'GET',
	// 		params:params,
	// 	});
	// },
	policeCompare(params){
		return request({
			url:config.compareHost+'/api/v1/es/search2',
			method:'GET',
			params:params,
		});
	},
	
	
	//分享通报
	assignReport(params){
		return request({
			url:'/api/police/assignReport',
			method:'POST',
			params:params,
		});
	},
	//删除通报
	delReport(params){
		return request({
			url:'/api/police/delReport',
			method:'GET',
			params:params,
		});
	},
	//通报反馈
	reportFeedback(params){
		return request({
			url:'/api/police/reportFeedback',
			method:'POST',
			params:params,
		});
	},
	//数据统计
	getPoliceTotal(params){
		return request({
			url:'/api/police/getTotal',
			method:'GET',
			params:params,
		});
	},
	//按部门统计未整改数量
	getUnsolveByDept(params){
		return request({
			url:'/api/police/getUnsolveByDept',
			method:'GET',
			params:params,
		});
	},
	
	
}