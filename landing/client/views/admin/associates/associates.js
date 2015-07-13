var pageSession = new ReactiveDict();

Template.AdminAssociates.rendered = function() {
	
};

Template.AdminAssociates.events({
	
});

Template.AdminAssociates.helpers({
	
});

var AdminAssociatesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminAssociatesViewSearchString");
	var sortBy = pageSession.get("AdminAssociatesViewSortBy");
	var sortAscending = pageSession.get("AdminAssociatesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "roles"];
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

var AdminAssociatesViewExport = function(cursor, fileType) {
	var data = AdminAssociatesViewItems(cursor);
	var exportFields = [];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AdminAssociatesView.rendered = function() {
	pageSession.set("AdminAssociatesViewStyle", "table");
	
};

Template.AdminAssociatesView.events({
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
				pageSession.set("AdminAssociatesViewSearchString", searchString);
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
					pageSession.set("AdminAssociatesViewSearchString", searchString);
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
					pageSession.set("AdminAssociatesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.associates.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminAssociatesViewExport(this.admin_associates, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminAssociatesViewExport(this.admin_associates, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminAssociatesViewExport(this.admin_associates, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminAssociatesViewExport(this.admin_associates, "json");
	}

	
});

Template.AdminAssociatesView.helpers({

	"insertButtonClass": function() {
		return Associates.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.admin_associates || this.admin_associates.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_associates && this.admin_associates.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_associates && pageSession.get("AdminAssociatesViewSearchString") && AdminAssociatesViewItems(this.admin_associates).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminAssociatesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminAssociatesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AdminAssociatesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminAssociatesViewStyle") == "gallery";
	}

	
});


Template.AdminAssociatesViewTable.rendered = function() {
	
};

Template.AdminAssociatesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminAssociatesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminAssociatesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminAssociatesViewSortAscending") || false;
			pageSession.set("AdminAssociatesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminAssociatesViewSortAscending", true);
		}
	}
});

Template.AdminAssociatesViewTable.helpers({
	"tableItems": function() {
		return AdminAssociatesViewItems(this.admin_associates);
	}
});


Template.AdminAssociatesViewTableItems.rendered = function() {
	
};

Template.AdminAssociatesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("admin.associates.details", {associateId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Associates.update({ _id: this._id }, { $set: values });

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
						Associates.remove({ _id: me._id });
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
		Router.go("admin.associates.edit", {associateId: this._id});
		return false;
	}
});

Template.AdminAssociatesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Associates.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Associates.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
