import objectAssign from 'object-assign'
import config from '@/config/index.js'
import user from './user'
import login from './login.js'
import police from './police.js'
import userProd from './user_prod'
import loginProd from './login_prod'
import policeProd from './police_prod'

	var api={};
	api= objectAssign(user,login,police);
	if(config.env=='prod'){
		api=objectAssign(userProd,loginProd,policeProd);
	}


export default api;