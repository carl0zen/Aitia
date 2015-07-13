Meteor.publish("associate", function() {
	if(Users.isInRoles(this.userId, ["admin","associate","user"])) {
		return Associates.find({}, {});
	}
	return this.ready();
});

Meteor.publish("associates", function() {
	if(Users.isInRoles(this.userId, ["admin","associate","user"])) {
		return Associates.find({}, {});
	}
	return this.ready();
});

