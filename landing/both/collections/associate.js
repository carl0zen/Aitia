this.Associate = new Mongo.Collection("associate");

this.Associate.userCanInsert = function(userId, doc) {
	return true;
}

this.Associate.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","associate"]);
}

this.Associate.userCanRemove = function(userId, doc) {
	return true;
}
