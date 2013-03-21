$(function() {


window.TastypieCollection = Backbone.Collection.extend({
    parse: function(response) {
        this.recent_meta = response.meta || {};
        return response.objects || response;
    }
});

	window.Reports = window.TastypieCollection.extend({
        model: Report,
        url:'https://fast-dusk-7046.herokuapp.com/api/reportinghistory?format=json'
    });

});