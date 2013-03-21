$(function() {

	var App = Backbone.Router.extend({
		routes: {
		    "": "index"
		}, 
		index: function() {
			var formView = new window.FormView;
			var App = new AppView;
			
			var linkView = new window.LinkView;

			var resetView = new window.ResetView;

			var sortView = new window.SortView;
		}
	});
	var app = new App();

	Backbone.history.start();

});