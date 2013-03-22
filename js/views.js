$(function() {

	window.FormView = Backbone.View.extend({
		el: $("#search_cname_form"),
		search_reporting_history: function(e) {
			$('#reset').css({"visibility":"visible"});
			console.log('hello')
			e.preventDefault();
			console.log('preventDefault')
			var self = this;
			var query = $("#q").val().split("=")

			console.log(query[1]);

			var args = {}

			if(query.length == 2 && query[0] == 'contactname'){
				args = {
					format:"json",
					contactname: query[1]
				}
				$("#query_store").text("contactname=" + query[1]);
				console.log("Stored " + $("#query_store").text())
			}else if(query.length == 2 && query[0] == 'slug'){
				$("#contactinfo").html("");
				args = {
					format:"json",
					slug: query[1]
				}
				$("#query_store").text("slug=" + query[1]);

			}

			$.getJSON("https://fast-dusk-7046.herokuapp.com/api/reportinghistory?",args, function(data) {

				query = $("#query_store").text().split('=');
				
				var param = false;
				if(query[0] == 'contactname' && $("#contactinfo").html()==""){param = true;}
				
				console.log(data)
				$("#reports li").fadeOut();
				for(var i in data.objects) {
					console.log(data.objects)
					var report = new Report(data.objects[i]);
					console.log(data.objects[i]);
					if(i==data.objects.length-1 && param==true){
						var contactView = new ContactView({model:report});
						contactView.render();
					}

					var reportView = new ReportView({model: report});
					reportView.render();
				}
			});
		},
		events: {
			"submit": "search_reporting_history"
		}
    });


	window.LinkView = Backbone.View.extend({
		el: $('#reports'),
		filter_reporting_history: function(e) {
			$('#reset').css({"visibility":"visible"});
			console.log('in link view')
			e.preventDefault();
			console.log('preventDefault')
			var elem = $(e.target);

			console.log('elem : ' + elem);

			var link_text = elem.text();
			console.log('Link text : ' + link_text);
			if(link_text.indexOf('Download archive') == -1){
				var property = elem.attr("class");

				var args = {}

				if(property == 'contactname') {
					args = {
						contactname:link_text,
						format:"json"
					}
					$("#query_store").text("contactname=" + link_text);
				}else if(property == 'slug') {
					$("#contactinfo").html("");
					args = {
						slug:link_text,
						format:"json"
					}
					$("#query_store").text("slug=" + link_text);
				}

				var self = this;

				$.getJSON("https://fast-dusk-7046.herokuapp.com/api/reportinghistory?",args, function(data) {
					query = $("#query_store").text().split('=');
				
					var param = false;
					if(query[0] == 'contactname' && $("#contactinfo").html()==""){param = true;}
					
					console.log(data)
					$("#reports li").fadeOut();
					for(var i in data.objects) {
						console.log(data.objects)
						var report = new Report(data.objects[i]);
						console.log(data.objects[i]);
						if(i==data.objects.length-1 && param==true ){
							var contactView = new ContactView({model:report});
							contactView.render();
						}
						var reportView = new ReportView({model: report});
						reportView.render();
					}
				});
			}
		},
		events: {
			'click .contactname': "filter_reporting_history",
			'click .slug': "filter_reporting_history"
			
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
			console.log("in ReportView");
			var report = _.template( $("#report_template").html(), this.model.toJSON());
			$("#reports").append(report);
			$("#r_" + this.model.get("id")).fadeIn();
		}
	});

	window.ContactView = Backbone.View.extend({
		render: function() {
			console.log("in ContactView");
			var report = _.template( $("#contact_template").html(), this.model.toJSON());
			$("#contactinfo").append(report);
			$("#contactinfo").fadeIn();
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

 window.ResetView = Backbone.View.extend({
   el: "#navcontainer",
   reset_filter: function() {
   		$("#contactinfo").html("");
   		console.log('resetting');
      var reports = new Reports(); 
      
      var reportsView = new ReportsView({
         model: reports
      });
      $('#reset').css({"visibility":"hidden"});

      $("#query_store").text("");
      
      reports.bind('reset', function () {
         reportsView.render();
      });

      reports.fetch();
   },
   events: {
			'click #reset': "reset_filter"
			
			
		}
 }); 

 window.SortView = Backbone.View.extend({
		el: $("#navcontainer"),
		sort_asc_reporting_history: function(e) {
			
			console.log('in sort asc view')
			e.preventDefault();
			console.log('preventDefault')
			var elem = $(e.target);

			console.log('elem : ' + elem);

			var link_text = elem.text();
			console.log('Link text : ' + link_text);
			var sort; var query;

			query = $("#query_store").text().split('=');
			console.log(query);
				
			var args = {}

			if(query[0] == 'contactname') {
				args = {
						contactname:query[1],
						order_by:"reportepoch",
						format:"json"
				}
			}else if(query[0] == 'slug') {
				$("#contactinfo").html("");
				args = {
						slug:query[1],
						order_by:"reportepoch",
						format:"json"
				}
					
			}else{
				args = {
						
						order_by:"reportepoch",
						format:"json"
				}
			}

			var self = this;
			$("#reports").empty();

			$.getJSON("https://fast-dusk-7046.herokuapp.com/api/reportinghistory?",args, function(data) {
					
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
		sort_desc_reporting_history: function(e) {
			
			console.log('in sort desc view')
			e.preventDefault();
			console.log('preventDefault')
			var elem = $(e.target);

			console.log('elem : ' + elem);

			var link_text = elem.text();
			console.log('Link text : ' + link_text);
			var sort; var query;

			query = $("#query_store").text().split('=');
			console.log(query);
				
			var args = {}

			if(query[0] == 'contactname') {
				args = { 
						contactname:query[1],
						order_by:"-reportepoch",
						format:"json"
				}
			}else if(query[0] == 'slug') {
				$("#contactinfo").html("");
				args = {
						slug:query[1],
						order_by:"-reportepoch",
						format:"json"
				}
					
			}else{
				args = {
						
						order_by:"-reportepoch",
						format:"json"
				}
			}

			var self = this;

			$("#reports").empty();

			$.getJSON("https://fast-dusk-7046.herokuapp.com/api/reportinghistory?",args, function(data) {
					
					console.log(data)
					$("#reports li").fadeOut();
					for(var i in data.objects) {
						console.log(data.objects)
						var report = new Report(data.objects[i]);
						console.log(data.objects[i]);
						var reportView = new ReportView({model: report});
						reportView.render();
					}
					console.log($('#reports').html());
				});
			
		},
		events: {
			'click #sort_asc': "sort_asc_reporting_history",
			'click #sort_desc': "sort_desc_reporting_history"
			
		}
    });

});