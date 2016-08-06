Vue.filter('niceDate', function(dateString) {
  var date = new Date(dateString);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0'  +  month : month;
  date = day +  '/' + month + '/' + year;
  return date;
})

var application = new Vue({
    el: '#app',

    data: {
        results: [],
        resultsLoadedStyle: 'none',
        searchInput: ''
    },

    created: function() {
        this.fetchData();
    },

    methods: {
        fetchData: function() {
            var self = this;
            var endpoint = 'https://www.govt.nz/api/v2/consultation/list?limit=all&status=current&sort=end';

            fetch(endpoint).then(function(response) {
                return response.json();
            }).then(function(json) {
                var consultations = json.consultations;

                for (var consultation of consultations) {
                    consultation.showDescription = false;
                }
                self.results = consultations;
                self.resultsLoadedStyle = 'table';
            });
        }
    }
});
