$(function() {

	window.FormView = Backbone.View.extend({
		el: $("#search_cname_form"),
		search_reporting_history: function(e) {
			console.log('hello')
			e.preventDefault();
			console.log('preventDefault')
			var self = this;
			var query = $("#q").val().split("=")

			var args = {}

			if(query.length == 2 && query[0] == 'contactname'){
				args = {
					format:"json",
					contactname: query[1]
				}
			}else if(query.length == 2 && query[0] == 'slug'){
				args = {
					format:"json",
					slug: query[1]
				}
			}else{
				args = {
					format:"json",
					contactname: query[1],
					slug:query[3]
				}
			}

			$.getJSON("http://fast-dusk-7046.herokuapp.com/api/reportinghistory?",args, function(data) {
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

	window.ReportsView = Backbone.View.extend({
		render:function(){
			var data = this.model.models;
			console.log(data);
			for(var i in data) {
					var report = new Report(data[i]);
					console.log(data[i]);
					var reportView = new ReportView({model: report});
					reportView.render();
				}
		}
	})

	window.ReportView = Backbone.View.extend({
		render: function() {
			var report = _.template( $("#report_template").html(), this.model.toJSON());
			$("#reports").append(report);
			$("#r_" + this.model.get("id")).fadeIn();
		}
	});

  window.AppView = Backbone.View.extend({
   el: "#reports",
   initialize: function() {
      var reports = new Reports(); 
      
      var reportsView = new ReportsView({
         model: reports
      });

      
      reports.bind('reset', function () {
         reportsView.render();
      });

      reports.fetch();
   }
 });

});