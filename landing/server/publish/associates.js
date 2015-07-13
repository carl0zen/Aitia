Meteor.publish("associate", function() {
	if(Users.isInRoles(this.userId, ["admin","associate","user"])) {
		return Associates.find({}, {});
	}
	return this.ready();
});

