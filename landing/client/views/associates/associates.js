var pageSession = new ReactiveDict();

Template.Associates.rendered = function() {
	
};

Template.Associates.events({
	
});

Template.Associates.helpers({
	
});

var AssociatesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AssociatesViewSearchString");
	var sortBy = pageSession.get("AssociatesViewSortBy");
	var sortAscending = pageSession.get("AssociatesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "last_name", "phone", "email", "name", "skills", "sex", "dob", "phoneType", "street", "city", "state", "postcode", "accept_terms", "why_join"];
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

var AssociatesViewExport = function(cursor, fileType) {
	var data = AssociatesViewItems(cursor);
	var exportFields = ["name", "last_name", "phone", "email", "name", "skills", "sex", "accept_terms"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.AssociatesView.rendered = function() {
	pageSession.set("AssociatesViewStyle", "table");
	
};

Template.AssociatesView.events({
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
				pageSession.set("AssociatesViewSearchString", searchString);
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
					pageSession.set("AssociatesViewSearchString", searchString);
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
					pageSession.set("AssociatesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("register_associate", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AssociatesViewExport(this.associates, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AssociatesViewExport(this.associates, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AssociatesViewExport(this.associates, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AssociatesViewExport(this.associates, "json");
	}

	
});

Template.AssociatesView.helpers({

	"insertButtonClass": function() {
		return Associates.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.associates || this.associates.count() == 0;
	},
	"isNotEmpty": function() {
		return this.associates && this.associates.count() > 0;
	},
	"isNotFound": function() {
		return this.associates && pageSession.get("AssociatesViewSearchString") && AssociatesViewItems(this.associates).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AssociatesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AssociatesViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("AssociatesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AssociatesViewStyle") == "gallery";
	}

	
});


Template.AssociatesViewTable.rendered = function() {
	
};

Template.AssociatesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AssociatesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AssociatesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AssociatesViewSortAscending") || false;
			pageSession.set("AssociatesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AssociatesViewSortAscending", true);
		}
	}
});

Template.AssociatesViewTable.helpers({
	"tableItems": function() {
		return AssociatesViewItems(this.associates);
	}
});


Template.AssociatesViewTableItems.rendered = function() {
	
};

Template.AssociatesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("associates.details", {associateId: this._id});
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
		Router.go("associates.edit", {associateId: this._id});
		return false;
	}
});

Template.AssociatesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Associates.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Associates.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
