Template.Dashboard.rendered = function() {
	
};

Template.Dashboard.events({
	
});

Template.Dashboard.helpers({
	
});

Template.DashboardAskForWork.rendered = function() {
	
};

Template.DashboardAskForWork.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("register_associate", {});
	}
	
});

Template.DashboardAskForWork.helpers({
	
});

Template.DashboardAskForHelp.rendered = function() {
	
};

Template.DashboardAskForHelp.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("post_need", {});
	}
	
});

Template.DashboardAskForHelp.helpers({
	
});
