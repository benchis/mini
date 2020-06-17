import baseConfig from '../../config/index.js';
const defConfig = {
	header:{},
	method:'GET',
	timeout:30000,
	dataType:'json',
	responseType:'text',
	success:()=>{},
	fail:()=>{},
	complete:()=>{}
};

/**
 * 接口请求
 * @param {url:'接口请求路径',data:'接口请求参数',config:'接口配置信息'}  
 */
const request = (url,data,config)=>{
	return new Promise((resolve, reject)=>{
		let options = Object.assign(defConfig,{
			data,
			success:(res)=>{
				if(res.statusCode === 200){
					let respone = res.data;
					if(respone === 200){
						resolve(respone.data);
					}else{
						uni.showToast({
							title:respone.message
						})
						reject(respone);
					}
				}else{
					uni.showToast({
						title:res.errMsg
					})
					reject(res);
				}
			},
			fail:(res)=>{
				reject(res);
			}
		},config);
		options.url = url.includes('http')?url:baseConfig.baseUrl+url;
		uni.request(options);
	});
}

/**
 * 接口POST请求
 * @param {url:'接口请求路径',data:'接口请求参数',config:'接口配置信息'}  
 */
const post = (url,data,config)=>{
	return request(url,data,Object.assign({method:'POST'},config));
}

/**
 * 接口GET请求
 * @param {url:'接口请求路径',data:'接口请求参数',config:'接口配置信息'}  
 */
const get = (url,data,config)=>{
	return request(url,data,config);
}

module.exports = {
  get,post,request,defConfig
}