var pageSession = new ReactiveDict();

Template.AdminAssociatesInsert.rendered = function() {
	
};

Template.AdminAssociatesInsert.events({
	
});

Template.AdminAssociatesInsert.helpers({
	
});

Template.AdminAssociatesInsertInsertForm.rendered = function() {
	

	pageSession.set("adminAssociatesInsertInsertFormInfoMessage", "");
	pageSession.set("adminAssociatesInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.AdminAssociatesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminAssociatesInsertInsertFormInfoMessage", "");
		pageSession.set("adminAssociatesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminAssociatesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminAssociatesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminAssociatesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminAssociatesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AdminAssociatesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminAssociatesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminAssociatesInsertInsertFormErrorMessage");
	}
	
});
