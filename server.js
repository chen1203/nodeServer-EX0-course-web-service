var http = require('http');
var myMoudule = require('./showModule');

var beyonceShow = myMoudule.getShow("Beyonce-show",1500);
beyonceShow.buyTickets(500);	// total = 500
beyonceShow.cancelTickets(600);	// total = 500 	,cannot cancel 600
beyonceShow.buyTickets(200);	// total = 700
beyonceShow.cancelTickets(100);	// total = 600
beyonceShow.buyTickets(950);	// total = 600 	,cannto buy 950
beyonceShow.buyTickets(900);	// total = 1500		
beyonceShow.buyTickets(100);	// total = 1500 ,cannot buy 100 

http.createServer(function(req,res) {
	res.writeHeader(200,{"Content-Type": "text/html"});
	res.write("<h1>EX 0 of Chen Shamir</h1><h2>Beyonce-show</h2><h3>Success!</h3><p>");
	for(var i=0;i < beyonceShow.msgArr.length; i++)
		res.write(beyonceShow.msgArr[i]+"<br>")
	res.end("</p>");
}).listen(8080);