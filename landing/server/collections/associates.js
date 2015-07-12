Associates.allow({
	insert: function (userId, doc) {
		return Associates.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Associates.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Associates.userCanRemove(userId, doc);
	}
});

Associates.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Associates.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Associates.before.remove(function(userId, doc) {
	
});

Associates.after.insert(function(userId, doc) {
	
});

Associates.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Associates.after.remove(function(userId, doc) {
	
});
