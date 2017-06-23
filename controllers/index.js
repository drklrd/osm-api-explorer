var appRootPath = require('app-root-path');
var fs = require('fs');
var moment = require('moment');

module.exports = function(router) {

	router.get('/audio/list', function(req, res, next) {
		
		var filesObj = [];
		var files = fs.readdirSync(appRootPath + '/recordings').forEach(filename => {
			var birthtime = fs.statSync(appRootPath + `/recordings/${filename}`).birthtime;
			filesObj.push({
				filename,
				createdAt: moment(birthtime).format('YYYY-MM-DD')
			})
		})
		return res.json({
			success: 1,
			files: filesObj
		})

	});

	router.get('/audio/:filename', function(req, res, next) {

		var attemptedFilePath = appRootPath + `/recordings/${req.params.filename}`;
		if(fs.existsSync(attemptedFilePath)){
			return res.sendFile(attemptedFilePath);
		}else{
			return res.sendStatus(404);
		}

	});

}