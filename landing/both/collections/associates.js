this.Associates = new Mongo.Collection("associates");

this.Associates.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["associate","admin"]);
}

this.Associates.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","associate"]);
}

this.Associates.userCanRemove = function(userId, doc) {
	return true;
}
