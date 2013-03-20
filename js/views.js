$(function() {

	window.FormView = Backbone.View.extend({
		el: $("#search_cname_form"),
		search_reporting_history: function(e) {
			console.log('hello')
			e.preventDefault();
			console.log('preventDefault')
			var self = this;
			$.getJSON("http://fast-dusk-7046.herokuapp.com/api/reportinghistory?",{
				format:"json",
				contactname: $("#q").val()
			}, function(data) {
				console.log(data)
				$("#reports li").fadeOut();
				for(var i in data.objects) {
					console.log(data.objects)
					var report = new Report(data.objects[i]);
					console.log(data.objects[i]);
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