Associate.allow({
	insert: function (userId, doc) {
		return Associate.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Associate.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Associate.userCanRemove(userId, doc);
	}
});

Associate.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Associate.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Associate.before.remove(function(userId, doc) {
	
});

Associate.after.insert(function(userId, doc) {
	
});

Associate.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Associate.after.remove(function(userId, doc) {
	
});
