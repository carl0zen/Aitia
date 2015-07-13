this.Needs = new Mongo.Collection("needs");

this.Needs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["user","admin"]);
}

this.Needs.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","user"]);
}

this.Needs.userCanRemove = function(userId, doc) {
	return true;
}
