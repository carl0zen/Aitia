var pageSession = new ReactiveDict();

Template.AdminAssociatesEdit.rendered = function() {
	
};

Template.AdminAssociatesEdit.events({
	
});

Template.AdminAssociatesEdit.helpers({
	
});

Template.AdminAssociatesEditEditForm.rendered = function() {
	

	pageSession.set("adminAssociatesEditEditFormInfoMessage", "");
	pageSession.set("adminAssociatesEditEditFormErrorMessage", "");

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

Template.AdminAssociatesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminAssociatesEditEditFormInfoMessage", "");
		pageSession.set("adminAssociatesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminAssociatesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminAssociatesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminAssociatesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminAssociatesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.admin_user._id, values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.AdminAssociatesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminAssociatesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminAssociatesEditEditFormErrorMessage");
	}
	
});
