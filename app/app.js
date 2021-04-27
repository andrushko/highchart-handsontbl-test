angular.module('DemoApp', [])
.controller('DemoController', ['$scope', 'api', 'chart', 'datatable', function($scope, api, chart, datatable) {
    $scope.message = "Hello World";
    
    $scope.init = function() {
        api.getData()
        .then(response => {
            $scope.data = response.data;
            $scope.headers = response.headers;

            $scope.datatable = datatable.config(response.headers, 
                response.data,
                {
                    beforeChange: function(arg1, arg2, arg3){
                        $scope.dataTableUpdated(arg1);
                    }
                });
            $scope.chart = chart.config(response.headers, response.data);
        });
    };

    $scope.dataTableUpdated = function(updated) {
        let doUpdate = false;
        for (let i = 0; i < updated.length; i++) {
            let newval = +updated[i][3];
            let oldval = updated[i][2];
            
            if(oldval != newval) {
                let ix = updated[i][0];
                let jx = updated[i][1];
                $scope.data[ix][jx] = newval;
                doUpdate = true;
            }
        }
        if(doUpdate){
            let newSeries = chart.buildSeries($scope.data);
            $scope.$broadcast("dataSeriesUpdated", newSeries); 
        }
    }
}]);