$(function() {

	window.FormView = Backbone.View.extend({
		el: $("#search_cname_form"),
		search_reporting_history: function(e) {
			console.log('hello')
			e.preventDefault();
			console.log('preventDefault')
			var self = this;
			$.getJSON("http://fast-dusk-7046.herokuapp.com/api/reportinghistory",{
				format:"json", callback:"?",
				contactname: $("#q").val()
			}, function(data) {
				console.log('in data function')
				$("#reports li").fadeOut();
				for(var i in data.results) {
					console.log(data.results)
					var report = new Report(data.results[i]);
					console.log(data.results[i]);
					var reportView = new ReportView({model: report});
					reportView.render();
				}
			});
		},
		events: {
			"submit": "search_reporting_history"
		}
    });

	window.ReportView = Backbone.View.extend({
		render: function() {
			var report = _.template( $("#report_template").html(), this.model.toJSON());
			$("#reports").append(report);
			$("#r_" + this.model.get("id")).fadeIn();
		}
	});

});