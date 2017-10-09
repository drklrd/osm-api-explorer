try{
	var config = require('../config.js');
}
catch(e){
	console.log('Config file not found !');
}

module.exports = function(router) {
	router.get('/config',function(req,res){
		if(process.env.oauth_consumer_key && process.env.oauth_secret && process.env.auto){
			res.json({
				oauth_consumer_key : process.env.oauth_consumer_key,
				oauth_secret : process.env.oauth_secret,
				auto : process.env.auto,
				url : 'https://master.apis.dev.openstreetmap.org'
			})
		}else{
			res.json(config.osmConfig);
		}
	});

	router.get('/api/v1/stats/:user',function(req,res){
		if(!process.env.apiURL) {
			res.json({
				success : 0
			})
		}else{
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
			var request = require('request');
			request(`${process.env.apiURL}/${req.params.user}`, function (error, response, body) {
			  if(error) res.json({
			  	success : 0,
			  	message : error
			  })
			  body = JSON.parse(body);
			  body.success = 1;
			  res.json(body);
			});
		}
		

	});
}
