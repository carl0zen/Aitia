Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});

Template.HomePrivateAskForWork.rendered = function() {
	
};

Template.HomePrivateAskForWork.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("register_associate", {});
	}
	
});

Template.HomePrivateAskForWork.helpers({
	
});

Template.HomePrivateAskForHelp.rendered = function() {
	
};

Template.HomePrivateAskForHelp.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("post_job", {});
	}
	
});

Template.HomePrivateAskForHelp.helpers({
	
});
