var pageSession = new ReactiveDict();

Template.AdminAssociatesDetails.rendered = function() {
	
};

Template.AdminAssociatesDetails.events({
	
});

Template.AdminAssociatesDetails.helpers({
	
});

Template.AdminAssociatesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminAssociatesDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminAssociatesDetailsDetailsFormErrorMessage", "");

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

Template.AdminAssociatesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminAssociatesDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminAssociatesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminAssociatesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminAssociatesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminAssociatesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("adminAssociatesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	}

	
});

Template.AdminAssociatesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminAssociatesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminAssociatesDetailsDetailsFormErrorMessage");
	}
	
});
