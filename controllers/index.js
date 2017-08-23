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
}
