var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
var fs = require('fs')

function download(u, p) {
	return fetch(u, {
		method: 'GET',
		headers: { 'Content-Type': 'application/octet-stream' },
	}).then(res => res.buffer()).then(_ => {
		fs.writeFile(p, _, 'binary', function(err) {
			console.log(err || p);
		});
	});
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MOA auto scheduling system' });
  var url = "http://moa.sysu.alau.top/index.php/DutySignUp/exportToTxt";
  download(url, 'signup.txt')
});

module.exports = router;
