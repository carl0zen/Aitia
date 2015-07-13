Needs.allow({
	insert: function (userId, doc) {
		return Needs.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Needs.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Needs.userCanRemove(userId, doc);
	}
});

Needs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Needs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Needs.before.remove(function(userId, doc) {
	
});

Needs.after.insert(function(userId, doc) {
	
});

Needs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Needs.after.remove(function(userId, doc) {
	
});
