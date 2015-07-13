var pageSession = new ReactiveDict();

Template.UserSettingsProfile.rendered = function() {
	
};

Template.UserSettingsProfile.events({
	
});

Template.UserSettingsProfile.helpers({
	
});

Template.UserSettingsProfileEditForm.rendered = function() {
	

	pageSession.set("userSettingsProfileEditFormInfoMessage", "");
	pageSession.set("userSettingsProfileEditFormErrorMessage", "");

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

Template.UserSettingsProfileEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("userSettingsProfileEditFormInfoMessage", "");
		pageSession.set("userSettingsProfileEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var userSettingsProfileEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(userSettingsProfileEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("userSettingsProfileEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("user_settings.profile", {});
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("userSettingsProfileEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.UserSettingsProfileEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("userSettingsProfileEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("userSettingsProfileEditFormErrorMessage");
	}
	
});

var UserSettingsProfileEditFormItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("UserSettingsProfileEditFormSearchString");
	var sortBy = pageSession.get("UserSettingsProfileEditFormSortBy");
	var sortAscending = pageSession.get("UserSettingsProfileEditFormSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "profile.facebook", "profile.google", "profile.twitter", "profile.website"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var UserSettingsProfileEditFormExport = function(cursor, fileType) {
	var data = UserSettingsProfileEditFormItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.UserSettingsProfileEditForm.rendered = function() {
	pageSession.set("UserSettingsProfileEditFormStyle", "table");
	
};

Template.UserSettingsProfileEditForm.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("UserSettingsProfileEditFormSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("UserSettingsProfileEditFormSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("UserSettingsProfileEditFormSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		UserSettingsProfileEditFormExport(this.current_user_data, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		UserSettingsProfileEditFormExport(this.current_user_data, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		UserSettingsProfileEditFormExport(this.current_user_data, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		UserSettingsProfileEditFormExport(this.current_user_data, "json");
	}

	
});

Template.UserSettingsProfileEditForm.helpers({

	

	"isEmpty": function() {
		return !this.current_user_data || this.current_user_data.count() == 0;
	},
	"isNotEmpty": function() {
		return this.current_user_data && this.current_user_data.count() > 0;
	},
	"isNotFound": function() {
		return this.current_user_data && pageSession.get("UserSettingsProfileEditFormSearchString") && UserSettingsProfileEditFormItems(this.current_user_data).length == 0;
	},
	"searchString": function() {
		return pageSession.get("UserSettingsProfileEditFormSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("UserSettingsProfileEditFormStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("UserSettingsProfileEditFormStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("UserSettingsProfileEditFormStyle") == "gallery";
	}

	
});


Template.UserSettingsProfileEditFormTable.rendered = function() {
	
};

Template.UserSettingsProfileEditFormTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("UserSettingsProfileEditFormSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("UserSettingsProfileEditFormSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("UserSettingsProfileEditFormSortAscending") || false;
			pageSession.set("UserSettingsProfileEditFormSortAscending", !sortAscending);
		} else {
			pageSession.set("UserSettingsProfileEditFormSortAscending", true);
		}
	}
});

Template.UserSettingsProfileEditFormTable.helpers({
	"tableItems": function() {
		return UserSettingsProfileEditFormItems(this.current_user_data);
	}
});


Template.UserSettingsProfileEditFormTableItems.rendered = function() {
	
};

Template.UserSettingsProfileEditFormTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Users.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Users.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.UserSettingsProfileEditFormTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
