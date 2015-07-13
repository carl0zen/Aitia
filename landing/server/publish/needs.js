Meteor.publish("needs", function() {
	return Needs.find({}, {});
});

