Template.RegisterAs.rendered = function() {
	
};

Template.RegisterAs.events({
	
});

Template.RegisterAs.helpers({
	
});

Template.RegisterAsHomeJumbotron2.rendered = function() {
	
};

Template.RegisterAsHomeJumbotron2.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("register_associate", {});
	}
	
});

Template.RegisterAsHomeJumbotron2.helpers({
	
});

Template.RegisterAsHomeJumbotron.rendered = function() {
	
};

Template.RegisterAsHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("register_user", {});
	}
	
});

Template.RegisterAsHomeJumbotron.helpers({
	
});
