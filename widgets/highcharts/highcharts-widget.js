(function(){
    "use strict";

    class CustomHighchartsWidgetCtrl {
        root;
        scope;

        constructor($element, $scope) {
            this.root = $element;
            this.scope = $scope;
        }

        $onInit() {
            let container = this.root.find('[data-highcharts-container]').get(0);
            let chart = Highcharts.chart(container, this.configs);

            this.scope.$on('dataSeriesUpdated', function(ev, dataSeries) {
                chart.update({ 
                    series: {
                        data: dataSeries.data
                    },
                    colorAxis: {
                        min: dataSeries.min
                    }
                });
            }.bind(this));
        }
    }

    CustomHighchartsWidgetCtrl.$inject = ['$element', '$scope']

    angular.module('DemoApp').component('customHighchartsWidget', {
        templateUrl: 'widgets/highcharts/highcharts-widget.html',
        controller: CustomHighchartsWidgetCtrl,
        bindings: {
            configs: '<'
        }
    })

}());