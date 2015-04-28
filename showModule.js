var events = require('events');
var util = require('util');
var stream = require('stream');
util.inherits(Show, events.EventEmitter);

// ---- Show Object Constructor ----
function Show(showName,total) {
	this.showName = showName;		// name of this show
	this.total_tickets = total;		// total tickets to this show
	this.tickets = 0;				// number of bought tickets
	this.msgArr = []; 				// all logs messages
}

// ---- Show Object prototypes ----
Show.prototype.buyTickets = function(amount) {
	if (this.checkPossibleToBuy(amount) == true) {
		this.tickets += amount;
		this.printMsg(amount + " tickets were sold successfully.");
		this.emit('ticketsNumberChanged');
	}
};

Show.prototype.cancelTickets = function(amount) {
	if (this.checkCancelTickets(amount) == true) {
		this.tickets -= amount;		
		this.printMsg(amount + " tickets were canceled successfully.");
		this.emit('ticketsNumberChanged');
	}
};

Show.prototype.checkCancelTickets = function(amount) {
	if (this.tickets-amount < 0) {
		this.printMsg("Sorry. Its not possible to cancel "+amount+" tickets for this show. Check again your entered amount.");
		return false;
	}
	return true;
}

Show.prototype.checkPossibleToBuy = function(amount) {
	if (this.tickets + amount > this.total_tickets) {
		this.printMsg("Sorry. Its not possible to buy "+amount+" tickets for this show right now. Try the next show next month.");
		return false;
	}
	return true;
}

Show.prototype.printMsg = function(msg) {
	console.log(msg);
	this.msgArr.push(msg);
}

// ---- Callback functions ----
function displayTotal() {
	this.printMsg("Total number of tickets that sold for this show is "+ this.tickets + " from total "+ this.total_tickets + " tickets.");
}

function checkAllTicketsSoldOut() {
	if (this.tickets == this.total_tickets) {
		this.printMsg("AWESOME ! All tickets are sold out.");
	}
}

// ---- Create Show instance and attach callbacks to events ----
exports.getShow = function(showName,total) {
	var myShow = new Show(showName,total);
	myShow.on('ticketsNumberChanged',displayTotal);
	myShow.on('ticketsNumberChanged',checkAllTicketsSoldOut);
	return myShow;
};

